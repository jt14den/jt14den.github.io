// @ts-check
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.tim-dennis.com',
	integrations: [
		starlight({
			title: 'Tim Dennis',
			description:
				'Director, UCLA Library Data Science Center — Open Science, Research Data, Library Leadership',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/jt14den' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/jtimdennis/' },
			],
			customCss: ['./src/styles/starlight.css'],
			// Disable last-updated since we don't have git dates on all content
			lastUpdated: false,
			// Disable table of contents globally — re-enable per-page via frontmatter if needed
			tableOfContents: false,
			sidebar: [
				{ label: 'About', link: '/about/' },
				{
					label: 'Programs',
					collapsed: true,
					items: [
						{
							label: 'UCLA Data Science Center',
							link: '/programs/ucla-data-science-center/',
						},
						{ label: 'UC Carpentries', link: '/programs/uc-carpentries/' },
						{ label: 'UCLA DataSquad', link: '/programs/ucla-datasquad/' },
						{ label: 'UCLA Dataverse', link: '/programs/ucla-dataverse/' },
						{
							label: 'Redivis Restricted Data',
							link: '/programs/redivis-restricted-data/',
						},
						{
							label: 'IMLS Open Science Curriculum',
							link: '/programs/imls-open-science-curriculum/',
						},
						{ label: 'UC OSPO Education', link: '/programs/uc-ospo-education/' },
					],
				},
				{ label: 'Impact', link: '/impact/' },
				{
					label: 'Case Studies',
					collapsed: true,
					items: [
						{
							label: 'Carceral Ecologies',
							link: '/case-studies/carceral-ecologies/',
						},
						{
							label: 'Biocritical Studies Lab',
							link: '/case-studies/biocritical-studies-lab/',
						},
					],
				},
				{ label: 'Governance', link: '/governance/' },
				{ label: 'Scholarship', link: '/scholarship/' },
				{ label: 'Grants & Talks', link: '/talks-grants/' },
			],
		}),
		// Note: @astrojs/mdx is omitted — Starlight bundles its own MDX support.
		// If you need standalone MDX pages outside of Starlight, re-add it.
		sitemap(),
	],
});
