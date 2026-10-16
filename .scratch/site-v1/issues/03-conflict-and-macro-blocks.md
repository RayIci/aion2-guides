# 03: Conflict and macro blocks

**What to build:** `:::conflict` renders each alternative with its own citations plus an optional marked pick. `:::macro` renders monospace with a copy button.

**Blocked by:** 02

**Status:** done

- [x] Conflict alternatives each show their own badges and sources
- [x] Macro copy button copies exact text (and works when clipboard access is denied: it falls back to selecting the text)
- [x] Snippet render tests for both blocks

## Comments

2026-10-16: Done. The content core turns `:::conflict`, `:::macro`, `:::play` and `:::checklist` into semantic HTML (any other `:::name` is a build error). Conflicts render as an amber Alert-style box with a "Sources disagree: <topic>" title, and each alternative keeps its own citation badges. Macros render as a figure with their text verbatim (taken from the source lines) and a Copy button. If the clipboard is blocked, the button selects the text instead. Nesting rule documented: the outer fence needs more colons (`::::play`). Snippet tests in `content-core.test.ts`. Copy checked in Chromium.
