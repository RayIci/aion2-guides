# AION 2 Guides

A patch-versioned guide site for AION 2 on the **Global / NA-EU** servers: class guides (Gladiator and Assassin first) and farming/crafting guides. Every claim is cited to a source and carries a confidence badge. It's an Astro static site, deployed to GitHub Pages from this **public** repo. Nothing private goes in the repo, including `.scratch/`.

Product spec: `.scratch/site-v1/spec.md`. Vocabulary: `GLOSSARY.md`; use its terms and not the ones it lists as _Avoid_.

## Before touching content, read

- `docs/content-model.md`: file layout, patch inheritance, citation and block syntax, build validation. This is the contract between content and build.
- `docs/sourcing.md`: source hierarchy, confidence rule, how to register and cite a source.
- `docs/guide-outline.md`: the required section tree. Use it to judge whether a guide is complete.
- `docs/source-directory.md`: known sources by tier. Add to it as you find them.
- `scripts/media/README.md`: how icons, item cards and maps are generated, and when to re-run it.

## Rules that hold everywhere

- **Patches are the unit of change.** To change a section's content for patch P, write or edit P's override of it (with `change.game_change` + `change.reason`). Edit the older patch's copy only when you're fixing a mistake that was already wrong in that patch. In that case also check later patches for overrides of the same section (ADR-0002).
- **Cite or mark.** Every claim gets `[@source-id]` or an honest `[!opinion]` / `[!unverified]`. Show disagreements as `:::conflict`. Never settle one silently.
- **Global first.** KR/TW-only evidence is capped at Community confidence (ADR-0003).
- **Game media only where it identifies something.** Icons and maps come from the client data via `scripts/media/` and are credited to NCSOFT (ADR-0007). No decorative art.
- **UI is plain and utilitarian.** Text, lists and links with shadcn components (`src/components/ui`), or a small custom component when shadcn has nothing that fits. No decorative design: no hero art, pictures, video, scroll animations or themed looks. Interactive parts are React islands (ADR-0006).
- **The build must pass.** The content validator runs on every build. Fix every error it reports rather than suppressing it.

## Skills

- `/research-section <section-id>`: research and write (or refresh) any section in the outline.
- `/verify-claim <section-id or quoted claim>`: check whether something in the guide is real, and fix the text or its confidence.
- `/new-patch [patch]`: stage or publish a new game patch: find notes, list the affected sections, write overrides, draft the changelog.

## Agent skills

### Issue tracker

Local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` + `docs/adr/` at the root. See `docs/agents/domain.md`.
