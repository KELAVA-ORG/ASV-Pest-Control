import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'schaedlingsseite',
  title: 'Schädlingsseite',
  type: 'document',
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) {
      return {
        title: title || 'Neue Schädlingsseite',
        subtitle: slug ? `/${slug}` : 'Kein Slug',
      }
    },
  },
  groups: [
    { name: 'content', title: 'Inhalt', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    /* ─── BASICS ─── */
    defineField({
      name: 'title',
      title: 'Seitentitel',
      type: 'string',
      description: 'z.B. "Rattenbekämpfung"',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'URL-Pfad (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    /* ─── SEO ─── */
    defineField({
      name: 'seoTitle',
      title: 'SEO-Titel',
      type: 'string',
      description: 'z.B. "Rattenbekämpfung | ASV Pest Control GmbH"',
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

    /* ─── HERO ─── */
    defineField({
      name: 'heroImage',
      title: 'Hero-Bild',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero-Untertitel',
      type: 'string',
      description: 'Kurzer Satz unter der Überschrift im Hero',
      group: 'content',
    }),

    /* ─── EINLEITUNG ─── */
    defineField({
      name: 'introTitle',
      title: 'Einleitungs-Überschrift',
      type: 'string',
      description: 'z.B. "Rattenbefall – ein ernstzunehmendes Gesundheitsrisiko"',
      group: 'content',
    }),
    defineField({
      name: 'introText',
      title: 'Einleitungstext',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),

    /* ─── TYPISCHE ANZEICHEN ─── */
    defineField({
      name: 'signsTitle',
      title: 'Abschnitts-Überschrift "Typische Anzeichen"',
      type: 'string',
      initialValue: 'Typische Anzeichen für Befall',
      group: 'content',
    }),
    defineField({
      name: 'signs',
      title: 'Typische Anzeichen',
      type: 'array',
      description: 'Wird als 3-spaltiges Karten-Grid angezeigt',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'sign',
          title: 'Anzeichen',
          preview: { select: { title: 'title' } },
          fields: [
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),

    /* ─── GEFAHREN & RISIKEN ─── */
    defineField({
      name: 'risksTitle',
      title: 'Abschnitts-Überschrift "Gefahren"',
      type: 'string',
      initialValue: 'Gefahren und Risiken',
      group: 'content',
    }),
    defineField({
      name: 'risks',
      title: 'Risiken / Gefahren',
      type: 'array',
      description: 'Wird als Liste mit fettem Titel angezeigt',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'risk',
          title: 'Risiko',
          preview: { select: { title: 'title' } },
          fields: [
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),

    /* ─── PROFESSIONELLE BEHANDLUNG ─── */
    defineField({
      name: 'treatmentTitle',
      title: 'Abschnitts-Überschrift "Professionelle Behandlung"',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'treatmentText',
      title: 'Behandlungstext',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'treatmentImage',
      title: 'Bild (rechts neben Text)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'treatmentCheckList',
      title: 'Check-Liste (Maßnahmen)',
      type: 'array',
      description: 'Wird als grüne Check-Liste angezeigt',
      group: 'content',
      of: [{ type: 'string' }],
    }),

    /* ─── UNSER VORGEHEN (PROCESS STEPS) ─── */
    defineField({
      name: 'processTitle',
      title: 'Abschnitts-Überschrift "Unser Vorgehen"',
      type: 'string',
      initialValue: 'Unser Vorgehen',
      group: 'content',
    }),
    defineField({
      name: 'processSteps',
      title: 'Prozess-Schritte',
      type: 'array',
      description: 'Wird als nummerierte Schritt-für-Schritt-Übersicht angezeigt',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'processStep',
          title: 'Schritt',
          preview: {
            select: { title: 'title', subtitle: 'stepNumber' },
            prepare({ title, stepNumber }) {
              return { title: `${stepNumber}. ${title}` }
            },
          },
          fields: [
            defineField({ name: 'stepNumber', title: 'Nummer', type: 'string', description: 'z.B. "01"', validation: (Rule) => Rule.required() }),
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),

    /* ─── CTA-BANNER ─── */
    defineField({
      name: 'ctaBannerTitle',
      title: 'CTA-Banner Überschrift',
      type: 'string',
      description: 'z.B. "Ratten entdeckt? Wir helfen sofort."',
      group: 'content',
    }),
    defineField({
      name: 'ctaBannerText',
      title: 'CTA-Banner Text',
      type: 'string',
      group: 'content',
    }),

    /* ─── FAQ ─── */
    defineField({
      name: 'faqTitle',
      title: 'FAQ-Überschrift',
      type: 'string',
      initialValue: 'Häufig gestellte Fragen',
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
            defineField({ name: 'answer', title: 'Antwort', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
  ],
})
