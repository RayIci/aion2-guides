import { describe, expect, it } from 'vitest';
import { makeContent, patch, section, source } from '../../tests/helpers/content';
import { buildContent } from './index';

const researched = (title: string, extra: Record<string, unknown> = {}) => ({ title, status: 'researched', last_checked: '2026-10-17', ...extra });

const MEDIA = {
  'media/meta.json': JSON.stringify({ itemSource: 'db', mapSource: 'map' }),
  'media/daevanion.json': JSON.stringify({
    gladiator: {
      boards: { Nezekan: { size: 3, opens: 12, crystals: 6, nodes: [
        { r: 1, c: 1, name: 'Nezekan', tip: 'Start', cost: null, type: 'start' },
        { r: 0, c: 1, name: 'Attack', tip: 'Attack +3', cost: 1, type: 'common' },
        { r: 1, c: 2, name: 'Keen Strike', tip: 'Keen Strike +1', cost: 3, type: 'legend' },
      ] } },
      plans: {
        gamingtools: { source: 'db', title: 'Plan A', budget: 4, now: { Nezekan: [[0, 1]] }, later: { Nezekan: [[1, 2]] }, notes: [] },
        aion2meta: { source: 'map', title: 'Plan B', order: { Nezekan: { '0,1': 1, '1,2': 2 } }, shares: { Nezekan: { '0,1': '90%', '1,2': '80%' } }, defaults: { Nezekan: 1 } },
      },
    },
  }),
  'media/icons.json': JSON.stringify({
    items: { 'Raw Leather': 'leather', 'Strong Leather': 'strong' },
    skills: { assassin: { Defiance: 'as-def' }, gladiator: { Defiance: 'gl-def', 'Keen Strike': 'keen' } },
    nodes: {},
    npcs: { 'Hill Tog': 'tog' },
    classes: { Gladiator: 'glad' },
  }),
  'media/items.json': JSON.stringify({
    'Raw Leather': {
      id: '1', url: 'https://example.test/items/1', icon: 'leather', grade: 'Common', category: 'materials / craftresource', tradable: true,
      drops: [{ npc: 'Hill Tog', id: '9', min: 36, max: 39, chance: 5.8, places: ['Kraka Footpath, Verteron'], spawns: { '1010': 144 } }],
      gathers: [], dungeons: [], shops: [], recipes: [], usedIn: ['Strong Leather'],
    },
  }),
  'media/maps.json': JSON.stringify({ '1010': { name: 'Verteron', slug: 'verteron', img: 'img/maps/verteron.webp', width: 100, height: 80, url: 'https://example.test/maps/1010', subzones: [{ name: 'Kraka Footpath', x: 10, y: 10 }] } }),
  'media/overlays.json': JSON.stringify({
    'raw-leather-verteron': { map: '1010', mapName: 'Verteron', title: 'Hill Tog spawns', img: 'img/maps/o/x.webp', width: 100, height: 80, points: [[5, 5], [6, 7]], areas: [{ label: 'Best spot', x: 5, y: 6, r: 4, count: 2, zone: 'Kraka Footpath' }], route: [[5, 5], [6, 7], [5, 5]] },
  }),
  'sources/db.yaml': source('db', { type: 'data' }),
  'sources/map.yaml': source('map', { type: 'data' }),
  'patches/1.0/patch.md': patch('1.0'),
};

async function build(files: Record<string, string>) {
  return buildContent(await makeContent({ ...MEDIA, ...files }), { assetBase: '/base/' });
}
const errorsOf = (g: Awaited<ReturnType<typeof build>>) => g.errors.map((e) => `${e.file}: ${e.message}`);
const html = (g: Awaited<ReturnType<typeof build>>, id: string) => g.defaultPatch!.sections.find((s) => s.id === id)!.html;

describe('game media blocks', () => {
  it('renders quick steps, details, cards, maps and inline items, and links names to their pages', async () => {
    const g = await build({
      'patches/1.0/sections/world/materials/raw-leather.md': section(researched('Raw Leather'), 'Kill things [@db].'),
      'patches/1.0/sections/world/materials/strong-leather.md': section(
        researched('Strong Leather'),
        [':::quick', '1. Farm :item[Raw Leather] [@db].', ':::', '', '::items{names="Raw Leather"}', '', '::map{id=raw-leather-verteron}', '', ':::details{summary="Inputs"}', '- Raw Leather ×2', ':::'].join('\n'),
      ),
    });
    expect(errorsOf(g)).toEqual([]);
    const h = html(g, 'world/materials/strong-leather');
    expect(h).toContain('class="quick play-block"');
    expect(h).toContain('<details class="more"><summary>Inputs</summary>');
    expect(h).toContain('src="/base/img/icons/leather.webp"');
    expect(h).toContain('href="/base/world/materials/raw-leather"');
    expect(h).toContain('Drops from Hill Tog (level 36–39) in Kraka Footpath, Verteron: 5.8% per kill');
    expect(h).toContain('class="gmap"');
    expect(h).toContain('src="/base/img/maps/o/x.webp"');
    // Card and map each count as a claim citing the media sources.
    const s = g.defaultPatch!.sections.find((x) => x.id === 'world/materials/strong-leather')!;
    expect(s.sources.map((x) => x.id)).toEqual(['db', 'map']);
    // The list item "Raw Leather ×2" got an icon and a link, keeping the quantity.
    expect(h).toMatch(/<li><a href="\/base\/world\/materials\/raw-leather" class="gi-link"><img[^>]*leather\.webp[^>]*>Raw Leather<\/a> ×2<\/li>/);
    // A page does not link to itself.
    expect(html(g, 'world/materials/raw-leather')).not.toContain('href="/base/world/materials/raw-leather"');
  });

  it('prefers the section class for skill icons and draws loadouts', async () => {
    const g = await build({
      'patches/1.0/sections/classes/gladiator/pve/rotation.md': section(
        researched('Rotation'),
        ['**Defiance** breaks Stun [@db].', '', '| Skill |', '|---|', '| Keen Strike |', '', '::loadout{class="Gladiator" items="Weapon=Strong Leather"}'].join('\n'),
      ),
    });
    expect(errorsOf(g)).toEqual([]);
    const h = html(g, 'classes/gladiator/pve/rotation');
    expect(h).toContain('gl-def.webp');
    expect(h).not.toContain('as-def.webp');
    expect(h).toContain('keen.webp');
    expect(h).toContain('class="loadout"');
    expect(h).toContain('glad.webp');
  });

  it('draws the skill bar with priorities, modes and its own citation', async () => {
    const g = await build({
      'patches/1.0/sections/classes/gladiator/setup.md': section(
        researched('Setup'),
        ['## 1. Your skill bar', '', '::skillbar{title="Preset 1" keys="5=Keen Strike,Defiance/macro; E=Defiance/hand; RMB=Macro" cite="@db"}'].join('\n'),
      ),
    });
    expect(errorsOf(g)).toEqual([]);
    const h = html(g, 'classes/gladiator/setup');
    expect(h).toContain('<h2 id="1-your-skill-bar">');
    expect(h).toContain('sb-key sb-key--macro');
    expect(h).toContain('sb-key sb-key--hand');
    expect(h).toContain('sb-key sb-key--macro-key');
    // Bottom-first in the list, top-first in the picture.
    expect(h).toMatch(/tries <strong>Keen Strike<\/strong>, then <strong>Defiance<\/strong>/);
    expect(h.indexOf('alt="Defiance"')).toBeLessThan(h.indexOf('alt="Keen Strike"'));
    expect(g.defaultPatch!.sections[0].sources.map((s) => s.id)).toEqual(['db']);
  });

  it('draws Daevanion boards with a plan highlighted, or an order numbered within a budget', async () => {
    const g = await build({
      'patches/1.0/sections/classes/gladiator/setup/daevanion.md': section(
        researched('Daevanion'),
        ['::daevanion{class="gladiator" plan="gamingtools" boards="Nezekan"}', '', '::daevanion{class="gladiator" plan="aion2meta" boards="Nezekan" budget="Nezekan=4"}'].join('\n'),
      ),
    });
    expect(errorsOf(g)).toEqual([]);
    const h = html(g, 'classes/gladiator/setup/daevanion');
    expect(h).toContain('dv-n dv-n--common dv-n--now');
    expect(h).toContain('dv-n dv-n--legend dv-n--later');
    // Plan B with a 4-point budget takes both nodes (1 + 3 points) and numbers them.
    expect((h.match(/dv-n--now/g) ?? []).length).toBe(3);
    expect(h).toContain('<b>2</b>');
    expect(h).toContain('#2 Keen Strike +1 (3 pt, 80% of top players)');
  });

  it('reports unknown names and map ids', async () => {
    const g = await build({
      'patches/1.0/sections/world/x.md': section(researched('X'), ['Text [@db].', '', '::items{names="Nope"}', '', '::map{id=missing}', '', ':item[Ghost]'].join('\n')),
    });
    const errors = errorsOf(g).join('\n');
    expect(errors).toContain('::items: "Nope"');
    expect(errors).toContain('::map: unknown overlay id "missing"');
    expect(errors).toContain(':item[Ghost]');
  });

  it('builds without media (tests and demo content have none)', async () => {
    const g = await buildContent(
      await makeContent({ 'patches/1.0/patch.md': patch('1.0'), 'patches/1.0/sections/a.md': section(researched('A'), ':::quick\n1. Do it [!opinion].\n:::') }),
    );
    expect(g.errors).toEqual([]);
    expect(g.defaultPatch!.sections[0].html).toContain('Quick steps');
  });
});
