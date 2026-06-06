import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const blogPosts = (await getCollection('blog'))
		.filter((p) => p.data.status === 'published')
		.map((post) => ({
			title: post.data.title,
			description: post.data.description ?? '',
			pubDate: post.data.date ?? post.data.pubDate ?? new Date(),
			link: `/blog/${post.id}/`,
			categories: post.data.tags,
		}));

	const notes = (await getCollection('notes'))
		.filter((n) => n.data.status === 'published')
		.map((note) => ({
			title: note.data.title,
			description: note.data.description ?? '',
			pubDate: note.data.date ?? new Date(),
			link: `/notes/${note.id}/`,
			categories: note.data.tags,
		}));

	const items = [...blogPosts, ...notes].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
