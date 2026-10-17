# 32: Game media, farming paths and clearer guides

**What to build:** The owner's 2026-10-17 requests: (1) images for everything that can have one (items, materials, skills, gear as equipped); (2) how to farm leather, meat and the crafting materials for weapons and armor, with the best way and path to get them; (3) maps with the path drawn or the location circled; (4) simpler guides: quick steps on top, sources hidden by default, item cards, shorter pages.

**Blocked by:** none

**Status:** done

- [x] Icons for items, skills, nodes, monsters and classes, from the client data (ADR-0007)
- [x] Material pages for monster drops, expedition materials, crafted intermediates and shop ingredients, each with best spot per faction
- [x] Maps with the best spot circled, alternatives and a numbered loop; whole maps with area names; field boss maps
- [x] Quick steps on guide pages, long tables folded, citations hidden behind a header switch, item cards, gear loadouts

## Comments

2026-10-17: Done.
- `scripts/media/` fetches gaming.tools data through a headless browser, stitches map tile packs and writes `content/media/*.json` plus `public/img/` (about 13 MB: 1,474 icons, 16 maps, 57 overlays). New blocks: `:::quick`, `:::details`, `::items`, `::map`, `::loadout`, `:item[...]`; known names get icons and links automatically.
- World: 46 material pages (21 gathered, 11 monster drops, 3 expedition, 9 crafted, shop ingredients, index), gear crafting paths, atlas pages with maps, farm targets and field bosses, a "what do you want to do" hub.
- Class guides (both): start-here lists, quick steps on leveling, endgame, PvE build/rotation, PvP builds and expeditions; equipment-window loadouts for each endgame stage and each expedition's drops.
- Caveats: the best spot and loop are computed from positions (densest group, nearest-neighbour loop), not measured in game; gaming.tools marks monster coordinates as unverified. Loop times and yields per hour are still `[!unverified]`. Character screenshots with equipped gear aren't possible without in-game captures; the loadout block shows the gear per slot instead.
- The Playwright MCP needs Google Chrome, which isn't installed here; checks used the repo's playwright (390/768/1024/1300/1440 px: no overflow, no broken images, no JS errors).
