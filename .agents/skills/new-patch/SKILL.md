---
name: new-patch
description: Stage or publish a new AION 2 Global patch in the guide: find its notes, list affected sections, write overrides with change reasons, draft the changelog.
disable-model-invocation: true
---

Bring the guide up to date with a game patch. Input: a patch version or "latest". It may also say "stage" (prepare from announced or KR notes before Global release) or "go live". Patch format and rules: `docs/content-model.md`. Sourcing: `docs/sourcing.md`.

## Steps

1. **Identify.** Find the Global Official patch notes for the patch and register them as sources. If it isn't on Global yet, use announced notes or the matching KR/TW notes and treat the patch as **Staged** (ADR-0003). Done when the patch id, release date (or "unreleased") and note sources are known.

2. **Create the patch.** Add `content/patches/<id>/patch.md` with `parent` set to the current newest patch and `status: staged`. Leave `sections/` empty.

3. **Impact list.** Go through the patch notes line by line. Map every change that touches a covered topic (a class we document, a system, a map, a material, a recipe, the economy) to the section ids it affects. Check the full section tree, not just the obvious pages: a skill change can affect `systems/skills/<skill>`, rotations, macros, builds for each mode, matchups and stage checklists. Done when every patch-note line is either mapped to sections or marked "no guide impact", and the full list is written into the patch's `patch.md` body as a draft.

4. **Write overrides.** Run `/research-section` for each affected section, writing into the new patch's folder as an override with `change.game_change` (what the game changed, cited) and `change.reason` (why the guide changed). Use a Removal for content that's gone. New content in the patch (new skills, maps, modes) gets new sections. Add them to `docs/guide-outline.md` if they're a new kind of section.

5. **Media.** Once gaming.tools has the new client data, refresh it: `node scripts/media/fetch.mjs --refresh --list <paths>` for the changed items and maps (or delete `.cache/gt` and re-run), then `node scripts/media/build.mjs`. Drop chances, spawn counts, shop prices and recipes in `content/media/` change with it; list in the impact report which material pages moved their best spot. Done when the build passes.

6. **Overview.** Replace the draft in `patch.md` with the hand-written overview: what the patch means for each documented class and for farming/crafting, in a few paragraphs.

7. **Go live (only when the patch is released on Global and the owner confirms).** Re-check any overrides that were written from KR/TW notes against the Global notes, set this patch `status: live` and the old live patch `superseded`.

8. **Validate and report.** Run the build. Report the impact list, the overrides and removals written, sections whose confidence dropped, and the open questions for the owner.
