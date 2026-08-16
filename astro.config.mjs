// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://www.tim-dennis.com',
	integrations: [sitemap()],
	redirects: {
		'/blog': '/writing',
		'/blog/archive': '/writing/archive',
		'/blog/tags/[tag]': '/writing/tags/[tag]',
		'/notes': '/writing',
	},
});
