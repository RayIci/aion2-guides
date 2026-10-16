import { describe, expect, it } from 'vitest';
import { buildContent } from '../content-core';
import { makeContent, patch, section, source } from '../../tests/helpers/content';
import { changelogGroups, patchTargets } from './patches';

const chain = {
  'sources/n.yaml': source('n', { type: 'official' }),
  'patches/1.0/patch.md': patch('1.0', { status: 'superseded', released: '2026-01-01' }),
  'patches/1.0/sections/classes/gladiator/index.md': section({ title: 'Gladiator' }),
  'patches/1.0/sections/classes/gladiator/a.md': section({ title: 'A' }, 'a1'),
  'patches/1.0/sections/classes/gladiator/old.md': section({ title: 'Old' }, 'o1'),
  'patches/1.1/patch.md': patch('1.1', { parent: '1.0', released: '2026-02-01' }),
  'patches/1.1/sections/classes/gladiator/old.md': section({ removed: true, change: { game_change: 'Gone', reason: 'Removed' } }),
  'patches/1.1/sections/classes/gladiator/new.md': section({ title: 'New', change: { game_change: 'Added', reason: 'New mode', sources: ['n'] } }, 'n1'),
  'patches/1.2/patch.md': patch('1.2', { parent: '1.1', status: 'staged' }),
};

describe('patchTargets', () => {
  it('keeps the section where it exists and falls back to the guide entry', async () => {
    const g = await buildContent(await makeContent(chain));
    expect(patchTargets(g, 'classes/gladiator/new').map((t) => [t.id, t.href])).toEqual([
      ['1.2', '/1.2/classes/gladiator/new'],
      ['1.1', '/1.1/classes/gladiator/new'],
      ['1.0', '/1.0/classes/gladiator'],
    ]);
    expect(patchTargets(g, 'classes/gladiator/old').map((t) => t.href)).toEqual([
      '/1.2/classes/gladiator',
      '/1.1/classes/gladiator',
      '/1.0/classes/gladiator/old',
    ]);
    expect(patchTargets(g).map((t) => t.href)).toEqual(['/1.2', '/1.1', '/1.0']);
  });
});

describe('changelogGroups', () => {
  it('groups by guide and links removals to the parent patch', async () => {
    const g = await buildContent(await makeContent(chain));
    const p11 = g.patches.find((p) => p.meta.id === '1.1')!;
    const [group] = changelogGroups(g, p11);
    expect(group.title).toBe('Gladiator');
    expect(group.entries.map((e) => [e.kind, e.href])).toEqual([
      ['added', '/1.1/classes/gladiator/new'],
      ['removed', '/1.0/classes/gladiator/old'],
    ]);
  });
});
