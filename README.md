# AION 2 Guides

**Live site: https://rayici.github.io/aion2-guides/**

Patch-versioned, source-cited guides for AION 2 on the Global / NA-EU servers: class guides (Gladiator and Assassin first) and farming, crafting and economy guides. Every claim links to the source it came from and shows a confidence badge (Verified / Community / Unverified). You can switch between patches, and each patch has a changelog explaining what changed in the guide and why.

## Development

Requires Node 22.22+.

```sh
npm install
npm run dev         # site from content/
npm run dev:demo    # site from the demo fixture in tests/fixtures/demo/
npm test            # Vitest
npm run check       # TypeScript
npm run build       # static build to dist/ (fails on any content validation error)
```

Every push to `main` deploys to GitHub Pages through `.github/workflows/deploy.yml`.

## Where things are

- `content/`: guide content, versioned by patch. The format is in [docs/content-model.md](docs/content-model.md).
- [docs/sourcing.md](docs/sourcing.md): how sources are chosen, cited and scored.
- [docs/guide-outline.md](docs/guide-outline.md): the sections every guide must have.
- [GLOSSARY.md](GLOSSARY.md) and [docs/adr/](docs/adr/): vocabulary and design decisions.
- [AGENTS.md](AGENTS.md): instructions for AI agents working on the repo, including the `/research-section`, `/verify-claim` and `/new-patch` skills.
- `.scratch/site-v1/`: the spec and the work tickets.

Fan-made and not affiliated with NCSOFT. The site hosts no game assets.
