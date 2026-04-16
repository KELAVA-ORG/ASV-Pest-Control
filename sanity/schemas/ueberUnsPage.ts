import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ueberUnsPage',
  title: 'Über-uns-Seite',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Über-uns-Seite' }
    },
  },
  groups: [
    { name: 'content', title: 'Inhalt', default: true },
  ],
  fields: [
    /* ─── HERO ─── */
    defineField({
      name: 'heroSubtitle',
      title: 'Hero-Untertitel',
      type: 'string',
      group: 'content',
    }),

    /* ─── GESCHICHTE / STORY ─── */
    defineField({
      name: 'storyTitle',
      title: 'Geschichte-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'storyText',
      title: 'Geschichte-Text',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'storyImage',
      title: 'Geschichte-Bild',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
      group: 'content',
    }),

    /* ─── STATISTIKEN ─── */
    defineField({
      name: 'stats',
      title: 'Statistiken (4 Zahlen)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Statistik',
          preview: { select: { title: 'num', subtitle: 'label' } },
          fields: [
            defineField({ name: 'num', title: 'Zahl (z.B. "30+")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label', title: 'Bezeichnung', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),

    /* ─── WERTE ─── */
    defineField({
      name: 'valuesTitle',
      title: 'Werte-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'values',
      title: 'Unternehmenswerte (6 Karten)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'value',
          title: 'Wert',
          preview: { select: { title: 'title' } },
          fields: [
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),

    /* ─── ZERTIFIZIERUNGEN ─── */
    defineField({
      name: 'certifications',
      title: 'Zertifizierungen (Check-Liste)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
    }),

    /* ─── CTA ─── */
    defineField({
      name: 'ctaTitle',
      title: 'CTA-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA-Text',
      type: 'string',
      group: 'content',
    }),
  ],
})
