import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'module.quote',
  title: 'Zitat',
  type: 'object',
  preview: {
    select: { title: 'quote' },
    prepare({ title }) {
      return {
        title: title ? `„${title.substring(0, 50)}…"` : 'Zitat',
        subtitle: 'Zitat',
      }
    },
  },
  fields: [
    defineField({
      name: 'quote',
      title: 'Zitat',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
          ],
          marks: {
            decorators: [
              { title: 'Fett', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
              { title: 'Unterstrichen', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'tel', 'mailto'] }),
                  }),
                  defineField({
                    name: 'openInNewTab',
                    title: 'In neuem Tab öffnen',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autor / Quelle',
      type: 'string',
    }),
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Elegant (kursiv, zentriert)', value: 'elegant' },
          { title: 'Hervorgehoben (farbiger Hintergrund)', value: 'highlighted' },
          { title: 'Schlicht (mit Seitenleiste)', value: 'simple' },
        ],
        layout: 'radio',
      },
      initialValue: 'elegant',
    }),
  ],
})
