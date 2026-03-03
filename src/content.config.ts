import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Shared base fields present in every collection
const base = {
	title: z.string(),
	description: z.string(),
	date: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	status: z.enum(['draft', 'published']).default('draft'),
};

// Blog — legacy collection, kept as-is
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

// Programs — durable program/initiative pages
const programs = defineCollection({
	loader: glob({ base: './src/content/programs', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		...base,
		startYear: z.number().optional(),
		collaborators: z.array(z.string()).default([]),
		relatedLinks: z
			.array(z.object({ label: z.string(), url: z.string() }))
			.default([]),
		order: z.number().optional(),
	}),
});

// Case studies — concrete project impact stories
const caseStudies = defineCollection({
	loader: glob({ base: './src/content/case-studies', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		...base,
		partner: z.string().optional(),
		outcomes: z.array(z.string()).default([]),
		year: z.number().optional(),
	}),
});

// Scholarship — publications, reports, datasets, citable outputs
const scholarship = defineCollection({
	loader: glob({ base: './src/content/scholarship', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		...base,
		doi: z.string().optional(),
		venue: z.string().optional(),
		year: z.number().optional(),
		type: z
			.enum(['journal', 'book-chapter', 'report', 'dataset', 'curriculum', 'other'])
			.default('other'),
	}),
});

// Talks & Grants — combined collection (type field distinguishes them)
const talks = defineCollection({
	loader: glob({ base: './src/content/talks', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		...base,
		venue: z.string().optional(),
		year: z.number().optional(),
		type: z.enum(['talk', 'grant', 'award']).default('talk'),
		amount: z.string().optional(),
		role: z.string().optional(),
	}),
});

// Starlight docs collection — required by the Starlight integration.
// Content lives in src/content/docs/. Currently empty; all portfolio pages
// use StarlightPage directly from .astro files.
const docs = defineCollection({
	loader: docsLoader(),
	schema: docsSchema(),
});

export const collections = { docs, blog, programs, caseStudies, scholarship, talks };
