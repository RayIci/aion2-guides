// Scrape gaming.tools build pages: every Daevanion node (label, state, order) for the PvE build and leveling brackets. Usage: node scripts/media/scrape-gt-boards.mjs out.json
import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const out = {};
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1400, height: 1400 }, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36' })).newPage();
const grab = () => p.evaluate(() => {
  const boards = {};
  for (const g of document.querySelectorAll('[aria-label$=" board"]')) {
    const name = g.getAttribute('aria-label').replace(/ board$/, '');
    const head = g.parentElement?.parentElement?.textContent ?? '';
    const cells = [...g.children].map((k, i) => {
      if (k.tagName !== 'BUTTON') return { i, empty: !k.querySelector('img'), center: !!k.querySelector('img') };
      const cls = k.className;
      const nums = [...k.querySelectorAll('span')].map((s) => s.textContent.trim()).filter((t) => /^\d+$/.test(t));
      return { i, label: k.getAttribute('aria-label'), state: /ring-amber/.test(cls) ? 'now' : /ring-sky|ring-cyan|ring-blue/.test(cls) ? 'later' : '', order: nums[0] ? Number(nums[0]) : undefined, icon: (k.querySelector('img')?.getAttribute('src') ?? '').split('/').pop().split('?')[0] };
    });
    boards[name] = { cells, open: (head.match(/(\d+) to open/) || [])[1] };
  }
  const notes = [...document.querySelectorAll('section')].find((s) => s.querySelector('header')?.textContent.trim().startsWith('Daevanion'))?.innerText.split('\n').filter((l) => /^Save|^Keep|points/.test(l)) ?? [];
  return { boards, notes };
});
for (const cls of ['gladiator', 'assassin']) {
  await p.goto(`https://aion2.gaming.tools/builds/${cls}/pve`, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(7000);
  await p.getByRole('button', { name: 'Accept' }).click().catch(() => {});
  out[`${cls}:pve`] = await grab();
  await p.goto(`https://aion2.gaming.tools/builds/${cls}/leveling`, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(7000);
  const slider = p.locator('input[type=range]').first();
  for (const lv of [22, 27, 32, 37, 45]) {
    await slider.evaluate((el, v) => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, String(v)); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }, lv);
    await p.waitForTimeout(1500);
    out[`${cls}:leveling-${lv}`] = await grab();
  }
  console.log(cls, Object.keys(out).filter((k) => k.startsWith(cls)).map((k) => k + ':' + Object.keys(out[k].boards).join('/')).join(' '));
}
await writeFile(process.argv[2], JSON.stringify(out));
await b.close();
