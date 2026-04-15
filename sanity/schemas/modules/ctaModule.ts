import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'module.cta',
  title: 'Call-to-Action',
  type: 'object',
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Call-to-Action', subtitle: 'Call-to-Action' }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'headingSize',
      title: 'Schriftgröße (px)',
      type: 'number',
      description: 'Individuelle Größe in Pixel. Leer lassen = globaler Standard.',
      validation: (Rule) => Rule.min(12).max(120),
    }),
    defineField({
      name: 'body',
      title: 'Beschreibung (optional)',
      type: 'array',
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
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Button-Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLinkType',
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
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button-Link',
      type: 'string',
      description: 'URL (https://...), Anker (#bereich) oder Pfad (/seite)',
      hidden: ({ parent }) => parent?.buttonLinkType === 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { buttonLinkType?: string }
          if (parent?.buttonLinkType !== 'internal' && !value) return 'Link ist erforderlich'
          return true
        }),
    }),
    defineField({
      name: 'buttonInternalPage',
      title: 'Seite auswählen',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Eine im Backend angelegte Seite verlinken',
      hidden: ({ parent }) => parent?.buttonLinkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { buttonLinkType?: string }
          if (parent?.buttonLinkType === 'internal' && !value) return 'Bitte eine Seite auswählen'
          return true
        }),
    }),
    defineField({
      name: 'buttonNewTab',
      title: 'In neuem Tab öffnen',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'buttonBgColor',
      title: 'Button-Hintergrundfarbe',
      type: 'color',
      description: 'Leer lassen = globaler Standard',
      options: { disableAlpha: true },
      fieldset: 'buttonDesign',
    }),
    defineField({
      name: 'buttonTextColor',
      title: 'Button-Textfarbe',
      type: 'color',
      description: 'Leer lassen = globaler Standard',
      options: { disableAlpha: true },
      fieldset: 'buttonDesign',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hintergrundbild (optional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
      fieldset: 'background',
    }),
    defineField({
      name: 'backgroundOpacity',
      title: 'Bild-Deckungsgrad (Overlay)',
      type: 'number',
      description: '0 = Bild voll sichtbar, 100 = komplett abgedunkelt. Standard: 50',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 50,
      fieldset: 'background',
      hidden: ({ parent }) => !parent?.backgroundImage,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Hintergrundfarbe',
      type: 'color',
      description: 'Vollfarbiger Hintergrund. Wird vom Bild überlagert, falls gesetzt.',
      options: { disableAlpha: true },
      fieldset: 'background',
    }),
    defineField({
      name: 'textColor',
      title: 'Textfarbe',
      type: 'color',
      description: 'Leer lassen = automatisch (weiß auf dunkel, dunkel auf hell)',
      options: { disableAlpha: true },
      fieldset: 'background',
    }),
  ],
  fieldsets: [
    { name: 'buttonDesign', title: '🎨 Button-Design', options: { collapsible: true, collapsed: true } },
    { name: 'background', title: '🖼️ Abschnitt-Hintergrund', options: { collapsible: true, collapsed: true } },
  ],
})
