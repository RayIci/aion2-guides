# 08: Playing mode

**What to build:** A compact route per class: pick mode + stage, and see only the `:::play` blocks and `play: true` sections for that choice (rotation, macros, current checklist). Large type, minimal chrome, phone-friendly. The last choice is remembered in browser storage.

**Blocked by:** 03, 07

**Status:** done

- [x] Fixture class shows the right blocks for each mode/stage
- [x] Checklists in playing mode share progress with the full guide
- [x] Usable on a 400px screen

## Comments

2026-10-16: Done. `/<patch>/play/<guide>` is reached from "Playing mode" in the guide sidebar footer. The content core now exposes each section's `:::play` blocks (or the whole body for `play: true`), and `src/lib/play.ts` groups them into stages (`leveling/*`, `endgame/*`), modes (`pve`, `pvp/<mode>`) and always-shown items (systems, PvP fundamentals, matchups); unit-tested. The page renders every group as static HTML, so checklists keep their enhancement and shared progress. A shadcn `Select` (stage) and `ToggleGroup` (mode) island shows the matching groups and remembers the choice per guide. Changing patch keeps you in playing mode. Checked in Chromium: a tick in the full guide shows in playing mode, the choice survives reload, and 390px has no overflow.
