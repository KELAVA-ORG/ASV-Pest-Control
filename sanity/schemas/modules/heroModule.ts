import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'module.hero',
  title: 'Hero-Banner',
  type: 'object',
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Hero-Banner', subtitle: 'Hero-Banner' }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Überschrift',
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
      initialValue: 'h1',
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
      name: 'body',
      title: 'Untertitel / Beschreibung',
      type: 'array',
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
      name: 'backgroundImage',
      title: 'Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'Button-Text (optional)',
      type: 'string',
    }),
    defineField({
      name: 'ctaLinkType',
      title: 'Button-Link-Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Manueller Link (URL, Anker)', value: 'manual' },
          { title: 'Interne Seite (aus Backend)', value: 'internal' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'manual',
      hidden: ({ parent }) => !parent?.ctaText,
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button-Link',
      type: 'string',
      description: 'URL (https://...), Anker (#bereich) oder Pfad (/seite)',
      hidden: ({ parent }) => !parent?.ctaText || parent?.ctaLinkType === 'internal',
    }),
    defineField({
      name: 'ctaInternalPage',
      title: 'Seite auswählen',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Eine im Backend angelegte Seite verlinken',
      hidden: ({ parent }) => !parent?.ctaText || parent?.ctaLinkType !== 'internal',
    }),
    defineField({
      name: 'ctaNewTab',
      title: 'Button in neuem Tab öffnen',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.ctaText,
    }),
    defineField({
      name: 'buttonBgColor',
      title: 'Button-Hintergrundfarbe',
      type: 'color',
      description: 'Leer lassen = globaler Standard',
      options: { disableAlpha: true },
      hidden: ({ parent }) => !parent?.ctaText,
      fieldset: 'buttonDesign',
    }),
    defineField({
      name: 'buttonTextColor',
      title: 'Button-Textfarbe',
      type: 'color',
      description: 'Leer lassen = globaler Standard',
      options: { disableAlpha: true },
      hidden: ({ parent }) => !parent?.ctaText,
      fieldset: 'buttonDesign',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Bild-Deckungsgrad (Overlay)',
      type: 'number',
      description: '0 = Bild voll sichtbar, 100 = komplett abgedunkelt. Standard: 55',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 55,
      hidden: ({ parent }) => !parent?.backgroundImage,
      fieldset: 'heroDesign',
    }),
  ],
  fieldsets: [
    { name: 'buttonDesign', title: '🎨 Button-Design', options: { collapsible: true, collapsed: true } },
    { name: 'heroDesign', title: '🖼️ Hintergrund-Einstellungen', options: { collapsible: true, collapsed: true } },
  ],
})
