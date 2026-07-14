// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site is served from a GitHub *project* page until a custom domain exists:
//   https://cobrarp1.github.io/CobraWebsite/
// Both values are env-overridable so the custom-domain cutover is a config change,
// not a code change. See WORKFLOWS.md ("Moving to a custom domain").
//   SITE_URL=https://cobra.example.org BASE_PATH=/ npm run build
const SITE_URL = process.env.SITE_URL ?? 'https://cobrarp1.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/CobraWebsite';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    // Emit /about/index.html rather than /about.html so links work under any base path.
    format: 'directory',
  },
});
