// Site-wide settings. Anything marked "editable in Studio" can also be
// changed from the CMS (Site Settings) without touching code.
export const SITE = {
  name: 'Read, Game, Write',
  shortName: 'RGW',
  url: 'https://readgamewrite.com',
  copyrightName: 'Read Game Write',
  year: 2026,
  // Hero subtitle on the home page (editable in Studio).
  tagline: 'A collection of moments from reading and video games',
  description:
    'A personal journal of book notes, video-game reviews and loose thoughts. Read, Game, Write.',
  locale: 'zh-Hant',
  // MVP: newsletter is off. Flip to true when a mailing service is connected;
  // this shows the nav "Subscribe" button and the About-page callout.
  newsletterEnabled: false,
  newsletterUrl: '#',
  // Social links (leave empty to hide). Editable in Studio.
  instagramUrl: '',
  threadsUrl: '',
  // Top navigation. `match` marks the active link by path prefix.
  nav: [
    { label: 'Home', href: '/', match: '' },
    { label: 'All Articles', href: '/articles/', match: '/articles' },
    { label: 'Books', href: '/books/', match: '/books' },
    { label: 'Games', href: '/games/', match: '/games' },
    { label: 'About', href: '/about/', match: '/about' },
    { label: 'Now', href: '/now/', match: '/now' },
  ],
} as const;

export const TYPES = {
  books: { label: 'Books', plural: 'books' },
  games: { label: 'Games', plural: 'games' },
  essay: { label: 'Essay', plural: 'essays' },
} as const;

export type ArticleType = keyof typeof TYPES;
