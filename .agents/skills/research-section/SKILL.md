---
name: research-section
description: Research and write an AION 2 guide section from cited sources. Use when creating, filling, expanding or refreshing any section from docs/guide-outline.md (class guide, map, material, profession, economy), or when working a research ticket.
---

Write one section, or a small sibling group, so that every claim traces to a registered source. Rules live in `docs/sourcing.md` and the format in `docs/content-model.md`. Read both before step 1.

## Steps

1. **Scope.** Find the section id in `docs/guide-outline.md` and list the questions it has to answer. Work out the target patch: the Live patch, unless you were told otherwise. You write into that patch's folder. The Baseline gets a normal file; any later patch gets an override with `change`. Done when you have a written question list.

2. **Gather.** Search down the source hierarchy for each question: Official → Data → Creator → Community, Global before KR/TW. Check `docs/source-directory.md` first. Open and read each source yourself; a search snippet isn't enough. Done when every question has at least one source, or has been recorded as an open gap.

3. **Raise confidence.** For every answer that's only Community, look for a second **independent** source or a Data/Official one. Done when each claim is either Verified or you've recorded where you looked.

4. **Register.** Add each new source to `content/sources/` with an archive snapshot, as described in `docs/sourcing.md`. Add any reliable site you found to `docs/source-directory.md`.

5. **Write.** Write the section to the outline's required parts. Cite each claim, put disagreements in `:::conflict`, mark your own reasoning `[!opinion]`, and put the rotation/macros/checklist parts in `:::play` / `:::macro` / `:::checklist`. Set `status: researched` and `last_checked: <today>`. If the game has no such system on Global, leave the section out and add the one-line note the outline asks for. If you found a game system the outline lacks, add it to `docs/guide-outline.md`.

6. **Validate.** Run the site build/validator. Done when it passes with no errors for this section.

7. **Report.** Give the section id, a confidence breakdown (Verified / Community / Unverified counts), the open gaps, and any conflicts the owner should decide.
