// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 部署到 GitHub Pages (User Page)，站点在根路径
  site: 'https://wilkessidney.github.io',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: false,
    },
  },
  build: {
    format: 'directory',
  },
});
