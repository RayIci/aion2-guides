# Patches inherit from their parent and store only overrides

The **Baseline patch** contains every section. Each later patch stores only its **Overrides** and **Removals**, and each one must carry a **Change reason**. The **Resolved guide** for a patch is built by walking up the parent chain and taking the nearest copy of each section. We chose this over a full copy per patch so that every patch's changelog and diff fall straight out of what it stores, and so content isn't duplicated across many patches.

## Considered options

- **Full snapshot per patch**: simpler to read, but each patch copies the whole guide, the diffs are noise, and a fix to an unchanged section has to be repeated in every copy.

## Consequences

- The section is the smallest thing a patch can change. Sections need to be small enough that a balance change to one skill doesn't force rewriting a whole guide.
- Fixing a mistake in an older patch's copy of a section does not flow to patches that already override that section. An agent fixing a section has to check for overrides further down the chain.
- A section's identity must stay stable across patches. Renaming a section is a removal plus a new section, not an in-place rename.
