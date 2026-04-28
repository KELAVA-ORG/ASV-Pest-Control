import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'superexpelPage',
  title: 'Superexpel-Seite',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Superexpel-Seite' }
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

    /* ─── PRODUKT INTRO ─── */
    defineField({
      name: 'introTitle',
      title: 'Intro-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'introText',
      title: 'Intro-Text',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'introImage',
      title: 'Intro-Bild',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'introChecklist',
      title: 'Intro-Checkliste',
      type: 'array',
      of: [{ type: 'string' }],
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
            defineField({ name: 'num', title: 'Zahl (z.B. "Nr. 1")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label', title: 'Bezeichnung', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),

    /* ─── ANWENDUNGSBEREICHE ─── */
    defineField({
      name: 'usesTitle',
      title: 'Anwendungsbereiche-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'uses',
      title: 'Anwendungsbereiche (3 Karten)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'use',
          title: 'Anwendungsbereich',
          preview: { select: { title: 'title' } },
          fields: [
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),

    /* ─── PROZESS ─── */
    defineField({
      name: 'processTitle',
      title: 'Prozess-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'processSteps',
      title: 'Prozess-Schritte',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'processStep',
          title: 'Schritt',
          preview: {
            select: { num: 'num', title: 'title' },
            prepare({ num, title }) {
              return { title: `${num} – ${title}` }
            },
          },
          fields: [
            defineField({ name: 'num', title: 'Nummer (z.B. "01")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),

    /* ─── FAQ ─── */
    defineField({
      name: 'faqTitle',
      title: 'FAQ-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ-Einträge',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'faq',
          title: 'FAQ',
          preview: { select: { title: 'question' } },
          fields: [
            defineField({ name: 'question', title: 'Frage', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Antwort', type: 'text', rows: 4 }),
          ],
        },
      ],
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
