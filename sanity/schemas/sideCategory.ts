import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sideCategory',
  title: 'Beilagen-Kategorie',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Kategorie',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
    }),
    defineField({
      name: 'dishes',
      title: 'Beilagen',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'side',
          title: 'Beilage',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Beschreibung', type: 'string' }),
            defineField({ name: 'price', title: 'Preis', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'allergens', title: 'Allergene', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'price' },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'order' },
  },
})
