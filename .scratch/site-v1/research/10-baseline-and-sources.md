# Ticket 10 research: baseline patch and source landscape

Researched 2026-10-16 for the Global / NA-EU service. Every claim has a URL. Source ids in `[brackets]` match the records in `content/sources/`. Labels used below:

- **Official**: NCSOFT's own Global pages (notice board, update board, Steam store page).
- **Data**: values pulled from the Global client (gaming.tools reads Global client 2.0.7.0, last updated 2026-10-14).
- **Community**: fan wikis, guide sites and news sites.
- **KR/TW only**: true on the Korean/Taiwanese service and not confirmed for Global (capped at Community, ADR-0003).

How we read the official boards: the Global site (`aion2.plaync.com/en-us/...`) renders its boards with JavaScript, so WebFetch only sees the page title. We read the same articles as JSON from the board API that the page itself calls (`https://api-global-community.plaync.com/aion2_global/board/<board>/article/<id>`, boards `update_en` and `notice_en`). KR uses `https://api-community.plaync.com/aion2/board/update_ko/...` and TW uses `https://api-community.plaync.com/aion2_tw/board/update_zh/...`. Cite the human-facing `view?articleId=` URL, not the API.

---

## 1. Has AION 2 launched on Global? Publisher, official channels

**Yes.** Advanced (early) access opened on 2026-09-30, and the commercial launch was the maintenance of 2026-10-04 22:00 PDT / 2026-10-05 07:00 CEST.

| Claim | Label | Source |
|---|---|---|
| The "Scheduled Maintenance Sun Oct 4 / Mon Oct 5" notice says "Advanced Access period ends. Commercial launch begins." The maintenance ran 8 hours from 2026-10-04 22:00 PDT / 2026-10-05 07:00 CEST. | Official | [nc-global-maint-2026-10-05] https://aion2.plaync.com/en-us/board/notice/view?articleId=6abfbd8abcc86319892235c4 |
| "Daevas, AION 2 is live!" was posted 2026-10-05 | Official | [nc-global-launch-2026-10] https://aion2.plaync.com/en-us/board/notice/view?articleId=6abe639ea279104f7d9d5f51 |
| The early-access notices "Early Access Start Time" and "Jump Into Advanced Access Now!" are both dated 2026-09-30 | Official | Global notice board, listing read via the API above (article ids 6abd1400c9d0a169e182bb21 and 6abd07d0d97eae18cc40e1c4) |
| Steam lists Developer "NC", Publisher "NC", Release Date "5 Oct, 2026", Steam app 3393110, PC only, Unreal Engine 5 | Official | [steam-aion2-store-2026-10] https://store.steampowered.com/app/3393110/AION_2/ |
| Free to play with an optional monthly membership; Steam and PURPLE have identical content and share servers; KR/TW progress does not carry over; server locations are North America, South America, Europe and Japan; official support covers Windows PC only | Official | [nc-global-launch-faq-2026-09] https://aion2.plaync.com/en-us/board/notice/view?articleId=6ab83e52d97eae18cc40e12b |
| Each Elyos server is paired with an Asmodian server, and cross-faction modes (the Abyss, Spacetime Rifts) match you against players from the paired server | Official | [nc-global-matchmaking-2026-10] https://aion2.plaync.com/en-us/board/notice/view?articleId=6ac10581a279104f7d9d5f4c |
| Server transfers opened with the 2026-10-14 maintenance and are free in the first transfer period | Official | [nc-global-transfer-items-2026-10] https://aion2.plaync.com/en-us/board/notice/view?articleId=6ac932a8fa34c1011d627bc9 |

**Official channels (Global):**

- Official site: https://aion2.plaync.com/en-us/ (title "AION 2-NC").
- Update board (patch notes): https://aion2.plaync.com/en-us/board/update/list. Articles are titled "[Notice] Patch Notes | <date PDT> / <date CEST>".
- Notice board (maintenance, announcements): https://aion2.plaync.com/en-us/board/notice/list.
- An "Update Chronicle" board is in the navigation (`history_en`). It was empty when we read it.
- Support FAQ: https://help.plaync.com/faq/aion2global
- Official Discord: https://discord.gg/aion2official (linked from the official home page, and the Launch FAQ says it has a `bug-reports` channel). The home page also links a second invite, https://discord.gg/FFE9VNKqhF. We don't know what it is.
- Socials linked from the home page: https://x.com/Aion2Official, https://www.twitch.tv/aion2official, https://www.facebook.com/aion2official/, https://www.instagram.com/aion2official
- Steam news mirrors the patch notes. For example, the 2026-10-14 notes are at https://store.steampowered.com/news/app/3393110/view/670631196372238369 (link found via aion2hub; we didn't open it).
- The official character search exists at https://aion2.plaync.com/en-us/characters/index (HTTP 200). We didn't explore it.
- There are **no official forums** for Global beyond the boards above. The FAQ points to Discord. The board config has `free` and `cm_story` boards, but we didn't find any public forum in use.

## 2. Current Live Global patch and patch history

NCSOFT publishes **no version strings** for Global patches. The notes are titled by date only, and neither the KR nor the TW notes carry version numbers. Following `docs/content-model.md`, patch ids therefore use `YYYY-MM-DD-<slug>`. The Global client build that gaming.tools reports, **2.0.7.0**, is a datamined client number and not an official patch name. We record it in notes only.

**Live Global patch: the weekly update of Oct. 13 (PDT) / Oct. 14 (CEST) 2026.** Maintenance started 2026-10-13 23:30 PDT (2026-10-14 06:30 UTC) and was announced at 4 hours. The notes article was posted 2026-10-14 07:00 UTC. Baseline patch id: `2026-10-14-halloween`.

Official notes: [nc-global-notes-2026-10-14] https://aion2.plaync.com/en-us/board/update/view?articleId=6acf20d007b77e214688a7ac (Official). The maintenance notice is "[Notice] Maintenance | Oct. 13 (PDT) / Oct. 14 (CEST) (Completed)", article 6ace8dc0263e537d356d10c3.

Contents of the 2026-10-14 notes (Official, from the article above):

- **Server-transfer shop changes.** "Instant Clear Ticket: Daily Dungeon (Bound)" and "Soul Crystal (Bound)" move to Substance Morph. The 16-per-server weekly limit on "Odyle Energy (Bound)" is removed, and the per-character weekly limit rises from 4 to 20. "Lower Abyss Rift Stone (7-day)" is on sale for two weeks.
- **Class fixes:** Spiritmaster "Summon: Ancient Spirit". Sorcerer "Fire Wall", "Cold Storm" and "Bittercold Wind" (elevation bonus damage, plus Embers/Frostbite being overwritten). There are no Gladiator or Assassin changes.
- **Halloween event "Trick or Treat"**, running until the 2026-11-03 PST / 11-04 CET maintenance. It includes Season Mission > Event tasks covering Abyss, Transcendence, Expedition Conquest, Ascension Trial, Nightmare, Unique gear, scrolls, Dimensional Invasion and Shugo Festival, plus a Coin Merchant in Verteron/Altgard and Candy Keys made by Substance Morph.
- **Abyss changes.** Season Missions "Spend 1 Hour in the Abyss" and "Defeat the Boss Guardian Lord Nahma Once" now reward Abyss Entry Stones. Maximum accumulated Abyss entry time is changed to 7 hours. Stuttering in large Abyss battles is reduced.
- "Standard stats in the Battlefield will be adjusted to bring combat duration to an appropriate level."
- Market listings of gathering materials are now restricted based on gameplay history.

**Global patch history since launch** (all Official, read from the Global boards):

| Date (UTC) | What | URL | Patch-level? |
|---|---|---|---|
| 2026-09-17/18 | Launch Scale Test, max level 37 for the test. Hotfix 2026-09-18. | notices 6aac38b0eea53f5d6dbcf7d9, 6aacb7406b722c561dc6a62b | Pre-launch test, not documented |
| 2026-09-30 | Advanced Access opens | notice 6abd1400c9d0a169e182bb21 | Pre-launch |
| 2026-10-01 | "Maintenance: Sep 30 (Wed)" (23:00 PDT, 1.5 h): Hero Quest object bottleneck fixes | https://aion2.plaync.com/en-us/board/notice/view?articleId=6abd32006b722c561dc6a8fc | Hotfix |
| 2026-10-05 | Launch maintenance: commercial launch; character deletion 168 h → 24 h; deletion minimum level 10 → 1; AFK redirect 30 min → 3 h; five-player boss stats raised; Duty tab fix; Poeta/Ishalgen teleport button | [nc-global-maint-2026-10-05] | Yes (launch) |
| 2026-10-05 | "Update on Sanctuary Raid": Sanctuary Raid: Ludra temporarily removed from the launch build | [nc-global-sanctuary-ludra-2026-10] https://aion2.plaync.com/en-us/board/notice/view?articleId=6ac39140d97eae18cc40e294 | Announcement |
| 2026-10-07 | "[Notice] Patch Notes \| Oct. 6 (PDT) / Oct. 7 (CEST)": Founder's Pack items usable across characters and servers; Sealed Wings → Enhance Stone morph capped at 20 per server per week; more Raw Leather drops in Chaotic Lower Reshanta, Verteron and Altgard; Resurrection Spiritstone added to Wind Breeze Merchants; up to 30 Map Pins | [nc-global-notes-2026-10-07] https://aion2.plaync.com/en-us/board/update/view?articleId=6ac5e6e8d97eae18cc40e34e | Yes |
| 2026-10-09 | Temporary maintenance (Oct 8 23:30 PDT, 1.5 h): Flight Power of the 4 quest wings +500 each. "Daeva's Lesser Wings" 2,000 → 2,500; Intermediate/Superior/Ultimate 500 → 1,000. | [nc-global-maint-2026-10-09] https://aion2.plaync.com/en-us/board/notice/view?articleId=6ac7475738eb0528f90021b1 | Hotfix |
| 2026-10-14 | Weekly patch (see above) | [nc-global-notes-2026-10-14] | **Live** |

Only two articles are on the Global *update* board: the 10-07 and 10-14 notes. Launch-day changes are in the *notice* board's maintenance notices. Because the site starts at the Live patch, we use the 2026-10-14 patch as the Baseline. Earlier changes are history the Baseline already includes.

**Upcoming (Official):** Ludra's return date was promised "by October 16". As of our last read of the notice board (latest article 2026-10-16 05:00 UTC, an account-restrictions notice), no date had been posted. Launch servers get transfers from the 2026-10-20 PDT maintenance until the 2026-10-27 PDT maintenance [nc-global-transfer-items-2026-10]. The producer's letter of 2026-10-09 says content is coming, "starting with Ludra's return and our first seasonal celebrations" [nc-global-producer-letter-2026-10] https://aion2.plaync.com/en-us/board/notice/view?articleId=6ac95cd8d97eae18cc40e3d7 (the letter is an image, which we read).

## 3. KR / TW situation (used to stage patches)

All findings in this section are **KR/TW only**.

| Claim | Source |
|---|---|
| KR official update board: https://aion2.plaync.com/ko-kr/board/update/list. Notes are titled "[안내] M/D(요일) 업데이트 노트", with no version numbers. The earliest note is dated 2025-11-19, which fits a KR launch on 2025-11-19. | KR board read via `api-community.plaync.com/aion2/board/update_ko` |
| Current KR patch: "[안내] 10/14(수) 업데이트 노트", posted 2026-10-13 19:30 UTC, under the banner "AION2 - Chapter 1. 모래와 서리의 땅" (Land of Sand and Frost). It cuts PvP damage by about 30% for all classes to rework melee classes in RvR, and changes Gladiator (검성) and Assassin (살성) skills. | [nc-kr-notes-2026-10-14] https://aion2.plaync.com/ko-kr/board/update/view?articleId=6ace86b86cfe4756db5b8d81 |
| KR "Chapter 1" update of 2026-07-01: max level raised to 50; new class **권성** (Brawler in English fan sources) with the weapon 권갑; new zones Eltenen (엘테넨) and Morheim (모르헤임); Stigma skill max level 20 → 25; new Pendant (펜던트) slot; new Abyss | [nc-kr-notes-2026-07-01] https://aion2.plaync.com/ko-kr/board/update/view?articleId=6a441938c61e9832651f8f0e |
| KR 2026-09-09: new Sanctuary "비탄의 설원" (Snowfield of Sorrow) with Easy/Normal/Hard; new gear slot **Seal (인장)**; Spacetime Rift contest (시공의 균열 쟁탈전) | [nc-kr-notes-2026-09-09] https://aion2.plaync.com/ko-kr/board/update/view?articleId=6aa062386b722c561dc6a46c |
| TW official site: https://tw.ncsoft.com/aion2, update board https://tw.ncsoft.com/aion2/board/update/list. Latest is "[說明] 10/14(三) 更新新聞(更新)" (article 6acea4e328c7452635072b90). TW runs the same chapter (沙霜之地), and its class 拳星 is the counterpart of KR 권성. | TW board read via `api-community.plaync.com/aion2_tw/board/update_zh` |

KR is roughly 10.5 months ahead of Global. Season and chapter milestones on the KR board, per aion2hub's English titles: Season 2 on 2026-01-21, Season 3 on 2026-04-08, Chapter 1 on 2026-07-01, Snowfield of Sorrow on 2026-09-09. Source: https://aion2hub.com/updates (Community; aion2hub's unlabeled "AION 2 Update" entries are KR translations, which its own 2026-09-30 page confirms: "Translated from the official Korean note"). The KR schedule does **not** predict Global timing. Global changed KR content before launch (no Heroic gear in Global Season 1, Ludra reworked; see §5 and §6).

## 4. Source landscape

### Official
See §1. The Global boards are the top source for patch facts. Class balance notes are tables of "Skill Name / Changes".

### Data (game databases and datamines)

| Site | URL | Region | Covers | Reliability |
|---|---|---|---|---|
| gaming.tools AION 2 Global Database | https://aion2.gaming.tools/ | global | Items, NPCs, quests, skills (with per-level values, SP costs, specialties), classes, content (dungeons, arenas, Abyss), regions/maps, gathering, crafting calculator, titles, pets, skins, the in-game Contents Navigator text, progression tables | **High.** States "AION 2 Global version: 2.0.7.0 / Last Updated: October 14, 2026". Pages are server-rendered, so values can be read without JavaScript. It also carries client data for content that isn't live (for example level 46–55 XP rows, a Conquest Tier 6 at level 50, and KR-dated attendance events), and its own flag `availabilityVerified` is `false`. So "present in the client" is not the same as "live on Global". Cross-check level-capped or season-gated content against official notes. |
| aion2hub.com database / updates | https://aion2hub.com/database, https://aion2hub.com/updates | global + kr | Item DB split Global/KR-TW; English translations of KR notes and copies of Global notes | Medium. Fan site. It links the official article for each Global note, so use it to find notes and cite the official link. |
| QuestLog.gg | https://questlog.gg/aion-2/en/db/items | global? | Items, skills | Unknown. Client-rendered, and WebFetch got an empty page. The search snippet showed unrendered labels ("a2.mainCategory.undefined"). |
| DBAion2 | https://dbaion2.ru/en/ | global | Items, NPCs, quests, skills, stigma, crafting, calculators | Not checked. Listed from search only. |
| aion2.app | https://aion2.app/db | global | Items, skills; says it uses "the Official Aion 2 API provided by NCSoft" | Not checked |
| MetaBot.GG | https://metabot.gg/en/aion-2 | global | Gear, skills, monsters with drop rates, hidden cubes; says it reads Global client build 0.0.4387.0 | Not checked. The build number doesn't match gaming.tools'. |
| Inven AION 2 DB (KR) | https://aion2.inven.co.kr/db/ (items https://aion2.inven.co.kr/db/item/, crafting https://aion2.inven.co.kr/db/craft/) | kr | KR items and crafting | KR only. Capped at Community. |

### Creator (established guide writers and streamers)
We found **no creator with a checked track record yet**. These are candidates by channel, with titles read via YouTube oEmbed. Each needs a quality check before its claims are relied on.

| Creator | Channel | Global guides found | Notes |
|---|---|---|---|
| Grobs | https://www.youtube.com/@grobsXO | "The Only Gladiator PVE Guide You Need \| AION 2" (xRPr30JetyY), "The Only Assassin PVE Guide You Need \| AION 2" (bkEWwc0oY0Y) | Both priority classes |
| Arthars Gaming | https://www.youtube.com/@ArtharsGaming | Gladiator Starter Guide (Global Launch) (tYTZ8VucMXw), Assassin guide (Global Launch) (UpvUVK1vnt8) | Both priority classes |
| Sen | https://www.youtube.com/@senqt | "The ONLY Gladiator PvP Guide You Need \| AION 2" (K_rfMNr0auk) | Gladiator PvP |
| Soulgrot | https://www.youtube.com/@Soulgrot | Gladiator PvE full progression guide (aszkM0k9Sy4) | |
| Ulfhednar | https://www.youtube.com/@UlfhednarTV | Gladiator DPS builds (sJIZrF7GSn0, zrdG1XDYUtE) | |
| Nellan97 | https://www.youtube.com/@Nellan97 | "HOW TO DEAL DMG WITH ASSASSIN ON GLOBAL" PvE guide plus an update (jUD63ux4CeU, Rywb7Dbc8G0) | Assassin, Global-specific |
| Keyba | https://www.youtube.com/@Kxyba | Assassin PvP Build Guide (e0HN69hh6p4) | Assassin PvP |
| aLuckyRO | https://www.youtube.com/@aLuckyRo | Assassin PvE builds for Global (DNfd1lZtQkI, YPqMG7Z5TD4) | A search summary noted commenters disputing skill choices |
| Stoopzz (ft. Madsin) | https://www.youtube.com/@Stoopzz | Full class guide PvE and PvP (zjl4szUWX7I) | Madsin is also cited by Corpus for progression plans |
| FRESHY, Aragon, TheWhelps, Wakayashi, NoBS Game Guides | (channels not resolved) | Item-level progression videos cited by Corpus | Leads for endgame tiers |
| Stella (parallaxstella), Gator, Void | Official broadcast hosts | Official livestreams on https://www.twitch.tv/aion2official | Official broadcasts, per the producer's letter |

Guide websites seen often in search: Fextralife wiki https://aion2.wiki.fextralife.com/ (Community; page dates of 2026-10-09; useful), Game8 https://game8.co/games/Aion-2/ (Community), aion2maps.com, corpus.gg, raidrelay.com. **Treat these with care:** expcarry, eloboost24, skycoach, aoeah, mmogah, mmoexp, playerauctions, odealo and other gold/boost sellers that publish SEO guides. Many low-quality AI-written guide domains (aion2-wiki.wiki, aion2guide.site and similar) also turn up. Avoid them unless nothing else exists.

### Community

| Site | URL | Region | Covers | Reliability |
|---|---|---|---|---|
| Inven AION 2 | https://aion2.inven.co.kr/ | kr | News, DB, boards. Free board https://www.inven.co.kr/board/aion2/6388, Tips & know-how https://www.inven.co.kr/board/aion2/6444, PvP talk https://www.inven.co.kr/board/aion2/6492, Balance https://www.inven.co.kr/board/aion2/6545 | KR only. Deepest community. |
| Inven Gladiator (검성) board | https://www.inven.co.kr/board/aion2/6448 | kr | Gladiator posts and guides | KR only |
| Inven Assassin (살성) board | https://www.inven.co.kr/board/aion2/6449 | kr | Assassin posts and guides | KR only |
| Reddit | (not confirmed) | global | | **Not checked.** reddit.com blocked both our fetch (HTTP 403) and the search tool, so we couldn't confirm the subreddit's name or activity. |
| Official Discord | https://discord.gg/aion2official | global | Bug reports, moderators, announcements | Official server, but messages are Community-tier and usually not publicly linkable |
| Fextralife AION 2 wiki | https://aion2.wiki.fextralife.com/ | global | Regions, pets, builds, patch notes | Community. Editable wiki with page update dates. |

## 5. **(confirm)** items in the outline

| Outline item | Exists on Global? | In-game name | Label | Source |
|---|---|---|---|---|
| `systems/class-mechanic` | No separate class resource for Gladiator or Assassin: both use **MP** as their "Skill resource". Skills include a **Chain Skill** category ("Opening Skill" → chains into follow-ups); for example, Gladiator "Keen Strike" restores 100 MP and chains into "Rupture Strike". | MP; Chain Skill | Data | [gamingtools-gladiator-2026-10] https://aion2.gaming.tools/classes/gladiator, [gamingtools-assassin-2026-10] https://aion2.gaming.tools/classes/assassin, [gamingtools-keen-strike-2026-10] https://aion2.gaming.tools/skills/11020000 |
| `systems/skill-upgrades` | Yes, three layers. (1) **Skill Points** level up Active and Passive skills, with extra SP from **Wisdom Stones** (Sealed Dungeons, Regional Quests). (2) **Specialties / Specialization Slots** per skill, unlocked at skill level 8, 12 and 20 (Keen Strike example). (3) **Stigma** skills, levelled with **Stigma Shards**, with slots at character level 22, 27, 32 and 37 (4 slots by 37). Daevanion and gear properties can also raise skill levels. | Skill, Specialization, Stigma | Data + Official (the transfer notice lists "Skills / Stigmas") | [gamingtools-navigator-2026-10] https://aion2.gaming.tools/progression/tracks, [gamingtools-character-levels-2026-10] https://aion2.gaming.tools/progression/character, [gamingtools-keen-strike-2026-10], [nc-global-transfer-items-2026-10] |
| `systems/sockets` | Yes. Gear takes **Manastones** and **Soulstones** ("Imbue gear with special properties") and **Theostones** ("Apply special abilities to gear"). Enhancement also has **Amplify** (gear past +15 needs Amplify Stones) and **Soul Binding**. | Manastone, Soulstone, Theostone | Data + Official (Lesser Manastone and Lesser Soulstone appear in the Daeva Pass notice; Theostones in the transfer notice) | [gamingtools-navigator-2026-10], [nc-global-transfer-items-2026-10] |
| `systems/wings` | Yes. Basic wings and flight come from the Ascension quest in Poeta/Ishalgen (Lv 5). "Each pair of wings has additional stats." Wings drop whole or are morphed from Wing Featherdown via Substance Morph. Quest wings have **Flight Power** values (buffed 2026-10-09). | Wings; Flight Power | Data + Official | [gamingtools-navigator-2026-10], [nc-global-maint-2026-10-09] |
| `systems/transformations` | **Not as a stat system.** The only transformation found is **Pet Transformation**: equip a pet at Insight level 3 and use an **Empathy Candy** to transform for 5 minutes, with skills usable and no mounting. Empathy Candy exists as a pet-collection reward in client data. The appearance system with stats is the **Closet**: skins have **Skin Collection Bonuses** and "Closet - Collection Points". | Pet Transformation (under Pets); Closet | Community (transformation) / Data + Official (Closet) | [fextralife-pet-guide-2026-10] https://aion2.wiki.fextralife.com/Pet_Guide, [gamingtools-pet-collection-2026-10] https://aion2.gaming.tools/progression/pets, [gamingtools-guild-collections-2026-10] https://aion2.gaming.tools/progression/guild, [nc-global-transfer-items-2026-10] |
| `systems/collections` | Yes, as several named systems rather than one "codex". **Title** (equip up to 3 for stat effects, from Lv 7), **Achievements**, **Pantheon** (place decorations that "provide effects", Lv 22), **Empyrean Lord's Monolith** (resonate Empyrean Traces for amulet enhancement and Daevanion points, Lv 16), **Pet Genus Insight** (Cogni, Fera, Natura, Varian, Special), **Closet** skin collection. All of them transfer between servers as account or character progress. | Title, Pantheon, Monolith, Genus Insight, Closet | Data + Official | [gamingtools-navigator-2026-10], [nc-global-transfer-items-2026-10] |
| `systems/daevanion` | Yes. **Daevanion** is "a growth board that enhances character stats and skills". Daevanion Crystals or Fragments are registered on nodes: green nodes raise passive skills, blue nodes active skills, orange nodes stats. The board is listed at Lv 13, and the text says the 2nd Ascension (Lv 22) "activates the Daevanion Board". Daevanion points accrue from Lv 12 (4 per level). | Daevanion | Data + Official | [gamingtools-navigator-2026-10], [gamingtools-character-levels-2026-10], [nc-global-transfer-items-2026-10] |
| `pve/raids/<raid-slug>` | The mode exists: **Sanctuary**, "a 10-player raid mode that is available on a weekly basis" (Lv 45). **No raid is live at the Baseline**: "Sanctuary Raid: Ludra will be temporarily removed with the full launch build". The client calls it "Abyssal Forge: Ludra". KR has a second Sanctuary (비탄의 설원), which is KR only. | Sanctuary | Official + Data | [nc-global-sanctuary-ludra-2026-10], [gamingtools-navigator-2026-10] |
| PvP: `1v1` (duels) | Yes. "Challenge to Duel" from a player's health bar; no deaths (the winner brings the opponent to about 10% HP); 10-second out-of-bounds forfeit; no rewards. | Duel | Community (allthings.how reads as derived from Game8, so the two are not independent) | [game8-duel-2026-10] https://game8.co/games/Aion-2/archives/630611, [allthingshow-duel-2026-10] |
| PvP: arena types | Yes, three. **Arena of Solitude**: 1v1, 10 min, 3 lives, map Fire Temple Arena. **Arena of Cooperation**: 5v5, 10 min, 1 life. **Arena of Tactics**: 10v10 "under equal conditions", mode "Relic cart", map Odyle Shard Cradle, with opening hours. All are solo queue and reward Abyss Points. The Arena is seasonal with ranked season rewards. | Arena of Solitude / Cooperation / Tactics | Data + Official (Arena Season Rank Points in the transfer Q&A) | [gamingtools-arena-solitude-2026-10], [gamingtools-arena-cooperation-2026-10], [gamingtools-arena-tactics-2026-10], [nc-global-transfer-qa-2026-10] |
| PvP: `battlegrounds` | Yes: **Battlefield**, "A 10 vs 10 battle conducted under equal conditions … following the rules of each game mode", opened from Main Menu > Battlefield. Its description is the same as Arena of Tactics, so they appear to be the same content (see open questions). The 2026-10-14 notes adjust "Standard stats in the Battlefield". | Battlefield | Data + Official | [gamingtools-navigator-2026-10], [nc-global-notes-2026-10-14] |
| PvP: `abyss` | Yes. **Abyss** (Reshanta), Lv 45: open faction PvP. Abyss Points come from kills and monsters. **Artifact Siege** runs at set times, and an **Abyss Corridor** opens for the winning side. Content entries: Chaotic Lower, Middle and Upper Reshanta. The Abyss has entry time, capped at 7 hours accumulated. Abyss boss: Guardian Lord Nahma. | Abyss; Artifact Siege; Abyss Corridor | Official + Data | [gamingtools-navigator-2026-10], [gamingtools-abyss-2026-10] https://aion2.gaming.tools/activities/abyss, [nc-global-notes-2026-10-14], [nc-global-transfer-qa-2026-10] |
| PvP: `open-world` | Partly. Factions live on separate servers, so open-world PvP happens through **Spacetime Rift**: portals that open at intervals and let you enter the enemy continent for a limited time, clear its Sealed Dungeons and Strongholds, and fight its players and guards. | Spacetime Rift | Official + Data | [nc-global-matchmaking-2026-10], [gamingtools-navigator-2026-10] |
| PvP: `siege` / fortress | **No fortress siege found on Global.** The Global client's content list has no fortress content; large-scale objective PvP is the **Artifact Siege** inside the Abyss. A community guide says outright "AION 2 has no fortress sieges like AION 1". | (Artifact Siege) | Data (absence) + Community | [gamingtools-navigator-2026-10]; https://wikily.gg/aion-2/abyss (search snippet only, not registered) |

**Systems and modes missing from the outline (all exist on Global):**

| System or mode | What it is | Label | Source |
|---|---|---|---|
| **Ascension** (1st–4th, at Lv 5, 22, 32, 45) | Story gates driven by the Daeva Gauge. Each unlocks abilities or gear: 2nd → Daevanion board, 3rd → higher wings and Stigma levels, 4th → higher wings | Data | [gamingtools-navigator-2026-10] |
| **Arcana** | Relics (grails, parchments, compasses, bells, mirrors, scales) from Transcendence. Equipping them raises item level; they are enhanced with duplicates. | Data + Official | [gamingtools-navigator-2026-10], [nc-global-transfer-items-2026-10] |
| **Item level and Combat Power** | Item level gates Conquest tiers (700/1400/2100/2800/3000) | Data | [gamingtools-navigator-2026-10] |
| **Substance Morph** | Converts materials, crystals and fragments into items. Belts and Amulets upgrade only through it. Wings come from Featherdown. | Data + Official | [gamingtools-navigator-2026-10], [nc-global-notes-2026-10-07] |
| **Enhancement** (the in-game name for enchanting) | Enhance Stones; Amplify after +15; Soul Binding | Data | [gamingtools-navigator-2026-10] |
| **Legion** | Guild system with a Legion Hall. Legion levels grant bonuses: EXP, HP, MP, Evasion, Accuracy, Attack and Defense bonuses. | Data + Official | [gamingtools-guild-collections-2026-10], [nc-global-transfer-items-2026-10] |
| **Pets** (already in the outline, now confirmed) | Mounts with type effects; Insight levels from pet Souls; Genus Insight | Data + Official | [gamingtools-navigator-2026-10], [nc-global-transfer-items-2026-10] |
| **Expedition** (Exploration / Conquest difficulties) | Party dungeons, 1–5 players: Krao Cave, Urugugu Canyon, Fire Temple, Draupnir, Vakron Sky Island, Ferocious Horn Den (plus Deus Research Base and Shattered Arkanis in the client list). Rewards come from the Odyle Energy Cube, which needs Odyle Energy. | Data + Official | [gamingtools-expeditions-2026-10] https://aion2.gaming.tools/activities/party, [gamingtools-navigator-2026-10] |
| **Transcendence** | Weekly or seasonal 5-player scored stages that grant Arcana | Data + Official | [gamingtools-navigator-2026-10], [nc-global-notes-2026-10-14] |
| **Nightmare** | Solo seasonal boss-ladder challenge; Phantasmal Fragments | Data + Official | same |
| **Ascension Trial** | Weekly solo time trial with Dungeon Debuffs | Data + Official | same |
| **Daily Dungeon: Unknown Fissure** | Lv 30, up to 14 tries a week, gives Enhance Stones | Data | [gamingtools-navigator-2026-10] |
| **Sealed Dungeons, Strongholds** | Hidden world dungeons and camps with sweep missions; Wisdom Stones | Data | same |
| **Dimensional Invasion, Shugo Festival** | Scheduled world events and mini-games; Centuryroot Tokens for the Festival Shop | Data + Official | same, [nc-global-notes-2026-10-14] |
| **Duty Quests, Season Missions, Abyss Supply Request, Regional Quests** | Daily, weekly and seasonal task systems feeding resources and Abyss Points | Data + Official | same |
| **Gathering / Crafting** | Gathering via **Essence Extraction** skills for Ore, Gem, Log, Herb, Cooking Ingredient and Odyle. Crafting professions: **Blacksmithing, Armorsmithing, Handicrafting, Alchemy, Cooking**. | Data | [gamingtools-navigator-2026-10] |
| **Daeva Pass, Membership** | Battle pass and optional membership (membership gates the player economy and currency exchange) | Official | [nc-global-launch-faq-2026-09] |

KR/TW-only systems that are **not** on Global yet: the Brawler/권성 class, levels 46–50, Eltenen and Morheim, the Pendant slot and Seal (인장) slot, the 비탄의 설원 Sanctuary, and the Spacetime Rift contest [nc-kr-notes-2026-07-01; nc-kr-notes-2026-09-09]. The Global client's navigator list does include a "Seals" entry with no level requirement, so Seals may already be in the Global client but switched off (open question).

## 6. Max level, Level-bracket milestones and Endgame tiers

**Max level on Global is 45.** This is Community-sourced, plus Data that points the same way. We found **no Official statement of the cap** on the Global boards. The only official "Max level" text is the Launch Scale Test's temporary cap of 37 (notice 6a8ded386b722c561dc6a1a0).

- Playnews quotes the official "Dungeon Live Gameplay Showcase" (YouTube/Twitch, 2026-09-04): "max level at launch will be uh 45" [playnews-level-cap-2026-09] https://www.playnews.gg/en/news/aion-2-dungeon-livestream-confirms-level-cap-of-45-and-no-heroic-items-in-season-1 (Community; it quotes an Official VOD at https://www.twitch.tv/videos/2865139862, **which we didn't watch**).
- Fextralife Regions gives Verteron/Altgard as 10–45 and Chaotic Lower Reshanta as 45 [fextralife-regions-2026-10] https://aion2.wiki.fextralife.com/Regions (Community).
- Data: in the Global client's Contents Navigator, the 4th Ascension and every endgame unlock sit at Lv 45. The class build data on gaming.tools labels the endgame builds "Level 45 to 45" [gamingtools-navigator-2026-10; gamingtools-gladiator-2026-10]. The client also has rows up to Lv 55 and a few Lv 50 entries (Conquest Tier 6, Growth Support). These match the KR level-50 expansion, which is KR only.
- Same livestream (via Playnews): **no Heroic-grade gear, crafted or dropped, in Global Season 1**.

**Level-bracket milestones** (all Data, [gamingtools-navigator-2026-10] for unlocks and [gamingtools-character-levels-2026-10] for Stigma slots and Daevanion points, unless marked):

| Lv | Milestone |
|---|---|
| 1 | Start in Poeta (Elyos) / Ishalgen (Asmodian) |
| 4 | Skill menu; Skill Points begin |
| 5 | **1st Ascension** → Wings and flight |
| 7 | Title |
| 9 | Enhancement; Achievements |
| 10 | **Move to Verteron / Altgard** (Fextralife: Poeta/Ishalgen 1–10, Verteron/Altgard 10–45, Community). Pets, Closet, Substance Morph, Crafting, Gathering, Daeva Pass, Attendance. |
| 12 | Daevanion points begin; Regional Missions |
| 13 | Daevanion board (navigator entry); Sealed Dungeons; Strongholds; Shugo Festival |
| 16 | Legion; Empyrean Lord's Monolith |
| 22 | **2nd Ascension** (activates the Daevanion board); **Stigma slot 1**; Expedition Krao Cave (Exploration); Pantheon |
| 25 | Abyss Supply Request |
| 27 | Stigma slot 2 |
| 30 | Expedition Urugugu Canyon; Daily Dungeon (Unknown Fissure) |
| 32 | **3rd Ascension** (higher-tier wings, Stigma levels); Stigma slot 3 |
| 37 | Expedition Fire Temple (Extendable Weapons); Stigma slot 4 |
| 45 | **4th Ascension**; cap. Abyss, Arena, Battlefield, Spacetime Rift, Transcendence, Nightmare, Ascension Trial, Sanctuary, Market, Season Missions, Duty Quests, Arcana, Dimensional Invasion, Conquest difficulty |

**Conflict: expedition levels.** The client's navigator puts Krao Cave, Urugugu Canyon and Fire Temple at 22, 30 and 37. Playnews quotes the 2026-09-04 livestream as 20, 28 and 35 ("crowd cave will come at level 20, then … Urugu Canyon at 28, Fire Temple at 35"). The navigator levels may be when the guide entry appears rather than the entry requirement. Check in game or on each dungeon's gaming.tools page.

**Suggested bracket cuts:** `lv-01-05`, `lv-05-10`, `lv-10-22`, `lv-22-32`, `lv-32-37`, `lv-37-45`. They cut at the Ascensions (5, 22, 32, 45), the zone change at 10 and the last Stigma slot plus Fire Temple at 37. The community guide that splits the main story at about 22, 32 and 45 matches the Ascension gates (search snippet from gametruth.com, not registered).

**Endgame tiers (item level).** The Data gates are the Conquest tiers: Tier 1 at 700, Tier 2 at 1400, Tier 3 at 2100, Tier 4 at 2800, Tier 5 at 3000, and Tier 6 at 3800 at Lv 50, which is KR or future [gamingtools-navigator-2026-10]. Community guides add more gates: Abyss at 1000; Ascension Trial Easy at 1000, Normal at 1500, Hard at 2000; Transcendence stages at 1600, 1900, 2200 and 2500; Ludra at 2800 [corpus-item-level-2026-10] https://corpus.gg/blog/aion-2/gear-score-guide, [raidrelay-gear-score-2026-10] https://raidrelay.com/aion-2-gear-score-guide. Both say they read the Global client, and they agree on these values. Raid Relay: "Endgame starts at 2,100." Corpus's roadmap: 45→1000, 1000→1400, 1400→2100 (the "energy phase"), 2100→2800.

Suggested tiers (author's reasoning, built from the Data gates):

- **Early endgame:** Lv 45 and item level 700–1400. Conquest Tier 1, Abyss entry and Ascension Trial Easy.
- **Mid endgame:** item level 1400–2100. Conquest Tier 2 and Transcendence stages 1–2.
- **Advanced endgame:** item level 2100+. Conquest Tier 3 and up, Transcendence stages 3–4, and Sanctuary (Ludra, when it returns, 2800).

## 7. Classes on Global

Eight classes. All are open to both factions.

| Class | Weapon | Role (client) | Source |
|---|---|---|---|
| Gladiator | Greatsword | Tank, DPS | Data [gamingtools-classes-2026-10] https://aion2.gaming.tools/classes; Official name [nc-global-skins-2026-10] |
| Templar | | Tank | same |
| Assassin | Dagger (dual) | DPS | same |
| Ranger | | DPS | same |
| Sorcerer | | DPS | same |
| Spiritmaster | | DPS | same |
| Cleric | | Healer | same |
| Chanter | | Healer, DPS | same |

The 2026-10-13 PDT skin notice lists class-only items for exactly these eight names ("Available only to Gladiator class players"…) [nc-global-skins-2026-10] https://aion2.plaync.com/en-us/board/notice/view?articleId=6abe639e6cfe4756db5b8d1a (Official). The 9th class, 권성 / 拳星 (Brawler), is **KR/TW only** [nc-kr-notes-2026-07-01]. Matchup pages: 8 for each class, one of them the mirror match.

---

## Confidence tally (rough)

Counting the distinct claims in the tables above: about **58 Verified** (an Official or Global Data source) and about **9 Community**. The Community claims are the max level of 45, the duel rules, Pet Transformation, the Fextralife zone levels, the expedition-level conflict, the community item-level gates (Abyss 1000, Transcendence stages, Ascension Trial tiers), the no-fortress-siege statement, and the 9 KR/TW-only claims (counted separately, capped at Community). Creator sources: 0 checked so far.

## Open questions

1. **Max level 45 has no Official written source.** Watch the 2026-09-04 VOD (https://www.twitch.tv/videos/2865139862) at the level-cap segment and register it with a timestamp, or find a Global notice that states it.
2. **Ludra return date.** It was promised "by October 16" and hadn't been posted by 2026-10-16 05:00 UTC. Recheck the notice board, because it will drive the first Staged patch.
3. **Arena of Tactics vs Battlefield.** The descriptions are identical (10v10). Are they the same queue under two menu names? Treat them as one mode (`pvp/battlefield`) until checked in game.
4. **Expedition entry levels:** 20/28/35 (livestream) or 22/30/37 (navigator)?
5. **Conquest Tiers 4 and 5 (2800/3000):** are they open on Global now, or only in the client?
6. **Seals (인장), Godstone combining, "Holy Artifact" and Chaotic Upper/Middle Reshanta** are in the Global client lists. Are they live on Global? Seals were added in KR on 2026-09-09.
7. **Daevanion unlock level:** the navigator lists the board at 13, but its 2nd Ascension text says the 2nd Ascension (Lv 22) "activates the Daevanion Board". Check in game.
8. **Reddit:** we couldn't reach it (blocked). Confirm the subreddit's name and activity by hand.
9. **Creators:** no track record checked yet. Ticket 12/13 should vet Grobs, Arthars Gaming, Sen, Nellan97 and Keyba before relying on them.
10. **The second Discord invite** on the official home page (https://discord.gg/FFE9VNKqhF) is unidentified.
11. **Patch id stability:** if NCSOFT starts publishing version strings, new patches can use them, but the Baseline id `2026-10-14-halloween` must stay.
