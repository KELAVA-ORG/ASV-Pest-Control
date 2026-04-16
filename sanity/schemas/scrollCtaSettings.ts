import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'scrollCtaSettings',
  title: 'Scroll-CTA (Slide-in Banner)',
  type: 'document',
  preview: { prepare() { return { title: 'Scroll-CTA Einstellungen' } } },
  groups: [
    { name: 'general', title: 'Allgemein', default: true },
    { name: 'content', title: 'Inhalt' },
    { name: 'design', title: 'Design' },
  ],
  fields: [
    /* ─ ALLGEMEIN ─ */
    defineField({
      name: 'enabled',
      title: 'Aktiviert',
      description: 'Scroll-CTA global ein- oder ausschalten',
      type: 'boolean',
      initialValue: true,
      group: 'general',
    }),
    defineField({
      name: 'scrollTriggerPercent',
      title: 'Einblenden ab Scroll-Tiefe (%)',
      description: 'Bei welchem Prozentsatz der Seite soll das Banner eingeblendet werden? Standard: 40',
      type: 'number',
      initialValue: 40,
      validation: R => R.min(5).max(95),
      group: 'general',
    }),
    defineField({
      name: 'showOnPages',
      title: 'Anzeigen auf',
      type: 'string',
      options: {
        list: [
          { title: 'Alle Seiten', value: 'all' },
          { title: 'Nur ausgewählte Seiten', value: 'specific' },
          { title: 'Alle außer ausgewählten Seiten', value: 'exclude' },
        ],
        layout: 'radio',
      },
      initialValue: 'all',
      group: 'general',
    }),
    defineField({
      name: 'specificPages',
      title: 'Seiten auswählen',
      description: 'Gilt für "Nur ausgewählte Seiten" und "Alle außer …"',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Startseite (/)', value: '/' },
          { title: 'Schädlinge Übersicht (/schaedlinge)', value: '/schaedlinge' },
          { title: 'Alle Schädlingsseiten (/schaedlinge/*)', value: '/schaedlinge/' },
          { title: 'Taubenabwehr', value: '/taubenabwehr' },
          { title: 'Superexpel', value: '/superexpel' },
          { title: 'Über uns', value: '/ueber-uns' },
          { title: 'Standorte', value: '/standorte' },
          { title: 'Karriere', value: '/karriere' },
          { title: 'Express-Angebot', value: '/express-angebot' },
          { title: 'Blog', value: '/blog' },
          { title: 'Alle Stadtseiten (/*)', value: '/' },
        ],
      },
      hidden: ({ document }) => document?.showOnPages === 'all',
      group: 'general',
    }),

    /* ─ INHALT ─ */
    defineField({
      name: 'badgeText',
      title: 'Badge-Text',
      description: 'Kleiner grüner Status-Text oben',
      type: 'string',
      initialValue: 'Wir sind gerade erreichbar',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Überschrift',
      type: 'string',
      initialValue: 'Schädlingsproblem?',
      group: 'content',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      initialValue: 'Kostenlose Erstberatung & Express-Angebot innerhalb von 24h.',
      group: 'content',
    }),
    defineField({
      name: 'phoneButtonLabel',
      title: 'Telefon-Button Beschriftung',
      description: 'Leer lassen um die Telefonnummer aus den globalen Einstellungen zu verwenden',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA-Button Text',
      type: 'string',
      initialValue: 'Express-Angebot',
      group: 'content',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA-Button Link',
      type: 'string',
      initialValue: '/express-angebot',
      group: 'content',
    }),

    /* ─ DESIGN ─ */
    defineField({
      name: 'bgColor',
      title: 'Hintergrundfarbe',
      type: 'color',
      options: { disableAlpha: true },
      group: 'design',
    }),
    defineField({
      name: 'titleColor',
      title: 'Überschrift-Farbe',
      type: 'color',
      options: { disableAlpha: true },
      group: 'design',
    }),
    defineField({
      name: 'textColor',
      title: 'Text-Farbe',
      type: 'color',
      options: { disableAlpha: true },
      group: 'design',
    }),
    defineField({
      name: 'primaryBtnBg',
      title: 'Primär-Button: Hintergrund',
      type: 'color',
      options: { disableAlpha: true },
      group: 'design',
    }),
    defineField({
      name: 'primaryBtnText',
      title: 'Primär-Button: Textfarbe',
      type: 'color',
      options: { disableAlpha: true },
      group: 'design',
    }),
  ],
})
