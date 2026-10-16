# UI built from shadcn/ui components, as React islands inside static Astro pages

The owner asked for shadcn/ui to be used wherever possible. The site therefore adds React and Tailwind v4 to Astro and uses shadcn's `base-nova` style (Base UI primitives, lucide icons). Pages are still static: shadcn components render to plain HTML at build time, and only interactive pieces ship JavaScript, as `client:*` islands (the guide sidebar, the theme menu, and later the patch switcher, search, checklists and playing mode). Markdown section bodies stay plain HTML from the content core. They're styled with Tailwind Typography on the shadcn tokens, and citation badges mirror the Badge component's confidence variants in CSS, so the content core never depends on the UI.

## Consequences

- Update 2026-10-16: shadcn is the base, not a cage. Where a shadcn component doesn't fit the design, build a custom component in `src/components/site/`. The owner wants a plain, utilitarian UI: no decorative design.

- Restyle by editing the theme tokens in `src/styles/global.css` and the `cva` variants in `src/components/ui/*`. Avoid overriding component colors with `className`.
- Astro can't pass JSX elements (e.g. `render={<a/>}`) to React components. Any composition that needs one lives in a `.tsx` wrapper under `src/components/site/` and takes plain data.
- Run the shadcn CLI as `./node_modules/.bin/shadcn`, not `npx shadcn`. Under `npx`, its nested `npm install` inherits the owner's user-level `allow-scripts` npm setting and fails with `EALLOWSCRIPTS`.
- Each interactive island ships React (~60 KB gzipped, shared across islands).
