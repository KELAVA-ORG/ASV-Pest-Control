import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'module.blogPosts',
  title: 'Blog-Beiträge',
  type: 'object',
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Blog-Beiträge', subtitle: 'Blog-Beiträge' }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Überschrift (optional)',
      type: 'string',
    }),
    defineField({
      name: 'headingLevel',
      title: 'Überschrift-Ebene',
      type: 'string',
      options: {
        list: [
          { title: 'H2 — Abschnitt', value: 'h2' },
          { title: 'H3 — Unterabschnitt', value: 'h3' },
          { title: 'H4 — Klein', value: 'h4' },
        ],
      },
      initialValue: 'h2',
      hidden: ({ parent }) => !parent?.heading,
    }),
    defineField({
      name: 'headingSize',
      title: 'Schriftgröße (px)',
      type: 'number',
      validation: (Rule) => Rule.min(12).max(120),
      hidden: ({ parent }) => !parent?.heading,
    }),
    defineField({
      name: 'postsCount',
      title: 'Anzahl der Beiträge',
      type: 'number',
      description: 'Wie viele Beiträge initial angezeigt werden',
      options: {
        list: [
          { title: '3 Beiträge', value: 3 },
          { title: '6 Beiträge', value: 6 },
          { title: '9 Beiträge', value: 9 },
          { title: '12 Beiträge', value: 12 },
        ],
      },
      initialValue: 6,
    }),
    defineField({
      name: 'loadMoreEnabled',
      title: '"Mehr laden" Button anzeigen',
      type: 'boolean',
      description: 'Zeigt einen Button zum Nachladen weiterer Beiträge',
      initialValue: true,
    }),
    defineField({
      name: 'loadMoreText',
      title: 'Button-Text',
      type: 'string',
      initialValue: 'Mehr Beiträge laden',
      hidden: ({ parent }) => !parent?.loadMoreEnabled,
    }),
    defineField({
      name: 'sortBy',
      title: 'Sortierung',
      type: 'string',
      options: {
        list: [
          { title: 'Neueste zuerst', value: 'date_desc' },
          { title: 'Älteste zuerst', value: 'date_asc' },
          { title: 'Titel A–Z', value: 'title_asc' },
          { title: 'Titel Z–A', value: 'title_desc' },
        ],
      },
      initialValue: 'date_desc',
    }),
    defineField({
      name: 'filterType',
      title: 'Filter',
      type: 'string',
      description: 'Nur bestimmte Beiträge anzeigen',
      options: {
        list: [
          { title: 'Alle Beiträge', value: 'all' },
          { title: 'Nach Kategorie', value: 'category' },
          { title: 'Nach Tag', value: 'tag' },
          { title: 'Nur hervorgehobene Beiträge', value: 'featured' },
        ],
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'filterCategory',
      title: 'Kategorie',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      hidden: ({ parent }) => parent?.filterType !== 'category',
    }),
    defineField({
      name: 'filterTag',
      title: 'Tag',
      type: 'string',
      description: 'Exakter Tag-Name (Groß-/Kleinschreibung beachten)',
      hidden: ({ parent }) => parent?.filterType !== 'tag',
    }),
    defineField({
      name: 'showImage',
      title: 'Beitragsbilder anzeigen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showExcerpt',
      title: 'Auszug anzeigen',
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
      name: 'showCategory',
      title: 'Kategorie anzeigen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showReadingTime',
      title: 'Lesezeit anzeigen',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'columns',
      title: 'Spalten',
      type: 'number',
      options: {
        list: [
          { title: '2 Spalten', value: 2 },
          { title: '3 Spalten', value: 3 },
          { title: '4 Spalten', value: 4 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'linkToAll',
      title: 'Link zur Blog-Übersicht',
      type: 'boolean',
      description: 'Zeigt einen "Alle Beiträge"-Link unter dem Grid',
      initialValue: false,
    }),
    defineField({
      name: 'linkToAllText',
      title: 'Link-Text',
      type: 'string',
      initialValue: 'Alle Beiträge ansehen',
      hidden: ({ parent }) => !parent?.linkToAll,
    }),
  ],
})
