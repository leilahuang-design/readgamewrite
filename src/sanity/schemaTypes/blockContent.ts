import { defineArrayMember, defineType } from 'sanity';

// Rich-text body used by articles and the "Now" page.
export const blockContent = defineType({
  name: 'blockContent',
  title: '內文',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: '段落', value: 'normal' },
        { title: '大標題', value: 'h2' },
        { title: '小標題', value: 'h3' },
        { title: '引用', value: 'blockquote' },
      ],
      lists: [
        { title: '項目符號', value: 'bullet' },
        { title: '編號', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: '粗體', value: 'strong' },
          { title: '斜體', value: 'em' },
          { title: '螢光標記', value: 'highlight' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: '連結',
            fields: [{ name: 'href', type: 'url', title: '網址' }],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'caption', type: 'string', title: '圖說' },
        { name: 'alt', type: 'string', title: '替代文字（給無障礙閱讀）' },
      ],
    }),
  ],
});
