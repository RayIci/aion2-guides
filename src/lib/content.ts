import { resolve } from 'node:path';
import { buildContent, type ContentGraph, type PatchView, type ResolvedSection } from '../content-core';

// Build-time access to the content core. CONTENT_DIR overrides the content folder (used for demos/tests).

let cached: Promise<ContentGraph> | undefined;

export function getContent(): Promise<ContentGraph> {
  cached ??= buildContent(resolve(process.env.CONTENT_DIR ?? 'content')).then((graph) => {
    if (graph.errors.length) {
      const list = graph.errors.map((e) => `  - ${e.file}: ${e.message}`).join('\n');
      throw new Error(`Content validation failed (${graph.errors.length} error(s)):\n${list}`);
    }
    return graph;
  });
  return cached;
}

/** URL path of a section within a patch: `a/b/index` is served at `a/b`. */
export function sectionPath(id: string): string {
  return id.replace(/(^|\/)index$/, '');
}

/** Site path for a section in a patch; the default patch is also served unprefixed. */
export function sectionHref(patch: PatchView, section: Pick<ResolvedSection, 'id'>, prefixed = true): string {
  const path = sectionPath(section.id);
  return prefixed ? `/${patch.meta.id}/${path}` : `/${path}`;
}
