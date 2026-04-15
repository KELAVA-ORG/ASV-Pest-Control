import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'redirect',
  title: 'Weiterleitung',
  type: 'document',
  preview: {
    select: {
      from: 'source',
      to: 'destination',
      permanent: 'permanent',
      enabled: 'enabled',
    },
    prepare({ from, to, permanent, enabled }: { from?: string; to?: string; permanent?: boolean; enabled?: boolean }) {
      const status = enabled === false ? '⏸️' : permanent ? '🔒 301' : '🔄 302'
      return {
        title: `${from || '/???'} → ${to || '/???'}`,
        subtitle: `${status}${enabled === false ? ' (deaktiviert)' : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Quelle (A-Z)',
      name: 'sourceAsc',
      by: [{ field: 'source', direction: 'asc' }],
    },
    {
      title: 'Zuletzt erstellt',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'enabled',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'source',
      title: 'Quelle (Von)',
      type: 'string',
      description: 'Der alte Pfad, z.B. /alte-seite oder /blog/alter-beitrag. Ohne Domain. Unterstützt Wildcards: /blog/:slug* leitet alle Unterseiten weiter.',
      validation: (Rule) => Rule.required().custom((value) => {
        if (value && !value.startsWith('/')) return 'Muss mit / beginnen'
        return true
      }),
    }),
    defineField({
      name: 'destination',
      title: 'Ziel (Nach)',
      type: 'string',
      description: 'Der neue Pfad (/neue-seite) oder eine vollständige URL (https://example.com/seite). Bei Wildcards: /news/:slug* übernimmt den Platzhalter.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (301)',
      type: 'boolean',
      description: '301 = Permanent (SEO-Juice wird übertragen, Google aktualisiert den Index). 302 = Temporär (Google behält die alte URL im Index).',
      initialValue: true,
    }),
    defineField({
      name: 'note',
      title: 'Notiz (intern)',
      type: 'string',
      description: 'Optionaler Hinweis, warum diese Weiterleitung existiert. Wird nicht auf der Website angezeigt.',
    }),
  ],
})
