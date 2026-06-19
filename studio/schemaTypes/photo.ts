import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'photo',
  title: 'Nuotrauka',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pavadinimas (vidinis, nematomas lankytojams)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Nuotrauka',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt tekstas (aprašymas neregintiems / SEO)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
});
