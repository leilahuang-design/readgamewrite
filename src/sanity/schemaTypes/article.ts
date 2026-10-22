import { defineField, defineType } from 'sanity';

const TYPE_LABELS: Record<string, string> = {
  books: 'Books',
  games: 'Games',
  essay: 'Essay',
};

// Keeps Chinese characters in the slug (Sanity's default would strip them).
const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

export const article = defineType({
  name: 'article',
  title: '文章',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '標題',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: '網址代稱',
      type: 'slug',
      description: '文章網址的最後一段。建議用英文，例如 the-unraveling-road。',
      options: { source: 'title', maxLength: 80, slugify },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: '類型',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Books（書）', value: 'books' },
          { title: 'Games（遊戲）', value: 'games' },
          { title: 'Essay（隨想）', value: 'essay' },
        ],
      },
      initialValue: 'books',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: '發佈日期',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'issue',
      title: '期數（Issue）',
      type: 'number',
      description: '選填。例如第 4 期填 4，會顯示為 ISSUE 04。',
      validation: (r) => r.integer().min(1),
    }),
    defineField({
      name: 'summary',
      title: '摘要',
      type: 'text',
      rows: 3,
      description: '列表頁和首頁顯示的一兩句話，建議 60 字以內。',
      validation: (r) => r.max(160).warning('摘要有點長，列表頁可能會被截斷。'),
    }),
    defineField({
      name: 'cover',
      title: '封面',
      type: 'image',
      description: 'Books 建議直式（書封），Games 和 Essay 建議橫式。',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: '替代文字' }],
    }),
    defineField({
      name: 'tags',
      title: '標籤',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'featured',
      title: '首頁主打',
      type: 'boolean',
      description: '打開後會出現在首頁右上角的 NEW / ISSUE 區塊。若有多篇，取最新的一篇；都沒開則用最新文章。',
      initialValue: false,
    }),
    defineField({
      name: 'readingMinutes',
      title: '閱讀時間（分鐘）',
      type: 'number',
      description: '留空會依內文字數自動估算。',
      validation: (r) => r.integer().min(1),
    }),
    defineField({ name: 'body', title: '內文', type: 'blockContent' }),
  ],
  orderings: [
    {
      title: '發佈日期（新到舊）',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', type: 'type', date: 'publishedAt', media: 'cover' },
    prepare: ({ title, type, date, media }) => ({
      title,
      subtitle: `${TYPE_LABELS[type as string] ?? ''} · ${date ?? '未設定日期'}`,
      media,
    }),
  },
});
