import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'standortePage',
  title: 'Standorte-Seite',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Standorte-Seite' }
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

    /* ─── EINLEITUNG ─── */
    defineField({
      name: 'introText',
      title: 'Einleitungstext',
      type: 'string',
      group: 'content',
    }),

    /* ─── STANDORTE ─── */
    defineField({
      name: 'locations',
      title: 'Standorte',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'location',
          title: 'Standort',
          preview: { select: { title: 'name' } },
          fields: [
            defineField({ name: 'name', title: 'Stadtname', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'address', title: 'Adresse (Straße und Hausnummer)', type: 'string' }),
            defineField({ name: 'phone', title: 'Telefon (formatiert)', type: 'string' }),
            defineField({ name: 'phoneTel', title: 'Telefon (tel: Link)', type: 'string' }),
            defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 2 }),
            defineField({ name: 'hours', title: 'Öffnungszeiten', type: 'string' }),
          ],
        },
      ],
    }),

    /* ─── HOTLINE ─── */
    defineField({
      name: 'hotlineTitle',
      title: 'Hotline-Überschrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'hotlineText',
      title: 'Hotline-Text',
      type: 'string',
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
