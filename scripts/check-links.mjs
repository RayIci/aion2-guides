// Weekly source link check (ticket 09). Fetches every source URL (and archived copy) in
// content/sources/ and reports dead links with the content files that cite them.
// Usage: node scripts/check-links.mjs [contentDir]   → exit 1 if any link is dead.
import { readdir, readFile, appendFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parse } from 'yaml';

const contentDir = process.argv[2] ?? 'content';
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36 aion2-guides-linkcheck';

async function files(dir, ext) {
  try {
    const entries = await readdir(dir, { withFileTypes: true, recursive: true });
    return entries.filter((e) => e.isFile() && e.name.endsWith(ext)).map((e) => join(e.parentPath, e.name));
  } catch {
    return [];
  }
}

async function check(url) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
      // Cloudflare/bot checks answer 403/503 to scripts while the page is fine in a browser.
      const challenged = res.headers.get('cf-mitigated') === 'challenge' || (res.status === 403 && /cloudflare/i.test(res.headers.get('server') ?? ''));
      if (challenged) return { ok: true, note: `bot check (${res.status})` };
      if (res.ok) return { ok: true };
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      return { ok: false, note: `HTTP ${res.status}` };
    } catch (e) {
      if (attempt === 1) return { ok: false, note: String(e.message ?? e) };
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

const sources = [];
for (const f of await files(join(contentDir, 'sources'), '.yaml')) sources.push(parse(await readFile(f, 'utf8')));
const markdown = await Promise.all((await files(join(contentDir, 'patches'), '.md')).map(async (f) => [relative(contentDir, f), await readFile(f, 'utf8')]));
const citedBy = (id) => markdown.filter(([, text]) => new RegExp(`(@|\\[|,\\s*|^\\s*-\\s*)${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'm').test(text)).map(([f]) => f);

const dead = [];
const notes = [];
for (const s of sources) {
  for (const [field, url] of [['url', s.url], ['archived_url', s.archived_url]]) {
    if (!url) continue;
    const r = await check(url);
    if (!r.ok) dead.push({ id: s.id, field, url, note: r.note, citedBy: citedBy(s.id) });
    else if (r.note) notes.push(`${s.id} ${field}: ${r.note}`);
  }
}

const lines = [`# Source link check`, '', `${sources.length} sources checked, ${dead.length} dead link(s).`, ''];
if (dead.length) {
  lines.push('| Source | Field | Problem | Cited by |', '|---|---|---|---|');
  for (const d of dead) lines.push(`| \`${d.id}\` | ${d.field} | ${d.note} — ${d.url} | ${d.citedBy.join('<br>') || '(not cited)'} |`);
  lines.push('', 'Fix: point `url` at the archived copy or a replacement, or re-run `/verify-claim` on the citing sections.');
}
if (notes.length) lines.push('', '<details><summary>Not checkable by script (bot checks)</summary>', '', ...notes.map((n) => `- ${n}`), '', '</details>');
const report = lines.join('\n');
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, report + '\n');
process.exit(dead.length ? 1 : 0);
