import type { StructureResolver } from 'sanity/structure';

// Left-hand menu in the Studio: Articles list + the single Site Settings doc.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('內容')
    .items([
      S.documentTypeListItem('article').title('文章'),
      S.divider(),
      S.listItem()
        .title('網站設定')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ]);
