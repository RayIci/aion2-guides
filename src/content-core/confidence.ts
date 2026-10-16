import type { Confidence, Source } from './schema';

// The confidence rule from docs/sourcing.md, applied to one citation.

const RANK: Record<Confidence, number> = { unverified: 0, community: 1, verified: 2 };

export function lowest(a: Confidence, b: Confidence): Confidence {
  return RANK[a] <= RANK[b] ? a : b;
}

export interface Citation {
  sourceIds: string[];
  /** Explicit `!level` caps; the citation can only be lowered by them. */
  caps: Confidence[];
  /** `[!opinion]`: the author's own reasoning. */
  opinion: boolean;
}

/** Confidence a citation reaches from its sources, before author caps. */
export function deriveFromSources(sources: Source[], allSources: ReadonlyMap<string, Source>): Confidence {
  if (sources.length === 0) return 'unverified';
  const global = sources.filter((s) => s.region === 'global' || s.region === 'all');
  if (global.some((s) => s.type === 'official' || s.type === 'data')) return 'verified';
  const secondary = global.filter((s) => s.type === 'creator' || s.type === 'community');
  for (let i = 0; i < secondary.length; i++) {
    for (let j = i + 1; j < secondary.length; j++) {
      if (independent(secondary[i], secondary[j], allSources)) return 'verified';
    }
  }
  // One non-official Global source, or any number of KR/TW-only sources (ADR-0003).
  return 'community';
}

export function deriveConfidence(citation: Citation, allSources: ReadonlyMap<string, Source>): Confidence {
  if (citation.opinion) return 'unverified';
  const sources = citation.sourceIds.map((id) => allSources.get(id)).filter((s): s is Source => !!s);
  return citation.caps.reduce(lowest, deriveFromSources(sources, allSources));
}

/** Neither copies the other (directly or transitively) and they don't share an author. */
export function independent(a: Source, b: Source, allSources: ReadonlyMap<string, Source>): boolean {
  if (a.id === b.id) return false;
  if (a.author && b.author && a.author.trim().toLowerCase() === b.author.trim().toLowerCase()) return false;
  return !ancestry(a, allSources).has(b.id) && !ancestry(b, allSources).has(a.id);
}

function ancestry(source: Source, allSources: ReadonlyMap<string, Source>): Set<string> {
  const seen = new Set<string>();
  const stack = [...source.derived_from];
  while (stack.length) {
    const id = stack.pop()!;
    if (seen.has(id)) continue;
    seen.add(id);
    stack.push(...(allSources.get(id)?.derived_from ?? []));
  }
  return seen;
}
