# Static site from Markdown in git, hosted on GitHub Pages from a public repo

The site is a static site generator build (Astro), with all guide content written as Markdown/MDX files in the repo and deployed to GitHub Pages by GitHub Actions. The owner wants zero hosting cost. GitHub Pages is free only for public repos, so the repo is public. Cloudflare Pages was the alternative: it is free with a private repo and could restrict access to friends later. The owner chose GitHub Pages anyway.

## Consequences

- Everything in the repo is public, including `.scratch/` notes and research drafts. Nothing private goes in.
- No server and no database. Search, the patch diff view, checklists and playing mode have to work from build output plus the visitor's browser. Checklist progress lives in each visitor's browser storage and is never synced.
- Each patch update is a reviewable git change, so diffs and history come for free.
- If the owner later wants access limited to friends, the move is to Cloudflare Pages + Cloudflare Access. The content and build need no changes, only the deploy target.
