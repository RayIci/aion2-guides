import type { PatchView } from '../content-core';
import { sectionPath } from './content';

const NAMED: Record<string, string> = { world: 'Farming & crafting' };

/** Display name of a guide: its root `index` section title, else a name derived from the id. */
export function guideTitle(patch: PatchView, guide: string): string {
  const root = patch.sections.find((s) => s.id === `${guide}/index`);
  if (root) return root.title;
  if (NAMED[guide]) return NAMED[guide];
  const last = guide.split('/').at(-1)!;
  return last.charAt(0).toUpperCase() + last.slice(1);
}

/** URL path (within a patch) of the page a guide opens on: its root index, else its first section. */
export function guideEntry(patch: PatchView, guide: string): string | undefined {
  const inGuide = patch.sections.filter((s) => s.id.startsWith(`${guide}/`));
  const root = inGuide.find((s) => s.id === `${guide}/index`);
  const first = root ?? [...inGuide].sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))[0];
  return first && sectionPath(first.id);
}
