import { guideOf } from '../content-core';

// Navigation tree for one guide, built from section ids and `order`.

export interface NavSection {
  id: string;
  title: string;
  order: number;
  changedHere?: boolean;
}

export interface NavNode {
  /** Folder or section name (last id segment). */
  name: string;
  /** Section shown for this node: the section itself, or the folder's `index`. */
  section?: NavSection;
  children: NavNode[];
}

export function buildNav(sections: NavSection[], guide: string): NavNode {
  const root: NavNode = { name: guide, children: [] };
  for (const s of sections.filter((x) => guideOf(x.id) === guide)) {
    const rest = s.id.slice(guide.length + 1).split('/').filter(Boolean);
    if (rest.length === 0) {
      root.section = s;
      continue;
    }
    let node = root;
    for (const part of rest) {
      if (part === 'index') break;
      let child = node.children.find((c) => c.name === part);
      if (!child) node.children.push((child = { name: part, children: [] }));
      node = child;
    }
    node.section = s;
  }
  sortTree(root);
  return root;
}

function sortTree(node: NavNode) {
  const key = (n: NavNode) => n.section?.order ?? Number.MAX_SAFE_INTEGER;
  node.children.sort((a, b) => key(a) - key(b) || label(a).localeCompare(label(b)));
  node.children.forEach(sortTree);
}

export function label(node: NavNode): string {
  return node.section?.title ?? node.name.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

/** Distinct guides present in a patch, e.g. `classes/gladiator`, `world`. */
export function guidesIn(sections: { id: string }[]): string[] {
  return [...new Set(sections.map((s) => guideOf(s.id)))].sort();
}
