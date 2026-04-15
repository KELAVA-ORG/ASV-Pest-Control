import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Navigation & Header' }
    },
  },
  fieldsets: [
    { name: 'logo', title: '🏷️ Logo', options: { collapsible: true, collapsed: false } },
    { name: 'menu', title: '📋 Menü-Links', options: { collapsible: true, collapsed: false } },
    { name: 'cta', title: '🔘 Call-to-Action Button', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    /* ─── LOGO ─── */
    defineField({
      name: 'logoText',
      title: 'Logo-Text',
      type: 'string',
      description: 'Der Text-Link oben links, z. B. "Mein Unternehmen"',
      fieldset: 'logo',
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo-Bild (optional)',
      type: 'image',
      description: 'Wenn gesetzt, wird das Bild statt des Textes angezeigt',
      fieldset: 'logo',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          type: 'string',
        }),
      ],
    }),

    /* ─── MENÜ-LINKS ─── */
    defineField({
      name: 'menuItems',
      title: 'Menü-Einträge',
      type: 'array',
      description: 'Die Links in der Navigation. Per Drag-and-Drop sortieren.',
      fieldset: 'menu',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Menü-Eintrag',
          preview: {
            select: { title: 'label', subtitle: 'link' },
          },
          fields: [
            defineField({
              name: 'label',
              title: 'Bezeichnung',
              type: 'string',
              description: 'Was der Besucher sieht, z. B. "Über uns"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'linkType',
              title: 'Link-Typ',
              type: 'string',
              options: {
                list: [
                  { title: 'Manueller Link (Anker, URL)', value: 'manual' },
                  { title: 'Interne Seite (aus Backend wählen)', value: 'internal' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'manual',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Anker (#ueber-uns), relativer Pfad (/team) oder externe URL (https://...)',
              hidden: ({ parent }) => parent?.linkType === 'internal',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { linkType?: string }
                  if (parent?.linkType !== 'internal' && !value) return 'Link ist erforderlich'
                  return true
                }),
            }),
            defineField({
              name: 'internalPage',
              title: 'Seite auswählen',
              type: 'reference',
              to: [{ type: 'page' }, { type: 'blogPost' }, { type: 'blogCategory' }],
              description: 'Eine Seite, einen Blog-Beitrag oder eine Kategorie auswählen',
              hidden: ({ parent }) => parent?.linkType !== 'internal',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { linkType?: string }
                  if (parent?.linkType === 'internal' && !value) return 'Bitte eine Seite auswählen'
                  return true
                }),
            }),
            defineField({
              name: 'openInNewTab',
              title: 'In neuem Tab öffnen',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'mobileOnly',
              title: 'Nur im Mobile-Menü anzeigen',
              type: 'boolean',
              description: 'Wird im Desktop-Menü ausgeblendet, erscheint nur auf Mobilgeräten',
              initialValue: false,
            }),
          ],
        },
      ],
    }),

    /* ─── CTA BUTTON ─── */
    defineField({
      name: 'ctaEnabled',
      title: 'Button anzeigen',
      type: 'boolean',
      fieldset: 'cta',
      initialValue: true,
    }),
    defineField({
      name: 'ctaText',
      title: 'Button-Text',
      type: 'string',
      description: 'z. B. "Reservieren"',
      fieldset: 'cta',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button-Link',
      type: 'url',
      fieldset: 'cta',
      validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'tel', 'mailto'] }),
    }),
    defineField({
      name: 'ctaOpenInNewTab',
      title: 'In neuem Tab öffnen',
      type: 'boolean',
      fieldset: 'cta',
      initialValue: true,
    }),
  ],
})
