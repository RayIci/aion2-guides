import { deriveFromSources } from './confidence';
import { loadContent, type ContentError, type RawPatch, type RawSection } from './load';
import { renderSection, type RenderedClaim, type RenderResult } from './markdown';
import type { Confidence, PatchMeta, Source } from './schema';

// The content core: the one interface the site build reads content through.
// Everything (pages, search, diffs, playing mode) consumes its output, never the files.

export type { ContentError } from './load';
export type { Confidence, PatchMeta, Source } from './schema';

export interface ResolvedSection {
  id: string;
  title: string;
  order: number;
  status: 'draft' | 'researched' | 'reviewed';
  lastChecked?: string;
  play: boolean;
  /** Patch whose file this copy comes from. */
  originPatch: string;
  /** True when the viewed patch itself overrides or adds this section. */
  changedHere: boolean;
  /** Raw Markdown body (for diffs and search). */
  body: string;
  html: string;
  /** Cited sources, in citation-number order (`#src-1` is the first). */
  sources: Source[];
  /** Confidence of the section-level `sources`, or null when it has none. */
  sectionConfidence: Confidence | null;
  claims: RenderedClaim[];
}

export interface ChangelogEntry {
  sectionId: string;
  title: string;
  kind: 'changed' | 'added' | 'removed';
  gameChange: string;
  reason: string;
  sources: Source[];
}

export interface CoverageRow {
  guide: string;
  sections: number;
  drafts: number;
  claims: Record<Confidence, number>;
}

export interface PatchView {
  meta: PatchMeta;
  overview: string;
  /** The overview rendered like a section body (citations included). */
  overviewHtml: string;
  /** Sources cited in the overview, in citation-number order. */
  overviewSources: Source[];
  officialNotes: Source[];
  /** Resolved guide, sorted by section id. */
  sections: ResolvedSection[];
  changelog: ChangelogEntry[];
  coverage: CoverageRow[];
}

export interface ContentGraph {
  /** Patches in chain order, Baseline first. */
  patches: PatchView[];
  /** The patch shown at unprefixed URLs: the Live one, else the newest non-staged, else the Baseline. */
  defaultPatch: PatchView | undefined;
  sources: ReadonlyMap<string, Source>;
  sourcesWithoutArchive: Source[];
  errors: ContentError[];
}

export async function buildContent(contentDir: string): Promise<ContentGraph> {
  const raw = await loadContent(contentDir);
  const errors = [...raw.errors];
  const sources = raw.sources as ReadonlyMap<string, Source & { file: string }>;

  for (const s of sources.values()) {
    for (const id of s.derived_from) {
      if (!sources.has(id)) errors.push({ file: s.file, message: `derived_from: unknown source id "${id}"` });
    }
  }

  const ordered = orderPatches(raw.patches, errors);
  const lookupSources = (ids: string[], file: string, field: string) =>
    ids.flatMap((id) => {
      const s = sources.get(id);
      if (!s) errors.push({ file, message: `${field}: unknown source id "${id}"` });
      return s ? [s] : [];
    });

  // Render each section file once; inherited copies share the result.
  const rendered = new Map<RawSection, RenderResult>();
  for (const patch of ordered) {
    const isBaseline = !patch.meta.parent;
    for (const section of patch.sections.values()) {
      const r = await renderSection(section.body, { sources, sectionSources: section.meta.sources });
      rendered.set(section, r);
      for (const issue of r.issues) errors.push({ file: section.file, message: issue });
      lookupSources(section.meta.sources, section.file, 'sources');
      lookupSources(section.meta.change?.sources ?? [], section.file, 'change.sources');
      validateSection(section, r, isBaseline, errors);
    }
  }

  const views: PatchView[] = [];
  const resolvedByPatch = new Map<string, Map<string, { section: RawSection; origin: string }>>();
  for (const patch of ordered) {
    const parentResolved = patch.meta.parent ? resolvedByPatch.get(patch.meta.parent) : undefined;
    const resolved = new Map(parentResolved ?? []);
    const changelog: ChangelogEntry[] = [];

    for (const section of patch.sections.values()) {
      const previous = parentResolved?.get(section.id);
      if (section.meta.removed) {
        if (!previous && patch.meta.parent) {
          errors.push({ file: section.file, message: `removal of "${section.id}", which no earlier patch has` });
        }
        resolved.delete(section.id);
      } else {
        resolved.set(section.id, { section, origin: patch.meta.id });
      }
      if (patch.meta.parent) {
        changelog.push({
          sectionId: section.id,
          title: section.meta.title ?? previous?.section.meta.title ?? section.id,
          kind: section.meta.removed ? 'removed' : previous ? 'changed' : 'added',
          gameChange: section.meta.change?.game_change ?? '',
          reason: section.meta.change?.reason ?? '',
          sources: (section.meta.change?.sources ?? []).flatMap((id) => sources.get(id) ?? []),
        });
      }
    }
    resolvedByPatch.set(patch.meta.id, resolved);

    const sections = [...resolved.values()]
      .map(({ section, origin }) => toResolved(section, origin, origin === patch.meta.id, rendered.get(section)!, sources))
      .sort((a, b) => a.id.localeCompare(b.id));

    const overview = await renderSection(patch.overview, { sources, sectionSources: [] });
    for (const issue of overview.issues) errors.push({ file: patch.file, message: issue });

    views.push({
      meta: patch.meta,
      overview: patch.overview,
      overviewHtml: overview.html,
      overviewSources: overview.sourceOrder.flatMap((id) => sources.get(id) ?? []),
      officialNotes: lookupSources(patch.meta.official_notes, patch.file, 'official_notes'),
      sections,
      changelog: changelog.sort((a, b) => a.sectionId.localeCompare(b.sectionId)),
      coverage: coverage(sections),
    });
  }

  const live = views.find((v) => v.meta.status === 'live');
  const defaultPatch = live ?? [...views].reverse().find((v) => v.meta.status !== 'staged') ?? views[0];

  return {
    patches: views,
    defaultPatch,
    sources,
    sourcesWithoutArchive: [...sources.values()].filter((s) => !s.archived_url),
    errors,
  };
}

/** Section id → guide id: `classes/<class>` for class guides, otherwise the top-level folder. */
export function guideOf(sectionId: string): string {
  const parts = sectionId.split('/');
  return parts[0] === 'classes' && parts.length > 1 ? `${parts[0]}/${parts[1]}` : parts[0];
}

function toResolved(
  section: RawSection,
  origin: string,
  changedHere: boolean,
  r: RenderResult,
  sources: ReadonlyMap<string, Source>,
): ResolvedSection {
  const sectionSources = section.meta.sources.flatMap((id) => sources.get(id) ?? []);
  return {
    id: section.id,
    title: section.meta.title ?? section.id.split('/').at(-1)!,
    order: section.meta.order,
    status: section.meta.status,
    lastChecked: section.meta.last_checked,
    play: section.meta.play,
    originPatch: origin,
    changedHere,
    body: section.body,
    html: r.html,
    sources: r.sourceOrder.flatMap((id) => sources.get(id) ?? []),
    sectionConfidence: sectionSources.length ? deriveFromSources(sectionSources, sources) : null,
    claims: r.claims,
  };
}

function validateSection(section: RawSection, r: RenderResult, isBaseline: boolean, errors: ContentError[]) {
  const { meta, file } = section;
  if (isBaseline && meta.removed) errors.push({ file, message: 'the Baseline patch cannot contain removals' });
  if (!isBaseline) {
    if (!meta.change?.game_change) errors.push({ file, message: 'override is missing change.game_change' });
    if (!meta.change?.reason) errors.push({ file, message: 'override is missing change.reason' });
  }
  if (!meta.removed && !meta.title) errors.push({ file, message: 'title: required' });
  if (!meta.removed && meta.status !== 'draft' && r.claims.length === 0 && meta.sources.length === 0) {
    errors.push({ file, message: `a ${meta.status} section needs at least one citation or [!opinion] marker` });
  }
  const seen = new Set<string>();
  for (const id of r.checklistIds) {
    if (seen.has(id)) errors.push({ file, message: `duplicate checklist item id "${id}"` });
    seen.add(id);
  }
}

/** Order patches Baseline-first along the parent chain; report graph errors. */
function orderPatches(patches: RawPatch[], errors: ContentError[]): RawPatch[] {
  const byId = new Map(patches.map((p) => [p.meta.id, p]));
  const baselines = patches.filter((p) => !p.meta.parent);
  if (patches.length && baselines.length !== 1) {
    errors.push({
      file: 'patches',
      message: `expected exactly one Baseline patch (no parent), found ${baselines.length}${baselines.length ? `: ${baselines.map((p) => p.meta.id).join(', ')}` : ''}`,
    });
  }
  const live = patches.filter((p) => p.meta.status === 'live');
  if (live.length > 1) errors.push({ file: 'patches', message: `more than one live patch: ${live.map((p) => p.meta.id).join(', ')}` });

  for (const p of patches) {
    if (p.meta.parent && !byId.has(p.meta.parent)) errors.push({ file: p.file, message: `parent "${p.meta.parent}" does not exist` });
  }

  const children = new Map<string, RawPatch[]>();
  for (const p of patches) {
    if (p.meta.parent && byId.has(p.meta.parent)) children.set(p.meta.parent, [...(children.get(p.meta.parent) ?? []), p]);
  }
  const ordered: RawPatch[] = [];
  const visit = (p: RawPatch) => {
    ordered.push(p);
    const kids = (children.get(p.meta.id) ?? []).sort((a, b) =>
      (a.meta.released ?? '9999').localeCompare(b.meta.released ?? '9999') || a.meta.id.localeCompare(b.meta.id),
    );
    kids.forEach(visit);
  };
  baselines.forEach(visit);

  const unreachable = patches.filter((p) => !ordered.includes(p));
  if (unreachable.length) {
    errors.push({ file: 'patches', message: `patch graph has a cycle or detached patches: ${unreachable.map((p) => p.meta.id).join(', ')}` });
  }
  return ordered;
}

function coverage(sections: ResolvedSection[]): CoverageRow[] {
  const rows = new Map<string, CoverageRow>();
  for (const s of sections) {
    const guide = guideOf(s.id);
    const row = rows.get(guide) ?? { guide, sections: 0, drafts: 0, claims: { verified: 0, community: 0, unverified: 0 } };
    row.sections++;
    if (s.status === 'draft') row.drafts++;
    for (const c of s.claims) row.claims[c.confidence]++;
    if (s.sectionConfidence) row.claims[s.sectionConfidence]++;
    rows.set(guide, row);
  }
  return [...rows.values()].sort((a, b) => a.guide.localeCompare(b.guide));
}
