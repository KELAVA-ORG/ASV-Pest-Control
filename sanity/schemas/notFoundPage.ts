import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'notFoundPage',
  title: '404-Seite',
  type: 'document',
  preview: {
    prepare() {
      return { title: '404-Seite' }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
      initialValue: 'Seite nicht gefunden',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      initialValue: 'Die gesuchte Seite existiert leider nicht. Möglicherweise wurde sie verschoben oder gelöscht.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button-Text',
      type: 'string',
      initialValue: 'Zur Startseite',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button-Link',
      type: 'string',
      initialValue: '/',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hintergrundbild',
      type: 'image',
      description: 'Optional: Bild als Hintergrund der 404-Seite',
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
    }),
  ],
})
