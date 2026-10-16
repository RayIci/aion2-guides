import { guideOf, type ChangelogEntry, type ContentGraph, type PatchView } from '../content-core';
import { sectionPath } from './content';
import { guideEntry, guideTitle } from './guides';

export interface PatchTarget {
  id: string;
  title: string;
  status: PatchView['meta']['status'];
  released?: string;
  /** Site path (without base) of the page to open in this patch. */
  href: string;
}

/**
 * Where the patch switcher goes for each patch, newest first: the same section if that patch
 * has it, else the same guide's entry page, else the patch's home page.
 */
export function patchTargets(content: ContentGraph, sectionId?: string): PatchTarget[] {
  const guide = sectionId && guideOf(sectionId);
  return [...content.patches].reverse().map((p) => {
    let href = `/${p.meta.id}`;
    if (sectionId && p.sections.some((s) => s.id === sectionId)) href = `/${p.meta.id}/${sectionPath(sectionId)}`;
    else if (guide) {
      const entry = guideEntry(p, guide);
      if (entry) href = `/${p.meta.id}/${entry}`;
    }
    return { id: p.meta.id, title: p.meta.title, status: p.meta.status, released: p.meta.released, href };
  });
}

export interface ChangelogGroup {
  guide: string;
  title: string;
  entries: (ChangelogEntry & { href?: string })[];
}

/**
 * A patch's changelog grouped by guide. Changed/added entries link to the section in this patch;
 * removals link to the last patch that still had the section.
 */
export function changelogGroups(content: ContentGraph, patch: PatchView): ChangelogGroup[] {
  const parent = content.patches.find((p) => p.meta.id === patch.meta.parent);
  const groups = new Map<string, ChangelogGroup>();
  for (const entry of patch.changelog) {
    const guide = guideOf(entry.sectionId);
    const group = groups.get(guide) ?? { guide, title: guideTitle(entry.kind === 'removed' && parent ? parent : patch, guide), entries: [] };
    const linkPatch = entry.kind === 'removed' ? parent : patch;
    group.entries.push({ ...entry, href: linkPatch && `/${linkPatch.meta.id}/${sectionPath(entry.sectionId)}` });
    groups.set(guide, group);
  }
  return [...groups.values()].sort((a, b) => a.guide.localeCompare(b.guide));
}

/** Header patch controls for a page: switcher targets and changelog link, with the base path applied. */
export function patchNav(content: ContentGraph, patch: PatchView, sectionId?: string, withBase: (p: string) => string = (p) => p) {
  return {
    current: patch.meta.id,
    options: patchTargets(content, sectionId).map((t) => ({ id: t.id, title: t.title, status: t.status, href: withBase(t.href) })),
    changelogHref: withBase(`/${patch.meta.id}/changelog`),
  };
}
