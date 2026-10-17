# Guide outline

The required section tree for every guide. A guide is complete when every section below exists, or has been deliberately left out with a one-line note in its parent's `index.md` explaining why (e.g. "Not live on Global yet [@source]").

System names are the **in-game Global names**, confirmed against Global sources in ticket 10 (`.scratch/site-v1/research/10-baseline-and-sources.md`, which has the evidence). Source ids in `[brackets]` are registered in `content/sources/`. When the game adds a system, add it here first, then write its section.

Section ids follow `docs/content-model.md`. `<class>` is e.g. `gladiator`. Global has 8 classes: Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, Chanter [gamingtools-classes-2026-10, nc-global-skins-2026-10].

---

## Class guide: `classes/<class>/`

### Overview: `overview`
Role, strengths/weaknesses, difficulty, playstyle, how it plays in PvE vs PvP, who should pick it, and a summary of how it performs in the current patch. `play: false`.

### Systems reference: `systems/…`
Reference pages, true across every stage. Later stages link here instead of repeating it.

- `systems/stats`: every stat that matters to the class, what it does, soft/hard caps, and the class's stats by level.
- `systems/resource-and-chains`: the class resource (**MP** for Gladiator and Assassin; there's no separate class resource) and **Chain Skills** (opening skills that chain into follow-ups) [gamingtools-gladiator-2026-10, gamingtools-assassin-2026-10, gamingtools-keen-strike-2026-10].
- `systems/skills/index`: skill list overview (Active, Passive, Stigma, Chain), how skills unlock, and **Skill Points**, including bonus SP from Wisdom Stones.
- `systems/skills/<skill-slug>`: **one section per skill**: effect, per-level numbers, cooldown, cost, unlock level, **Specializations** (slots at skill level 8 / 12 / 20), which builds use it. Kept small on purpose, because balance patches hit single skills.
- `systems/stigma`: **Stigma** skills, Stigma Shards, slots at character Lv 22 / 27 / 32 / 37, and which Stigmas to slot for PvE vs PvP [gamingtools-character-levels-2026-10, gamingtools-navigator-2026-10].
- `systems/daevanion`: the **Daevanion** board: green nodes (passives), blue nodes (actives), orange nodes (stats), Daevanion Crystals/Fragments, points from Lv 12, and node priority for the class.
- `systems/gear`: gear slots, grades and how to get them, item level and Combat Power, best-in-slot per stage (summary; stage pages give the targets). Global Season 1 has no Heroic gear [playnews-level-cap-2026-09].
- `systems/enhancement`: **Enhancement** (Enhance Stones, rates, failure rules), **Amplify** past +15 (Amplify Stones), **Soul Binding**, plus **what to enhance first and how far, by stage**.
- `systems/stones`: **Manastones**, **Soulstones** and **Theostones**: what each does, which to use for the class.
- `systems/accessories`: accessories and their stat choices; belts and amulets are upgraded only through Substance Morph.
- `systems/arcana`: **Arcana** relics (grails, parchments, compasses, bells, mirrors, scales) from Transcendence: item level, enhancing with duplicates.
- `systems/substance-morph`: **Substance Morph**: converting materials, crystals and fragments into items, and its weekly caps.
- `systems/wings`: **Wings** and flight: Flight Power, wing stats, quest wings by Ascension, Wing Featherdown morphs [nc-global-maint-2026-10-09].
- `systems/pets`: **Pets**: mounts, type effects, Insight levels, **Genus Insight** (Cogni, Fera, Natura, Varian, Special), Pet Transformation with Empathy Candy, and which pets help the class [gamingtools-pet-collection-2026-10, fextralife-pet-guide-2026-10].
- `systems/collections`: account and character stat sources: **Title** (3 equipped), **Achievements**, **Pantheon**, **Empyrean Lord's Monolith**, **Closet** skin collection bonuses [gamingtools-guild-collections-2026-10, nc-global-transfer-items-2026-10].
- `systems/legion`: **Legion** (guild) level bonuses and Legion Hall.
- `systems/consumables`: food, potions, scrolls and buffs for PvE and PvP.
- `systems/ui-and-keybinds`: suggested keybinds, UI setup and settings that matter for the class.
- `systems/macros`: how macros work in-game, and every macro the guide uses (in `:::macro` blocks).

### Leveling: `leveling/…`
One section per **Level bracket**. Max level on Global is **45** [playnews-level-cap-2026-09, fextralife-regions-2026-10; no Official written statement yet]. Brackets cut at the Ascensions, the zone change at 10 and the last Stigma slot [gamingtools-navigator-2026-10, gamingtools-character-levels-2026-10]:

| Bracket id | Levels | Why it starts here |
|---|---|---|
| `leveling/lv-01-05` | 1–5 | Start in Poeta / Ishalgen; skills and SP from Lv 4 |
| `leveling/lv-05-10` | 5–10 | **1st Ascension** → wings and flight; Title (7); Enhancement and Achievements (9) |
| `leveling/lv-10-22` | 10–22 | Move to Verteron / Altgard: pets, Closet, Substance Morph, crafting, gathering, Daeva Pass; Daevanion points (12); Sealed Dungeons, Strongholds (13); Legion, Monolith (16) |
| `leveling/lv-22-32` | 22–32 | **2nd Ascension** (activates Daevanion); Stigma slots 1–2 (22, 27); Krao Cave; Pantheon; Abyss Supply Request (25); Urugugu Canyon and Daily Dungeon (30) |
| `leveling/lv-32-37` | 32–37 | **3rd Ascension** (higher wings and Stigma levels); Stigma slot 3 |
| `leveling/lv-37-45` | 37–45 | Stigma slot 4; Fire Temple |

Open conflict: the expedition entry levels are 22 / 30 / 37 in the client navigator but 20 / 28 / 35 per the 2026-09-04 livestream [gamingtools-navigator-2026-10 vs playnews-level-cap-2026-09]. Write it as a `:::conflict` until it's checked in game.

Each bracket section has:

1. **Target state on arrival**: what you should have when you enter the bracket.
2. Skills and Stigmas to take or upgrade, plus the leveling rotation (`:::play`).
3. Gear to wear and how to get it; what to enhance and how far (and what *not* to spend on yet).
4. Where to level: quests, zones and dungeons, plus alternatives.
5. Systems that unlock here and what to do with them right away.
6. Common mistakes.
7. `:::checklist` for leaving the bracket (`:::play`).

### Endgame: `endgame/…`
At Lv 45 the **4th Ascension** unlocks the endgame: Abyss, Arena, Battlefield, Spacetime Rift, Transcendence, Nightmare, Ascension Trial, Sanctuary, Market, Season Missions, Duty Quests, Arcana, Dimensional Invasion, and Expedition **Conquest** difficulty [gamingtools-navigator-2026-10]. Tiers are cut by **item level**, using the Conquest gates (Tier 1 700, Tier 2 1400, Tier 3 2100, Tier 4 2800, Tier 5 3000) [gamingtools-navigator-2026-10] plus the community-reported gates (Abyss 1000; Ascension Trial 1000/1500/2000; Transcendence 1600/1900/2200/2500; Ludra 2800) [corpus-item-level-2026-10, raidrelay-gear-score-2026-10]:

- `endgame/index`: what endgame means for the class and how the tiers connect.
- `endgame/early`: Lv 45, item level 700–1400. Conquest Tier 1, Abyss entry, Ascension Trial Easy.
- `endgame/mid`: item level 1400–2100. Conquest Tier 2, Transcendence stages 1–2.
- `endgame/advanced`: item level 2100+. Conquest Tier 3+, Transcendence 3–4, Sanctuary (when live).

Each tier has the same seven parts as a bracket, plus: item-level targets, the content it opens up, the daily/weekly routine (Duty Quests, Season Missions, Daily Dungeon, Odyle Energy use), and the resource priorities (what to spend currency and materials on next).

### PvE: `pve/…`
- `pve/build`: skills, Specializations, Stigmas, Daevanion path, stat priority, gear setup.
- `pve/rotation`: single target, AoE, burst windows, opener, Chain Skill usage (`:::play`).
- `pve/macros`: (`:::play`).
- `pve/open-world`: field mobs, elites, field bosses, Dimensional Invasion, Sealed Dungeons and Strongholds.
- `pve/expeditions/<dungeon-slug>`: one per **Expedition** (party dungeon, 1–5 players, Exploration and Conquest difficulties): Krao Cave, Urugugu Canyon, Fire Temple, Draupnir, Vakron Sky Island, Ferocious Horn Den [gamingtools-expeditions-2026-10]. Covers the role, the mechanics that matter to the class, and tips.
- `pve/daily-dungeon`: **Unknown Fissure** (Lv 30, 14 tries a week, Enhance Stones).
- `pve/transcendence`: **Transcendence** (5-player scored stages, Arcana).
- `pve/nightmare`: **Nightmare** (solo seasonal boss ladder).
- `pve/ascension-trial`: **Ascension Trial** (weekly solo time trial, Dungeon Debuffs).
- `pve/sanctuary/<raid-slug>`: **Sanctuary** (10-player weekly raid). No raid is live at the Baseline: Ludra was removed from the launch build [nc-global-sanctuary-ludra-2026-10]. Leave the section out with that note until it returns.
- `pve/party-role`: how the class fits in a party, and which party comps are good.

### PvP: `pvp/…`
- `pvp/fundamentals`: CC types, CC breaks and resists, positioning, defensive cooldowns, PvP stats, PvP Stigma swaps.
- One folder per **Global PvP mode**. Each has `build` (what differs from PvE, and why), `rotation` (openers, burst combo, defensive sequence; `:::play`), `macros` (`:::play`) and `tactics` (positioning, objectives, team role):
  - `pvp/duel`: **Duel** (from the health bar; no deaths, no rewards) [game8-duel-2026-10].
  - `pvp/arena-of-solitude`: 1v1, 10 min, 3 lives [gamingtools-arena-solitude-2026-10].
  - `pvp/arena-of-cooperation`: 5v5, 10 min, 1 life [gamingtools-arena-cooperation-2026-10].
  - `pvp/arena-of-tactics`: 10v10 under equal conditions, Relic cart mode [gamingtools-arena-tactics-2026-10]. Open question: it may be the same content as **Battlefield**. Write one section until that's checked.
  - `pvp/abyss`: **Abyss** (Reshanta: Chaotic Lower / Middle / Upper), Abyss Points, **Artifact Siege**, Abyss Corridor, entry time (7 h max stored) [gamingtools-abyss-2026-10, nc-global-notes-2026-10-14].
  - `pvp/spacetime-rift`: **Spacetime Rift**, the open-world invasion of the enemy continent [nc-global-matchmaking-2026-10].
- `pvp/matchups/<opposing-class>`: one per Global class (8, including the mirror): threats, what to save cooldowns for, the win condition.

### Changelog surface
No section to write. The site builds it from overrides (see `docs/content-model.md`).

---

## Farming & crafting: `world/…`

### Map atlas: `world/maps/<map-slug>`
One per map (Poeta, Ishalgen, Verteron, Altgard, the Reshanta layers, and every other Global zone): level range, materials found there (gathered, looted, vendor), notable spots, farming routes that run through it, contested times/areas, the map itself with its areas named (`::map{map=…}`), field bosses, and links to external maps (ADR-0007).

### Materials: `world/materials/<material-slug>`
One per material that matters (Enhance Stones, Amplify Stones, Stigma Shards, Daevanion Crystals, Wing Featherdown, Odyle Energy, Raw Leather, gathering materials…). For each:
1. What it's used for (recipes, enhancement, Substance Morph), with links.
2. **Every way to get it**: gathering, mob drop, vendor, Substance Morph, dungeon, market. Include numbers where sources give them.
3. **Best spot(s)** with a `world/maps/…` link, plus **alternatives** for when they're contested.
4. Farming route(s) (`:::play`): path, rough loop time, expected yield (cited, or `[!opinion]`).
5. Patch notes that affect it.

### Gathering: `world/gathering/…`
`index` (how **Essence Extraction** works), then one page per gathering type: **Ore, Gem, Log, Herb, Fruit, Vegetable, Aquatic Life, Odyle** (the Global client's node types) [gamingtools-gather-1500004-2026-10]. Each covers the leveling path by tier, best nodes per tier with spots, tools and buffs, time-to-level estimates, and the market listing restriction from 2026-10-14 [nc-global-notes-2026-10-14].

### Crafting: `world/crafting/…`
`index` (how crafting works, crafting progression), then one page per profession: **Blacksmithing, Armorsmithing, Handicrafting, Alchemy, Cooking** [gamingtools-navigator-2026-10]. Each covers the leveling path and `recipes` (key recipes, inputs, outputs). Then `profit`: **Profit checks** for the current patch (dated; prices go stale fast, so always give `last_checked`).

### Economy: `world/economy/…`
`kinah-methods` (ranked ways to make kinah, with time/effort and alternatives), `market` (how the Market works, fees, tips, and that Membership gates parts of the player economy [nc-global-launch-faq-2026-09]), `sinks` (where kinah goes, and what to spend it on first), and `daeva-pass-and-membership` (what the pass and membership are worth).

---

## Left out on Global (as of the Baseline patch)

| Item | Why | Source |
|---|---|---|
| Separate class resource (Rage etc.) for Gladiator/Assassin | They use MP | [gamingtools-gladiator-2026-10, gamingtools-assassin-2026-10] |
| Transformations as a stat system | Only Pet Transformation exists, and it's covered under `systems/pets` | [fextralife-pet-guide-2026-10] |
| Fortress siege | No fortress content on Global. Large-scale objective PvP is the Artifact Siege inside `pvp/abyss` | [gamingtools-navigator-2026-10] |
| Open-world PvP on your own continent | Factions are on paired servers, so cross-faction open-world PvP is the Spacetime Rift | [nc-global-matchmaking-2026-10] |
| Sanctuary raid Ludra | Removed from the launch build, with no return date yet | [nc-global-sanctuary-ludra-2026-10] |
| Brawler class, Lv 46–50, Eltenen/Morheim, Pendant and Seal slots, Snowfield of Sorrow | KR/TW only so far | [nc-kr-notes-2026-07-01, nc-kr-notes-2026-09-09] |
