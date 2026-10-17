---
title: "Level 45: set up"
order: 40
status: researched
last_checked: 2026-10-17
---
:::quick{title="Do these once, in this order"}
1. **Macro key:** Settings → Key Settings → General → Macro, bind it to the **right mouse button** [@gamingtools-build-gladiator-pve-2026-10; @corpus-macros-guide-2026-10].
2. **Skill Queue on:** Settings → Combat → Controls. Without it, skills the macro presses during a cast are lost [@gamingtools-build-gladiator-pve-2026-10].
3. **Skill bar:** put your skills on the keys exactly as in the bar below (preset 1) [@gamingtools-build-gladiator-pve-2026-10].
4. **Skills:** raise **Overhead Slam** first, then **Rending Blow**, then **Ruinous Blow** [@corpus-gladiator-pve-build-2026-10; @aion2meta-gladiator-2026-10; @gamingtools-build-gladiator-pve-2026-10].
5. **Stigmas:** **Lunge Stance**, **Zikel's Blessing**, **Rage Burst** and **Focused Block** [@gamingtools-build-gladiator-pve-2026-10; @corpus-gladiator-pve-build-2026-10].
6. **Defiance** on its own key: it isn't on the bar [@gamingtools-build-gladiator-pve-2026-10]. Any free key works; 4 is a good spot [!opinion].
7. **Fight:** hold **left mouse** (Keen Strike) and **right mouse** (the macro) together, and press **E** (Focused Block) yourself [@gamingtools-build-gladiator-pve-2026-10; @corpus-gladiator-pve-build-2026-10].
:::

## 1. Your skill bar

Preset 1, **Solo Farm**. Each key holds up to three skills; pressing it uses the **bottom** one that is ready, so the most important skill goes at the bottom [@corpus-macros-guide-2026-10; @gamingtools-build-gladiator-pve-2026-10]. Keys 1–4 are empty in this layout [@gamingtools-build-gladiator-pve-2026-10]; use them for potions and your own extras [!opinion].

::skillbar{title="Preset 1: Solo Farm" keys="5=Lunge Stance,Zikel's Blessing,Sword Aura Rampage/macro; 6=Ankle Slice,Ruinous Blow,Leaping Slam/macro; 7=Mocking Blade,Crushing Wave,Rage Burst/macro; 8=Overhead Slam,Aerial Snare,Rending Blow/macro; Q=Rush Strike/macro; E=Focused Block/hand; LMB=Keen Strike/hand; RMB=Macro" cite="@gamingtools-build-gladiator-pve-2026-10"}

Rush Strike (Q) is in the macro, but it needs a Dodge first, so it fires after your own dodges [@corpus-gladiator-pve-build-2026-10; @gamingtools-build-gladiator-leveling-2026-10]. Focused Block (E) is yours to press just before a hit you can block [@gamingtools-build-gladiator-pve-2026-10].

:::details{summary="Preset 2: Solo Single Target bar"}
::skillbar{title="Preset 2: Solo Single Target" keys="8=Overhead Slam,Aerial Snare,Sword Aura Rampage,Rending Blow/macro; 6=Ankle Slice,Ruinous Blow,Leaping Slam/macro; 7=Mocking Blade,Rage Burst,Crushing Wave/macro; 5=Lunge Stance,Zikel's Blessing/macro; Q=Rush Strike/macro; E=Focused Block/hand; LMB=Keen Strike/hand; RMB=Macro" cite="@gamingtools-build-gladiator-pve-2026-10"}
:::

:::details{summary="Preset 3: Group DPS bar"}
::skillbar{title="Preset 3: Group DPS" keys="8=Overhead Slam,Aerial Snare,Sword Aura Rampage,Rending Blow/macro; 6=Ankle Slice,Ruinous Blow,Leaping Slam/macro; 7=Rage Burst,Mocking Blade,Crushing Wave/macro; 5=Lunge Stance,Zikel's Blessing/macro; Q=Rush Strike/macro; E=Focused Block/hand; LMB=Keen Strike/hand; RMB=Macro" cite="@gamingtools-build-gladiator-pve-2026-10"}
:::

## 2. The macro

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

## 3. Skills: what to raise

Skill Points take a skill to level 10; levels above 10 come from the Daevanion boards (one per board, four in total), then Arcana and soulbinds. Specializations open at levels 8, 12 and 16, and you get a third slot at 20 [@corpus-gladiator-pve-build-2026-10; @corpus-gladiator-daevanion-2026-10].

| Priority | Skill | Raise to | Specializations | Why |
|---|---|---|---|---|
| 1 | Overhead Slam | 16, then 20 | 8: Upward Strike chain · 12: Critical Hit on hit · 16: no cooldown | Most of your damage; at 16 it has no cooldown [@corpus-gladiator-pve-build-2026-10; @aion2meta-gladiator-2026-10; @gamingtools-build-gladiator-pve-2026-10] |
| 2 | Rending Blow | 16 | 16: 50 MP on Critical Hit | Your no-cooldown filler; at 16 it pays for itself [@corpus-gladiator-pve-build-2026-10; @aion2meta-gladiator-2026-10] |
| 3 | Ruinous Blow | 16 later | 8: +20% Skill Speed | Cast for its Prepare for Battle buff [@corpus-gladiator-pve-build-2026-10; @gamingtools-build-gladiator-pve-2026-10] |
| 4 | Keen Strike | 10 | 8: +20% MP restored | Left-mouse generator that refills MP [@corpus-gladiator-pve-build-2026-10; @gamingtools-build-gladiator-pve-2026-10] |
| 5 | Crushing Wave | 10 (Solo Farm) | Up to +20% damage on more targets | Pack clearing [@gamingtools-build-gladiator-pve-2026-10; @aion2meta-gladiator-2026-10] |
| – | Sword Aura Rampage | 8 | Restores 120 MP; 16: cuts all cooldowns on hit (situational) | Only on staggered targets [@gamingtools-build-gladiator-pve-2026-10; @corpus-gladiator-pve-build-2026-10] |
| – | Leaping Slam, Rush Strike | 1 | Leaping Slam 8: cooldown reset on a kill | Gap closers; Grobs binds both to one key [@corpus-gladiator-pve-build-2026-10; @gamingtools-build-gladiator-pve-2026-10] |

:::conflict{topic="Rending Blow's first Specialization"}
- **Mobile** at level 8 (hit while moving): Grobs calls the class clunky without it [@corpus-gladiator-pve-build-2026-10].
- **−20% MP consumed** at level 8: gaming.tools' three presets [@gamingtools-build-gladiator-pve-2026-10].
:::

:::conflict{topic="Keen Strike after level 45"}
- Grobs stops using Keen Strike once Rending Blow reaches 16, because Rending Blow then refunds its own MP [@corpus-gladiator-pve-build-2026-10].
- gaming.tools keeps Keen Strike on left mouse in every preset [@gamingtools-build-gladiator-pve-2026-10].
:::

**Passives:** **Experienced Counterstrike** and **Attack Preparation** first, then **Murderous Burst** and **Impact Hit** [@corpus-gladiator-pve-build-2026-10; @aion2meta-gladiator-2026-10; @gamingtools-build-gladiator-pve-2026-10]. Experienced Counterstrike is why you fight from the front: blocking a hit raises your party's damage [@corpus-gladiator-pve-build-2026-10].

:::details{summary="Every skill level and Specialization in gaming.tools' three presets"}
| Skill | Solo Farm | Solo Single Target | Group DPS |
|---|---|---|---|
| Keen Strike | 10 + 2 bonus<br>+20% MP restored; -1s Ruinous Blow cooldown on hit | 10 + 2 bonus<br>+20% MP restored; -1s Ruinous Blow cooldown on hit | 10 + 2 bonus<br>+20% MP restored; -1s Ruinous Blow cooldown on hit |
| Rending Blow | 10 + 1 bonus<br>-20% MP consumed | 10 + 1 bonus<br>-20% MP consumed | 10 + 1 bonus<br>-20% MP consumed |
| Mocking Blade | 10<br>Changes to AoE damage on down strike | 6 | 6 |
| Overhead Slam | 10 + 3 bonus<br>Changes to AoE Skill; Critical Hit on hit | 10 + 3 bonus<br>Adds Upward Strike Chain Skill; Critical Hit on hit | 10 + 3 bonus<br>Adds Upward Strike Chain Skill; Critical Hit on hit |
| Sword Aura Rampage | 8<br>Restores 120 MP | 8<br>Restores 120 MP | 8<br>Restores 120 MP |
| Crushing Wave | 10 + 1 bonus<br>Up to +20% damage when more targets hit | 8 + 1 bonus<br>Restores 50 MP on landing a Critical Hit | 8 + 1 bonus<br>Restores 50 MP on landing a Critical Hit |
| Aerial Snare | 8<br>+100% damage to targets with Incapacitated Immunity | 8<br>+100% damage to targets with Incapacitated Immunity | 8<br>+100% damage to targets with Incapacitated Immunity |
| Ruinous Blow | 10<br>+20% Skill Speed | 8<br>+20% Skill Speed | 8<br>+20% Skill Speed |
| Attack Preparation | 7 + 4 bonus | 8 + 4 bonus | 8 + 4 bonus |
| Experienced Counterstrike | 10 + 3 bonus | 10 + 3 bonus | 10 + 3 bonus |
| Murderous Burst | 10 + 3 bonus | 10 + 3 bonus | 10 + 3 bonus |
| Leaping Slam | 1 | 1 | 1 |
| Ankle Slice | 1 | 1 | 1 |
| Rush Strike | 1 | 1 | 1 |
| Defiance | 1 | 1 | 1 |
| Survival Stance | 1 | 1 | 1 |
| Protection Armor | 1 + 1 bonus | 1 + 1 bonus | 1 + 1 bonus |
| Blood Absorption | 1 + 3 bonus | 1 + 3 bonus | 1 + 3 bonus |
| Identify Weakness | 1 + 2 bonus | 8 + 2 bonus | 8 + 2 bonus |
| Impact Hit | 1 | 8 | 8 |
| Destructive Impulse | 1 | 1 | 1 |
| Survival Willpower | 1 | 1 | 1 |

[@gamingtools-build-gladiator-pve-2026-10]
:::

## 4. Stigmas

Slot **Lunge Stance**, **Zikel's Blessing**, **Rage Burst** and **Focused Block**. gaming.tools, Grobs and the top Korean players all run these four [@gamingtools-build-gladiator-pve-2026-10; @corpus-gladiator-pve-build-2026-10; @aion2meta-gladiator-2026-10].

Level them: **Rage Burst to 5** (15 s shorter cooldown), **Focused Block to 5** (a second use), then everything into **Lunge Stance up to 20**, where crits cut all cooldowns [@corpus-gladiator-pve-build-2026-10].

:::conflict{topic="The fourth Stigma"}
- **Focused Block** (guaranteed Parry; block the boss's first hit): gaming.tools and Grobs [@gamingtools-build-gladiator-pve-2026-10; @corpus-gladiator-pve-build-2026-10].
- **Blade Toss** (−30% Defense on the target) when you semi-tank for a group: aLuckyRO, who calls Focused Block mostly a PvP skill [@corpus-gladiator-pve-build-2026-10].
- **Lifestealing Blade** (party lifesteal at level 10): Wakayashi; 94% of top Korean PvE players run it, but Korea has six Stigma slots [@corpus-gladiator-pve-build-2026-10; @aion2meta-gladiator-2026-10].
:::

## 5. Daevanion boards

Each of the first four boards (Nezekan, Zikel, Vaizel, Triniel) adds one level to every Gladiator active skill. Take the **Overhead Slam** and **Rending Blow** nodes first, then Ruinous Blow and Sword Aura Rampage, plus the passive nodes for Experienced Counterstrike, Attack Preparation, Impact Hit and Murderous Burst [@corpus-gladiator-daevanion-2026-10].

- **Orange stat nodes:** start Nezekan with Combat Speed and Zikel with Damage Boost; leave Vaizel's Critical Damage and Triniel's Multi-Hit for later (aLuckyRO) [@corpus-gladiator-daevanion-2026-10].
- gaming.tools spends the 136 points at 45 as Nezekan 43, Zikel 10, Vaizel 13, Triniel 22 and saves the rest for Multi-Hit on Triniel [@gamingtools-build-gladiator-pve-2026-10].
- **Azphel** (opens at 45) has only PvP stats: fill the first four boards first [@corpus-gladiator-daevanion-2026-10].

## 6. The three presets: when to switch

| Preset | Use it for | What changes |
|---|---|---|
| 1 Solo Farm | Open world, packs, side quests | Mocking Blade and Crushing Wave levelled for area damage [@gamingtools-build-gladiator-pve-2026-10] |
| 2 Solo Single Target | Elites, Sealed Dungeon bosses, Nightmare | Overhead Slam takes its chain hit; Identify Weakness and Impact Hit raised [@gamingtools-build-gladiator-pve-2026-10] |
| 3 Group DPS | Expeditions, Transcendence, Ascension Trial | Rage Burst moves to the bottom of key 7, so the burst goes first [@gamingtools-build-gladiator-pve-2026-10] |

On a boss: buff (Lunge Stance, Zikel's Blessing), jump in, Ruinous Blow, block its first attack with Focused Block, then stay in front and hold the macro [@corpus-gladiator-pve-build-2026-10].

## 7. Your PvP preset

The gear is the same for PvE and PvP; what changes is the amulet, the Stigmas and how you press things [@gamingtools-item-database-2026-10; @aion2meta-gladiator-2026-10].

- **Amulet:** wear the **Fierce Battle Amulet** (+20% PvP Damage Boost) instead of the Revelation Amulet (+10% Weapon Damage Boost); both come from the Ascension quests and are otherwise the same [@gamingtools-item-database-2026-10; @gamingtools-ascension-rewards-2026-10].
- **Stigmas:** top Korean PvP players keep Lunge Stance, Zikel's Blessing, Rage Burst and Focused Block, and add **Tenaciousness** (98.5%) and **Armor of Balance** (90.8%) in their extra slots [@aion2meta-gladiator-2026-10]. With Global's four slots, swap Zikel's Blessing for Tenaciousness [!opinion].
- **Skills:** in PvP they push **Ruinous Blow**, **Crushing Wave** and **Overhead Slam** to 20, and raise **Rush Strike** (67%) and **Defiance** (40%) far more than in PvE [@aion2meta-gladiator-2026-10].
- **Keys:** keep the same bar, put Tenaciousness on key 1 and press it yourself, and keep Defiance on its own key [!opinion].
- **Azphel board:** its PvP stats are what you fill after the first four boards [@corpus-gladiator-daevanion-2026-10].

Each PvP mode's page has the details.

## 8. Settings that help

- **Boss Orientation Indicator:** Settings → Info Display → Combat → Display Boss Orientation Indicator. Shows where the boss is facing, so you stay in front of it [@corpus-gladiator-pve-build-2026-10].
- **Skill Queue** stays on (step 2 above) [@gamingtools-build-gladiator-pve-2026-10].
