import { getCollection } from 'astro:content';

export interface WritingItem {
	id: string;
	href: string;
	title: string;
	description?: string;
	date?: Date;
	tags: string[];
	type: string;
	collection: 'blog' | 'notes';
}

/** Published blog posts + notes, merged into one reverse-chronological feed. */
export async function getWritingItems(): Promise<WritingItem[]> {
	const posts = (await getCollection('blog'))
		.filter((p) => p.data.status === 'published')
		.map((p) => ({
			id: p.id,
			href: `/blog/${p.id}/`,
			title: p.data.title,
			description: p.data.description,
			date: p.data.date ?? p.data.pubDate,
			tags: p.data.tags,
			type: p.data.type,
			collection: 'blog' as const,
		}));

	const notes = (await getCollection('notes'))
		.filter((n) => n.data.status === 'published')
		.map((n) => ({
			id: n.id,
			href: `/notes/${n.id}/`,
			title: n.data.title,
			description: n.data.description,
			date: n.data.date,
			tags: n.data.tags,
			type: n.data.type,
			collection: 'notes' as const,
		}));

	return [...posts, ...notes].sort(
		(a, b) => (b.date?.valueOf() ?? 0) - (a.date?.valueOf() ?? 0),
	);
}
