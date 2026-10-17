# Game media pipeline

Generates the icons, item cards and maps the guides show (ADR-0007) from the Global client data published by gaming.tools.

```sh
npm i --no-save playwright sharp      # not in package.json: only needed to regenerate media
npx playwright install chromium       # once per machine
node scripts/media/build.mjs          # fetches what is missing, then writes everything below
```

`build.mjs` fetches what it needs through `fetch.mjs` (one headless browser session; the data CDN is behind a Cloudflare check, the icon CDN is not) into `.cache/gt/` (git-ignored), then writes:

| Output | What |
|---|---|
| `public/img/icons/<key>.webp` | 64 px icons, named after the game file |
| `public/img/maps/<map>.webp` | whole maps, cropped to where things are |
| `public/img/maps/o/<id>.webp` | overlay crops for `::map{id=…}` |
| `content/media/icons.json` | name → icon: items, skills per class, nodes, monsters, classes |
| `content/media/items.json` | item cards: grade, drops (chance, level, area, spawns per map), nodes, expeditions, shops, recipes, uses |
| `content/media/maps.json` | map images and area labels |
| `content/media/overlays.json` | overlay maps rendered from `content/media/overlay-specs.json` |

- **Which items:** every material and consumable, plus any item or gear a guide page names. Mention a new item in a page and re-run to get its icon and card.
- **Which maps:** the `MAPS` list at the top of `build.mjs` (open-world regions, Reshanta and the instanced dungeons).
- **Overlays:** each spec gives `id`, `map`, `title` and the positions to plot: `gatherables` (node ids), `npcs` (monster ids) or `places` (`{x, y}` world coordinates). `zones` limits the area names used for labels to the ones the data lists. `markers: true` draws named dots instead of spots and a route. The best spot is the densest group of positions; the loop is a nearest-neighbour tour through it.
- **Refresh after a patch:** delete the affected files in `.cache/gt/` (or all of it) and re-run. Delete `public/img/maps/o/` first if overlays changed, since existing crops are overwritten but stale ones are not removed.
- Coordinates: world `x`/`y` map linearly onto the stitched image through the map's `bounds` (checked against gaming.tools' own map).

## Build data scraped from guide sites (not game media)

`content/media/daevanion.json` (board layouts, gaming.tools' level-45 plan, aion2-meta's node order) and the setup pages' skill bars come from three one-off scrapers:

- `scrape-gt-boards.mjs`: gaming.tools build pages' Daevanion boards (each node's label and whether it is opened now or later).
- `scrape-meta-boards.mjs`: aion2-meta.com's numbered node order per board (with cost and the share of top players) and its in-game macro text.
- `scrape-gt-quickslots.mjs`: gaming.tools' quick-slot bar per preset.

The two sites' board layouts were checked cell by cell and match. To refresh after a patch: run the scrapers, then rebuild `daevanion.json` with the same shape (boards from aion2-meta's nodes, `plans.gamingtools.now/later` as [row, col] lists, `plans.aion2meta.order` keyed "row,col").
