---
title: "PvE A: full macro"
order: 1
status: researched
last_checked: 2026-10-17
---
:::quick{title="Quick steps"}
1. Set up the bar exactly as below (preset 1, Solo Farm) [@gamingtools-build-gladiator-pve-2026-10].
2. Create the macro with the keys in the order listed under The macro [@gamingtools-build-gladiator-pve-2026-10].
3. Hold left mouse (Keen Strike) and right mouse (the macro) together; press the amber keys yourself [@gamingtools-build-gladiator-pve-2026-10; @corpus-gladiator-pve-build-2026-10].
4. Prefer to time your buffs? Try [PvE B](/classes/gladiator/setup/pve-core-macro) [!opinion].
:::

**Who it's for:** you want the macro to run the fight, buffs and burst included. This is gaming.tools' build exactly as published [@gamingtools-build-gladiator-pve-2026-10].

## Your skill bar

Preset 1, **Solo Farm**. Each key holds up to three skills; pressing it uses the **bottom** one that is ready, so the most important skill goes at the bottom [@corpus-macros-guide-2026-10; @gamingtools-build-gladiator-pve-2026-10]. Keys 1–4 are empty in this layout [@gamingtools-build-gladiator-pve-2026-10]; use them for potions and your own extras [!opinion].

::skillbar{title="Preset 1: Solo Farm" keys="5=Lunge Stance,Zikel's Blessing,Sword Aura Rampage/macro; 6=Ankle Slice,Ruinous Blow,Leaping Slam/macro; 7=Mocking Blade,Crushing Wave,Rage Burst/macro; 8=Overhead Slam,Aerial Snare,Rending Blow/macro; Q=Rush Strike/macro; E=Focused Block/hand; LMB=Keen Strike/hand; RMB=Macro" cite="@gamingtools-build-gladiator-pve-2026-10"}

Rush Strike (Q) is in the macro, but it needs a Dodge first, so it fires after your own dodges [@corpus-gladiator-pve-build-2026-10; @gamingtools-build-gladiator-leveling-2026-10]. Focused Block (E) is yours to press just before a hit you can block [@gamingtools-build-gladiator-pve-2026-10].

:::details{summary="Preset 2: Solo Single Target bar"}
::skillbar{title="Preset 2: Solo Single Target" keys="8=Overhead Slam,Aerial Snare,Sword Aura Rampage,Rending Blow/macro; 6=Ankle Slice,Ruinous Blow,Leaping Slam/macro; 7=Mocking Blade,Rage Burst,Crushing Wave/macro; 5=Lunge Stance,Zikel's Blessing/macro; Q=Rush Strike/macro; E=Focused Block/hand; LMB=Keen Strike/hand; RMB=Macro" cite="@gamingtools-build-gladiator-pve-2026-10"}
:::

:::details{summary="Preset 3: Group DPS bar"}
::skillbar{title="Preset 3: Group DPS" keys="8=Overhead Slam,Aerial Snare,Sword Aura Rampage,Rending Blow/macro; 6=Ankle Slice,Ruinous Blow,Leaping Slam/macro; 7=Rage Burst,Mocking Blade,Crushing Wave/macro; 5=Lunge Stance,Zikel's Blessing/macro; Q=Rush Strike/macro; E=Focused Block/hand; LMB=Keen Strike/hand; RMB=Macro" cite="@gamingtools-build-gladiator-pve-2026-10"}
:::

## The macro

::::play
1. Open the skill menu, choose **Macro** in the top right, then **Add macro** [@corpus-macros-guide-2026-10].
2. Add the **keys** (whole rows), not single skills: **7, 8, 6, 8, 5, 7, 8, Q** for Solo Farm (all three presets below) [@gamingtools-build-gladiator-pve-2026-10; @corpus-macros-guide-2026-10].
3. Set every step's delay to **10 ms**, the lowest the game allows [@gamingtools-build-gladiator-pve-2026-10; @corpus-macros-guide-2026-10].
4. Keep Keen Strike (left mouse) out of the macro and hold it together with the macro key: the game weaves it in to cancel animations [@gamingtools-build-gladiator-pve-2026-10; @corpus-macros-guide-2026-10].
5. Manual input always beats the macro, so pressing **E** (Focused Block) mid-fight is safe [@gamingtools-build-gladiator-pve-2026-10].

:::details{summary="The macro steps for each preset"}
**Solo Farm**

| Step | Key | It tries |
|---|---|---|
| 1 | 7 | Mocking Blade → Crushing Wave, Rage Burst |
| 2 | 8 | Overhead Slam → Aerial Snare, Rending Blow |
| 3 | 6 | Ankle Slice → Ruinous Blow, Leaping Slam |
| 4 | 8 | Overhead Slam → Aerial Snare, Rending Blow |
| 5 | 5 | Lunge Stance → Zikel's Blessing, Sword Aura Rampage |
| 6 | 7 | Mocking Blade → Crushing Wave, Rage Burst |
| 7 | 8 | Overhead Slam → Aerial Snare, Rending Blow |
| 8 | Q | Rush Strike |

[@gamingtools-build-gladiator-pve-2026-10]

**Solo Single Target**

| Step | Key | It tries |
|---|---|---|
| 1 | 7 | Mocking Blade → Rage Burst, Crushing Wave |
| 2 | 8 | Overhead Slam → Aerial Snare, Sword Aura Rampage, Rending Blow |
| 3 | 6 | Ankle Slice → Ruinous Blow, Leaping Slam |
| 4 | 8 | Overhead Slam → Aerial Snare, Sword Aura Rampage, Rending Blow |
| 5 | 5 | Lunge Stance → Zikel's Blessing |
| 6 | 8 | Overhead Slam → Aerial Snare, Sword Aura Rampage, Rending Blow |
| 7 | Q | Rush Strike |

[@gamingtools-build-gladiator-pve-2026-10]

**Group DPS**

| Step | Key | It tries |
|---|---|---|
| 1 | 5 | Lunge Stance → Zikel's Blessing |
| 2 | 7 | Rage Burst → Mocking Blade, Crushing Wave |
| 3 | 8 | Overhead Slam → Aerial Snare, Sword Aura Rampage, Rending Blow |
| 4 | 7 | Rage Burst → Mocking Blade, Crushing Wave |
| 5 | 8 | Overhead Slam → Aerial Snare, Sword Aura Rampage, Rending Blow |
| 6 | 6 | Ankle Slice → Ruinous Blow, Leaping Slam |
| 7 | 8 | Overhead Slam → Aerial Snare, Sword Aura Rampage, Rending Blow |
| 8 | Q | Rush Strike |

[@gamingtools-build-gladiator-pve-2026-10]
:::
::::

:::conflict{topic="How big the macro should be"}
- **gaming.tools:** one macro that presses keys 5–8 and Q, so your buffs (Lunge Stance, Zikel's Blessing) and Rage Burst go off automatically [@gamingtools-build-gladiator-pve-2026-10].
- **Grobs (via Corpus):** a single row, Rage Burst → Overhead Slam → Rending Blow, and every buff pressed by hand so it doesn't fire on trash or right before a boss mechanic [@corpus-gladiator-pve-build-2026-10; @corpus-macros-guide-2026-10].
- Start with gaming.tools' full macro while you learn; move to Grobs's short one once you want control of your burst windows [!opinion].
:::

Skills, Stigmas and Daevanion: [Level 45: set up](/classes/gladiator/setup#pve-skills-to-raise) [!opinion].

## Daevanion

The same boards for every setup: [Daevanion boards](/classes/gladiator/setup/daevanion) [@gamingtools-build-gladiator-pve-2026-10].
