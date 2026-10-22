import { escapeHTML, toHTML } from '@portabletext/to-html';

// Converts Sanity rich text (Portable Text) to HTML at build time.
export function portableToHtml(blocks: unknown): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return '';
  return toHTML(blocks as any, {
    components: {
      marks: {
        highlight: ({ children }) => `<mark>${children}</mark>`,
        link: ({ children, value }) => {
          const href = String(value?.href ?? '#');
          const external = /^https?:\/\//.test(href);
          return `<a href="${escapeHTML(href)}"${
            external ? ' target="_blank" rel="noopener noreferrer"' : ''
          }>${children}</a>`;
        },
      },
      types: {
        image: ({ value }) => {
          const url = value?.asset?.url;
          if (!url) return '';
          const dims = value.asset.metadata?.dimensions;
          const size = dims ? ` width="${dims.width}" height="${dims.height}"` : '';
          const alt = escapeHTML(value.alt ?? value.caption ?? '');
          const caption = value.caption ? `<figcaption>${escapeHTML(value.caption)}</figcaption>` : '';
          return `<figure><img src="${escapeHTML(url)}?w=1400&auto=format" alt="${alt}"${size} loading="lazy" decoding="async" />${caption}</figure>`;
        },
      },
    },
  });
}

/** Plain text of a Portable Text array (used for reading-time estimate). */
export function portableToText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter((b: any) => b?._type === 'block')
    .map((b: any) => (b.children ?? []).map((c: any) => c.text ?? '').join(''))
    .join('\n');
}
