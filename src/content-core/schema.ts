import { z } from 'zod';

// Frontmatter / YAML shapes from docs/content-model.md. Ids may be written unquoted
// in YAML (e.g. `id: 1.4` parses as a number), so they are coerced to strings.

const id = z.coerce.string().min(1);
const date = z.coerce.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

export const CONFIDENCE_LEVELS = ['verified', 'community', 'unverified'] as const;
export type Confidence = (typeof CONFIDENCE_LEVELS)[number];

export const SOURCE_TYPES = ['official', 'data', 'creator', 'community'] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

export const patchSchema = z.object({
  id,
  title: z.string().min(1),
  released: date.optional(),
  status: z.enum(['staged', 'live', 'superseded']),
  parent: id.optional(),
  official_notes: z.array(id).default([]),
});
export type PatchMeta = z.infer<typeof patchSchema>;

export const sectionSchema = z.object({
  title: z.string().min(1).optional(),
  order: z.number().default(0),
  status: z.enum(['draft', 'researched', 'reviewed']).default('draft'),
  last_checked: date.optional(),
  sources: z.array(id).default([]),
  play: z.boolean().default(false),
  change: z
    .object({
      game_change: z.string().min(1).optional(),
      reason: z.string().min(1).optional(),
      sources: z.array(id).default([]),
    })
    .optional(),
  removed: z.boolean().default(false),
});
export type SectionMeta = z.infer<typeof sectionSchema>;

export const sourceSchema = z.object({
  id,
  title: z.string().min(1),
  url: z.url(),
  archived_url: z.url().optional(),
  type: z.enum(SOURCE_TYPES),
  author: z.string().optional(),
  language: z.string().min(2),
  region: z.enum(['global', 'kr', 'tw', 'all']),
  published: date.optional(),
  accessed: date,
  about_patch: z.coerce.string().optional(),
  derived_from: z.array(id).default([]),
  notes: z.string().optional(),
});
export type Source = z.infer<typeof sourceSchema>;
