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
    { name: 'seo', title: 'SEO' },
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


    /* ─── SEO ─── */
    defineField({
      name: 'seoTitle',
      title: 'SEO-Titel',
      type: 'string',
      description: 'Überschreibt den Seitentitel in Suchmaschinen. Ideal: 50–60 Zeichen.',
      validation: (Rule) => Rule.max(70).warning('Google schneidet nach ~60 Zeichen ab'),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta-Description',
      type: 'text',
      rows: 2,
      description: 'Beschreibung für Google-Suchergebnisse. Ideal: 120–155 Zeichen.',
      validation: (Rule) => Rule.max(160).warning('Google schneidet nach ~155 Zeichen ab'),
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'Social/OG-Bild',
      type: 'image',
      description: 'Bild für Social Media / Link-Vorschau. Ideal: 1200×630px.',
      group: 'seo',
    }),
    defineField({
      name: 'noIndex',
      title: 'Von Suchmaschinen ausschließen (noindex)',
      description: 'Aktivieren um diese Seite aus Google & Co. auszublenden.',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
  ],
})
