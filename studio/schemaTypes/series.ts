import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'series',
  title: 'Serija',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pavadinimas',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Viršelio nuotrauka',
      type: 'reference',
      to: [{ type: 'photo' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Nuotraukos (tvarka svarbi)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'photo' }] }],
      validation: (Rule) => Rule.min(1),
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
    select: { title: 'title', media: 'cover.image' },
  },
});
