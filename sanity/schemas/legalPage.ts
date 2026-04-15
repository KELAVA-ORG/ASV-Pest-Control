import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legalPage',
  title: 'Rechtliche Seiten',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Seitentitel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-Pfad',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Überschrift 1', value: 'h1' },
            { title: 'Überschrift 2', value: 'h2' },
            { title: 'Überschrift 3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Fett', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                ],
              },
            ],
          },
          lists: [
            { title: 'Aufzählung', value: 'bullet' },
            { title: 'Nummeriert', value: 'number' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
