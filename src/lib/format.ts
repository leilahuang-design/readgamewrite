const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parts(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  return { y, m, d };
}

/** "Sep 8" – used in card meta on the home page. */
export const shortDate = (date: string) => {
  const { m, d } = parts(date);
  return `${MONTHS[m - 1]} ${d}`;
};

/** "SEP 08, 2026" – used in archive rows. */
export const archiveDate = (date: string) => {
  const { y, m, d } = parts(date);
  return `${MONTHS[m - 1].toUpperCase()} ${String(d).padStart(2, '0')}, ${y}`;
};

/** "Sep 8, 2026" – used on article pages. */
export const longDate = (date: string) => {
  const { y, m, d } = parts(date);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

export const year = (date: string) => parts(date).y;

export const issueLabel = (n?: number) => (n ? `Issue ${String(n).padStart(2, '0')}` : '');

/** Rough reading time: ~450 CJK characters or ~220 latin words per minute. */
export function estimateMinutes(text: string): number {
  const cjk = (text.match(/[㐀-鿿豈-﫿]/g) ?? []).length;
  const words = text
    .replace(/[㐀-鿿豈-﫿]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(cjk / 450 + words / 220));
}
