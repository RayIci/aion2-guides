# 02: Baseline patch renders one cited section

**What to build:** The content core module from the spec: read `content/` (patches, sections, source registry), resolve each patch's guide, derive confidence, validate, and render one real-looking sample section (fixture data is fine) in the Baseline patch. The section shows inline citations as confidence badges with numbered source links, a sources list at the end, its status and its last-checked date. Follow `docs/content-model.md` and `docs/sourcing.md` exactly.

**Blocked by:** 01

**Status:** done

- [x] One interface returns resolved guides, changelogs, validation errors and coverage stats for all patches; pages read only from it
- [x] `[@id]`, `[@a; @b]`, `[@id; !community]`, `[!opinion]`, `[!unverified]` render as specified
- [x] Confidence derivation passes every fixture case in the spec's Testing Decisions
- [x] Every build-validation rule in `docs/content-model.md` fails the build on a fixture that breaks it
- [x] Guide navigation is built from the section tree and `order`

## Comments

2026-10-16: Done.
- The content core is `buildContent(contentDir)`. It returns every patch's Resolved guide (body, HTML, origin patch, changed-here flag, numbered sources, claims with confidence), its changelog and coverage, plus the sources that have no archive and all validation errors. The site reads content only through `getContent()`, and the build fails if there are any errors.
- Covered by 41 Vitest tests that drive the single interface with temp-dir fixtures: resolving a chain with overrides and a removal, changelogs, picking the default patch, every validation rule, every confidence case from the spec, coverage counts, the KR-only flag, checklist ids, and stray `:` text left alone.
- Demo content is in `tests/fixtures/demo/` (`npm run dev:demo` / `build:demo`). Real `content/` comes from ticket 10.
- Beyond the ticket: a "KR only"/"TW only" tag on badges (user story 36), and `npm run check` (tsc) added to CI.
- Container blocks other than `checklist` id collection render as plain divs until tickets 03/07.
- Not done: no visual check in a browser (no headless browser installed). Only the generated HTML was checked.
