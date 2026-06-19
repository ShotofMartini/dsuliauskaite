import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Atsiliepimas',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Atsiliepimo tekstas',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Vardas',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'occasion',
      title: 'Proga (pvz. "Šeimos fotosesija")',
      type: 'string',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Nuoroda į originalą (pvz. Facebook įrašas)',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Rodyti pradžios puslapyje',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Eilės tvarka',
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
    select: { title: 'author', subtitle: 'text' },
  },
});
