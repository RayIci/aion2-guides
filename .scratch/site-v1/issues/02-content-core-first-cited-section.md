# 02: Baseline patch renders one cited section

**What to build:** The content core module from the spec: read `content/` (patches, sections, source registry), resolve each patch's guide, derive confidence, validate, and render one real-looking sample section (fixture data is fine) in the Baseline patch. The section shows inline citations as confidence badges with numbered source links, a sources list at the end, its status and its last-checked date. Follow `docs/content-model.md` and `docs/sourcing.md` exactly.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] One interface returns resolved guides, changelogs, validation errors and coverage stats for all patches; pages read only from it
- [ ] `[@id]`, `[@a; @b]`, `[@id; !community]`, `[!opinion]`, `[!unverified]` render as specified
- [ ] Confidence derivation passes every fixture case in the spec's Testing Decisions
- [ ] Every build-validation rule in `docs/content-model.md` fails the build on a fixture that breaks it
- [ ] Guide navigation is built from the section tree and `order`
