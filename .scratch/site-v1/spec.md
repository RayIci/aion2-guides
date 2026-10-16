# Spec: AION 2 Guides, v1

Status: ready-for-agent
Agreed with the owner: 2026-10-16. Vocabulary: `GLOSSARY.md`. Decisions: `docs/adr/0001`–`0005`.

## Problem Statement

While playing AION 2 on the Global / NA-EU servers, I want one place that tells me exactly what to do with my character at every point: which skills, which macros, which rotation, which gear, what to enchant, where to farm, what to craft. Today that knowledge is spread across Korean forums, videos, Reddit threads and databases. Much of it is out of date because a patch changed something, and I can't tell which statements are real and which are guesses. When a patch lands I have no record of what changed in my plan or why.

## Solution

A free static website with two parts:

1. **Class guides**, starting with Gladiator and Assassin. Each class guide walks through every **Level bracket** up to max level, then the **Early / Mid / Advanced** endgame tiers. It covers PvE and every PvP **Mode** (1v1, every arena type, Abyss, open-world, siege…) with builds, rotations, macros, gear, enchant priorities, pets, wings and every other progression system. The full required tree is in `docs/guide-outline.md`.
2. **Farming & crafting guides**: a map atlas, every important material with its best spot, alternatives and farming routes, gathering professions, crafting with profit checks, and kinah-making.

All content is versioned by **Patch**. A patch switcher shows the guide as it reads for any patch. Each patch has a changelog listing every section that changed, what changed in the game and why the guide changed. A diff view compares two patches. Every **Claim** links to the **Sources** it came from and shows a **Confidence** badge, so I can check anything myself. Upcoming patches can be **Staged** ahead of their Global release.

To use while playing, the site has search, tickable **Checklists** for each bracket/tier that remember my progress, and a **Playing mode** that shows only the rotation, macros and current checklist on a second screen or phone.

All research and writing is done by agents. The repo ships its own skills and runbook so any future agent can add a new patch, research a section, or check whether a claim is real.

## User Stories

### Reading class guides
1. As a player, I want to choose a class and see its guide laid out as overview → systems → leveling → endgame → PvE → PvP, so that I can find any topic without searching.
2. As a player, I want each Level bracket to start with "the state you should be in on arrival", so that I can tell at once whether I'm behind.
3. As a player, I want each bracket to tell me which skills to take, which gear to wear, what to enchant and how far, and where to level, so that I never have to guess between milestones.
4. As a player, I want each bracket to tell me what *not* to spend resources on yet, so that I don't waste materials on gear I'll replace.
5. As a player, I want brackets cut at real in-game milestones, so that each one matches a moment I notice in the game.
6. As a player, I want Early, Mid and Advanced endgame tiers with gear targets, unlocked content and a daily/weekly routine, so that I know my next goal after max level.
7. As a player, I want resource priorities for each endgame tier, so that I spend currency and materials in the best order.
8. As a player, I want a page for every skill with its effect, numbers, cooldown, unlock level and upgrade paths, so that I understand my kit.
9. As a player, I want every progression system that affects my class (stats, enchanting, sockets, accessories, pets, wings, transforms, collections, consumables, passive trees…) explained, so that I'm not missing any power source.
10. As a player, I want the PvE build, rotation (single target, AoE, burst, opener) and macros, so that I can do my best damage.
11. As a player, I want a page for each dungeon and raid with the mechanics that matter to my class, so that I can prepare before I enter.
12. As a player, I want a separate build, rotation, macros and tactics for every PvP mode, so that I play duels, each arena type, Abyss and sieges the right way.
13. As a player, I want a matchup page for each opposing class, so that I know what to save my cooldowns for.
14. As a player, I want macros shown in a copyable block, so that I can paste them into the game.
15. As a player, I want sections that don't apply on Global left out with a short explanation, so that I know they weren't just forgotten.

### Farming & crafting
16. As a player, I want a page for each important material listing every way to get it, so that I can pick the method that suits my time.
17. As a player, I want the best spot for each material plus alternatives, so that I can move on when a spot is contested.
18. As a player, I want farming routes with loop time and expected yield, so that I can compare routes.
19. As a player, I want a page for each map listing its materials, spots and routes, so that I can plan a session around my current area.
20. As a player, I want gathering-profession leveling paths with the best nodes per tier, so that I level efficiently.
21. As a player, I want crafting leveling paths and key recipes with inputs and outputs, so that I know what to craft.
22. As a player, I want dated profit checks for crafting, so that I know what's worth crafting now and how fresh the numbers are.
23. As a player, I want a ranked list of kinah-making methods and a market guide, so that I can fund my progression.

### Patches
24. As a player, I want the site to open on the current Live patch, so that by default I read up-to-date advice.
25. As a player, I want a patch switcher that keeps me on the same page, so that I can see how a section read in another patch.
26. As a player, I want a changelog for each patch listing every changed or removed section with what changed in the game and why the guide changed, so that I can adjust my character after an update.
27. As a player, I want a diff view between any two patches, so that I can see exactly what text changed.
28. As a player, I want Staged patches visible behind a clear "not released on Global yet" banner, so that I can prepare without confusing them with live advice.
29. As a player, I want sections that changed in the patch I'm viewing marked in the navigation, so that I can spot what's new.

### Sources & trust
30. As a player, I want every claim to link to the post, guide, video timestamp, database entry or patch note it came from, so that I can check it.
31. As a player, I want a confidence badge (Verified / Community / Unverified) on every claim, so that I know how much to trust it.
32. As a player, I want disagreements between sources shown as alternatives with their own sources, so that I can decide for myself.
33. As a player, I want the author's own reasoning labelled as such, so that I never mistake it for a sourced fact.
34. As a player, I want archived copies of sources linked, so that I can still check a claim after the original post is deleted.
35. As a player, I want each section to show its "last checked" date and status (draft / researched / reviewed), so that I know how fresh and how reviewed it is.
36. As a player, I want claims based only on Korean or Taiwanese sources flagged, so that I know they may not match Global yet.
37. As the owner, I want a coverage report showing what share of claims are Verified, so that I can see where verification work is needed.

### Using while playing
38. As a player, I want full-text search across all guides, so that I can jump to any skill, material or map.
39. As a player, I want tickable checklists for each bracket and tier that remember my progress in the browser, so that I can track my character between sessions.
40. As a player, I want checklist progress to survive switching patches, so that I don't lose it when a patch lands.
41. As a player, I want a Playing mode that shows only the rotation, macros and current checklist for my class, mode and stage, so that I can keep it open on a second screen or phone.
42. As a player, I want the site to work well on a phone, so that I can use it without alt-tabbing.
43. As a player, I want a dark theme by default with a light option, so that it's comfortable next to the game.

### Agents & upkeep
44. As the owner, I want a `/new-patch` skill that finds the official notes for a new patch, stages the patch, works out which sections are affected, writes the overrides with change reasons and drafts the changelog, so that updating after a patch is one command.
45. As the owner, I want a `/verify-claim` skill that re-checks a claim or a whole section against its sources (and looks for better ones), then fixes the text or confidence, so that I can ask "is this real?" about anything.
46. As the owner, I want a `/research-section` skill that researches and writes any section from the guide outline to the sourcing rules, so that every section is written the same way.
47. As an agent, I want a runbook (`AGENTS.md`) pointing at the content model, sourcing rules and outline, so that I can work on the repo without the original conversation.
48. As the owner, I want the build to fail on broken citations, missing change reasons or an invalid patch graph, so that mistakes never reach the site.
49. As the owner, I want the site deployed for free from the public repo on every push to main, so that publishing needs no manual steps.
50. As the owner, I want to be able to restrict the site to friends later without rewriting it, so that keeping it public now isn't a one-way door.

## Implementation Decisions

- **Stack**: Astro static site with MDX content, deployed to GitHub Pages by GitHub Actions from a public repo (ADR-0001). The site uses the repo-name base path. No server, no database.
- **Content model**: as specified in `docs/content-model.md`. Patch folders hold section files: the Baseline holds every section, and later patches hold only Overrides/Removals, each with a Change reason (ADR-0002). There is a shared source registry, and confidence is derived from sources (ADR-0004).
- **Content core module** (the deep module of the build): one interface takes the content directory and returns, for every patch, the Resolved guide (the section tree with each section's resolved body, origin patch, status and confidence-annotated citations), the patch changelog, and validation errors and coverage stats. Everything else (pages, search index, diff data, playing mode) consumes this output and never reads content files directly.
- **Markdown extensions**: a remark plugin for `[@id]` / `[!level]` citations, plus `remark-directive` handlers for `conflict`, `checklist`, `play` and `macro` blocks, all specified in the content model.
- **Routing**: every Resolved guide is pre-rendered under its patch id, and the Live patch is also served at the unprefixed paths. The patch switcher maps the current section id to the same id in the target patch, and falls back to the guide's index if that section doesn't exist there.
- **Changelog**: built from overrides' `change` fields plus the patch's hand-written overview.
- **Diff view**: diffs against the parent patch are pre-rendered for each patch. Comparing any two patches is done in the browser from a per-patch JSON of resolved section bodies.
- **Search**: Pagefind, indexed per patch, defaulting to the patch being viewed.
- **Checklists**: progress is kept in browser storage, keyed by section id + item id, ignoring the patch (all access wrapped in try/catch).
- **Playing mode**: a separate compact route per class that pulls the `play` blocks and `play: true` sections for a chosen mode + stage, and remembers that choice in browser storage.
- **UI components** (ADR-0006): shadcn/ui on Base UI. Guide nav = `Sidebar` (+ `Collapsible`, mobile `Sheet`); theme = `DropdownMenu`; status/confidence = `Badge`; draft/staged notices = `Alert`; guide lists = `Item`; empty states = `Empty`. Planned: patch switcher = `Select`; search = `Command` in a `Dialog`; checklists = `Checkbox`; diff view = `Tabs`; macro copy = `Button`; conflict alternatives = `Card` or `Tabs`; playing-mode stage picker = `ToggleGroup`.
- **Region and language**: Global / NA-EU, English only (ADR-0003). No game assets (ADR-0005).
- **Agent tooling**: `AGENTS.md` (with `CLAUDE.md` importing it), plus the project skills `research-section`, `verify-claim` and `new-patch`. Rules shared by these skills live in `docs/sourcing.md` and `docs/content-model.md`, not inside the skills.
- **Phasing**: (1) skeleton, patch system, all site features, baseline patch, (2) Gladiator, (3) Assassin, (4) farming/crafting/economy. The owner reviews after each phase. Tickets live in `.scratch/site-v1/issues/`.

## Testing Decisions

- A good test drives the **content core module** through its single interface, using fixture content directories, and checks what comes out: resolved sections, changelogs, validation errors and confidence. It never inspects internal helpers.
- Fixture scenarios: a baseline-only guide; a chain of 3 patches with overrides and a removal; a cycle or two baselines (invalid); a missing change reason; an unknown source id; confidence derivation cases (official → Verified, two independent community → Verified, two dependent community → Community, KR-only → Community, `!community` lowering a Verified claim, opinion → Unverified); duplicate checklist ids.
- The Markdown extensions are tested by rendering small snippets and checking the HTML that comes out (badges, links, conflict alternatives, checklist ids).
- One end-to-end smoke check runs on the built site: Live patch at `/`, the switcher keeps the section, the changelog lists overrides, the search index exists.
- The real content is checked on every build by the same validator (build fails on errors), so the content repo always stays valid.
- No prior art yet: this is a new repo. Use Vitest.

## Out of Scope

- Classes other than Gladiator and Assassin (the structure supports them; they're added later with the same outline).
- KR/TW region guides or a region toggle (ADR-0003).
- Languages other than English.
- Hosted game assets (ADR-0005).
- User accounts, synced progress, comments, or any server-side feature.
- Live market price feeds (profit checks are written by hand and dated).
- Damage calculators or gear planners (possible later additions).

## Further Notes

- The current Global patch and the source landscape aren't known yet. Finding them is the first research ticket, and its results seed the Baseline patch and `docs/source-directory.md`.
- The owner's bar for content is "literally everything, don't miss anything". `docs/guide-outline.md` is how "everything" is checked. Any system found in the game that isn't in the outline should be added to the outline first.
- The owner wants most claims Verified. Research effort should go into finding Data/Official sources before settling for Community.
- The owner reviews each phase before the next one starts, and reviewed sections move to `status: reviewed`.
