import { describe, expect, it } from 'vitest';
import { buildContent } from '../content-core';
import { makeContent, patch, section } from '../../tests/helpers/content';
import { playModel } from './play';

const play = (text: string) => `:::play\n${text}\n:::`;

describe('playModel', () => {
  it('groups play content into stages, modes and always-shown items', async () => {
    const g = await buildContent(
      await makeContent({
        'patches/1.0/patch.md': patch('1.0'),
        'patches/1.0/sections/classes/gladiator/leveling/lv-10-22.md': section({ title: 'Lv 10–22', order: 2 }, play('ten')),
        'patches/1.0/sections/classes/gladiator/leveling/lv-01-05.md': section({ title: 'Lv 1–5', order: 1 }, play('one')),
        'patches/1.0/sections/classes/gladiator/endgame/early.md': section({ title: 'Early endgame', order: 1 }, play('early')),
        'patches/1.0/sections/classes/gladiator/pve/rotation.md': section({ title: 'PvE rotation', play: true }, 'rot'),
        'patches/1.0/sections/classes/gladiator/pvp/abyss/rotation.md': section({ title: 'Abyss rotation' }, play('abyss')),
        'patches/1.0/sections/classes/gladiator/pvp/fundamentals.md': section({ title: 'PvP basics' }, play('cc')),
        'patches/1.0/sections/classes/gladiator/systems/macros.md': section({ title: 'Macros' }, play('m')),
        'patches/1.0/sections/classes/gladiator/overview.md': section({ title: 'Overview' }, 'no play here'),
        'patches/1.0/sections/classes/assassin/pve/rotation.md': section({ title: 'Other class', play: true }, 'x'),
      }),
    );
    const m = playModel(g.defaultPatch!, 'classes/gladiator', (p) => p);
    expect(m.stages.map((s) => [s.key, s.label])).toEqual([
      ['leveling/lv-01-05', 'Lv 1–5'],
      ['leveling/lv-10-22', 'Lv 10–22'],
      ['endgame/early', 'Early endgame'],
    ]);
    expect(m.modes.map((s) => [s.key, s.label])).toEqual([
      ['pve', 'PvE'],
      ['pvp/abyss', 'Abyss'],
    ]);
    expect(m.general.items.map((i) => i.title).sort()).toEqual(['Macros', 'PvP basics']);
    expect(m.modes[0].items[0]).toMatchObject({ title: 'PvE rotation', href: '/1.0/classes/gladiator/pve/rotation' });
  });
});
