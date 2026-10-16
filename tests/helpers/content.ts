import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

/** Write a throwaway content directory from a { relative path: file text } map. */
export async function makeContent(files: Record<string, string>): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'aion2-content-'));
  for (const [path, text] of Object.entries(files)) {
    await mkdir(dirname(join(dir, path)), { recursive: true });
    await writeFile(join(dir, path), text);
  }
  return dir;
}

export function patch(id: string, opts: { parent?: string; status?: string; released?: string; notes?: string[] } = {}): string {
  return [
    '---',
    `id: "${id}"`,
    `title: "Patch ${id}"`,
    opts.released ? `released: ${opts.released}` : '',
    `status: ${opts.status ?? 'live'}`,
    opts.parent ? `parent: "${opts.parent}"` : '',
    `official_notes: [${(opts.notes ?? []).join(', ')}]`,
    '---',
    `Overview of ${id}.`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function section(frontmatter: Record<string, unknown>, body = ''): string {
  const yaml = Object.entries(frontmatter)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n');
  return `---\n${yaml}\n---\n${body}\n`;
}

export function source(
  id: string,
  opts: { type?: string; region?: string; author?: string; derived_from?: string[]; archived?: boolean } = {},
): string {
  return [
    `id: ${id}`,
    `title: "Source ${id}"`,
    `url: https://example.com/${id}`,
    opts.archived === false ? '' : `archived_url: https://web.archive.org/web/2026/https://example.com/${id}`,
    `type: ${opts.type ?? 'community'}`,
    opts.author ? `author: "${opts.author}"` : '',
    `language: en`,
    `region: ${opts.region ?? 'global'}`,
    `accessed: 2026-10-16`,
    `derived_from: [${(opts.derived_from ?? []).join(', ')}]`,
  ]
    .filter(Boolean)
    .join('\n');
}
