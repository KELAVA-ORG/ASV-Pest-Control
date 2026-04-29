import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'stadtseite',
  title: 'Stadtseite',
  type: 'document',
  preview: {
    select: { title: 'cityName', slug: 'slug.current' },
    prepare({ title, slug }) {
      return {
        title: title || 'Neue Stadtseite',
        subtitle: slug ? `/${slug}` : 'Kein Slug',
      }
    },
  },
  groups: [
    { name: 'content', title: 'Inhalt', default: true },
    { name: 'contact', title: 'Kontakt & Adresse' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    /* ─── BASICS ─── */
    defineField({
      name: 'cityName',
      title: 'Stadtname (lang)',
      type: 'string',
      description: 'z.B. "Frankfurt am Main"',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'cityShort',
      title: 'Stadtname (kurz)',
      type: 'string',
      description: 'z.B. "Frankfurt" — wird in Überschriften verwendet',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'URL-Pfad (Slug)',
      type: 'slug',
      options: { source: 'cityName', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    /* ─── SEO ─── */
    defineField({
      name: 'seoTitle',
      title: 'SEO-Titel',
      type: 'string',
      description: 'z.B. "Kammerjäger Frankfurt | Schädlingsbekämpfung | ASV Pest Control GmbH"',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-Beschreibung',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),

    /* ─── KONTAKT & ADRESSE ─── */
    defineField({
      name: 'phone',
      title: 'Telefonnummer (international)',
      type: 'string',
      description: 'z.B. "+49 69 95862183"',
      group: 'contact',
    }),
    defineField({
      name: 'phoneFormatted',
      title: 'Telefonnummer (formatiert, Anzeige)',
      type: 'string',
      description: 'z.B. "+49 69 – 95 86 21 83"',
      group: 'contact',
    }),
    defineField({
      name: 'phoneTel',
      title: 'Telefonnummer (tel: Link)',
      type: 'string',
      description: 'z.B. "+496995862183" — ohne Leerzeichen für tel:-Links',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'street', title: 'Straße & Hausnummer', type: 'string' }),
        defineField({ name: 'zip', title: 'PLZ', type: 'string' }),
        defineField({ name: 'city', title: 'Stadt', type: 'string' }),
      ],
    }),
    defineField({
      name: 'geo',
      title: 'Geokoordinaten (für Schema.org)',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'lat', title: 'Breitengrad (Latitude)', type: 'number' }),
        defineField({ name: 'lng', title: 'Längengrad (Longitude)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'plzExample',
      title: 'PLZ-Beispiel (für Anzeige)',
      type: 'string',
      description: 'z.B. "60311 Frankfurt"',
      group: 'contact',
    }),

    /* ─── HERO ─── */
    defineField({
      name: 'heroImage',
      title: 'Hero-Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
      description: 'Hintergrundbild des Hero-Bereichs. Wenn leer, wird das Standard-Bild verwendet.',
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero-Untertitel',
      type: 'text',
      rows: 2,
      description: 'Text unter der Hauptüberschrift im Hero-Bereich',
      group: 'content',
    }),

    /* ─── STADT-BESCHREIBUNG ─── */
    defineField({
      name: 'cityDescription',
      title: 'Stadt-Beschreibung',
      type: 'text',
      rows: 4,
      description: 'Kurze Beschreibung warum die Stadt besonders anfällig für Schädlingsbefall ist',
      group: 'content',
    }),

    /* ─── EINSATZGEBIET ─── */
    defineField({
      name: 'districts',
      title: 'Stadtteile / Einsatzgebiet',
      type: 'array',
      description: 'Alle Stadtteile und Umgebungsorte, die bedient werden',
      group: 'content',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'einsatzgebietDesc',
      title: 'Einsatzgebiet-Beschreibung',
      type: 'string',
      description: 'z.B. "Wir sind in allen Frankfurter Stadtteilen und der Rhein-Main-Region im Einsatz."',
      group: 'content',
    }),

    /* ─── TESTIMONIALS ─── */
    defineField({
      name: 'testimonials',
      title: 'Kundenbewertungen',
      type: 'array',
      description: 'Stadtspezifische Kundenzitate (empfohlen: 3 Stück)',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Bewertung',
          preview: {
            select: { title: 'author', subtitle: 'location' },
          },
          fields: [
            defineField({ name: 'text', title: 'Bewertungstext', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: 'author', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'location', title: 'Stadtteil / Ort', type: 'string' }),
            defineField({ name: 'rating', title: 'Sterne (1–5)', type: 'number', initialValue: 5, validation: (Rule) => Rule.min(1).max(5) }),
          ],
        },
      ],
    }),

    /* ─── FAQ ─── */
    defineField({
      name: 'faqs',
      title: 'FAQ-Einträge (stadtspezifisch)',
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
            defineField({ name: 'answer', title: 'Antwort (Anzeige)', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
            defineField({
              name: 'answerSchema',
              title: 'Antwort (Schema.org / SEO)',
              type: 'text',
              rows: 2,
              description: 'Kürzere Version für strukturierte Daten — leer lassen = gleich wie Anzeige-Antwort',
            }),
          ],
        },
      ],
    }),
  ],
})
