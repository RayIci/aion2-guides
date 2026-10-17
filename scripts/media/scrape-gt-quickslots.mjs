// Scrape gaming.tools PvE build quick-slot layouts per preset (key, rows, macro or by hand). Usage: node scripts/media/scrape-gt-quickslots.mjs out.json
import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const out = {};
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1400, height: 1200 }, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36' })).newPage();
for (const cls of ['gladiator', 'assassin']) {
  await p.goto(`https://aion2.gaming.tools/builds/${cls}/pve`, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(7000);
  await p.getByRole('button', { name: 'Accept' }).click().catch(() => {});
  for (const preset of ['PvE Solo Farm', 'PvE Solo Single Target', 'PvE Group - DPS']) {
    await p.locator('button', { hasText: new RegExp(`^\\s*\\d?\\s*${preset.replace(/[-]/g, '\\-')}\\s*$`) }).first().click().catch((e) => console.log('click fail', preset, e.message.slice(0, 80)));
    await p.waitForTimeout(1500);
    const data = await p.evaluate(() => {
      const sec = [...document.querySelectorAll('section')].find((s) => s.querySelector('header')?.textContent.trim().startsWith('Quick Slots'));
      const presetTitle = [...document.querySelectorAll('section header')].map((h) => h.textContent.trim()).find((t) => t.startsWith('Preset'));
      if (!sec) return null;
      const slots = [...sec.querySelectorAll('button[aria-label]')].map((x) => x.getAttribute('aria-label'));
      const keys = [...sec.querySelectorAll('div[title^="Quick Use"]')].map((d) => ({ title: d.title, mode: /amber/.test(d.className) ? 'hand' : /sky/.test(d.className) ? 'macro' : 'empty' }));
      const notes = [...sec.querySelectorAll('p')].map((x) => x.textContent.trim());
      return { presetTitle, slots, keys, notes };
    });
    out[`${cls}:${preset}`] = data;
    console.log(cls, preset, data?.presetTitle, data?.slots.length);
  }
}
await writeFile(process.argv[2], JSON.stringify(out, null, 1));
await b.close();
