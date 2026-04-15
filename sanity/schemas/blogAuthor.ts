import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogAuthor',
  title: 'Autor',
  type: 'document',
  preview: {
    select: { title: 'name', media: 'image' },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profilbild',
      type: 'image',
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'role',
      title: 'Rolle / Position',
      type: 'string',
      description: 'z.B. "Küchenchef", "Redaktion", "Gastautor"',
    }),
    defineField({
      name: 'bio',
      title: 'Kurzbiografie',
      type: 'text',
      rows: 3,
      description: 'Wird unter dem Artikel und auf der Autorenseite angezeigt (E-E-A-T)',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Plattform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'X / Twitter', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                ],
              },
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
})
