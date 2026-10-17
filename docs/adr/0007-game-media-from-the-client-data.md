# Game icons and maps are shown, copied from the client data

Supersedes ADR-0005.

The owner asked for images so that items, materials, skills and places are recognizable while playing, and for maps with the spot circled and the route drawn. Text alone did not do that job. So the site now shows game icons (items, skills, gathering nodes, monsters, class emblems) and the game's world and dungeon maps, with our own overlays (dots, circles, a numbered loop) drawn on top in SVG.

- **Where they come from:** the Global client data as published by gaming.tools. `scripts/media/` fetches it, stitches the map tile packs and downloads the icons (see `scripts/media/README.md`). Nothing is screenshotted or redrawn by hand.
- **Copied, not hotlinked:** the files live in `public/img/` so pages work without depending on another site's bandwidth or URLs. Icons are 64 px; maps are cropped and resized to what a page shows.
- **Credit:** every page footer says the icons and maps are © NCSOFT, taken from the game data via gaming.tools. Item cards and maps cite `gamingtools-item-database-*` and `gamingtools-interactive-map-*` like any other claim.
- **Our overlays are ours:** the "best spot" circles and routes are computed from the positions (densest groups, nearest-neighbour loop). The map caption says so; they are not a source's recommendation.
- **Risk accepted by the owner:** the repo is public and the images are NCSOFT's. If NCSOFT asks, remove `public/img/` and the media blocks fall back to plain names (build with an empty `content/media/`).
- Still no decorative art: images appear only where they identify something (an item, a skill, a place). The UI stays plain (ADR-0006).
