import { sanityClient } from 'sanity:client';
import { SITE, type ArticleType } from '../config';
import { estimateMinutes } from './format';
import { portableToHtml, portableToText } from './portable';
import { SAMPLE_ARTICLES, SAMPLE_SETTINGS } from './sample';
import type { Article, Settings } from './types';

const ARTICLES_QUERY = /* groq */ `*[_type == "article" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc, _createdAt desc) {
  "slug": slug.current,
  title,
  type,
  "date": publishedAt,
  issue,
  "summary": coalesce(summary, ""),
  "tags": coalesce(tags, []),
  readingMinutes,
  featured,
  "cover": cover{ "url": asset->url, alt, hotspot },
  "body": body[]{
    ...,
    _type == "image" => { ..., asset->{ url, metadata { dimensions } } }
  }
}`;

const SETTINGS_QUERY = /* groq */ `*[_type == "siteSettings"][0]{
  heroTagline, aboutEyebrow, aboutHeadline, aboutIntro, nowUpdated, instagramUrl, threadsUrl,
  "nowBody": nowBody[]{ ..., _type == "image" => { ..., asset->{ url, metadata { dimensions } } } }
}`;

let cache: Promise<{ articles: Article[]; usingSamples: boolean; featuredSlug?: string }> | undefined;
let settingsCache: Promise<Settings> | undefined;

function toArticle(r: any): Article {
  const bodyText = portableToText(r.body);
  const type: ArticleType = r.type in { books: 1, games: 1, essay: 1 } ? r.type : 'essay';
  let position: string | undefined;
  if (r.cover?.hotspot) {
    position = `${Math.round(r.cover.hotspot.x * 100)}% ${Math.round(r.cover.hotspot.y * 100)}%`;
  }
  return {
    slug: r.slug,
    title: r.title,
    type,
    date: r.date,
    issue: r.issue ?? undefined,
    summary: r.summary,
    tags: r.tags,
    minutes: r.readingMinutes ?? estimateMinutes(bodyText || r.summary || r.title),
    cover: r.cover?.url ? { url: r.cover.url, alt: r.cover.alt ?? '', position } : undefined,
    bodyHtml: portableToHtml(r.body),
  };
}

/** Optimised Sanity image URL (no-op for local sample images). */
export function img(url: string, width: number): string {
  return url.startsWith('http') ? `${url}?w=${width}&auto=format&q=80` : url;
}

function load() {
  cache ??= (async () => {
    // A failed request throws, so the build fails and the live site is left untouched.
    const rows: any[] = await sanityClient.fetch(ARTICLES_QUERY);
    if (rows.length === 0) {
      console.warn('[content] Sanity has no articles yet – using sample content (site is noindex).');
      return { articles: SAMPLE_ARTICLES, usingSamples: true, featuredSlug: SAMPLE_ARTICLES[0].slug };
    }
    const articles = rows.map(toArticle);
    const featured = rows.find((r) => r.featured) ?? rows[0];
    return { articles, usingSamples: false, featuredSlug: featured.slug as string };
  })();
  return cache;
}

export const getArticles = async () => (await load()).articles;
export const isUsingSamples = async () => (await load()).usingSamples;

export async function getFeatured(): Promise<Article | undefined> {
  const { articles, featuredSlug } = await load();
  return articles.find((a) => a.slug === featuredSlug) ?? articles[0];
}

export async function getSettings(): Promise<Settings> {
  settingsCache ??= (async () => {
    const s: any = await sanityClient.fetch(SETTINGS_QUERY);
    const d = SAMPLE_SETTINGS;
    return {
      heroTagline: s?.heroTagline || SITE.tagline,
      aboutEyebrow: s?.aboutEyebrow || d.aboutEyebrow,
      aboutHeadline: s?.aboutHeadline || d.aboutHeadline,
      aboutIntro: s?.aboutIntro || d.aboutIntro,
      nowUpdated: s?.nowUpdated || d.nowUpdated,
      nowHtml: portableToHtml(s?.nowBody) || d.nowHtml,
      instagramUrl: s?.instagramUrl || SITE.instagramUrl,
      threadsUrl: s?.threadsUrl || SITE.threadsUrl,
    };
  })();
  return settingsCache;
}
