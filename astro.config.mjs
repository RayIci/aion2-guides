// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// SITE_URL / BASE_PATH are set by the Pages workflow (actions/configure-pages);
// locally the site is served from the root.
export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  integrations: [mdx()],
});
