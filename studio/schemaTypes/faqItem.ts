import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faqItem',
  title: 'DUK klausimas',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Klausimas',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Atsakymas',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Eilės tvarka (mažesnis skaičius = anksčiau)',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Eilės tvarka',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'question' },
  },
});
