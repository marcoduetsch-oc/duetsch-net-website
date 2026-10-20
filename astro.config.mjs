// @ts-check
import { defineConfig } from 'astro/config';

// Statische Ausgabe: `dist/` wird 1:1 per Green-Git-Integration deployt.
export default defineConfig({
  site: 'https://www.duetsch.net',
  output: 'static',
  build: { format: 'directory' }, // /leistungen/ -> /leistungen/index.html
  compressHTML: true,
  devToolbar: { enabled: false },
});
