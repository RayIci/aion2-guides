import type { Element, ElementContent, Root as HastRoot } from 'hast';
import { toHtml } from 'hast-util-to-html';
import type { ListItem, Paragraph, PhrasingContent, Root, RootContent, Text } from 'mdast';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit, SKIP } from 'unist-util-visit';
import { deriveConfidence, type Citation } from './confidence';
import { CONFIDENCE_LEVELS, type Confidence, type Source } from './schema';

// Markdown → HTML for one section body, with the citation syntax from docs/content-model.md.
// The renderer also reports what the validator and coverage report need to know.

export interface RenderedClaim {
  confidence: Confidence;
  opinion: boolean;
}

export interface RenderResult {
  html: string;
  /** One entry per inline citation marker. */
  claims: RenderedClaim[];
  /** Source ids in citation-number order (inline first-use order, then section-level). */
  sourceOrder: string[];
  checklistIds: string[];
  /** HTML of each `:::play` block, in document order (for playing mode). */
  playBlocks: string[];
  issues: string[];
}

const CITATION = /\[((?:\s*(?:@[A-Za-z0-9][\w.:-]*|![a-z]+)\s*;?)+)\]/g;
const CHECKLIST_ID = /\s*\{#([\w-]+)\}\s*$/;
const BADGE_LABEL: Record<Confidence, string> = { verified: 'Verified', community: 'Community', unverified: 'Unverified' };

export async function renderSection(
  body: string,
  ctx: { sources: ReadonlyMap<string, Source>; sectionSources: string[] },
): Promise<RenderResult> {
  const state: RenderResult = { html: '', claims: [], sourceOrder: [], checklistIds: [], playBlocks: [], issues: [] };
  const numberOf = (id: string) => {
    let n = state.sourceOrder.indexOf(id);
    if (n === -1) n = state.sourceOrder.push(id) - 1;
    return n + 1;
  };

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(() => (tree: Root) => {
      transformCitations(tree, ctx.sources, state, numberOf);
      collectChecklists(tree, state);
      renderBlocks(tree, body, state);
      restoreStrayDirectives(tree);
    })
    .use(remarkRehype)
    .use(() => (tree: HastRoot) => {
      visit(tree, 'element', (node: Element) => {
        if (node.properties?.dataPlay === undefined) return;
        state.playBlocks.push(toHtml(node));
        return SKIP;
      });
    })
    .use(rehypeStringify)
    .process(body);

  for (const id of ctx.sectionSources) numberOf(id);
  state.html = String(file);
  return state;
}

/** Parse the inside of `[...]`: `@id` tokens and `!level` caps separated by `;`. */
export function parseCitation(inner: string): { citation: Citation; issues: string[] } {
  const citation: Citation = { sourceIds: [], caps: [], opinion: false };
  const issues: string[] = [];
  for (const raw of inner.split(';')) {
    const token = raw.trim();
    if (!token) continue;
    if (token.startsWith('@')) citation.sourceIds.push(token.slice(1));
    else if (token === '!opinion') citation.opinion = true;
    else if ((CONFIDENCE_LEVELS as readonly string[]).includes(token.slice(1))) citation.caps.push(token.slice(1) as Confidence);
    else issues.push(`unknown citation marker "${token}"`);
  }
  return { citation, issues };
}

function transformCitations(
  tree: Root,
  sources: ReadonlyMap<string, Source>,
  state: RenderResult,
  numberOf: (id: string) => number,
) {
  visit(tree, 'text', (node: Text, index, parent) => {
    if (!parent || index === undefined || !CITATION.test(node.value)) return;
    CITATION.lastIndex = 0;
    const replacement: PhrasingContent[] = [];
    let last = 0;
    for (const match of node.value.matchAll(CITATION)) {
      if (match.index > last) replacement.push({ type: 'text', value: node.value.slice(last, match.index) });
      last = match.index + match[0].length;

      const { citation, issues } = parseCitation(match[1]);
      state.issues.push(...issues);
      for (const id of citation.sourceIds) {
        if (!sources.has(id)) state.issues.push(`unknown source id "${id}"`);
      }
      const confidence = deriveConfidence(citation, sources);
      const cited = citation.sourceIds.flatMap((id) => sources.get(id) ?? []);
      // Claims resting only on KR/TW sources are flagged (ADR-0003).
      const regional = cited.length > 0 && cited.every((s) => s.region === 'kr' || s.region === 'tw');
      const regions = regional ? [...new Set(cited.map((s) => s.region.toUpperCase()))].join('/') : undefined;
      state.claims.push({ confidence, opinion: citation.opinion });
      replacement.push(citationNode(citation, confidence, cited.map((s) => numberOf(s.id)), regions));
    }
    if (last < node.value.length) replacement.push({ type: 'text', value: node.value.slice(last) });
    parent.children.splice(index, 1, ...(replacement as typeof parent.children));
    return [SKIP, index + replacement.length];
  });
}

function citationNode(citation: Citation, confidence: Confidence, numbers: number[], regions?: string): PhrasingContent {
  const label = citation.opinion
    ? "Author's reasoning"
    : numbers.length === 0
      ? 'Needs source'
      : regions
        ? `${BADGE_LABEL[confidence]} · ${regions} only`
        : BADGE_LABEL[confidence];
  const refs: ElementContent[] = [];
  numbers.forEach((n, i) => {
    if (i > 0) refs.push({ type: 'text', value: ',' });
    refs.push({ type: 'element', tagName: 'a', properties: { href: `#src-${n}` }, children: [{ type: 'text', value: String(n) }] });
  });
  const children: Element[] = [
    {
      type: 'element',
      tagName: 'span',
      properties: { className: ['cite__badge'], title: `Confidence: ${BADGE_LABEL[confidence]}` },
      children: [{ type: 'text', value: label }],
    },
  ];
  if (refs.length) children.push({ type: 'element', tagName: 'sup', properties: { className: ['cite__refs'] }, children: refs });
  // A custom mdast node that remark-rehype turns into the hast described by `data`.
  return {
    type: 'citation',
    data: {
      hName: 'span',
      hProperties: { className: ['cite', `cite--${confidence}`], dataConfidence: confidence },
      hChildren: children,
    },
  } as unknown as PhrasingContent;
}

/** Checklist item ids: explicit trailing `{#id}`, else a slug of the item text. */
function collectChecklists(tree: Root, state: RenderResult) {
  visit(tree, (node) => {
    if (node.type !== 'containerDirective' || node.name !== 'checklist') return;
    visit(node, 'listItem', (item: ListItem) => {
      const para = item.children.find((c): c is Paragraph => c.type === 'paragraph');
      const lastText = para?.children.at(-1);
      let id: string | undefined;
      if (lastText?.type === 'text') {
        const m = CHECKLIST_ID.exec(lastText.value);
        if (m) {
          id = m[1];
          lastText.value = lastText.value.replace(CHECKLIST_ID, '');
        }
      }
      id ??= slugify(para ? plainText(para) : '');
      item.data = { ...item.data, hProperties: { ...(item.data?.hProperties ?? {}), dataChecklistId: id } };
      state.checklistIds.push(id);
    });
  });
}

const BLOCKS = new Set(['conflict', 'checklist', 'play', 'macro']);

/**
 * The container blocks from docs/content-model.md, turned into plain semantic HTML.
 * The site styles and enhances them (copy buttons, persistent checkboxes); the core stays UI-free.
 */
function renderBlocks(tree: Root, body: string, state: RenderResult) {
  visit(tree, (node) => {
    if (node.type !== 'containerDirective') return;
    const attrs = node.attributes ?? {};
    if (!BLOCKS.has(node.name)) {
      state.issues.push(`unknown block ":::${node.name}" (expected one of ${[...BLOCKS].join(', ')})`);
      return;
    }
    if (node.name === 'conflict') {
      const heading: Paragraph = {
        type: 'paragraph',
        data: { hProperties: { className: ['conflict__title'] } },
        children: [{ type: 'text', value: attrs.topic ? `Sources disagree: ${attrs.topic}` : 'Sources disagree' }],
      };
      node.children.unshift(heading);
      node.data = { hName: 'aside', hProperties: { className: ['conflict'], dataConflict: '' } };
    } else if (node.name === 'checklist') {
      if (attrs.title) {
        node.children.unshift({
          type: 'paragraph',
          data: { hProperties: { className: ['checklist__title'] } },
          children: [{ type: 'text', value: attrs.title }],
        });
      }
      node.data = { hName: 'div', hProperties: { className: ['checklist'], dataChecklist: attrs.id ?? '' } };
    } else if (node.name === 'play') {
      node.data = { hName: 'div', hProperties: { className: ['play-block'], dataPlay: '' } };
    } else if (node.name === 'macro') {
      // Keep the macro text exactly as written: the source lines between the fences.
      const start = node.position?.start.offset ?? 0;
      const end = node.position?.end.offset ?? 0;
      const lines = body.slice(start, end).split(/\r?\n/);
      const text = lines.slice(1, lines.at(-1)?.trim().startsWith(':::') ? -1 : undefined).join('\n').trim();
      const name = attrs.name ?? 'Macro';
      node.children = [
        {
          type: 'paragraph',
          data: { hName: 'figcaption', hProperties: { className: ['macro__caption'] } },
          children: [
            { type: 'text', value: name },
            {
              type: 'text',
              value: '',
              data: {
                hName: 'button',
                hProperties: { type: 'button', className: ['macro__copy'], dataCopyMacro: '' },
                hChildren: [{ type: 'text', value: 'Copy' }],
              },
            } as unknown as PhrasingContent,
          ],
        },
        { type: 'code', value: text },
      ] as typeof node.children;
      node.data = { hName: 'figure', hProperties: { className: ['macro'], dataMacro: name } };
    }
  });
}

/**
 * remark-directive also parses things like "Note:this" as text directives. Our syntax only
 * uses container directives (`:::name`), so put any text/leaf directive back as literal text.
 */
function restoreStrayDirectives(tree: Root) {
  visit(tree, (node, index, parent) => {
    if ((node.type !== 'textDirective' && node.type !== 'leafDirective') || !parent || index === undefined) return;
    const prefix = node.type === 'textDirective' ? ':' : '::';
    const restored: RootContent[] = [{ type: 'text', value: prefix + node.name }, ...(node.children as RootContent[])];
    (parent.children as RootContent[]).splice(index, 1, ...restored);
    return [SKIP, index + restored.length];
  });
}

function plainText(node: { children?: unknown[]; value?: unknown }): string {
  if (typeof node.value === 'string') return node.value;
  return (node.children ?? []).map((c) => plainText(c as typeof node)).join('');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\[[^\]]*\]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
