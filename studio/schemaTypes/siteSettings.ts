import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Svetainės nustatymai',
  type: 'document',
  fields: [
    defineField({
      name: 'heroPhoto',
      title: 'Pradžios puslapio didelė nuotrauka',
      type: 'reference',
      to: [{ type: 'photo' }],
    }),
    defineField({
      name: 'introText',
      title: 'Įžangos tekstas (pradžios puslapyje)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bioPhoto',
      title: 'Nuotrauka "Apie mane" puslapyje',
      type: 'reference',
      to: [{ type: 'photo' }],
    }),
    defineField({
      name: 'bioText',
      title: 'Biografijos tekstas (kiekviena pastraipa - naujoje eilutėje)',
      type: 'text',
      rows: 8,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Svetainės nustatymai' };
    },
  },
});
