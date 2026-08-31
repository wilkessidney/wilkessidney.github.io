import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../utils/site';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const works = await getCollection('works');

  const items = [
    ...articles.map((a) => ({
      title: a.data.title,
      pubDate: a.data.date,
      description: a.data.summary,
      link: `/writing/${a.id}`,
      categories: a.data.tags,
    })),
    ...works.map((w) => ({
      title: w.data.title,
      pubDate: new Date(w.data.year, 0, 1),
      description: w.data.summary,
      link: `/works/${w.id}`,
      categories: w.data.tags,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items,
  });
}
