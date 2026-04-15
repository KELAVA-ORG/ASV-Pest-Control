import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'openingHours',
  title: 'Öffnungszeiten',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Öffnungszeiten' }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Reguläre Öffnungszeiten',
    }),
    defineField({
      name: 'hours',
      title: 'Zeiten',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dayEntry',
          title: 'Tag',
          preview: {
            select: {
              day: 'day',
              t0: 'times.0',
              t1: 'times.1',
              t2: 'times.2',
            },
            prepare({ day, t0, t1, t2 }: { day?: string; t0?: string; t1?: string; t2?: string }) {
              const parts = [t0, t1, t2].filter(Boolean)
              return {
                title: day || 'Tag',
                subtitle: parts.length > 0 ? parts.join(' + ') : 'Keine Zeiten',
              }
            },
          },
          fields: [
            defineField({
              name: 'day',
              title: 'Tag',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'times',
              title: 'Zeitblöcke',
              type: 'array',
              description: 'Füge pro Zeitblock einen Eintrag hinzu, z.B. "12:00–15:00" und "18:00–22:30". Für "Geschlossen" einen einzelnen Eintrag mit "Geschlossen" anlegen.',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.min(1),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'specialHours',
      title: 'Sonderöffnungszeiten',
      type: 'object',
      description: 'Einmalige Sonderöffnungszeiten, z.B. an Feiertagen. Kann über den Schalter ein- und ausgeblendet werden.',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Anzeigen',
          type: 'boolean',
          description: 'Wenn deaktiviert, wird der komplette Sonderöffnungszeiten-Block auf der Website ausgeblendet.',
          initialValue: false,
        }),
        defineField({
          name: 'label',
          title: 'Anlass (Überschrift)',
          type: 'string',
          description: 'Wird als Überschrift über den Sonderöffnungszeiten angezeigt, z.B. "Ostern 2026".',
        }),
        defineField({
          name: 'items',
          title: 'Zeiten',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'specialDayEntry',
              title: 'Tag',
              preview: {
                select: {
                  day: 'day',
                  t0: 'times.0',
                  t1: 'times.1',
                  t2: 'times.2',
                },
                prepare({ day, t0, t1, t2 }: { day?: string; t0?: string; t1?: string; t2?: string }) {
                  const parts = [t0, t1, t2].filter(Boolean)
                  return {
                    title: day || 'Tag',
                    subtitle: parts.length > 0 ? parts.join(' + ') : 'Keine Zeiten',
                  }
                },
              },
              fields: [
                defineField({ name: 'day', title: 'Tag', type: 'string' }),
                defineField({
                  name: 'times',
                  title: 'Zeitblöcke',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
})
