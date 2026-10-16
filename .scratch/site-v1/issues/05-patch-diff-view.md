# 05: Patch diff view

**What to build:** Each patch has a pre-rendered diff against its parent for every changed section. A compare page diffs any two patches in the browser from per-patch JSON of resolved section bodies.

**Blocked by:** 04

**Status:** done

- [x] Parent diff shown on each changelog entry
- [x] Any-two-patches compare works for the fixture chain, including added/removed sections

## Comments

2026-10-16: Done. `src/lib/diff.ts` (jsdiff line diff grouped into hunks with 2 lines of context; unit-tested) runs at build time and in the browser. Each changelog entry has a "Text changes +n −m" toggle (shadcn `Collapsible`) that shows the diff against the parent patch. `/compare?from=&to=` (two shadcn `Select`s in `Field`s) fetches each patch's `/<patch>/sections.json`, lists every section that was added, removed or changed with its diff, and keeps the choice in the URL. Checked in Chromium on the demo: demo-1 → demo-3 shows only Example Strike (the duel page was added and then removed), and picking the same patch twice shows an empty state.
