# Read, Game, Write

Personal journal of book notes, game reviews and loose thoughts.
Astro (static) + Sanity (content, embedded Studio at `/studio`) + Cloudflare (hosting).

## How it fits together

1. You write and publish in **Sanity Studio** (`/studio`).
2. Sanity calls a **deploy hook** → Cloudflare rebuilds the site.
3. Astro reads the articles from Sanity at build time and outputs plain HTML.

If Sanity has no articles yet, the site shows sample content (and is `noindex`).
The first real article replaces all samples automatically.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321  ·  Studio at /studio
npm run build    # outputs ./dist
```

Requires Node 22+.

## Where things live

| What | Where |
| --- | --- |
| Colors, fonts, spacing tokens | `src/styles/global.css` |
| Site name, nav links, newsletter on/off | `src/config.ts` |
| Page templates | `src/pages/` |
| Components | `src/components/` |
| CMS fields | `src/sanity/schemaTypes/` |
| Sample content | `src/lib/sample.ts` |

## Cloudflare settings

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 (`.nvmrc`)
- Optional env vars: see `.env.example` (defaults already work)

## Sanity setup checklist

1. https://www.sanity.io/manage → project `6l9t2gd5` → **API → CORS origins**: add
   `http://localhost:4321`, your Cloudflare preview URL, and `https://readgamewrite.com`
   (tick **Allow credentials** for each).
2. Open `/studio` on the live site and sign in.
3. **API → Webhooks**: create a webhook that POSTs to the Cloudflare deploy hook URL
   on create / update / delete of `article` and `siteSettings`.
