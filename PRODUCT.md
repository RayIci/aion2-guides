# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
The owner, and later a few friends or guildmates, playing AION 2 on the Global / NA-EU servers. Two situations: **mid-game glances** on a second monitor or a phone next to the keyboard, often in a dark room, to check a rotation, macro, checklist or farming spot without losing focus on the game; and **longer planning sessions** on desktop between play sessions, to read a full guide, compare patches or decide what to farm or enhance next.

## Product Purpose
One place that says exactly what to do with a character at every point: skills, macros, rotations, gear, enhancement, pets, wings, farming routes, crafting, kinah. The guide is split by level bracket and endgame tier, and covers PvE and every PvP mode. Success: the player never has to search a forum mid-session, and after a patch they know what changed in their plan and why.

## Positioning
Every claim is traced to its source and graded by confidence (Verified / Community / Unverified), and the whole site is versioned by patch, with a changelog explaining each change to the guide. Other guide sites state things; this one shows where each statement came from and whether it's still true for the current Global patch.

## Operating Context
- Used alongside the running game: quick lookups, playing mode, persistent checklists, Ctrl/⌘ K search.
- Planning on desktop: full guides, patch changelogs, diffs between patches, the source coverage page.
- Content is researched and written by AI agents from cited sources (Official → Data → Creator → Community) and reviewed by the owner phase by phase.
- Free static hosting on GitHub Pages from a public repo; no accounts, no server.

## Capabilities and Constraints
- Astro static site with shadcn/ui (Base UI) React islands; custom components where shadcn has nothing suitable (ADR-0006).
- Global / NA-EU only, English only (ADR-0003).
- No game assets: text and outbound links only (ADR-0005).
- Interactive state (theme, checklists, playing-mode choice) lives in each visitor's browser storage.
- Vocabulary is fixed by `GLOSSARY.md` (Patch, Override, Claim, Confidence, Level bracket, Endgame tier, Mode…).

## Brand Commitments
Name: **AION 2 Guides**. No logo, guild or personal branding. A fan-made guide, not affiliated with NCSOFT, and it must never imitate NCSOFT's official branding.

## Evidence on Hand
- Real Baseline patch and 35 registered sources in `content/` (ticket 10). No guide sections are written yet.
- A demo fixture in `tests/fixtures/demo/`, clearly marked as not real.
- No testimonials, users or metrics exist; don't fabricate them.

## Product Principles
1. **Glanceable first.** Whatever a player needs mid-fight is readable in a second, in the dark, at arm's length.
2. **Show the evidence.** Confidence and sources are always visible, never hidden behind a click.
3. **The patch is always clear.** The reader always knows which patch they're reading and whether it's live.
4. **Honest gaps.** Unknowns, conflicts and drafts are labelled, not smoothed over.

## Accessibility & Inclusion
Basics only, per the owner: WCAG AA contrast, keyboard access, readable at phone width.
