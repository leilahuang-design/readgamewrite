import type { ArticleType } from '../config';

export interface Article {
  slug: string;
  title: string;
  type: ArticleType;
  /** YYYY-MM-DD */
  date: string;
  issue?: number;
  summary: string;
  tags: string[];
  minutes: number;
  cover?: { url: string; alt: string; position?: string };
  bodyHtml: string;
}

export interface Settings {
  heroTagline: string;
  aboutEyebrow: string;
  aboutHeadline: string;
  aboutIntro: string;
  nowUpdated?: string;
  nowHtml: string;
  instagramUrl: string;
  threadsUrl: string;
}
