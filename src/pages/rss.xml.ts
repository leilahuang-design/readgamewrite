import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getArticles } from '../lib/content';

export async function GET(context: APIContext) {
  const articles = await getArticles();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: articles.map((a) => ({
      title: a.title,
      description: a.summary,
      pubDate: new Date(`${a.date}T00:00:00Z`),
      link: `/articles/${a.slug}/`,
      categories: [a.type, ...a.tags],
    })),
    customData: `<language>${SITE.locale}</language>`,
  });
}
