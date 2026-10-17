# Source directory

Concrete sites and people, for each tier in `docs/sourcing.md`. Agents add rows as they find reliable sources and remove rows that turn out unreliable, noting why.

**Status: seeded 2026-10-16** from the ticket 10 research (`.scratch/site-v1/research/10-baseline-and-sources.md`). Rows marked *vetted* were opened and checked. The rest are leads.

## How to read the official boards

The Global site renders its boards with JavaScript, so a plain fetch only sees the page title. Read articles as JSON from the API that the page itself calls, and **cite the human-facing `view?articleId=` URL**:

- Global: `https://api-global-community.plaync.com/aion2_global/board/<board>/article/<id>` with boards `update_en` (patch notes) and `notice_en` (maintenance, announcements). The title is at `article.contentMeta.title`, and the post date at `article.contentMeta.timestamps.postedAt`.
- KR: `https://api-community.plaync.com/aion2/board/update_ko/article/<id>`. TW: `https://api-community.plaync.com/aion2_tw/board/update_zh/article/<id>`.
- Listing (`…/article` without an id) returns only the 10 latest articles, and paging parameters are ignored.

gaming.tools and several fan sites sit behind a Cloudflare challenge that blocks curl and WebFetch. A headless Chromium (Playwright) that waits about 6 s after load gets through.

## Official

| Name | URL | Region | Covers | Notes |
|---|---|---|---|---|
| Global update board (patch notes) | https://aion2.plaync.com/en-us/board/update/list | global | Patch notes, titled "[Notice] Patch Notes \| <date PDT> / <date CEST>" | *vetted*. No version strings, so patch ids use dates. |
| Global notice board | https://aion2.plaync.com/en-us/board/notice/list | global | Maintenance notices (launch-day changes are here), events, shop, server info | *vetted* |
| Support FAQ | https://help.plaync.com/faq/aion2global | global | Account, payment, client | lead |
| Official Discord | https://discord.gg/aion2official | global | Announcements, bug reports | Messages count as Community tier and are rarely linkable |
| Official Twitch (VODs) | https://www.twitch.tv/aion2official | global | Livestreams, e.g. the 2026-09-04 Dungeon showcase (VOD 2865139862) | Cite with a timestamp |
| Steam store and news | https://store.steampowered.com/app/3393110/AION_2/ | global | Release facts; news mirrors the patch notes | *vetted* |
| KR update board | https://aion2.plaync.com/ko-kr/board/update/list | kr | KR patch notes ("[안내] M/D(요일) 업데이트 노트"), about 10.5 months ahead of Global | *vetted*. The basis for **Staged** patches (ADR-0003). |
| TW update board | https://tw.ncsoft.com/aion2/board/update/list | tw | TW patch notes | lead |

## Data

| Name | URL | Region | Covers | Reliability notes |
|---|---|---|---|---|
| gaming.tools AION 2 Global DB | https://aion2.gaming.tools/ | global | Classes, skills (per-level values, specializations), items, content (expeditions, arenas, Abyss), Contents Navigator (`/progression/tracks?tab=guide`), character progression, pets, guild, gathering, crafting | *vetted*. **High.** It reads Global client 2.0.7.0 (updated 2026-10-14). Caveat: the client also contains content that isn't live (Lv 46–55 rows, Conquest Tier 6, KR events). "In the client" doesn't mean "live on Global", so cross-check gated content against official notes. |
| aion2hub | https://aion2hub.com/database, https://aion2hub.com/updates | global + kr | Item DB split Global/KR-TW; English translations of KR notes | Medium. Use it to *find* notes, then cite the official article. |
| DBAion2 | https://dbaion2.ru/en/ | global | Items, NPCs, quests, skills, stigma, crafting | lead, not checked |
| aion2.app | https://aion2.app/db | global | Items, skills; says it uses the official NCSOFT API | lead, not checked |
| MetaBot.GG | https://metabot.gg/en/aion-2 | global | Gear, skills, monster drop rates | lead. Its client build (0.0.4387.0) doesn't match gaming.tools. |
| QuestLog.gg | https://questlog.gg/aion-2/en/db/items | global? | Items, skills | Unreliable fetch (renders client-side, unrendered labels seen) |
| Inven AION 2 DB | https://aion2.inven.co.kr/db/ | kr | KR items, crafting | KR only, capped at Community |

## Creator

None vetted yet. Vet each one against Data/Official sources before relying on it (tickets 13 and 20).

| Creator | Channel | Covers |
|---|---|---|
| Grobs | https://www.youtube.com/@grobsXO | Gladiator PvE, Assassin PvE (Global) |
| Arthars Gaming | https://www.youtube.com/@ArtharsGaming | Gladiator and Assassin starter guides (Global launch) |
| Sen | https://www.youtube.com/@senqt | Gladiator PvP |
| Soulgrot | https://www.youtube.com/@Soulgrot | Gladiator PvE progression |
| Ulfhednar | https://www.youtube.com/@UlfhednarTV | Gladiator DPS builds |
| Nellan97 | https://www.youtube.com/@Nellan97 | Assassin PvE on Global |
| Keyba | https://www.youtube.com/@Kxyba | Assassin PvP |
| aLuckyRO | https://www.youtube.com/@aLuckyRo | Assassin PvE (commenters disputed skill choices) |
| Stoopzz (ft. Madsin) | https://www.youtube.com/@Stoopzz | Full class guides PvE/PvP |

## Community

| Name | URL | Region | Covers | Reliability notes |
|---|---|---|---|---|
| Fextralife AION 2 wiki | https://aion2.wiki.fextralife.com/ | global | Regions, pets, builds | *vetted* pages exist. Editable wiki with update dates. |
| Game8 | https://game8.co/games/Aion-2/ | global | Mechanics explainers (e.g. duels) | *vetted*. Other sites copy it (allthings.how), so copies are not independent. |
| Corpus | https://corpus.gg/blog/aion-2/gear-score-guide | global | Item-level thresholds | *vetted*. Says it reads the client. |
| Raid Relay | https://raidrelay.com/aion-2-gear-score-guide | global | Gear-score progression | *vetted*. Agrees with Corpus. |
| Corpus class builds | https://corpus.gg/blog/aion-2/gladiator-pve-build (also assassin, macros, daevanion, expeditions, arena, abyss guides) | global | Builds, Stigmas, macros, Daevanion, where gear drops | *vetted*. Summarizes named YouTube creators (Grobs, aLuckyRO, Wakayashi, Madsin) with timestamps and shows disagreements. Independent of gaming.tools, so the two agreeing makes a pick Verified. |
| aion2-meta.com | https://aion2-meta.com/guides/gladiator/ | kr (+ global stats) | PvE vs PvP pick rates for skills, Stigmas, passives | *usable*. Korean top-player statistics (AION2CAL), split PvE/PvP; Korea has 6 Stigma slots. Region kr, so Community at most. Also numbers every Daevanion node on the Global boards (Azphel included) and gives an in-game macro setup per class. |
| couga54 / aion2-guides.info | https://couga54.github.io/aion2-guides/en/gladiator/ | global | Builds citing creators | *unvetted*. The two sites are byte-identical, so count them as one source; daevaguides.com copies it. |
| Playnews | https://www.playnews.gg/en/ | global | News recaps of official streams | *vetted*. Cite the VOD it quotes when possible. |
| Inven AION 2 | https://aion2.inven.co.kr/ | kr | Deepest community: class boards Gladiator (검성) https://www.inven.co.kr/board/aion2/6448, Assassin (살성) https://www.inven.co.kr/board/aion2/6449, PvP https://www.inven.co.kr/board/aion2/6492 | KR only |
| Reddit | (unconfirmed) | global | | Blocked our fetch (HTTP 403). The subreddit needs confirming by hand. |

## Avoid

Gold and boost sellers that publish SEO guides (expcarry, eloboost24, skycoach, aoeah, mmogah, mmoexp, playerauctions, odealo) and AI-written guide farms (aion2-wiki.wiki, aion2guide.site, aion2pilot.com and similar). Use them only if nothing else exists, and never as the sole source.
