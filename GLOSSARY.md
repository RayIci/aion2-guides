# AION 2 Guides

A patch-versioned website of AION 2 (Global / NA-EU) guides. Every statement can be traced to the source it came from, so it can be checked while playing.

## Patches

**Patch**:
One game update on the Global / NA-EU servers, identified by its official version or release. It is the unit the whole site is versioned by.
_Avoid_: version, update, release (when you mean the site's versioning unit)

**Baseline patch**:
The first patch the site documents in full. Every section exists in it.
_Avoid_: root patch, initial version

**Parent patch**:
The patch a given patch inherits from, usually the one released just before it.

**Override**:
A section rewritten for a specific patch. It replaces the inherited copy from that patch onward.
_Avoid_: patch file, delta

**Removal**:
An override that deletes a section from a patch onward, because the content no longer exists in the game.

**Change reason**:
The required note on an override that explains what changed in the game and why the guide changed with it.
_Avoid_: commit message, comment

**Patch changelog**:
The summary of every override and removal a patch introduces, with their change reasons and a short hand-written overview.
_Avoid_: release notes (those are the game's own **Official patch notes**)

**Official patch notes**:
The developer's own published notes for a patch. They are the main source for what a patch changed.

**Patch status**:
Where a patch is in its life: **Staged** (announced or expected, prepared ahead of release and not yet the default), **Live** (the current default), or **Superseded** (older, still browsable).

**Resolved guide**:
The full guide as it reads for one chosen patch, after inheritance and overrides are applied.

## Evidence

**Source**:
One external piece of information the guide relies on, such as official patch notes, a database entry, a video, a forum post or a comment. Each has a stable identifier, a link and a source type.
_Avoid_: reference, link (when you mean the registered record)

**Source type**:
The trust class of a source: **Official**, **Data** (database, datamine), **Creator** (an established guide writer or streamer), or **Community** (forum post, comment, Reddit thread).

**Claim**:
One checkable statement in the guide, such as a skill effect, a stat priority, a spawn location or a recipe cost.
_Avoid_: fact, info

**Citation**:
The link from a claim, or from a whole section, to one or more sources.

**Confidence**:
How well a claim is backed: **Verified** (an Official or Data source, or at least two independent sources that agree), **Community** (one non-official source), or **Unverified** (no source yet, or the author's own reasoning). It is shown as a badge.
_Avoid_: rating, trust score

**Conflict**:
A point where sources disagree. It is shown with each alternative and its own citations, never settled silently.

**Last checked**:
The date a section's claims were last compared against their sources.

## Class guides

**Class guide**:
The complete guide for one playable class, covering progression, systems and every game mode.

**Level bracket**:
A range of character levels, from one in-game milestone to the next. The guide says what state the character should be in by then (skills, gear, enchants, content done).
_Avoid_: level range, phase

**Endgame tier**:
A stage of progression after reaching max level: **Early**, **Mid** or **Advanced** endgame, each defined by gear and the content it opens up.
_Avoid_: endgame phase, gear level

**Mode**:
One kind of content a build is tuned for. This is **PvE** or one specific PvP mode (1v1, each arena type, Abyss, open-world, siege…).
_Avoid_: content type, game type

**Build**:
The skill choices, skill upgrades, stat priorities and gear setup for one class in one mode at one stage.

**Rotation**:
The order in which a build uses its skills, including openers, priority rules and burst windows.

**Macro**:
An in-game macro definition the guide gives the player to copy.

**Matchup**:
How one class plays against one specific opposing class in PvP.

**Checklist**:
The tickable list of targets for a level bracket or endgame tier. The player's progress is remembered between visits.

**Playing mode**:
The condensed view of a guide meant for use alongside the game. It shows only the blocks marked for quick reference: rotation, macros and the current checklist.
_Avoid_: compact view, overlay

## Farming & crafting

**Material**:
Any item gathered, looted or bought in order to craft or progress.

**Spot**:
A specific location on a map where a material can be obtained.

**Farming route**:
An ordered path through one or more spots, built to collect a material efficiently. It always comes with **Alternatives** for when a spot is contested or changed.

**Profession**:
A gathering or crafting skill a character levels up.

**Recipe**:
A crafting formula: the inputs and profession level needed, and what it produces.

**Profit check**:
A comparison of a recipe's input cost and output value, valid for a given patch and date.
