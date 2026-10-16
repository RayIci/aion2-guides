# 01: Site scaffold deployed to GitHub Pages

**What to build:** An Astro + MDX site with a dark-default / light-toggle theme and a mobile-first layout. On every push to `main`, GitHub Actions publishes it to GitHub Pages from the public repo (ADR-0001), using the repo-name base path. A placeholder home page is reachable at the Pages URL.

**Blocked by:** None (can start immediately). The owner has to create the public GitHub repo and enable Pages (Settings → Pages → GitHub Actions). That step is `ready-for-human`.

**Status:** ready-for-agent

- [x] `npm run build` produces a static site; `npm run dev` serves it locally
- [ ] Push to `main` deploys to Pages; the home page loads at the Pages URL
- [x] Dark theme by default, light toggle, readable at 400px width
- [x] Vitest configured with one passing placeholder test

## Comments

2026-10-16: Scaffold done (commit c6e81cf). `npm run build`, `npm run dev` and `npm test` all work. A build with `BASE_PATH=/aion2-guides` gives correctly prefixed links. The deploy workflow is at `.github/workflows/deploy.yml`. Still open: create the public GitHub repo, push, and set Settings → Pages → Source = GitHub Actions. Then confirm the Pages URL loads.
