import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

export default defineConfig({
  name: 'rgw',
  title: 'Read, Game, Write',
  projectId: '6l9t2gd5',
  dataset: 'production',
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // "Site settings" is a single document, so hide it from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => schemaType !== 'siteSettings'),
  },
  document: {
    newDocumentOptions: (prev) => prev.filter((o) => o.templateId !== 'siteSettings'),
  },
});
