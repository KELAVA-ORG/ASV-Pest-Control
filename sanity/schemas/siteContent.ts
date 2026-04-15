import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteContent',
  title: 'Seiten-Inhalte',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Startseite' }
    },
  },
  fieldsets: [
    { name: 'hero', title: '🎬 Hero-Bereich', options: { collapsible: true, collapsed: false } },
    { name: 'about', title: '📖 Über Uns', options: { collapsible: true, collapsed: true } },
    { name: 'contact', title: '📍 Kontakt & Adresse', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    /* ─── HERO ─── */
    defineField({
      name: 'heroLogo',
      title: 'Logo',
      type: 'image',
      description: 'Das Hauptlogo im Hero-Bereich (SVG oder PNG, transparenter Hintergrund empfohlen)',
      fieldset: 'hero',
      options: { accept: 'image/svg+xml,image/png,image/webp' },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          type: 'string',
          description: 'Beschreibung für Suchmaschinen und Screenreader',
        }),
      ],
    }),
    defineField({
      name: 'heroTagline',
      title: 'Tagline',
      type: 'string',
      description: 'Kurzer Text über dem Trennstrich, z. B. "Frankfurt am Main"',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Untertitel',
      type: 'text',
      rows: 2,
      description: 'Der größere Text unter dem Logo',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroBackgroundType',
      title: 'Hintergrund-Typ',
      type: 'string',
      fieldset: 'hero',
      options: {
        list: [
          { title: '🖼️ Bild', value: 'image' },
          { title: '🎬 Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hintergrundbild',
      type: 'image',
      description: 'Das Hintergrundbild des Hero-Bereichs (wird nur angezeigt wenn Typ = Bild)',
      fieldset: 'hero',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.heroBackgroundType === 'video',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          type: 'string',
          description: 'Beschreibung für Suchmaschinen und Screenreader',
        }),
      ],
    }),
    defineField({
      name: 'heroBackgroundVideo',
      title: 'Hintergrundvideo (MP4-URL)',
      type: 'url',
      description: 'Direktlink zu einer MP4-Datei. Wird stumm und als Loop abgespielt. (Wird nur angezeigt wenn Typ = Video)',
      fieldset: 'hero',
      hidden: ({ parent }) => parent?.heroBackgroundType !== 'video',
    }),
    defineField({
      name: 'heroBackgroundVideoFile',
      title: 'Oder: Video-Datei hochladen',
      type: 'file',
      description: 'Alternativ eine MP4-Datei direkt hochladen (max. 20 MB empfohlen)',
      fieldset: 'hero',
      options: { accept: 'video/mp4,video/webm' },
      hidden: ({ parent }) => parent?.heroBackgroundType !== 'video',
    }),
    defineField({
      name: 'heroIllustration',
      title: 'Illustration',
      type: 'image',
      description: 'Das Bild/Illustration rechts im Hero (z. B. Kuchenbild)',
      fieldset: 'hero',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          type: 'string',
          description: 'Beschreibung für Suchmaschinen und Screenreader',
        }),
      ],
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Button-Text',
      type: 'string',
      description: 'Text auf dem Call-to-Action-Button, z. B. "Tisch reservieren"',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Button-Link',
      type: 'url',
      description: 'URL des Buttons (z. B. Reservierungs-Link)',
      fieldset: 'hero',
      validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'tel', 'mailto'] }),
    }),
    defineField({
      name: 'heroCtaEnabled',
      title: 'Button anzeigen',
      type: 'boolean',
      fieldset: 'hero',
      initialValue: true,
    }),

    /* ─── ÜBER UNS ─── */
    defineField({
      name: 'aboutTitle',
      title: 'Titel',
      type: 'string',
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutText1',
      title: 'Text Absatz 1',
      type: 'text',
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutText2',
      title: 'Text Absatz 2',
      type: 'text',
      fieldset: 'about',
    }),

    /* ─── KONTAKT ─── */
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'text',
      fieldset: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string',
      fieldset: 'contact',
    }),
  ],
})
