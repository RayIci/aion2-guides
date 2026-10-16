# 06: Full-text search

**What to build:** Pagefind search, indexed per patch, scoped by default to the patch being viewed, with a keyboard shortcut to open it.

**Blocked by:** 02

**Status:** done

- [x] Searching a skill/material name finds its section in the current patch
- [x] Results from other patches are excluded by default and available via a filter

## Comments

2026-10-16: Done. `npm run build` now runs `pagefind --site dist` after the Astro build. Only the patch-prefixed copy of each section is indexed (`data-pagefind-body`), with a `patch` filter and `patch`/`guide` meta read from attributes so no extra text enters the index. The status row, draft notice and sources list are ignored. The UI is the shadcn `Command` in a `CommandDialog` (header button, `Ctrl/⌘ K` or `/`), scoped to the viewed patch, with a `Switch` to search all patches. Checked in Chromium on the demo: "strike" gives 1 result in the patch and 3 across all patches; clicking a result and pressing Enter both navigate. In `npm run dev` there's no index, and the dialog says so.
