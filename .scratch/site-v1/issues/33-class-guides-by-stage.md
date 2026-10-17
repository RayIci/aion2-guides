# 33: Class guides organized by where you are

**What to build:** Owner feedback 2026-10-17: the class guides were split by system (Endgame, PvE, PvP, Systems) and hard to follow; skills weren't clear or verified (what to raise, where on the bar, which key for the macro); unclear whether PvP needs its own gear stages; gear pages must say where to get each piece and what to do.

**Blocked by:** none

**Status:** done

- [x] Start here page per class; Level 45 set-up page (skill bar per preset, macro key and steps, skills, Stigmas, Daevanion, presets, PvP preset)
- [x] Endgame Stages 1–3 with gear, where to get each piece, what to run with which preset, which PvP opens
- [x] One page per PvP mode; Reference for skills, systems and content
- [x] Picks cross-checked against a second source; disagreements shown as alternatives

## Comments

2026-10-17: Done for Gladiator and Assassin.
- New sources: Corpus class builds, macros, Daevanion, Expeditions, Arena, Abyss, Battlefield, best PvP class, daily/weekly checklist (summaries of Grobs, aLuckyRO, Wakayashi, Madsin, Anders with timestamps), and aion2-meta.com (top Korean players' PvE/PvP pick rates; region kr, Community at most). Gold sellers and AI farms skipped; couga54 and aion2-guides.info are byte-identical copies.
- Verified where gaming.tools and Corpus agree: Gladiator Stigmas (Lunge Stance, Zikel's Blessing, Rage Burst, Focused Block), Overhead Slam > Rending Blow > Ruinous Blow, passives, macro key on right mouse, bottom-of-row priority; Assassin core Stigmas (Illusive Clone, Swift Contract, Triniel's Dagger), Heart Gore > Quick Slice > Insignia Explosion. Shown as alternatives: macro size, fourth Stigma, Rending Blow's first Specialization, Keen Strike after 45, Assassin Stigma levels, Insignia Explosion's second Specialization.
- Skill bars are gaming.tools' exact quick-slot layouts (scraped per preset), so they are Community: no second source publishes a bar layout.
- PvP gear: same item-level-86 stats from dungeon, field boss and Abyssal sets; only the amulet differs (Fierce Battle +20% PvP Damage Boost vs Revelation +10% Weapon Damage Boost). PvP Stigma picks come from Korean pick rates (6 slots there, 4 here); the per-mode swaps are marked as reasoning.
- Old `pve/` and `pvp/<mode>/` pages removed; `systems/` → `reference/systems/`, skills → `reference/skills/` (each now says where it sits on the bar), PvE content → `reference/content/`. All internal links checked.

2026-10-17 (later): Owner asked for full PvP skill configurations and several setups to test per category. `setup.md` became `setup/` with PvE A (full macro, gaming.tools), PvE B (core-combo macro, Grobs's row via Corpus), PvE C (no macro, combo rows), PvP 1 (Fextralife's PvP build: Gladiator Lockdown / Assassin Stealth lockdown), PvP 2 (top Korean players via aion2-meta) and PvP 3 (PvE bar + swaps). PvP setups have their own skill milestones, PvP Specialization tables (with the other source to compare), Stigmas, bar and macro. Only setup A's bar is published by a source; the others are this guide's layouts from the sources' rows and rules, marked as reasoning. Each PvP mode page says which setup to start with and which to try next; each skill page lists its key in every setup. New sources: Fextralife Gladiator/Assassin builds.

2026-10-17 (later): Daevanion node plans. `setup/daevanion` per class draws the five boards node by node: Plan A is gaming.tools' exact level-45 nodes (shared by all presets; the source says boards are shared), Plan B is aion2-meta's numbered order ringed at the same points per board, with a table of how far they agree (they take different routes, so the overlap is partial), and Azphel (PvP) in aion2-meta's order. Board layouts from the two sites were checked cell by cell and match. Also added PvE D (aion2-meta's two-key macro: a damage slot plus a buff button). Scrapers kept in `scripts/media/`.
