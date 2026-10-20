// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Statische Ausgabe: `dist/` wird 1:1 per Green-Git-Integration deployt.
export default defineConfig({
  site: 'https://www.duetsch.net',
  output: 'static',
  build: { format: 'directory' }, // /leistungen/ -> /leistungen/index.html
  compressHTML: true,
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
