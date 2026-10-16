import { diffLines } from 'diff';

// Line diffs of section Markdown, grouped into hunks with a little context. Runs at build time
// (changelog) and in the browser (compare page), so it stays dependency-light and pure.

export type DiffLine = { kind: 'same' | 'add' | 'del'; text: string };
export type Hunk = DiffLine[];

export function lineDiff(before: string, after: string): DiffLine[] {
  const lines: DiffLine[] = [];
  const norm = (s: string) => (s.trim() ? s.trim() + '\n' : '');
  for (const part of diffLines(norm(before), norm(after))) {
    const kind = part.added ? 'add' : part.removed ? 'del' : 'same';
    for (const text of part.value.replace(/\n$/, '').split('\n')) lines.push({ kind, text });
  }
  return lines;
}

/** Changed lines with `context` unchanged lines around them; unchanged stretches in between are dropped. */
export function hunks(lines: DiffLine[], context = 2): Hunk[] {
  const keep = lines.map(() => false);
  lines.forEach((l, i) => {
    if (l.kind === 'same') return;
    for (let j = Math.max(0, i - context); j <= Math.min(lines.length - 1, i + context); j++) keep[j] = true;
  });
  const out: Hunk[] = [];
  let current: Hunk | undefined;
  lines.forEach((l, i) => {
    if (!keep[i]) {
      current = undefined;
      return;
    }
    if (!current) out.push((current = []));
    current.push(l);
  });
  return out;
}

export function diffStats(lines: DiffLine[]): { added: number; removed: number } {
  return {
    added: lines.filter((l) => l.kind === 'add').length,
    removed: lines.filter((l) => l.kind === 'del').length,
  };
}
