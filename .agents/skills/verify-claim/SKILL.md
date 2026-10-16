---
name: verify-claim
description: Fact-check AION 2 guide content against its sources. Use when asked whether a claim, number, spot or recommendation is real, correct or current, when auditing a section's citations, or when sources look dead or outdated.
---

Re-check claims against the evidence and leave the guide stating exactly what the evidence supports. Confidence rules are in `docs/sourcing.md`, and syntax in `docs/content-model.md`.

## Steps

1. **Locate.** Resolve the input (a quoted claim, a section id, or a whole guide) to the claims involved, and work out which patch's copy you're checking (default: Live). List every claim and the sources it cites.

2. **Re-read each cited source.** Open the URL, or the `archived_url` if the link has died. For each claim decide one of: **supported**, **contradicted**, **outdated** (the source predates a patch that touched this system), or **not found in the source**.

3. **Search for fresher or stronger evidence.** For anything not cleanly supported, and for every claim that's only Community, search down the hierarchy for a Global Official/Data source or a second independent source. Look especially for patch notes newer than the source.

4. **Fix.** Change the guide so it says what the evidence supports. Register any new sources, correct or remove wrong claims, add `:::conflict` where sources disagree, and lower confidence where the evidence is weak. Update `last_checked`.
   - If the claim was wrong *in the patch it was written for*, fix that patch's copy, then check later patches for overrides of the same section.
   - If it became wrong *because of a later patch*, write an override in that patch with `change` filled in. Leave the older copy alone.

5. **Validate.** Run the build/validator. Done when it passes.

6. **Report.** Give a table of each claim → verdict → action → resulting confidence, then any conflicts the owner needs to decide.
