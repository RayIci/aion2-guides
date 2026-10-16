import type { PatchView } from '../content-core';
import { sectionPath } from './content';
import { label as navLabel } from './nav';

// Playing mode: a guide's `:::play` content, grouped so the player can pick a stage
// (Level bracket or Endgame tier) and a Mode (PvE or one PvP mode).

export interface PlayItem {
  id: string;
  title: string;
  href: string;
  blocks: string[];
}

export interface PlayGroup {
  key: string;
  label: string;
  order: number;
  items: PlayItem[];
}

export interface PlayModel {
  /** Shown for every choice (systems, skills, general PvP pages…). */
  general: PlayGroup;
  stages: PlayGroup[];
  modes: PlayGroup[];
}

const PVP_SHARED = new Set(['fundamentals', 'matchups', 'index']);

function classify(rel: string[]): { kind: 'stage' | 'mode' | 'general'; key: string } {
  const [top, second] = rel;
  if ((top === 'leveling' || top === 'endgame') && second && second !== 'index') return { kind: 'stage', key: `${top}/${second}` };
  if (top === 'pve') return { kind: 'mode', key: 'pve' };
  if (top === 'pvp' && second && !PVP_SHARED.has(second)) return { kind: 'mode', key: `pvp/${second}` };
  return { kind: 'general', key: 'general' };
}

const MODE_LABELS: Record<string, string> = { pve: 'PvE' };

export function playModel(patch: PatchView, guide: string, hrefFor: (path: string) => string): PlayModel {
  const general: PlayGroup = { key: 'general', label: 'Always', order: 0, items: [] };
  const stages = new Map<string, PlayGroup>();
  const modes = new Map<string, PlayGroup>();
  const byId = new Map(patch.sections.map((s) => [s.id, s]));

  const titleOf = (key: string) => {
    const s = byId.get(`${guide}/${key}`) ?? byId.get(`${guide}/${key}/index`);
    if (s) return s.title;
    const last = key.split('/').at(-1)!;
    return MODE_LABELS[key] ?? navLabel({ name: last, children: [] });
  };
  const orderOf = (key: string) => (byId.get(`${guide}/${key}`) ?? byId.get(`${guide}/${key}/index`))?.order ?? Number.MAX_SAFE_INTEGER;

  for (const s of patch.sections) {
    if (!s.id.startsWith(`${guide}/`) || s.playBlocks.length === 0) continue;
    const { kind, key } = classify(s.id.slice(guide.length + 1).split('/'));
    const map = kind === 'stage' ? stages : kind === 'mode' ? modes : undefined;
    let group = map?.get(key) ?? general;
    if (map && !map.has(key)) map.set(key, (group = { key, label: titleOf(key), order: orderOf(key), items: [] }));
    group.items.push({ id: s.id, title: s.title, href: hrefFor(`/${patch.meta.id}/${sectionPath(s.id)}`), blocks: s.playBlocks });
  }

  const sorted = (m: Map<string, PlayGroup>) =>
    [...m.values()].sort((a, b) => a.order - b.order || a.key.localeCompare(b.key, undefined, { numeric: true }));
  // Leveling before endgame, then by order/key.
  const stageList = sorted(stages).sort((a, b) => Number(a.key.startsWith('endgame')) - Number(b.key.startsWith('endgame')));
  return { general, stages: stageList, modes: sorted(modes) };
}
