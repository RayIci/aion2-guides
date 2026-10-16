# 09: Coverage report and source link check

**What to build:** A build-time coverage page showing, per guide, the share of claims that are Verified / Community / Unverified, plus the draft sections and sources missing an `archived_url`. A scheduled GitHub Action (weekly) checks every source URL and writes a dead-link report the owner can read.

**Blocked by:** 02

**Status:** done

- [x] Coverage page numbers match the fixture content
- [x] Scheduled workflow lists dead URLs with the sections citing them

## Comments

2026-10-16: Done.
- `/<patch>/coverage` (linked from each patch home): a shadcn `Table` per guide with sections, drafts, Verified/Community/Unverified claim counts and the Verified share, then the draft sections and the sources with no archived copy. The demo numbers match a hand count (1/4/1 plus the section list → 17%).
- `scripts/check-links.mjs` plus the weekly `.github/workflows/link-check.yml` (Mondays 06:00 UTC, also runnable by hand). It fetches every source `url` and `archived_url`, writes a table of dead links with the files citing them to the run summary, and fails the run, which makes GitHub email the owner. Cloudflare bot checks (gaming.tools, Playnews) are listed as "not checkable by script", not as dead. Real content: 35 sources, 0 dead, 14 behind bot checks.
