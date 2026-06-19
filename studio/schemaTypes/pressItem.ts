import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pressItem',
  title: 'Spaudos įrašas',
  type: 'document',
  fields: [
    defineField({
      name: 'outlet',
      title: 'Leidinys (pvz. "15min.lt")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Straipsnio pavadinimas',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Nuoroda',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publikavimo data',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Nuotrauka',
      type: 'reference',
      to: [{ type: 'photo' }],
    }),
  ],
  orderings: [
    {
      title: 'Data (naujausi pirmi)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'outlet', media: 'photo.image' },
  },
});
