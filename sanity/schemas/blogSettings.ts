import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogSettings',
  title: 'Blog-Einstellungen',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Blog-Einstellungen' }
    },
  },
  fields: [
    defineField({
      name: 'blogBasePath',
      title: 'URL-Pfad',
      type: 'string',
      description: 'Der Basis-Pfad für alle Blog-Seiten, z.B. "blog", "news", "magazin", "aktuelles". Änderung erfordert ein erneutes Deployment auf Vercel.',
      options: {
        list: [
          { title: '/blog', value: 'blog' },
          { title: '/news', value: 'news' },
          { title: '/magazin', value: 'magazin' },
          { title: '/aktuelles', value: 'aktuelles' },
          { title: '/journal', value: 'journal' },
          { title: '/beitraege', value: 'beitraege' },
        ],
      },
      initialValue: 'blog',
    }),
    defineField({
      name: 'blogTitle',
      title: 'Blog-Titel',
      type: 'string',
      description: 'Überschrift auf der Blog-Übersichtsseite',
      initialValue: 'Blog',
    }),
    defineField({
      name: 'blogDescription',
      title: 'Blog-Beschreibung',
      type: 'text',
      rows: 2,
      description: 'Wird als Untertitel und Meta-Description der Blog-Seite verwendet',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO-Titel (Blog-Übersicht)',
      type: 'string',
      description: 'Meta-Titel für /blog. Ideal: 50–60 Zeichen.',
    }),
    defineField({
      name: 'postsPerPage',
      title: 'Beiträge pro Seite',
      type: 'number',
      initialValue: 12,
    }),
    defineField({
      name: 'showAuthor',
      title: 'Autor anzeigen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showDate',
      title: 'Datum anzeigen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showReadingTime',
      title: 'Lesezeit anzeigen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showCategories',
      title: 'Kategorien anzeigen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showRelatedPosts',
      title: 'Verwandte Beiträge anzeigen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showShareButtons',
      title: 'Share-Buttons anzeigen',
      type: 'boolean',
      description: 'Social Media Teilen-Buttons unter dem Artikel',
      initialValue: true,
    }),
    defineField({
      name: 'ctaEnabled',
      title: 'CTA unter Artikeln anzeigen',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA-Überschrift',
      type: 'string',
      hidden: ({ parent }) => !parent?.ctaEnabled,
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA-Text',
      type: 'text',
      rows: 2,
      hidden: ({ parent }) => !parent?.ctaEnabled,
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA-Button Text',
      type: 'string',
      hidden: ({ parent }) => !parent?.ctaEnabled,
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA-Button Link',
      type: 'string',
      hidden: ({ parent }) => !parent?.ctaEnabled,
    }),
  ],
})
