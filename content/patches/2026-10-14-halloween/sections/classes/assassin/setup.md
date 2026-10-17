---
title: "Level 45: set up"
order: 40
status: researched
last_checked: 2026-10-17
---
:::quick{title="Do these once, in this order"}
1. **Macro key:** Settings → Key Settings → General → Macro, bind it to the **right mouse button** [@gamingtools-build-assassin-pve-2026-10; @corpus-macros-guide-2026-10].
2. **Skill Queue on:** Settings → Combat → Controls. Without it, skills the macro presses during a cast are lost [@gamingtools-build-assassin-pve-2026-10].
3. **Skill bar:** put your skills on the keys exactly as in the bar below (preset 1) [@gamingtools-build-assassin-pve-2026-10].
4. **Skills:** raise **Heart Gore** first, then **Quick Slice**, then **Insignia Explosion** [@corpus-assassin-pve-build-2026-10; @aion2meta-assassin-2026-10; @gamingtools-build-assassin-pve-2026-10].
5. **Stigmas:** **Illusive Clone**, **Swift Contract**, **Triniel's Dagger**, plus a fourth (see Stigmas) [@gamingtools-build-assassin-pve-2026-10; @corpus-assassin-pve-build-2026-10].
6. **Defiance** on its own key: it isn't on the bar [@gamingtools-build-assassin-pve-2026-10]. Any free key works; 4 is a good spot [!opinion].
7. **Fight:** hold **left mouse** (Quick Slice) and **right mouse** (the macro) together, and press **1** (Evasion Stance) yourself [@gamingtools-build-assassin-pve-2026-10; @corpus-assassin-pve-build-2026-10].
:::

## 1. Your skill bar

Preset 1, **Solo Farm**. Each key holds up to three skills; pressing it uses the **bottom** one that is ready, so the most important skill goes at the bottom [@corpus-macros-guide-2026-10; @gamingtools-build-assassin-pve-2026-10]. Keys 1–4 are empty in this layout [@gamingtools-build-assassin-pve-2026-10]; use them for potions and your own extras [!opinion].

::skillbar{title="Preset 1: Solo Farm" keys="8=Insignia Explosion,Heart Gore,Storm Rampage,Savage Roar/macro; 5=Swift Contract,Illusive Clone,Triniel's Dagger/macro; 7=Whirlwind Slice,Flash Slice,Shadow Fall/macro; 6=Shadowstrike,Ambush/macro; 1=Evasion Stance/hand; E=Infiltrate/macro; LMB=Quick Slice/hand; RMB=Macro" cite="@gamingtools-build-assassin-pve-2026-10"}

Evasion Stance (1) is yours to press right before a big hit [@gamingtools-build-assassin-pve-2026-10]. Infiltrate (E) is in the macro; it moves you behind the target [@gamingtools-build-assassin-pve-2026-10; @gamingtools-skill-assassin-infiltrate-2026-10].

:::details{summary="Preset 2: Solo Single Target bar"}
::skillbar{title="Preset 2: Solo Single Target" keys="8=Insignia Explosion,Heart Gore,Storm Rampage,Savage Roar/macro; 5=Swift Contract,Illusive Clone,Triniel's Dagger/macro; 6=Shadowstrike,Ambush,Flash Slice/macro; 7=Shadow Fall,Whirlwind Slice/macro; 1=Evasion Stance/hand; E=Infiltrate/macro; LMB=Quick Slice/hand; RMB=Macro" cite="@gamingtools-build-assassin-pve-2026-10"}
:::

:::details{summary="Preset 3: Group DPS bar"}
::skillbar{title="Preset 3: Group DPS" keys="8=Insignia Explosion,Heart Gore,Storm Rampage,Savage Roar/macro; 5=Swift Contract,Illusive Clone,Triniel's Dagger/macro; 6=Shadowstrike,Ambush,Flash Slice/macro; 7=Whirlwind Slice,Shadow Fall/macro; 1=Evasion Stance/hand; E=Infiltrate/macro; LMB=Quick Slice/hand; RMB=Macro" cite="@gamingtools-build-assassin-pve-2026-10"}
:::

## 2. The macro

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

## 3. Skills: what to raise

Skill Points take a skill to level 10; levels above 10 come from the Daevanion boards (one per board, four in total), then Arcana and soulbinds. Specializations open at levels 8, 12 and 16, and you get a third slot at 20 [@corpus-assassin-pve-build-2026-10; @corpus-gladiator-daevanion-2026-10].

| Priority | Skill | Raise to | Specializations | Why |
|---|---|---|---|---|
| 1 | Heart Gore | 16 | Multi-Hit and Absorb HP while levelling · 16: cooldown reset on Critical Hit | Triggers on crits; at 16 it keeps resetting [@corpus-assassin-pve-build-2026-10; @aion2meta-assassin-2026-10; @gamingtools-build-assassin-pve-2026-10] |
| 2 | Quick Slice | 16 | +20% MP restored · 16: always crits, cuts Insignia Explosion's cooldown | Left-mouse filler that feeds Heart Gore [@corpus-assassin-pve-build-2026-10; @aion2meta-assassin-2026-10; @gamingtools-build-assassin-pve-2026-10] |
| 3 | Insignia Explosion | 16 | Multi-Hit · keep 2 Insignias · 16: −3 s cooldown | Spends your Insignias [@corpus-assassin-pve-build-2026-10; @aion2meta-assassin-2026-10; @gamingtools-build-assassin-pve-2026-10] |
| 4 | Savage Roar | 12 | −20% MP consumed · +20% Skill Speed | Builds Insignias [@corpus-assassin-pve-build-2026-10; @aion2meta-assassin-2026-10] |
| – | Storm Rampage | 8, 16 last | Restores 120 MP or Absorbs 5% HP · 16: cuts all cooldowns on hit | Only on staggered targets [@gamingtools-build-assassin-pve-2026-10; @corpus-assassin-pve-build-2026-10] |
| – | Shadowstrike, Infiltrate | 8 | Shadowstrike: +20% Critical Damage Boost · Infiltrate: +10 m range | Get behind the boss; Grobs puts both on one key [@corpus-assassin-pve-build-2026-10; @gamingtools-build-assassin-pve-2026-10] |
| – | Flash Slice | 8–10 | +6 m range (bosses) or up to +20% on more targets (farm) | Repositioning [@gamingtools-build-assassin-pve-2026-10; @corpus-assassin-pve-build-2026-10] |

:::conflict{topic="Insignia Explosion's second Specialization"}
- **Keep 2 Insignias** after the explosion (then −3 s cooldown at 16): Grobs and gaming.tools [@corpus-assassin-pve-build-2026-10; @gamingtools-build-assassin-pve-2026-10].
- **Multi-Hit only:** aLuckyRO calls the Insignia-keeping and rotate effects PvP picks [@corpus-assassin-pve-build-2026-10].
:::

**Passives:** **Exploit Weakness** and **Rear Smite** first, then **Assault Stance** [@corpus-assassin-pve-build-2026-10; @aion2meta-assassin-2026-10]. Impact Hit is disputed: Grobs levels it, aLuckyRO calls it useless in PvE [@corpus-assassin-pve-build-2026-10].

:::details{summary="Every skill level and Specialization in gaming.tools' three presets"}
| Skill | Solo Farm | Solo Single Target | Group DPS |
|---|---|---|---|
| Quick Slice | 10 + 1 bonus<br>+20% MP restored | 10 + 1 bonus<br>+20% MP restored | 10 + 1 bonus<br>+20% MP restored |
| Savage Roar | 10 + 2 bonus<br>-20% MP consumed; -1s Shadowstrike cooldown on hit | 8 + 2 bonus<br>-20% MP consumed | 8 + 2 bonus<br>-20% MP consumed |
| Shadowstrike | 8<br>+20% caster Critical Damage Boost for 10s on hit | 8<br>+20% caster Critical Damage Boost for 10s on hit | 8<br>+20% caster Critical Damage Boost for 10s on hit |
| Ambush | 8 + 2 bonus<br>Engraves 2 Insignias for 10s on landing as a Back attack | 10 + 2 bonus<br>Engraves 2 Insignias for 10s on landing as a Back attack; 50% chance to trigger Whirlwind Slice on hit | 10 + 2 bonus<br>Engraves 2 Insignias for 10s on landing as a Back attack; 50% chance to trigger Whirlwind Slice on hit |
| Heart Gore | 10 + 3 bonus<br>Engraves 1 Insignia for 10s on hit; Multi-Hit on hit | 10 + 3 bonus<br>Engraves 1 Insignia for 10s on hit; Multi-Hit on hit | 10 + 3 bonus<br>Engraves 1 Insignia for 10s on hit; Multi-Hit on hit |
| Storm Rampage | 8<br>Restores 120 MP on hit | 8<br>Absorbs 5% HP | 8<br>Restores 120 MP on hit |
| Whirlwind Slice | 10<br>Changes to AoE damage | 8<br>+50% Multi-Hit on hit | 8<br>+50% Multi-Hit on hit |
| Flash Slice | 10<br>Up to +20% damage when more targets hit | 8<br>+6m Range | 8<br>+6m Range |
| Infiltrate | 8<br>Restores 300 Stamina on landing Infiltrate | 8<br>Restores 300 Stamina on landing Infiltrate | 8<br>Restores 300 Stamina on landing Infiltrate |
| Shadow Fall | 8<br>Absorbs 10% HP | 8<br>Absorbs 10% HP | 8<br>Engraves 3 Insignias for 10s on hit |
| Insignia Explosion | 10 + 2 bonus<br>Keep 2 stacks of Insignias after Insignia Explosion; +50% Multi-Hit on hit | 10 + 2 bonus<br>Keep 2 stacks of Insignias after Insignia Explosion; +50% Multi-Hit on hit | 10 + 2 bonus<br>Keep 2 stacks of Insignias after Insignia Explosion; +50% Multi-Hit on hit |
| Rear Smite | 7 + 2 bonus | 8 + 2 bonus | 8 + 2 bonus |
| Assault Stance | 4 + 2 bonus | 8 + 2 bonus | 8 + 2 bonus |
| Defiance | 1 | 1 | 1 |
| Heightened Sixth Sense | 1 | 1 | 1 |
| Exploit Weakness | 1 + 2 bonus | 3 + 2 bonus | 3 + 2 bonus |
| Apply Poison | 1 | 1 | 1 |
| Impact Hit | 1 + 2 bonus | 1 + 2 bonus | 1 + 2 bonus |
| Ambush Stance | 1 + 2 bonus | 1 + 2 bonus | 1 + 2 bonus |
| Defense Break | 1 | 1 | 1 |
| Revitalization Contract | 1 + 2 bonus | 1 + 2 bonus | 1 + 2 bonus |
| Determination | 1 + 1 bonus | 1 + 1 bonus | 1 + 1 bonus |

[@gamingtools-build-assassin-pve-2026-10]
:::

## 4. Stigmas

Slot **Illusive Clone**, **Swift Contract** and **Triniel's Dagger**: gaming.tools, Grobs, aLuckyRO and 95–99% of top Korean players run all three [@gamingtools-build-assassin-pve-2026-10; @corpus-assassin-pve-build-2026-10; @aion2meta-assassin-2026-10]. Use Triniel's Dagger right after the other two: at level 10 it cuts the cooldowns already running [@corpus-assassin-pve-build-2026-10].

:::conflict{topic="Stigma levels"}
- **Grobs:** Triniel's Dagger to 10 first, then Illusive Clone to 20, then the others [@corpus-assassin-pve-build-2026-10].
- **gaming.tools:** Illusive Clone to 10, the other three to 5 [@gamingtools-build-assassin-pve-2026-10].
:::

:::conflict{topic="The fourth Stigma"}
- **Evasion Stance** (evade everything for a moment, +110 MP and Stamina): gaming.tools, and aLuckyRO against bosses with big hits [@gamingtools-build-assassin-pve-2026-10; @corpus-assassin-pve-build-2026-10].
- **Savage Fang** (5 Insignias as an opener): Grobs from mid game [@corpus-assassin-pve-build-2026-10].
- **Throw Shadowblade** (resets when an enemy dies): aLuckyRO for farming; 91% of top Korean players run it, in six slots [@corpus-assassin-pve-build-2026-10; @aion2meta-assassin-2026-10].
:::

## 5. Daevanion boards

Each of the first four boards (Nezekan, Zikel, Vaizel, Triniel) adds one level to every Assassin active skill, which is how Heart Gore, Quick Slice and Insignia Explosion get past 10 [@corpus-assassin-pve-build-2026-10].

- gaming.tools opens Nezekan (46 points), Zikel (32), Vaizel (4) and Triniel (3) at 45 and plans the rest for later [@gamingtools-build-assassin-pve-2026-10].
- **Azphel** (opens at 45) has only PvP stats: fill the first four boards first [@corpus-gladiator-daevanion-2026-10].

## 6. The three presets: when to switch

| Preset | Use it for | What changes |
|---|---|---|
| 1 Solo Farm | Open world, packs | Whirlwind Slice and Flash Slice set for area damage [@gamingtools-build-assassin-pve-2026-10] |
| 2 Solo Single Target | Elites, Sealed Dungeon bosses, Nightmare | Ambush gets the Whirlwind Slice trigger; Shadow Fall and Storm Rampage heal [@gamingtools-build-assassin-pve-2026-10] |
| 3 Group DPS | Expeditions, Transcendence, Ascension Trial | Stay behind the boss; Shadow Fall engraves Insignias [@gamingtools-build-assassin-pve-2026-10] |

On a boss: Illusive Clone and Swift Contract, Shadowstrike behind it, Triniel's Dagger, then hold the macro and left click; reposition with Shadowstrike, Infiltrate or Flash Slice to stay behind [@corpus-assassin-pve-build-2026-10].

## 7. Your PvP preset

The gear is the same for PvE and PvP; what changes is the amulet, the Stigmas and how you press things [@gamingtools-item-database-2026-10; @aion2meta-assassin-2026-10].

- **Amulet:** wear the **Fierce Battle Amulet** (+20% PvP Damage Boost) instead of the Revelation Amulet (+10% Weapon Damage Boost); both come from the Ascension quests and are otherwise the same [@gamingtools-item-database-2026-10; @gamingtools-ascension-rewards-2026-10].
- **Stigmas:** top Korean PvP players keep Illusive Clone, Swift Contract, Triniel's Dagger and Throw Shadowblade, and add **Evasion Stance** (95%), **Shadow Walk** (94%) and **Savage Fang** (90%) in their extra slots [@aion2meta-assassin-2026-10]. aLuckyRO rates Spiral Slice, Shadow Walk and Aerial Bind as PvP Stigmas [@corpus-assassin-pve-build-2026-10]. With Global's four slots, keep Illusive Clone, Swift Contract and Triniel's Dagger and take Evasion Stance [!opinion].
- **Skills:** PvP players push the same three (Heart Gore, Quick Slice, Insignia Explosion) and raise **Shadowstrike**, **Whirlwind Slice** and **Defiance** far more than in PvE [@aion2meta-assassin-2026-10].
- **Keys:** keep the same bar and press Evasion Stance (1) and Defiance yourself [!opinion].
- **Azphel board:** its PvP stats are what you fill after the first four boards [@corpus-gladiator-daevanion-2026-10].

Each PvP mode's page has the details.

## 8. Settings that help

- **Boss Orientation Indicator:** Settings → Info Display → Combat → Display Boss Orientation Indicator. Set it to show the boss's back, so you know where to stand [@corpus-assassin-pve-build-2026-10].
- **Skill Queue** stays on (step 2 above) [@gamingtools-build-assassin-pve-2026-10].
