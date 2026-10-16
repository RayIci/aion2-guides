import { describe, expect, it } from 'vitest';
import { buildNav, guidesIn, label } from './nav';

const s = (id: string, order = 0, title = id.split('/').at(-1)!) => ({ id, title, order });

describe('buildNav', () => {
  it('nests sections by folder, uses index as the folder page, and sorts by order', () => {
    const tree = buildNav(
      [
        s('classes/gladiator/overview', 10, 'Overview'),
        s('classes/gladiator/systems/index', 20, 'Systems'),
        s('classes/gladiator/systems/skills/whirlwind', 0, 'Whirlwind'),
        s('classes/gladiator/systems/stats', 5, 'Stats'),
        s('classes/assassin/overview'),
      ],
      'classes/gladiator',
    );
    expect(tree.children.map(label)).toEqual(['Overview', 'Systems']);
    const systems = tree.children[1];
    expect(systems.section?.id).toBe('classes/gladiator/systems/index');
    expect(systems.children.map(label)).toEqual(['Stats', 'Skills']);
    expect(systems.children[1].children.map(label)).toEqual(['Whirlwind']);
  });

  it('lists distinct guides', () => {
    expect(guidesIn([s('classes/gladiator/a'), s('world/maps/x'), s('classes/assassin/b'), s('classes/gladiator/c')])).toEqual([
      'classes/assassin',
      'classes/gladiator',
      'world',
    ]);
  });
});
