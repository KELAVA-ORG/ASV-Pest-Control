import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'announcementBar',
  title: 'Ankündigungsleiste',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Ankündigungsleiste' }
    },
  },
  fields: [
    defineField({
      name: 'enabled',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'Kurzer Hinweis, z.B. "Reservierungen für Weihnachten jetzt möglich!"',
    }),
    defineField({
      name: 'linkText',
      title: 'Link-Text (optional)',
      type: 'string',
      description: 'z.B. "Jetzt reservieren"',
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link-URL',
      type: 'string',
    }),
    defineField({
      name: 'linkNewTab',
      title: 'Link in neuem Tab öffnen',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'dismissible',
      title: 'Schließbar',
      type: 'boolean',
      description: 'Besucher können die Leiste schließen',
      initialValue: true,
    }),
    defineField({
      name: 'bgColor',
      title: 'Hintergrundfarbe',
      type: 'color',
      options: { disableAlpha: true },
    }),
    defineField({
      name: 'textColor',
      title: 'Textfarbe',
      type: 'color',
      options: { disableAlpha: true },
    }),
  ],
})
