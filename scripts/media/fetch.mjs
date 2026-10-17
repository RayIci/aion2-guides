// Download gaming.tools data files into .cache/gt through one headless browser session
// (the data CDN sits behind a Cloudflare check; icons do not).
// Usage: node scripts/media/fetch.mjs [--refresh] path...      e.g. data/en/items/610530011.d.json
//        node scripts/media/fetch.mjs [--refresh] --list file  (one path per line)
import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { CACHE, CDN, SITE, VERSION, cachePath, exists } from './gt.mjs';

export async function fetchPaths(paths, { refresh = false } = {}) {
  await mkdir(CACHE, { recursive: true });
  const todo = [];
  for (const p of new Set(paths)) if (refresh || !(await exists(cachePath(p)))) todo.push(p);
  if (!todo.length) return { done: 0, failed: [] };
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36',
  });
  const page = await ctx.newPage();
  await page.goto(`${SITE}/items`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(7000);
  let done = 0;
  const failed = [];
  for (let i = 0; i < todo.length; i += 6) {
    const batch = todo.slice(i, i + 6);
    const results = await page.evaluate(
      async ({ batch, CDN, VERSION }) =>
        Promise.all(
          batch.map(async (p) => {
            try {
              const r = await fetch(`${CDN}/${p}?version=${VERSION}`);
              if (!r.ok) return { p, status: r.status };
              const buf = new Uint8Array(await r.arrayBuffer());
              let s = '';
              for (let j = 0; j < buf.length; j += 32768) s += String.fromCharCode(...buf.subarray(j, j + 32768));
              return { p, status: 200, b64: btoa(s) };
            } catch {
              return { p, status: 0 };
            }
          }),
        ),
      { batch, CDN, VERSION },
    );
    for (const r of results) {
      if (r.status === 200) {
        await writeFile(cachePath(r.p), Buffer.from(r.b64, 'base64'));
        done++;
      } else failed.push(`${r.status} ${r.p}`);
    }
    if (i && i % 120 === 0) console.log(`fetched ${done}/${todo.length}`);
  }
  await browser.close();
  return { done, failed };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const refresh = args.includes('--refresh');
  const li = args.indexOf('--list');
  const paths =
    li >= 0
      ? (await readFile(args[li + 1], 'utf8')).split('\n').map((s) => s.trim()).filter(Boolean)
      : args.filter((a) => !a.startsWith('--'));
  const { done, failed } = await fetchPaths(paths, { refresh });
  console.log(`fetched ${done}, failed ${failed.length}`);
  for (const f of failed) console.log('  ' + f);
}
