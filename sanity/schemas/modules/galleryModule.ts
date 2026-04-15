import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'module.gallery',
  title: 'Bildergalerie',
  type: 'object',
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Bildergalerie', subtitle: 'Bildergalerie' }
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
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Bildunterschrift', type: 'string' }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Spalten',
      type: 'number',
      options: {
        list: [
          { title: '2 Spalten', value: 2 },
          { title: '3 Spalten', value: 3 },
          { title: '4 Spalten', value: 4 },
        ],
      },
      initialValue: 3,
    }),
  ],
})
