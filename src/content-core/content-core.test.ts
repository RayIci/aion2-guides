import { describe, expect, it } from 'vitest';
import { makeContent, patch, section, source } from '../../tests/helpers/content';
import { buildContent } from './index';

const researched = (title: string, extra: Record<string, unknown> = {}) => ({
  title,
  status: 'researched',
  last_checked: '2026-10-16',
  ...extra,
});

async function build(files: Record<string, string>) {
  return buildContent(await makeContent(files));
}

const errorsOf = (g: Awaited<ReturnType<typeof build>>) => g.errors.map((e) => `${e.file}: ${e.message}`);

describe('baseline-only guide', () => {
  it('resolves every section with rendered citations and numbered sources', async () => {
    const g = await build({
      'sources/notes-1-0.yaml': source('notes-1-0', { type: 'official' }),
      'sources/forum-a.yaml': source('forum-a'),
      'patches/1.0/patch.md': patch('1.0', { notes: ['notes-1-0'] }),
      'patches/1.0/sections/classes/gladiator/overview.md': section(
        researched('Overview', { sources: ['forum-a'] }),
        'Rage builds on hit [@notes-1-0]. Guides prefer two-handers [@forum-a].',
      ),
    });
    expect(errorsOf(g)).toEqual([]);
    expect(g.defaultPatch?.meta.id).toBe('1.0');
    const [s] = g.defaultPatch!.sections;
    expect(s.id).toBe('classes/gladiator/overview');
    expect(s.originPatch).toBe('1.0');
    expect(s.sources.map((x) => x.id)).toEqual(['notes-1-0', 'forum-a']);
    expect(s.claims.map((c) => c.confidence)).toEqual(['verified', 'community']);
    expect(s.sectionConfidence).toBe('community');
    expect(s.html).toContain('class="cite cite--verified"');
    expect(s.html).toContain('href="#src-1"');
    expect(s.html).toContain('href="#src-2"');
    expect(s.html).not.toContain('[@');
    expect(g.defaultPatch!.officialNotes.map((x) => x.id)).toEqual(['notes-1-0']);
  });
});

describe('patch chain with overrides and a removal', () => {
  const files = {
    'sources/notes-1-1.yaml': source('notes-1-1', { type: 'official' }),
    'patches/1.0/patch.md': patch('1.0', { status: 'superseded', released: '2026-01-01' }),
    'patches/1.0/sections/classes/gladiator/a.md': section({ title: 'A v1' }, 'a1'),
    'patches/1.0/sections/classes/gladiator/b.md': section({ title: 'B' }, 'b1'),
    'patches/1.0/sections/classes/gladiator/c.md': section({ title: 'C' }, 'c1'),
    'patches/1.1/patch.md': patch('1.1', { parent: '1.0', status: 'superseded', released: '2026-02-01' }),
    'patches/1.1/sections/classes/gladiator/a.md': section(
      { title: 'A v2', change: { game_change: 'Skill X nerfed', reason: 'Rotation changed', sources: ['notes-1-1'] } },
      'a2',
    ),
    'patches/1.1/sections/classes/gladiator/c.md': section(
      { removed: true, change: { game_change: 'C removed from game', reason: 'Gone' } },
    ),
    'patches/1.2/patch.md': patch('1.2', { parent: '1.1', status: 'live', released: '2026-03-01' }),
    'patches/1.2/sections/classes/gladiator/d.md': section(
      { title: 'D', change: { game_change: 'New mode', reason: 'New section' } },
      'd1',
    ),
    'patches/1.3/patch.md': patch('1.3', { parent: '1.2', status: 'staged' }),
  };

  it('resolves each patch from the nearest copy of each section', async () => {
    const g = await build(files);
    expect(errorsOf(g)).toEqual([]);
    expect(g.patches.map((p) => p.meta.id)).toEqual(['1.0', '1.1', '1.2', '1.3']);
    const view = (id: string) => g.patches.find((p) => p.meta.id === id)!;
    const summary = (id: string) => view(id).sections.map((s) => `${s.id.split('/').at(-1)}@${s.originPatch}${s.changedHere ? '*' : ''}`);

    expect(summary('1.0')).toEqual(['a@1.0*', 'b@1.0*', 'c@1.0*']);
    expect(summary('1.1')).toEqual(['a@1.1*', 'b@1.0']);
    expect(summary('1.2')).toEqual(['a@1.1', 'b@1.0', 'd@1.2*']);
    expect(summary('1.3')).toEqual(['a@1.1', 'b@1.0', 'd@1.2']);
    expect(view('1.1').sections[0].html).toContain('a2');
  });

  it('builds changelogs with kind, game change, reason and sources', async () => {
    const g = await build(files);
    const log = (id: string) => g.patches.find((p) => p.meta.id === id)!.changelog;
    expect(log('1.0')).toEqual([]);
    expect(log('1.1').map((e) => [e.sectionId.split('/').at(-1), e.kind])).toEqual([
      ['a', 'changed'],
      ['c', 'removed'],
    ]);
    expect(log('1.1')[0]).toMatchObject({ title: 'A v2', gameChange: 'Skill X nerfed', reason: 'Rotation changed' });
    expect(log('1.1')[0].sources.map((s) => s.id)).toEqual(['notes-1-1']);
    expect(log('1.1')[1].title).toBe('C');
    expect(log('1.2').map((e) => e.kind)).toEqual(['added']);
  });

  it('defaults to the live patch, never a staged one', async () => {
    expect((await build(files)).defaultPatch?.meta.id).toBe('1.2');
    const noLive = { ...files, 'patches/1.2/patch.md': patch('1.2', { parent: '1.1', status: 'superseded' }) };
    expect((await build(noLive)).defaultPatch?.meta.id).toBe('1.2');
  });
});

describe('patch overview', () => {
  it('renders citations in the overview and validates them', async () => {
    const files = {
      'sources/n.yaml': source('n', { type: 'official' }),
      'patches/1.0/patch.md': patch('1.0').replace('Overview of 1.0.', 'Abyss time is 7 h [@n]. Typo [@missing].'),
    };
    const g = await build(files);
    expect(g.defaultPatch!.overviewHtml).toContain('cite--verified');
    expect(g.defaultPatch!.overviewSources.map((s) => s.id)).toEqual(['n']);
    expect(errorsOf(g).join('\n')).toMatch(/patches\/1.0\/patch.md: unknown source id "missing"/);
  });
});

describe('validation', () => {
  const base = {
    'patches/1.0/patch.md': patch('1.0'),
    'patches/1.0/sections/x.md': section({ title: 'X' }, 'x'),
  };

  it.each([
    ['two baselines', { 'patches/2.0/patch.md': patch('2.0', { status: 'superseded' }) }, /exactly one Baseline/],
    [
      'a cycle',
      {
        'patches/2.0/patch.md': patch('2.0', { parent: '3.0', status: 'superseded' }),
        'patches/3.0/patch.md': patch('3.0', { parent: '2.0', status: 'superseded' }),
      },
      /cycle or detached/,
    ],
    ['an unknown parent', { 'patches/2.0/patch.md': patch('2.0', { parent: '9.9', status: 'staged' }) }, /parent "9.9" does not exist/],
    ['two live patches', { 'patches/2.0/patch.md': patch('2.0', { parent: '1.0' }) }, /more than one live patch/],
    [
      'an override without a change reason',
      {
        'patches/2.0/patch.md': patch('2.0', { parent: '1.0', status: 'staged' }),
        'patches/2.0/sections/x.md': section({ title: 'X', change: { game_change: 'something' } }, 'x2'),
      },
      /missing change.reason/,
    ],
    [
      'an override without a game change',
      {
        'patches/2.0/patch.md': patch('2.0', { parent: '1.0', status: 'staged' }),
        'patches/2.0/sections/x.md': section({ title: 'X', change: { reason: 'why' } }, 'x2'),
      },
      /missing change.game_change/,
    ],
    [
      'a removal of a section no earlier patch has',
      {
        'patches/2.0/patch.md': patch('2.0', { parent: '1.0', status: 'staged' }),
        'patches/2.0/sections/ghost.md': section({ removed: true, change: { game_change: 'g', reason: 'r' } }),
      },
      /removal of "ghost"/,
    ],
    ['an unknown inline source id', { 'patches/1.0/sections/y.md': section({ title: 'Y' }, 'claim [@nope]') }, /unknown source id "nope"/],
    ['an unknown section-level source id', { 'patches/1.0/sections/y.md': section({ title: 'Y', sources: ['nope'] }) }, /sources: unknown source id "nope"/],
    ['an unknown official_notes id', { 'patches/1.0/patch.md': patch('1.0', { notes: ['nope'] }) }, /official_notes: unknown source id "nope"/],
    ['an unknown citation marker', { 'patches/1.0/sections/y.md': section({ title: 'Y' }, 'claim [!maybe]') }, /unknown citation marker "!maybe"/],
    ['a researched section with no citation', { 'patches/1.0/sections/y.md': section(researched('Y'), 'uncited claim') }, /needs at least one citation/],
    [
      'duplicate checklist ids',
      { 'patches/1.0/sections/y.md': section({ title: 'Y' }, ':::checklist\n- [ ] Reach level 10\n- [ ] Other {#reach-level-10}\n:::') },
      /duplicate checklist item id "reach-level-10"/,
    ],
    ['bad section frontmatter', { 'patches/1.0/sections/y.md': section({ title: 'Y', status: 'done' }) }, /status/],
    ['an invalid source file', { 'sources/bad.yaml': 'id: bad\ntitle: Bad\nurl: not-a-url' }, /url/],
  ])('reports %s', async (_name, extra, pattern) => {
    const g = await build({ ...base, ...extra });
    expect(errorsOf(g).join('\n')).toMatch(pattern);
  });

  it('accepts a researched section that only has an [!opinion] marker', async () => {
    const g = await build({ ...base, 'patches/1.0/sections/y.md': section(researched('Y'), 'My take [!opinion]') });
    expect(errorsOf(g)).toEqual([]);
  });
});

describe('confidence derivation', () => {
  const sources = {
    'sources/off.yaml': source('off', { type: 'official' }),
    'sources/db.yaml': source('db', { type: 'data' }),
    'sources/c1.yaml': source('c1', { type: 'creator', author: 'Alice' }),
    'sources/c2.yaml': source('c2', { type: 'community', author: 'Bob' }),
    'sources/c1-copy.yaml': source('c1-copy', { type: 'community', author: 'Carol', derived_from: ['c1'] }),
    'sources/c1-copy-copy.yaml': source('c1-copy-copy', { type: 'community', author: 'Dan', derived_from: ['c1-copy'] }),
    'sources/c1-same-author.yaml': source('c1-same-author', { type: 'community', author: 'alice' }),
    'sources/kr-off.yaml': source('kr-off', { type: 'official', region: 'kr' }),
    'sources/kr-a.yaml': source('kr-a', { region: 'kr', author: 'K1' }),
    'sources/kr-b.yaml': source('kr-b', { region: 'kr', author: 'K2' }),
  };

  it.each([
    ['[@off]', 'verified'],
    ['[@db]', 'verified'],
    ['[@c1; @c2]', 'verified'],
    ['[@c1]', 'community'],
    ['[@c1; @c1-copy]', 'community'],
    ['[@c1; @c1-copy-copy]', 'community'],
    ['[@c1; @c1-same-author]', 'community'],
    ['[@kr-off]', 'community'],
    ['[@kr-a; @kr-b]', 'community'],
    ['[@off; !community]', 'community'],
    ['[@c1; !verified]', 'community'],
    ['[@off; !unverified]', 'unverified'],
    ['[!opinion]', 'unverified'],
    ['[!unverified]', 'unverified'],
  ])('%s → %s', async (marker, expected) => {
    const g = await build({
      ...sources,
      'patches/1.0/patch.md': patch('1.0'),
      'patches/1.0/sections/s.md': section({ title: 'S' }, `A claim ${marker}.`),
    });
    expect(errorsOf(g)).toEqual([]);
    expect(g.defaultPatch!.sections[0].claims.map((c) => c.confidence)).toEqual([expected]);
  });
});

describe('coverage', () => {
  it('counts claims by confidence and drafts per guide', async () => {
    const g = await build({
      'sources/off.yaml': source('off', { type: 'official' }),
      'sources/c1.yaml': source('c1', { archived: false }),
      'patches/1.0/patch.md': patch('1.0'),
      'patches/1.0/sections/classes/gladiator/a.md': section(researched('A'), 'x [@off] y [@c1] z [!opinion]'),
      'patches/1.0/sections/classes/gladiator/b.md': section({ title: 'B', sources: ['off'] }, 'b'),
      'patches/1.0/sections/world/maps/m.md': section({ title: 'M' }, 'm'),
    });
    expect(g.defaultPatch!.coverage).toEqual([
      { guide: 'classes/gladiator', sections: 2, drafts: 1, claims: { verified: 2, community: 1, unverified: 1 } },
      { guide: 'world', sections: 1, drafts: 1, claims: { verified: 0, community: 0, unverified: 0 } },
    ]);
    expect(g.sourcesWithoutArchive.map((s) => s.id)).toEqual(['c1']);
  });
});

describe('blocks', () => {
  const render = async (body: string, extra: Record<string, string> = {}) => {
    const g = await build({
      'sources/a.yaml': source('a', { type: 'official' }),
      'sources/b.yaml': source('b'),
      ...extra,
      'patches/1.0/patch.md': patch('1.0'),
      'patches/1.0/sections/s.md': section({ title: 'S' }, body),
    });
    return { html: g.defaultPatch?.sections[0]?.html ?? '', errors: errorsOf(g) };
  };

  it('renders a conflict with each alternative keeping its own citations', async () => {
    const { html, errors } = await render(':::conflict{topic="Stat priority"}\n- Crit first [@a]\n- Accuracy first [@b]\n:::');
    expect(errors).toEqual([]);
    expect(html).toContain('<aside class="conflict" data-conflict="">');
    expect(html).toContain('Sources disagree: Stat priority');
    expect(html).toContain('cite--verified');
    expect(html).toContain('cite--community');
  });

  it('keeps macro text verbatim with a copy button', async () => {
    const { html, errors } = await render(':::macro{name="Burst"}\n/skill Keen Strike\n/wait 0.3\n\n/skill Rupture Strike\n:::');
    expect(errors).toEqual([]);
    expect(html).toContain('<figure class="macro" data-macro="Burst">');
    expect(html).toContain('<button type="button" class="macro__copy" data-copy-macro="">Copy</button>');
    expect(html).toContain('<code>/skill Keen Strike\n/wait 0.3\n\n/skill Rupture Strike\n</code>');
  });

  it('marks play blocks and checklists for the site to enhance', async () => {
    const { html } = await render(':::play\nOpener\n:::\n\n:::checklist{id="exit" title="Before Lv 10"}\n- [ ] Wings {#wings}\n:::');
    expect(html).toContain('<div class="play-block" data-play="">');
    expect(html).toContain('<div class="checklist" data-checklist="exit">');
    expect(html).toContain('Before Lv 10');
    expect(html).toContain('data-checklist-id="wings"');
  });

  it('exposes play blocks separately, or the whole body for play: true sections', async () => {
    const g = await build({
      'patches/1.0/patch.md': patch('1.0'),
      'patches/1.0/sections/a.md': section({ title: 'A' }, 'intro\n\n:::play\nOpener\n:::\n\nmore\n\n:::play\nBurst\n:::'),
      'patches/1.0/sections/b.md': section({ title: 'B', play: true }, 'all of it'),
    });
    const [a, b] = g.defaultPatch!.sections;
    expect(a.playBlocks).toHaveLength(2);
    expect(a.playBlocks[0]).toContain('Opener');
    expect(a.playBlocks[0]).not.toContain('intro');
    expect(b.playBlocks).toEqual([b.html]);
  });

  it('reports unknown blocks', async () => {
    const { errors } = await render(':::tip\nhello\n:::');
    expect(errors.join('\n')).toMatch(/unknown block ":::tip"/);
  });
});

describe('markdown', () => {
  it('flags claims backed only by KR/TW sources', async () => {
    const g = await build({
      'sources/kr.yaml': source('kr', { region: 'kr' }),
      'sources/gl.yaml': source('gl'),
      'patches/1.0/patch.md': patch('1.0'),
      'patches/1.0/sections/s.md': section({ title: 'S' }, 'a [@kr] b [@kr; @gl]'),
    });
    const html = g.defaultPatch!.sections[0].html;
    expect(html.match(/KR only/g)).toHaveLength(1);
  });

  it('leaves stray colon text alone and strips explicit checklist ids', async () => {
    const g = await build({
      'patches/1.0/patch.md': patch('1.0'),
      'patches/1.0/sections/s.md': section({ title: 'S' }, 'Note:this stays text.\n\n:::checklist\n- [ ] Weapon +5 {#weapon-5}\n:::'),
    });
    const html = g.defaultPatch!.sections[0].html;
    expect(html).toContain('Note:this stays text.');
    expect(html).toContain('data-checklist-id="weapon-5"');
    expect(html).not.toContain('{#weapon-5}');
  });
});
