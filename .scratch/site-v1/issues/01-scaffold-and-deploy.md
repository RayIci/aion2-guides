# 01: Site scaffold deployed to GitHub Pages

**What to build:** An Astro + MDX site with a dark-default / light-toggle theme and a mobile-first layout. On every push to `main`, GitHub Actions publishes it to GitHub Pages from the public repo (ADR-0001), using the repo-name base path. A placeholder home page is reachable at the Pages URL.

**Blocked by:** None (can start immediately). The owner has to create the public GitHub repo and enable Pages (Settings → Pages → GitHub Actions). That step is `ready-for-human`.

**Status:** ready-for-agent

- [ ] `npm run build` produces a static site; `npm run dev` serves it locally
- [ ] Push to `main` deploys to Pages; the home page loads at the Pages URL
- [ ] Dark theme by default, light toggle, readable at 400px width
- [ ] Vitest configured with one passing placeholder test
