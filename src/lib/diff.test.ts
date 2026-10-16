import { describe, expect, it } from 'vitest';
import { diffStats, hunks, lineDiff } from './diff';

describe('lineDiff / hunks', () => {
  it('marks added and removed lines and keeps two lines of context', () => {
    const before = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].join('\n');
    const after = ['a', 'b', 'c', 'd', 'E', 'f', 'g', 'h'].join('\n');
    const lines = lineDiff(before, after);
    expect(diffStats(lines)).toEqual({ added: 1, removed: 1 });
    const [h] = hunks(lines);
    expect(h.map((l) => `${l.kind[0]}${l.text}`)).toEqual(['sc', 'sd', 'de', 'aE', 'sf', 'sg']);
  });

  it('splits far-apart changes into separate hunks', () => {
    const before = Array.from({ length: 20 }, (_, i) => `l${i}`).join('\n');
    const after = before.replace('l1\n', 'L1\n').replace('l18', 'L18');
    expect(hunks(lineDiff(before, after))).toHaveLength(2);
  });

  it('treats a new section as all added', () => {
    const lines = lineDiff('', 'x\ny');
    expect(lines.map((l) => `${l.kind[0]}${l.text}`)).toEqual(['ax', 'ay']);
  });
});
