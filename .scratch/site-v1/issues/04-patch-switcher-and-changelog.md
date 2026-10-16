# 04: Patch switcher, staged banner and changelog

**What to build:** Every patch's Resolved guide is pre-rendered under its patch id; the Live patch is also served at unprefixed paths. A patch switcher keeps you on the same section (falling back to the guide index if the section doesn't exist there). Staged patches show a "not released on Global yet" banner. Sections overridden in the viewed patch are marked in the nav. Each patch has a changelog page built from its overview plus every override/removal's `game_change` and `reason`.

**Blocked by:** 02

**Status:** done

- [x] Fixture chain of 3 patches (overrides + a removal) browses correctly at every patch
- [x] Switching patch keeps the section id, and falls back when it's missing
- [x] Changelog lists every override/removal with cited `game_change` and `reason`
- [x] Staged banner shown; Live patch is the default at `/`

## Comments

2026-10-16: Done.
- Patch switcher (shadcn `Select`, in every page header) jumps to the same section in the chosen patch. If that patch doesn't have the section, it goes to the guide's entry page, and otherwise to the patch home (`patchTargets`, tested).
- `Alert` banners for Staged ("Not released on Global yet") and Superseded ("You're reading an older patch") patches, each linking to the live version.
- Changed sections are marked in the sidebar (done in the shadcn switch).
- `/<patch>/changelog` shows the overview (now rendered with citations by the content core and validated), the official notes, and changes grouped by guide with Added/Changed/Removed badges, "In the game" / "In the guide" text and sources. Removals link to the parent patch's copy. `/patches` lists every patch.
- The demo fixture is now a 3-patch chain (superseded, live, staged with a removal). It was checked in Chromium: switcher navigation, banners, changelog, 390px layout, no console errors.
