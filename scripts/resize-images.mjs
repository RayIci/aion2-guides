// Shrink pictures in a folder so the long side is at most `max` px (JPEG, quality 82).
// Usage: node scripts/resize-images.mjs public/images [max=1600]
import sharp from 'sharp';
import { readdir, rename } from 'node:fs/promises';
import { join } from 'node:path';

const [dir, maxArg] = process.argv.slice(2);
const max = Number(maxArg ?? 1600);
for (const f of await readdir(dir)) {
  if (!/\.jpe?g$/i.test(f)) continue;
  const path = join(dir, f);
  const { width, height } = await sharp(path).metadata();
  if (Math.max(width, height) <= max) continue;
  const resize = width >= height ? { width: max } : { height: max };
  await sharp(path).resize(resize).jpeg({ quality: 82, mozjpeg: true }).toFile(`${path}.tmp`);
  await rename(`${path}.tmp`, path);
  console.log(`${f}: ${width}x${height} -> long side ${max}`);
}
