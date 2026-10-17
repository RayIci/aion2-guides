---
title: "PvE A: full macro"
order: 1
status: researched
last_checked: 2026-10-17
---
:::quick{title="Quick steps"}
1. Set up the bar exactly as below (preset 1, Solo Farm) [@gamingtools-build-assassin-pve-2026-10].
2. Create the macro with the keys in the order listed under The macro [@gamingtools-build-assassin-pve-2026-10].
3. Hold left mouse (Quick Slice) and right mouse (the macro) together; press the amber keys yourself [@gamingtools-build-assassin-pve-2026-10; @corpus-assassin-pve-build-2026-10].
4. Prefer to time your buffs? Try [PvE B](/classes/assassin/setup/pve-core-macro) [!opinion].
:::

**Who it's for:** you want the macro to run the fight, buffs and burst included. This is gaming.tools' build exactly as published [@gamingtools-build-assassin-pve-2026-10].

## Your skill bar

Preset 1, **Solo Farm**. Each key holds up to three skills; pressing it uses the **bottom** one that is ready, so the most important skill goes at the bottom [@corpus-macros-guide-2026-10; @gamingtools-build-assassin-pve-2026-10]. Keys 1–4 are empty in this layout [@gamingtools-build-assassin-pve-2026-10]; use them for potions and your own extras [!opinion].

::skillbar{title="Preset 1: Solo Farm" keys="8=Insignia Explosion,Heart Gore,Storm Rampage,Savage Roar/macro; 5=Swift Contract,Illusive Clone,Triniel's Dagger/macro; 7=Whirlwind Slice,Flash Slice,Shadow Fall/macro; 6=Shadowstrike,Ambush/macro; 1=Evasion Stance/hand; E=Infiltrate/macro; LMB=Quick Slice/hand; RMB=Macro" cite="@gamingtools-build-assassin-pve-2026-10"}

Evasion Stance (1) is yours to press right before a big hit [@gamingtools-build-assassin-pve-2026-10]. Infiltrate (E) is in the macro; it moves you behind the target [@gamingtools-build-assassin-pve-2026-10; @gamingtools-skill-assassin-infiltrate-2026-10].

:::details{summary="Preset 2: Solo Single Target bar"}
::skillbar{title="Preset 2: Solo Single Target" keys="8=Insignia Explosion,Heart Gore,Storm Rampage,Savage Roar/macro; 5=Swift Contract,Illusive Clone,Triniel's Dagger/macro; 6=Shadowstrike,Ambush,Flash Slice/macro; 7=Shadow Fall,Whirlwind Slice/macro; 1=Evasion Stance/hand; E=Infiltrate/macro; LMB=Quick Slice/hand; RMB=Macro" cite="@gamingtools-build-assassin-pve-2026-10"}
:::

:::details{summary="Preset 3: Group DPS bar"}
::skillbar{title="Preset 3: Group DPS" keys="8=Insignia Explosion,Heart Gore,Storm Rampage,Savage Roar/macro; 5=Swift Contract,Illusive Clone,Triniel's Dagger/macro; 6=Shadowstrike,Ambush,Flash Slice/macro; 7=Whirlwind Slice,Shadow Fall/macro; 1=Evasion Stance/hand; E=Infiltrate/macro; LMB=Quick Slice/hand; RMB=Macro" cite="@gamingtools-build-assassin-pve-2026-10"}
:::

## The macro

::::play
1. Open the skill menu, choose **Macro** in the top right, then **Add macro** [@corpus-macros-guide-2026-10].
2. Add the **keys** (whole rows), not single skills: **6, 7, 8, 7, 8, 5, E** for Solo Farm [@gamingtools-build-assassin-pve-2026-10; @corpus-macros-guide-2026-10].
3. Set every step's delay to **10 ms**, the lowest the game allows [@gamingtools-build-assassin-pve-2026-10; @corpus-macros-guide-2026-10].
4. Keep Quick Slice (left mouse) out of the macro and hold it together with the macro key: the game weaves it in to cancel animations [@gamingtools-build-assassin-pve-2026-10; @corpus-macros-guide-2026-10].
5. Manual input always beats the macro, so pressing **1** (Evasion Stance) mid-fight is safe [@gamingtools-build-assassin-pve-2026-10].

:::details{summary="The macro steps for each preset"}
**Solo Farm**

| Step | Key | It tries |
|---|---|---|
| 1 | 6 | Shadowstrike → Ambush |
| 2 | 7 | Whirlwind Slice → Flash Slice, Shadow Fall |
| 3 | 8 | Insignia Explosion → Heart Gore, Storm Rampage, Savage Roar |
| 4 | 7 | Whirlwind Slice → Flash Slice, Shadow Fall |
| 5 | 8 | Insignia Explosion → Heart Gore, Storm Rampage, Savage Roar |
| 6 | 5 | Swift Contract → Illusive Clone, Triniel's Dagger |
| 7 | E | Infiltrate (key E) |

[@gamingtools-build-assassin-pve-2026-10]

**Solo Single Target**

| Step | Key | It tries |
|---|---|---|
| 1 | 6 | Shadowstrike → Ambush, Flash Slice |
| 2 | 7 | Shadow Fall → Whirlwind Slice |
| 3 | 8 | Insignia Explosion → Heart Gore, Storm Rampage, Savage Roar |
| 4 | 5 | Swift Contract → Illusive Clone, Triniel's Dagger |
| 5 | 8 | Insignia Explosion → Heart Gore, Storm Rampage, Savage Roar |
| 6 | 7 | Shadow Fall → Whirlwind Slice |
| 7 | E | Infiltrate (key E) |

[@gamingtools-build-assassin-pve-2026-10]

**Group DPS**

| Step | Key | It tries |
|---|---|---|
| 1 | 5 | Swift Contract → Illusive Clone, Triniel's Dagger |
| 2 | 5 | Swift Contract → Illusive Clone, Triniel's Dagger |
| 3 | 8 | Insignia Explosion → Heart Gore, Storm Rampage, Savage Roar |
| 4 | 6 | Shadowstrike → Ambush, Flash Slice |
| 5 | 7 | Whirlwind Slice → Shadow Fall |
| 6 | 8 | Insignia Explosion → Heart Gore, Storm Rampage, Savage Roar |
| 7 | 8 | Insignia Explosion → Heart Gore, Storm Rampage, Savage Roar |
| 8 | E | Infiltrate (key E) |

[@gamingtools-build-assassin-pve-2026-10]
:::
::::

:::conflict{topic="How big the macro should be"}
- **gaming.tools:** one macro over keys 5–8 and E, so Swift Contract, Illusive Clone and Triniel's Dagger (key 5) fire automatically [@gamingtools-build-assassin-pve-2026-10].
- **Grobs (via Corpus):** a single row, Insignia Explosion → Heart Gore → Savage Roar (plus Savage Fang from 45), and the burst Stigmas pressed by hand: Illusive Clone and Swift Contract, Shadowstrike behind the boss, Triniel's Dagger, then hold the macro [@corpus-assassin-pve-build-2026-10; @corpus-macros-guide-2026-10].
- Start with gaming.tools' full macro; move to pressing your burst by hand once you want to time it on the boss [!opinion].
:::

Skills, Stigmas and Daevanion: [Level 45: set up](/classes/assassin/setup#pve-skills-to-raise) [!opinion].
