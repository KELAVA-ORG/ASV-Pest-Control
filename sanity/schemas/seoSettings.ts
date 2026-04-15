import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seoSettings',
  title: 'SEO & Crawling',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'SEO & Crawling' }
    },
  },
  fieldsets: [
    { name: 'robots', title: '🤖 robots.txt', options: { collapsible: true, collapsed: false } },
    { name: 'sitemap', title: '🗺️ Sitemap', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    /* ─── ROBOTS.TXT ─── */
    defineField({
      name: 'robotsEnabled',
      title: 'Indexierung erlauben',
      type: 'boolean',
      description: 'Deaktiviert = gesamte Website wird für Suchmaschinen gesperrt (noindex). Nützlich für Staging-Umgebungen.',
      initialValue: true,
      fieldset: 'robots',
    }),
    defineField({
      name: 'robotsDisallowPaths',
      title: 'Gesperrte Pfade',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Pfade die gesperrt werden sollen, z.B. "/admin", "/intern". /studio/ und /api/ sind immer gesperrt.',
      fieldset: 'robots',
    }),
    defineField({
      name: 'robotsAllowPaths',
      title: 'Erlaubte Pfade (Ausnahmen)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Pfade die explizit erlaubt werden sollen (überschreibt Sperrungen)',
      fieldset: 'robots',
    }),
    defineField({
      name: 'robotsCrawlDelay',
      title: 'Crawl-Delay (Sekunden)',
      type: 'number',
      description: 'Optional: Wartezeit zwischen Crawler-Anfragen. Leer lassen für Standard.',
      fieldset: 'robots',
    }),
    defineField({
      name: 'robotsCustomRules',
      title: 'Zusätzliche Regeln',
      type: 'text',
      rows: 5,
      description: 'Eigene robots.txt-Regeln (z.B. für bestimmte User-Agents). Wird am Ende angefügt.',
      fieldset: 'robots',
    }),

    /* ─── SITEMAP ─── */
    defineField({
      name: 'sitemapEnabled',
      title: 'Sitemap aktiviert',
      type: 'boolean',
      initialValue: true,
      fieldset: 'sitemap',
    }),
    defineField({
      name: 'sitemapDefaultPriority',
      title: 'Standard-Priorität für Seiten',
      type: 'number',
      description: '0.0 bis 1.0 — Standard: 0.8',
      validation: (Rule) => Rule.min(0).max(1),
      initialValue: 0.8,
      fieldset: 'sitemap',
    }),
    defineField({
      name: 'sitemapDefaultFrequency',
      title: 'Standard-Änderungshäufigkeit',
      type: 'string',
      options: {
        list: [
          { title: 'Immer', value: 'always' },
          { title: 'Stündlich', value: 'hourly' },
          { title: 'Täglich', value: 'daily' },
          { title: 'Wöchentlich', value: 'weekly' },
          { title: 'Monatlich', value: 'monthly' },
          { title: 'Jährlich', value: 'yearly' },
          { title: 'Nie', value: 'never' },
        ],
      },
      initialValue: 'weekly',
      fieldset: 'sitemap',
    }),
    defineField({
      name: 'sitemapExcludePages',
      title: 'Seiten von Sitemap ausschließen',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }],
        },
      ],
      description: 'Seiten die nicht in der Sitemap erscheinen sollen',
      fieldset: 'sitemap',
    }),
    defineField({
      name: 'sitemapAdditionalUrls',
      title: 'Zusätzliche URLs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'url', title: 'URL (relativ, z.B. /meine-seite)', type: 'string' }),
            defineField({
              name: 'priority',
              title: 'Priorität',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(1),
              initialValue: 0.5,
            }),
            defineField({
              name: 'changeFrequency',
              title: 'Änderungshäufigkeit',
              type: 'string',
              options: {
                list: [
                  { title: 'Täglich', value: 'daily' },
                  { title: 'Wöchentlich', value: 'weekly' },
                  { title: 'Monatlich', value: 'monthly' },
                  { title: 'Jährlich', value: 'yearly' },
                ],
              },
              initialValue: 'monthly',
            }),
          ],
          preview: {
            select: { title: 'url' },
          },
        },
      ],
      description: 'Manuell hinzugefügte URLs (z.B. externe Landingpages)',
      fieldset: 'sitemap',
    }),
  ],
})
