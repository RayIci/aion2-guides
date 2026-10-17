// Scrape aion2-meta.com class guides: Daevanion node order per board and the in-game macro text. Usage: node scripts/media/scrape-meta-boards.mjs out.json
import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const out = {};
const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1400, height: 1400 } })).newPage();
for (const c of ['gladiator', 'assassin']) {
  await p.goto(`https://aion2-meta.com/guides/${c}/`, { waitUntil: 'networkidle' });
  out[c] = await p.evaluate(() => {
    const boards = {};
    const sec = document.getElementById('daevanion');
    const names = [...sec.querySelectorAll('.dv-tab')].map((t) => t.childNodes[0].textContent.trim());
    sec.querySelectorAll('.dv-board').forEach((bd, bi) => {
      const svg = bd.querySelector('svg');
      const nodes = [...svg.querySelectorAll('g.n')].map((g) => {
        const [x, y] = g.getAttribute('transform').match(/translate\(([\d.]+) ([\d.]+)\)/).slice(1).map(Number);
        const t = g.getAttribute('data-tip-title') ?? '';
        const m = g.getAttribute('data-tip-meta') ?? '';
        return { col: Math.round((x - 24) / 48), row: Math.round((y - 24) / 48), order: Number((t.match(/#(\d+)/) || [])[1]), name: t.replace(/^#\d+ · /, ''), tip: g.getAttribute('data-tip'), cost: Number((m.match(/(\d+) crystals?/) || [])[1]), share: (m.match(/(\d+%) of top/) || [])[1], icon: g.querySelector('image')?.getAttribute('href') };
      });
      const small = bd.querySelector('.dv-small')?.textContent.trim();
      const def = bd.querySelector('input[type=range]')?.getAttribute('value');
      boards[names[bi]] = { nodes, note: small, defaultSpent: Number(def), max: Number(bd.querySelector('input[type=range]')?.getAttribute('max')) };
    });
    const macro = document.getElementById('macro')?.closest('section')?.innerText ?? document.getElementById('macro')?.parentElement?.innerText;
    return { boards, macro };
  });
  console.log(c, Object.entries(out[c].boards).map(([k, v]) => `${k}:${v.nodes.length} nodes, default ${v.defaultSpent}/${v.max}`).join(' | '));
}
await writeFile(process.argv[2], JSON.stringify(out, null, 1));
await b.close();
