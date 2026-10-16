import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { parse as parseYaml } from 'yaml';
import type { z } from 'zod';
import { patchSchema, sectionSchema, sourceSchema, type PatchMeta, type SectionMeta, type Source } from './schema';

export interface ContentError {
  file: string;
  message: string;
}

export interface RawSection {
  id: string;
  file: string;
  meta: SectionMeta;
  body: string;
}

export interface RawPatch {
  file: string;
  meta: PatchMeta;
  overview: string;
  sections: Map<string, RawSection>;
}

export interface RawContent {
  patches: RawPatch[];
  sources: Map<string, Source & { file: string }>;
  errors: ContentError[];
}

/** Read every patch, section and source file under `contentDir`. Shape errors are collected, not thrown. */
export async function loadContent(contentDir: string): Promise<RawContent> {
  const errors: ContentError[] = [];
  const rel = (f: string) => relative(contentDir, f).split(sep).join('/');

  const sources = new Map<string, Source & { file: string }>();
  for (const file of await listFiles(join(contentDir, 'sources'), /\.ya?ml$/)) {
    const parsed = check(sourceSchema, parseYamlSafe(await readFile(file, 'utf8'), rel(file), errors), rel(file), errors);
    if (!parsed) continue;
    if (sources.has(parsed.id)) {
      errors.push({ file: rel(file), message: `duplicate source id "${parsed.id}" (also in ${sources.get(parsed.id)!.file})` });
      continue;
    }
    sources.set(parsed.id, { ...parsed, file: rel(file) });
  }

  const patches: RawPatch[] = [];
  const patchesDir = join(contentDir, 'patches');
  for (const name of await listDirs(patchesDir)) {
    const patchFile = join(patchesDir, name, 'patch.md');
    let text: string;
    try {
      text = await readFile(patchFile, 'utf8');
    } catch {
      errors.push({ file: rel(join(patchesDir, name)), message: 'patch folder has no patch.md' });
      continue;
    }
    const { data, body } = splitFrontmatter(text, rel(patchFile), errors);
    const meta = check(patchSchema, data, rel(patchFile), errors);
    if (!meta) continue;
    if (meta.id !== name) errors.push({ file: rel(patchFile), message: `patch id "${meta.id}" does not match its folder "${name}"` });

    const sections = new Map<string, RawSection>();
    const sectionsDir = join(patchesDir, name, 'sections');
    for (const file of await listFiles(sectionsDir, /\.mdx?$/)) {
      const sectionId = relative(sectionsDir, file).split(sep).join('/').replace(/\.mdx?$/, '');
      const split = splitFrontmatter(await readFile(file, 'utf8'), rel(file), errors);
      const sectionMeta = check(sectionSchema, split.data, rel(file), errors);
      if (!sectionMeta) continue;
      sections.set(sectionId, { id: sectionId, file: rel(file), meta: sectionMeta, body: split.body });
    }
    patches.push({ file: rel(patchFile), meta, overview: body.trim(), sections });
  }

  return { patches, sources, errors };
}

function splitFrontmatter(text: string, file: string, errors: ContentError[]): { data: unknown; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!match) {
    errors.push({ file, message: 'missing YAML frontmatter' });
    return { data: {}, body: text };
  }
  return { data: parseYamlSafe(match[1], file, errors) ?? {}, body: match[2] };
}

function parseYamlSafe(text: string, file: string, errors: ContentError[]): unknown {
  try {
    return parseYaml(text);
  } catch (e) {
    errors.push({ file, message: `invalid YAML: ${(e as Error).message}` });
    return undefined;
  }
}

function check<S extends z.ZodType>(schema: S, data: unknown, file: string, errors: ContentError[]): z.infer<S> | undefined {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  for (const issue of result.error.issues) {
    errors.push({ file, message: `${issue.path.join('.') || '(root)'}: ${issue.message}` });
  }
  return undefined;
}

async function listDirs(dir: string): Promise<string[]> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
  } catch {
    return [];
  }
}

async function listFiles(dir: string, pattern: RegExp): Promise<string[]> {
  try {
    await stat(dir);
  } catch {
    return [];
  }
  const out: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true, recursive: true })) {
    if (entry.isFile() && pattern.test(entry.name)) out.push(join(entry.parentPath, entry.name));
  }
  return out.sort();
}
