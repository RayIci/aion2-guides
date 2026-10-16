---
title: "Example Strike"
order: 10
status: researched
last_checked: 2026-10-16
sources: [demo-creator-guide]
change:
  game_change: "Example Strike damage raised from 120% to 140% weapon damage."
  reason: "Updated the damage numbers; it now opens every rotation."
  sources: [demo-official-notes]
---
**Example Strike** is a placeholder skill used to show how citations render.

- Deals 140% weapon damage with a 6 s cooldown [@demo-official-notes].
- After the buff, open every rotation with it [@demo-creator-guide].

:::conflict{topic="Open with it in PvP?"}
- Yes: the slow lands before the target can react [@demo-creator-guide].
- No: KR players hold it for the second burst [@demo-kr-forum].

Our pick for now: open with it outside arena [!opinion].
:::

::::play
:::macro{name="Opener"}
/skill Example Strike
/wait 0.3
/skill Example Follow-up
:::
::::

:::checklist{id="strike-ready" title="Before your first arena"}
- [ ] Example Strike at skill level 8 (first Specialization) {#lv8}
- [ ] Specialization picked for PvP {#spec}
- [ ] Opener macro set up {#macro}
:::
