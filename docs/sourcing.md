# Sourcing rules

How to find, judge, register and cite sources. Every content-writing agent and every content skill follows this file. The storage format is in `docs/content-model.md`.

## Source hierarchy (search in this order)

1. **Official**: Global official patch notes, developer notes, official announcements and the official site/forums for the Global service.
2. **Data**: game databases and datamines that show values pulled from the client (skill numbers, drop tables, recipes, spawn data).
3. **Creator**: established guide writers and streamers with a track record on the class or topic. Note their name in `author`.
4. **Community**: forum threads, Reddit, Discord messages that are public and linkable, and comments.

Korean (Inven, official KR site) and Taiwanese sources are often first and deepest. Use them, but follow ADR-0003: a KR/TW-only claim is capped at Community until Global confirms it, and the source's `region` must say so.

The list of concrete sites for each tier lives in `docs/source-directory.md`. Add to it whenever you find a reliable source.

## Confidence rule (applied by the build; know it while writing)

A claim's confidence is the **highest** level its cited sources reach:

- **Verified**: at least one `official` or `data` source with `region: global` or `all`, **or** at least two **independent** `creator`/`community` Global sources that agree.
- **Community**: exactly one non-official Global source, or any number of KR/TW-only sources.
- **Unverified**: no source, `[!opinion]`, or `[!unverified]`.

Two sources are **independent** when neither one is in the other's `derived_from` and they don't share an `author`. A translation or repost of a source counts as that same source.

An author may lower confidence with `[@id; !community]` (for example, when a source predates a patch that touched the same system). An author never raises it.

## The bar we aim for

The owner wants **most claims Verified**. When a claim only reaches Community, spend some effort looking for a second independent source or a Data/Official one before you give up. Recipes, numbers, drop locations and skill effects can almost always reach Verified through Data sources. Opinions on playstyle and priorities usually top out at Community, and that's fine as long as the citation shows it honestly.

## Writing claims

- Cite whatever someone would want to check: numbers, rankings, locations, recipes, "best X" statements, cooldowns, patch-specific facts. A whole paragraph of general advice from one guide can rely on the section-level `sources`.
- When sources disagree, write a `:::conflict` block showing each alternative. Settle it only with a citation or a marked `[!opinion]`.
- Mark your own reasoning `[!opinion]` instead of passing it off as sourced.
- Record which patch a value applies to. If a source's `about_patch` is older than the patch you're writing for and the system changed in between, either find a newer source or lower the confidence.
- Translate non-English sources faithfully and say so in the source's `notes`.

## Registering a source

1. Search the registry for the URL first; reuse the existing id if it's there.
2. Make a Wayback Machine snapshot (`https://web.archive.org/save/<url>`) and record it in `archived_url`. If saving fails, leave it out; the build will report it.
3. Fill in every field in `docs/content-model.md`. `accessed` is today's date.
4. If the source copies or translates another one, fill in `derived_from` so independence is judged correctly.

## Video sources

Cite the timestamp URL (`&t=…`). Put the topic or segment in the `title`, e.g. `"Gladiator 1v1 guide: opener at 4:12"`.
