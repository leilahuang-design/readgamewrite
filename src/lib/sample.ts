import type { Article, Settings } from './types';

// Placeholder content taken from the Figma mock-ups. It is only shown while the
// Sanity dataset has no articles yet, and the site is marked noindex in that case.
const body = (extra = '') =>
  `<p>這是一段範例內文，用來預覽文章頁的排版。發佈第一篇真正的文章之後，這些範例文章就會自動消失。</p>
<h2>小標題的樣子</h2>
<p>每一段文字使用襯線字體，行距放寬，讓長篇閱讀比較輕鬆。你可以在 Studio 裡使用粗體、斜體與<mark>螢光標記</mark>。</p>
<blockquote>引用的文字會有一條細線在左邊，顏色保持低調。</blockquote>
<p>${extra || '最後一段，用來確認段落之間的間距。'}</p>`;

const cover = (file: string, alt: string) => ({ url: `/sample/${file}`, alt });

export const SAMPLE_ARTICLES: Article[] = [
  {
    slug: 'after-the-story-ends',
    title: '在故事結束之後，我們留下了什麼？',
    type: 'essay',
    date: '2026-09-12',
    issue: 4,
    summary: '閱讀與遊玩，都是暫借另一種人生的練習。',
    tags: ['Story', 'Memory'],
    minutes: 6,
    cover: cover('hover-essay.webp', ''),
    bodyHtml: body(),
  },
  {
    slug: 'the-unraveling-road',
    title: '《隱谷路》：當一個家庭成為科學的註腳',
    type: 'books',
    date: '2026-09-08',
    issue: 3,
    summary: '疾病改寫了一家人的命運，也迫使我們重新理解「正常」究竟意味著什麼。',
    tags: ['Story', 'Endings', 'Memory'],
    minutes: 8,
    cover: cover('cover-unraveling-road.webp', '《隱谷路》書封'),
    bodyHtml: body(),
  },
  {
    slug: 'elden-ring-and-patience',
    title: '《艾爾登法環》與失敗所教會我的耐心',
    type: 'games',
    date: '2026-09-03',
    issue: 2,
    summary: '不是每次跌倒都需要立刻站起來。有時候，繞路本身就是一種答案。',
    tags: ['Elden Ring', 'Failure', 'Patience'],
    minutes: 10,
    cover: cover('game-elden.webp', ''),
    bodyHtml: body(),
  },
  {
    slug: 'the-quiet-between-us',
    title: '讀完《正常人》後，那些沒有說出口的話',
    type: 'books',
    date: '2026-08-27',
    issue: 1,
    summary: '我們如何在親密關係裡靠近，又如何因為沉默而錯過彼此。',
    tags: ['Intimacy', 'Silence', 'Relationships'],
    minutes: 7,
    cover: cover('cover-quiet-between-us.webp', '《正常人》書封'),
    bodyHtml: body(),
  },
  {
    slug: 'between-save-points',
    title: '存檔點之間：遊戲如何替時間留下形狀',
    type: 'games',
    date: '2026-08-14',
    summary: '當我們重新載入一段選擇，也重新想像了後悔的可能。',
    tags: ['Save', 'Time'],
    minutes: 9,
    bodyHtml: body(),
  },
  {
    slug: 'klara-and-the-sun',
    title: '《克拉拉與太陽》：忠誠是什麼形狀？',
    type: 'books',
    date: '2026-08-10',
    summary: '石黑一雄筆下的人造情感，比人類更接近純粹。',
    tags: ['Loyalty', 'AI'],
    minutes: 10,
    bodyHtml: body(),
  },
  {
    slug: 'the-remains-of-the-day',
    title: '《長日將盡》：把遺憾保存得多好',
    type: 'books',
    date: '2026-07-22',
    summary: '一個人如何在回憶裡重新活過一遍，卻依然無法改變什麼。',
    tags: ['Regret', 'Memory'],
    minutes: 11,
    bodyHtml: body(),
  },
  {
    slug: 'miracles-of-the-namiya-general-store',
    title: '讀《解憂雜貨店》：信件是一種時間機器',
    type: 'books',
    date: '2026-06-15',
    summary: '當我們試著替別人想，也在練習對自己誠實。',
    tags: ['Letters', 'Time'],
    minutes: 6,
    bodyHtml: body(),
  },
  {
    slug: 'the-unlikely-pilgrimage',
    title: '《一個人的朝聖》：步行是一種自我考古',
    type: 'books',
    date: '2026-05-02',
    summary: '在每一步的重複裡，那些我們以為忘掉的事浮了上來。',
    tags: ['Walking', 'Memory'],
    minutes: 8,
    bodyHtml: body(),
  },
  {
    slug: 'books-i-did-not-finish',
    title: '年末：那些我沒有讀完的書',
    type: 'essay',
    date: '2025-12-18',
    summary: '放棄一本書，也是一種閱讀的決定。',
    tags: ['Reading'],
    minutes: 4,
    bodyHtml: body(),
  },
  {
    slug: 'stardew-valley-slow-ethics',
    title: '《星露谷物語》教我的緩慢倫理',
    type: 'games',
    date: '2025-10-05',
    summary: '在加速的世界裡，選擇一塊田地，慢慢耕耘。',
    tags: ['Stardew Valley', 'Slowness'],
    minutes: 7,
    bodyHtml: body(),
  },
];

export const SAMPLE_SETTINGS: Settings = {
  heroTagline: 'A collection of moments from reading and video games',
  aboutEyebrow: 'ABOUT',
  aboutHeadline: '在書頁與存檔點之間，\n練習更慢地看世界。',
  aboutIntro:
    '這裡記下我讀過的書、玩過的遊戲，以及它們悄悄改變我看世界的方式。我不追逐熱門，也不急著給出結論。',
  nowUpdated: '2026-10-01',
  nowHtml:
    '<p>這一頁記錄我現在正在做的事：正在讀的書、正在玩的遊戲，和最近在想的事。</p><p>（範例內容，請到 Studio 的「網站設定」修改。）</p>',
  instagramUrl: '',
  threadsUrl: '',
};
