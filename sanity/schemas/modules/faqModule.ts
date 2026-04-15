import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'module.faq',
  title: 'FAQ / Akkordeon',
  type: 'object',
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'FAQ / Akkordeon', subtitle: 'FAQ / Akkordeon' }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Überschrift (optional)',
      type: 'string',
    }),
    defineField({
      name: 'headingLevel',
      title: 'Überschrift-Ebene',
      type: 'string',
      description: 'HTML-Tag für die Überschrift (SEO-relevant)',
      options: {
        list: [
          { title: 'H1 — Seitenüberschrift', value: 'h1' },
          { title: 'H2 — Abschnitt', value: 'h2' },
          { title: 'H3 — Unterabschnitt', value: 'h3' },
          { title: 'H4 — Klein', value: 'h4' },
          { title: 'H5 — Sehr klein', value: 'h5' },
          { title: 'H6 — Kleinste', value: 'h6' },
        ],
      },
      initialValue: 'h2',
      hidden: ({ parent }) => !parent?.heading,
    }),
    defineField({
      name: 'headingSize',
      title: 'Schriftgröße (px)',
      type: 'number',
      description: 'Individuelle Größe in Pixel. Leer lassen = globaler Standard.',
      validation: (Rule) => Rule.min(12).max(120),
      hidden: ({ parent }) => !parent?.heading,
    }),
    defineField({
      name: 'items',
      title: 'Fragen & Antworten',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ-Eintrag',
          preview: {
            select: { title: 'question' },
            prepare({ title }) {
              return { title: title || 'Frage' }
            },
          },
          fields: [
            defineField({
              name: 'question',
              title: 'Frage',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Antwort',
              type: 'array',
              validation: (Rule) => Rule.required(),
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Überschrift 3', value: 'h3' },
                    { title: 'Überschrift 4', value: 'h4' },
                    { title: 'Zitat', value: 'blockquote' },
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
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
                    defineField({ name: 'caption', title: 'Bildunterschrift', type: 'string' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'openFirst',
      title: 'Erste Frage standardmäßig öffnen',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
