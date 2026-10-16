# 07: Persistent checklists

**What to build:** `:::checklist` items are tickable and remembered in browser storage, keyed by section id + item id and ignoring the patch, so progress survives patch switches. There's a reset button per checklist. All storage access is wrapped in try/catch; the page still works if storage is unavailable.

**Blocked by:** 02

**Status:** done

- [x] Ticked state survives reload and patch switch
- [x] Explicit `{#id}` keeps progress when item wording changes
- [x] Page works with storage disabled (no errors, just no persistence)

## Comments

2026-10-16: Done. `src/scripts/enhance.ts` makes `:::checklist` items tickable, with the whole row clickable, a "n of m done" counter and a Reset button. Progress is stored as `checklist:<section id>#<item id>`, independent of patch. Checked in Chromium: survives reload, shows the same ticks on the same section in another patch, Reset clears it, and with localStorage throwing it still works (no persistence, no errors). Explicit `{#id}` keeps progress when wording changes (the id is taken from the `{#id}`, not the text). Checkboxes are styled to match the shadcn Checkbox.
