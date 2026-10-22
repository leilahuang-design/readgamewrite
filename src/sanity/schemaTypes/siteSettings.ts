import { defineField, defineType } from 'sanity';

// Single document that holds the editable site-wide texts.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: '網站設定',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTagline',
      title: '首頁副標',
      type: 'string',
      initialValue: 'A collection of moments from reading and video games',
    }),
    defineField({
      name: 'aboutEyebrow',
      title: 'About 頁小標',
      type: 'string',
      initialValue: 'ABOUT',
    }),
    defineField({
      name: 'aboutHeadline',
      title: 'About 頁大標',
      type: 'text',
      rows: 2,
      description: '可以換行，每一行會顯示成一行。',
    }),
    defineField({ name: 'aboutIntro', title: 'About 頁介紹', type: 'text', rows: 4 }),
    defineField({ name: 'nowUpdated', title: 'Now 頁更新日期', type: 'date' }),
    defineField({ name: 'nowBody', title: 'Now 頁內容', type: 'blockContent' }),
    defineField({ name: 'instagramUrl', title: 'Instagram 連結', type: 'url' }),
    defineField({ name: 'threadsUrl', title: 'Threads 連結', type: 'url' }),
  ],
  preview: { prepare: () => ({ title: '網站設定' }) },
});
