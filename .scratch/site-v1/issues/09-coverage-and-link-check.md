# 09: Coverage report and source link check

**What to build:** A build-time coverage page showing, per guide, the share of claims that are Verified / Community / Unverified, plus the draft sections and sources missing an `archived_url`. A scheduled GitHub Action (weekly) checks every source URL and writes a dead-link report the owner can read.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Coverage page numbers match the fixture content
- [ ] Scheduled workflow lists dead URLs with the sections citing them
