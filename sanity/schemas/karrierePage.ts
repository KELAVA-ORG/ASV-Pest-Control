import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'karrierePage',
  title: 'Karriere-Seite',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Karriere-Seite' }
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

    /* ─── EINLEITUNG ─── */
    defineField({
      name: 'introTitle',
      title: 'Einleitungs-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'introText',
      title: 'Einleitungstext',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),

    /* ─── BENEFITS ─── */
    defineField({
      name: 'benefitsTitle',
      title: 'Benefits-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'benefits',
      title: 'Vorteile (6 Karten)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'benefit',
          title: 'Vorteil',
          preview: { select: { title: 'title' } },
          fields: [
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),

    /* ─── STELLENANGEBOTE ─── */
    defineField({
      name: 'jobsTitle',
      title: 'Stellen-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'jobs',
      title: 'Stellenangebote',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'job',
          title: 'Stelle',
          preview: { select: { title: 'title' } },
          fields: [
            defineField({ name: 'title', title: 'Stellentitel', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'type', title: 'Anstellungsart (z.B. "Vollzeit")', type: 'string' }),
            defineField({ name: 'location', title: 'Standort / Region', type: 'string' }),
            defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 4 }),
            defineField({ name: 'requirements', title: 'Anforderungen', type: 'array', of: [{ type: 'string' }] }),
          ],
        },
      ],
    }),

    /* ─── INITIATIVBEWERBUNG ─── */
    defineField({
      name: 'initiativeTitle',
      title: 'Initiativbewerbung-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'initiativeText',
      title: 'Initiativbewerbung-Text',
      type: 'text',
      rows: 3,
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
