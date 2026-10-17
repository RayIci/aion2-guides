// Shared helpers for the gaming.tools media pipeline (see scripts/media/README.md).
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export const CDN = 'https://cdn-hosted.gaming.tools/aion2';
export const SITE = 'https://aion2.gaming.tools';
// gaming.tools stamps its data files with a build version; any recent value is accepted.
export const VERSION = '1792176361702';
export const CACHE = '.cache/gt';

export const cachePath = (p) => join(CACHE, p.replace(/^\/+/, '').replace(/\//g, '_'));

export async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * gaming.tools data files are "flattened" JSON: an array whose first element is the root,
 * and every object/array value is an index into that array.
 */
export function decode(arr) {
  const memo = new Map();
  const r = (i) => {
    if (typeof i !== 'number' || i < 0) return null;
    if (memo.has(i)) return memo.get(i);
    const v = arr[i];
    if (Array.isArray(v)) {
      const o = [];
      memo.set(i, o);
      for (const j of v) o.push(r(j));
      return o;
    }
    if (v && typeof v === 'object') {
      const o = {};
      memo.set(i, o);
      for (const [k, j] of Object.entries(v)) o[k] = r(j);
      return o;
    }
    return v;
  };
  return r(0);
}

export async function loadData(path) {
  return decode(JSON.parse(await readFile(cachePath(path), 'utf8')));
}

export async function writeJson(file, data) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 1) + '\n');
}

/** Site-local file name for a game icon path: its basename (they are unique in the client). */
export const iconKey = (iconPath) => iconPath.split('/').pop().replace(/\.webp$/, '');

export const slug = (s) =>
  s
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
