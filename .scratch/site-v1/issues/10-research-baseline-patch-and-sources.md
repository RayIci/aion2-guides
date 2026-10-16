# 10: Research the baseline patch and source landscape

**What to build:** Find out (with citations) the current **Live Global / NA-EU patch** and recent patch history, and write the Baseline `patch.md`. Fill in `docs/source-directory.md` with real Official, Data, Creator and Community sources for Global (and the KR/TW ones used for staging). Confirm against Global which **(confirm)** systems and PvP modes in `docs/guide-outline.md` exist, renaming them to their in-game names, and add any that are missing. Record max level and the in-game milestones that will cut Level brackets.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] Baseline `patch.md` with official-notes sources registered in `content/sources/`
- [x] `docs/source-directory.md` populated, with a reliability note for each row
- [x] Every **(confirm)** item in the outline resolved: confirmed (with in-game name) or removed with a cited note
- [x] Global PvP mode list and Level bracket milestones recorded, with citations

## Comments

2026-10-16: Done. The research agent wrote the report (`.scratch/site-v1/research/10-baseline-and-sources.md`) and was then stopped by a session restart. The main session spot-checked the report and wrote the deliverables:
- Spot-checks: all 11 Global and 3 KR official articles exist with the reported titles and dates (via the board API). The 2026-10-14 notes contain the reported changes; their only Gladiator/Assassin mentions are skin-shop rows. gaming.tools pages were checked through headless Chromium (Cloudflare blocks curl and WebFetch). The navigator text and levels match, and the navigator lives at `/progression/tracks?tab=guide`, not `/progression/tracks`. Arena pages are `/activities/arena-1|2|3`.
- Baseline patch `content/patches/2026-10-14-halloween/patch.md` (live), and 35 sources in `content/sources/`. Two sources from the report were left out because their URLs couldn't be confirmed (the server-transfer Q&A notice and allthings.how's duel page); their claims have other sources.
- `docs/source-directory.md` populated; `docs/guide-outline.md` now uses the Global system names, the confirmed PvP mode list, the level brackets, the endgame tiers and a "Left out on Global" table.
- Still open (from the report): max level 45 has no Official written source; expedition entry levels conflict (22/30/37 vs 20/28/35); Arena of Tactics vs Battlefield; Ludra's return date; Seals and Upper/Middle Reshanta live status; Reddit not reachable; creators not vetted.
