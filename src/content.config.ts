import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared post fields
const postBase = {
	title: z.string(),
	description: z.string().optional(),
	date: z.coerce.date().optional(),
	pubDate: z.coerce.date().optional(), // legacy alias
	updated: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	topic: z.array(z.string()).default([]),
	status: z.enum(['draft', 'published']).default('draft'),
	type: z
		.enum(['essay', 'note', 'linkpost', 'announcement', 'roundup', 'crosspost'])
		.default('essay'),
	canonicalUrl: z.string().optional(),
	externalUrl: z.string().optional(),
};

// Blog — primary writing collection
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			...postBase,
			heroImage: image().optional(),
		}),
});

// Notes — quick capture, technical notes, linkposts
const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		...postBase,
		promoteToBlog: z.boolean().default(false),
	}),
});

// Programs — durable program/initiative pages
const programs = defineCollection({
	loader: glob({ base: './src/content/programs', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		status: z.enum(['draft', 'published']).default('draft'),
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
		title: z.string(),
		description: z.string(),
		date: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		status: z.enum(['draft', 'published']).default('draft'),
		partner: z.string().optional(),
		outcomes: z.array(z.string()).default([]),
		year: z.number().optional(),
	}),
});

// Scholarship — publications, reports, datasets, citable outputs
const scholarship = defineCollection({
	loader: glob({ base: './src/content/scholarship', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		status: z.enum(['draft', 'published']).default('draft'),
		doi: z.string().optional(),
		authors: z.array(z.string()).default([]),
		venue: z.string().optional(),
		year: z.number().optional(),
		type: z
			.enum(['journal', 'book-chapter', 'report', 'dataset', 'curriculum', 'other'])
			.default('other'),
	}),
});

// Talks & Grants — combined collection
const talks = defineCollection({
	loader: glob({ base: './src/content/talks', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		status: z.enum(['draft', 'published']).default('draft'),
		venue: z.string().optional(),
		year: z.number().optional(),
		type: z.enum(['talk', 'grant', 'award']).default('talk'),
		amount: z.string().optional(),
		role: z.string().optional(),
		url: z.string().optional(),
		doi: z.string().optional(),
	}),
});

export const collections = { blog, notes, programs, caseStudies, scholarship, talks };
