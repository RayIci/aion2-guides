# Content model

How guide content is stored on disk, how a patch resolves into a full guide, and the Markdown syntax for citations, conflicts, checklists and playing-mode blocks. Terms follow `GLOSSARY.md`, and the reasoning is in `docs/adr/`.

This is the contract the site build and every content-writing agent share. If you change it, update the build's validator in the same change.

## Layout

```
content/
  patches/
    <patch-id>/
      patch.md                 # patch metadata + hand-written changelog overview
      sections/
        <section-id>.md        # baseline: every section; later patches: overrides/removals only
  sources/
    <source-id>.yaml           # one file per Source (the shared registry)
```

- **Patch id**: the official Global version string, lowercased and with spaces turned into dashes (e.g. `1.4`, `1.4.2`). If the game publishes no version string, use `YYYY-MM-DD-<slug>` for the release date.
- **Section id**: the file's path under `sections/`, without `.md`. For example `classes/gladiator/pvp/arena-1v1`. It is the section's permanent identity across patches (ADR-0002). Renaming it means a removal plus a new section.

## `patch.md`

```yaml
---
id: "1.4"
title: "Patch 1.4: <official name if any>"
released: 2026-09-30          # Global release date; omit while Staged and unknown
status: live                  # staged | live | superseded
parent: "1.3"                 # omitted only on the Baseline patch
official_notes: [ncsoft-notes-1-4]   # Source ids
---
Hand-written overview: what this patch means for the guide, in a few paragraphs.
```

Rules:
- There is exactly one patch with no `parent`: the Baseline patch.
- At most one patch is `live`. The site defaults to it. When a new patch goes live, the old one becomes `superseded`.
- `staged` patches build and are browsable behind a banner ("not released on Global yet"), but they are never the default.

## Section files

```yaml
---
title: "Arena 1v1"
order: 40                     # sort position among siblings
status: researched            # draft | researched | reviewed
last_checked: 2026-10-16      # date the claims were last compared against their sources
sources: [creator-x-glad-arena, inven-glad-pvp-2026-09]   # section-level citations (optional)
play: false                   # true = the whole section appears in playing mode
change:                       # REQUIRED on every file outside the Baseline patch
  game_change: "Patch 1.4 cut Rage generation on <skill> by 20%."
  reason: "The rotation now opens with <other skill> to make up the lost Rage."
  sources: [ncsoft-notes-1-4]
removed: false                # true = Removal; the body may be empty
---
```

- **status**: `draft` is a placeholder or unfinished. `researched` means an agent wrote it from sources. `reviewed` means the owner has checked it. The site shows the status.
- A section counts as *inherited* in a patch when that patch has no file for it. The **Resolved guide** for patch P takes, for each section id, the file from the nearest patch on the chain P → parent → … → Baseline. Sections whose nearest file is a Removal are left out.
- A guide is every section under a shared prefix (e.g. `classes/gladiator/`). Navigation follows the folder tree and `order`.

## Citation syntax (in the Markdown body)

| Write | Meaning |
|---|---|
| `[@id]` | Cite one source for the claim just before it |
| `[@id1; @id2]` | Cite several sources |
| `[@id; !community]` | Cite, and **lower** confidence to the given level (e.g. the source looks outdated) |
| `[!opinion]` | The author's own reasoning with no source: **Unverified**, labelled "author's reasoning" |
| `[!unverified]` | Known gap: needs a source |

- A claim with no inline citation takes the section-level `sources`. If there are none, it is Unverified.
- Confidence is derived from the sources (rule in `docs/sourcing.md`). Authors can only lower it.
- Each citation renders as a confidence badge plus numbered links. Each section ends with its list of sources.
- A citation whose sources are all KR/TW gets a "KR only" / "TW only" tag on its badge (ADR-0003).
- For the coverage report, each inline citation marker counts as one claim, and a section's `sources` list counts as one more claim at its own derived confidence.

## Blocks

Written as `remark-directive` container blocks:

```md
:::conflict{topic="Stat priority for Abyss"}
- Crit > Accuracy, because … [@creator-a-abyss]
- Accuracy > Crit, because … [@inven-123]
Our pick: … [!opinion]
:::

:::checklist{id="lv-bracket-3"}
- [ ] Skill X at rank 3 {#skill-x}
- [ ] Weapon enchanted to +5 [@db-enchant-table] {#weapon-5}
:::

:::play
Opener: A → B → C …
:::

:::macro{name="Burst"}
/skill A
/skill B
:::
```

- **conflict**: shows every alternative with its own citations. Never pick one silently. Any pick of our own is marked `[!opinion]` or cited.
- **checklist**: the item id defaults to a slug of the text. Give an explicit `{#id}` when the wording might change but the target stays the same. Browser storage keys progress by section id + item id and ignores the patch, so progress carries across patch switches.
- **play**: shows up in playing mode. Every rotation, macro and current-stage checklist should be inside a `play` block or a section with `play: true`.
- **macro**: rendered as monospace with a copy button.

## Sources (`content/sources/<id>.yaml`)

```yaml
id: inven-glad-pvp-2026-09
title: "Gladiator arena guide (KR)"
url: https://...
archived_url: https://web.archive.org/...   # strongly preferred; posts disappear
type: community               # official | data | creator | community
author: "<name or handle>"
language: ko                  # en | ko | zh-tw | ...
region: kr                    # global | kr | tw | all
published: 2026-09-12
accessed: 2026-10-16
about_patch: "KR 2.1"         # the patch the source describes, in its own region's numbering
derived_from: []              # ids this source copies/translates; it is not independent of them
notes: "Translated with machine translation, checked against in-game screenshots in the post."
```

- Ids are stable kebab-case: `<site-or-author>-<topic>-<yyyy-mm>`.
- Sources are never deleted while a section cites them. A source whose link has died keeps its record and its `archived_url`.

## Build validation (fails the build)

`npm run build` runs these through the content core and stops with the list of errors. `CONTENT_DIR=<dir>` points the build at another content folder, and `npm run dev:demo` / `build:demo` use the fixture in `tests/fixtures/demo/`.

1. Every cited source id exists in the registry.
2. The patch graph has exactly one Baseline, has no cycles, and has at most one `live` patch.
3. Every file outside the Baseline has `change.reason` and `change.game_change`.
4. A Removal targets a section that exists somewhere up the chain.
5. Every `researched`/`reviewed` section has at least one citation or `[!opinion]` marker.
6. Every checklist item id is unique within its section.
7. Every file matches its frontmatter/YAML shape above, ids are unique, and every `derived_from` id exists.

Reported, not failing: confidence coverage per guide (share of claims that are Verified / Community / Unverified), sections still in `draft`, and sources with no `archived_url`.
