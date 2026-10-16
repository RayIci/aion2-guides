# Guide outline

The required section tree for every guide. A guide is complete when every section below exists, or has been deliberately left out with a one-line note in its parent's `index.md` explaining why (e.g. "AION 2 has no wings on Global yet [@source]").

Items marked **(confirm)** are systems we expect from AION 1/2 knowledge but haven't checked yet. Research confirms each one exists on Global (and renames it to the in-game name) or leaves it out with that note. Never write a section for a system just because it existed in AION 1.

Section ids follow `docs/content-model.md`. `<class>` is e.g. `gladiator`.

---

## Class guide: `classes/<class>/`

### Overview: `overview`
Role, strengths/weaknesses, difficulty, playstyle, how it plays in PvE vs PvP, who should pick it, and a summary of how it performs in the current patch. `play: false`.

### Systems reference: `systems/…`
Reference pages, true across every stage. Later stages link here instead of repeating it.

- `systems/stats`: every stat that matters to the class, what it does, soft/hard caps.
- `systems/class-mechanic`: the class's resource or mechanic (e.g. Rage, stances, combos) **(confirm)**.
- `systems/skills/index`: skill list overview, how skills unlock, the upgrade system.
- `systems/skills/<skill-slug>`: **one section per skill**: effect, numbers, cooldown, cost, unlock level, upgrade paths, which builds use it. Kept small on purpose, because balance patches hit single skills.
- `systems/skill-upgrades`: the skill enhancement / specialization / stigma-like system **(confirm)**.
- `systems/gear`: gear slots, gear tiers and how to get them, sets, best-in-slot for each stage (summary; stage pages give the targets).
- `systems/enchanting`: enchant system, rates, failure rules, materials, **what to enchant first and how far, by stage**.
- `systems/sockets`: manastones / gems / socketing equivalents **(confirm)**.
- `systems/accessories`: accessories and their stat choices.
- `systems/pets`: pet system, which pets help this class, how to get them.
- `systems/wings`: wings, flight, and their stats/effects **(confirm)**.
- `systems/transformations`: transforms/appearance systems with stats **(confirm)**.
- `systems/collections`: collections, titles, codex and other account-wide stat sources **(confirm)**.
- `systems/consumables`: food, potions, scrolls, buffs for PvE and PvP.
- `systems/daevanion`: board/tree-style passive progression **(confirm)**.
- `systems/ui-and-keybinds`: suggested keybinds, UI setup and settings that matter for the class.
- `systems/macros`: how macros work in-game and every macro the guide uses (with `:::macro` blocks).

### Leveling: `leveling/…`
One section per **Level bracket** (`leveling/<bracket-slug>`, e.g. `leveling/lv-01-10`). Brackets are cut at in-game milestones (a new skill tier, gear tier, zone or system unlock), never at round numbers. Each bracket section has:

1. **Target state on arrival**: what you should have when you enter the bracket.
2. Skills to take/upgrade, and the leveling rotation (`:::play`).
3. Gear to wear and how to get it; what to enchant and how far (and what *not* to spend on yet).
4. Where to level: quests/zones/dungeons, plus alternatives.
5. Systems that unlock here and what to do with them right away (pets, wings, professions…).
6. Common mistakes.
7. `:::checklist` for exiting the bracket (`:::play`).

### Endgame: `endgame/…`
- `endgame/index`: what "endgame" means for the class and how the tiers connect.
- `endgame/early`, `endgame/mid`, `endgame/advanced`: each **Endgame tier** has the same seven parts as a bracket, plus: gear score/item-level targets, the content this tier opens up, the daily/weekly routine, and the resource priorities (what to spend currency/materials on next).

### PvE: `pve/…`
- `pve/build`: skills, skill upgrades, stat priority, gear setup.
- `pve/rotation`: single target, AoE, burst windows, opener (`:::play`).
- `pve/macros`: (`:::play`).
- `pve/solo-and-open-world`: field mobs, elites, field bosses.
- `pve/dungeons/<dungeon-slug>`: one per dungeon: role, mechanics that matter to the class, tips.
- `pve/raids/<raid-slug>`: one per raid/large-group content **(confirm)**.
- `pve/party-role`: how the class fits in a party, which party comps are good.

### PvP: `pvp/…`
- `pvp/fundamentals`: CC types, CC breaks/resists, positioning, defensive cooldowns, PvP stats.
- `pvp/<mode>/…` for **every** PvP mode on Global. Expected modes (confirm each, and add any that are missing): `1v1` (duels), each arena type separately (e.g. `arena-1v1`, `arena-team`…), `abyss`, `open-world`, `siege` / fortress battles, `battlegrounds` **(confirm)**. Each mode has:
  - `build`: what differs from the PvE build, and why.
  - `rotation`: openers, burst combo, defensive sequence (`:::play`).
  - `macros`: (`:::play`).
  - `tactics`: positioning, objectives, team role.
- `pvp/matchups/<opposing-class>`: one per class: threats, what to save cooldowns for, the win condition.

### Changelog surface
No section to write. The site builds it from overrides (see `docs/content-model.md`).

---

## Farming & crafting: `world/…`

### Map atlas: `world/maps/<map-slug>`
One per map: level range, materials found there (gathered, looted, vendor), notable spots, farming routes that run through it, contested times/areas, links to external maps (ADR-0005).

### Materials: `world/materials/<material-slug>`
One per material that matters. For each:
1. What it's used for (recipes, enchanting, upgrades), with links.
2. **Every way to get it**: gather / mob drop / vendor / exchange / dungeon / market, with numbers where sources give them.
3. **Best spot(s)** with a `world/maps/…` link, plus **alternatives** for when contested.
4. Farming route(s) (`:::play`): path, rough loop time, expected yield (cited, or `[!opinion]`).
5. Patch notes that affect it.

### Gathering: `world/gathering/…`
`index` (how gathering works), then per **Profession**: leveling path by tier, best nodes per tier with spots, tools/buffs, and time-to-level estimates.

### Crafting: `world/crafting/…`
`index` (how crafting works, crafting progression), per profession: leveling path, `recipes` (key recipes, inputs, outputs), then `profit`: **Profit checks** for the current patch (date-stamped; prices go stale fast, so always give `last_checked`).

### Economy: `world/economy/…`
`kinah-methods` (ranked ways to make kinah, with time/effort and alternatives), `market` (how the market/broker works, fees, tips), `sinks` (where kinah goes, and what to spend it on first).
