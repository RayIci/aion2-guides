# 07: Persistent checklists

**What to build:** `:::checklist` items are tickable and remembered in browser storage, keyed by section id + item id and ignoring the patch, so progress survives patch switches. There's a reset button per checklist. All storage access is wrapped in try/catch; the page still works if storage is unavailable.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Ticked state survives reload and patch switch
- [ ] Explicit `{#id}` keeps progress when item wording changes
- [ ] Page works with storage disabled (no errors, just no persistence)
