# 04: Patch switcher, staged banner and changelog

**What to build:** Every patch's Resolved guide is pre-rendered under its patch id; the Live patch is also served at unprefixed paths. A patch switcher keeps you on the same section (falling back to the guide index if the section doesn't exist there). Staged patches show a "not released on Global yet" banner. Sections overridden in the viewed patch are marked in the nav. Each patch has a changelog page built from its overview plus every override/removal's `game_change` and `reason`.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Fixture chain of 3 patches (overrides + a removal) browses correctly at every patch
- [ ] Switching patch keeps the section id, and falls back when it's missing
- [ ] Changelog lists every override/removal with cited `game_change` and `reason`
- [ ] Staged banner shown; Live patch is the default at `/`
