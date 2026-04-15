import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'globalSettings',
  title: 'Globale Einstellungen',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Globale Einstellungen' }
    },
  },
  fieldsets: [
    { name: 'branding', title: '🏷️ Branding', options: { collapsible: true, collapsed: false } },
    { name: 'contact', title: '📞 Kontakt & Unternehmen', options: { collapsible: true, collapsed: false } },
    { name: 'colors', title: '🎨 Farben', options: { collapsible: true, collapsed: false } },
    { name: 'typography', title: '🔤 Schriften', options: { collapsible: true, collapsed: false } },
    { name: 'buttons', title: '🔘 Buttons (Global)', options: { collapsible: true, collapsed: true } },
    { name: 'backToTop', title: '⬆️ Back-to-Top Button', options: { collapsible: true, collapsed: true } },
    { name: 'social', title: '🌐 Standard-SEO / Social', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    /* ─── BRANDING ─── */
    defineField({
      name: 'siteName',
      title: 'Website-Name',
      type: 'string',
      description: 'z.B. "Mein Unternehmen"',
      fieldset: 'branding',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fieldset: 'branding',
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (dunkel / für helle Hintergründe)',
      type: 'image',
      description: 'Optional: Alternative Logo-Version für helle Bereiche',
      fieldset: 'branding',
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Das kleine Icon im Browser-Tab (idealerweise 32x32 oder SVG)',
      fieldset: 'branding',
    }),

    /* ─── KONTAKT & UNTERNEHMEN ─── */
    defineField({
      name: 'companyName',
      title: 'Firmenname',
      type: 'string',
      initialValue: 'ASV Pest Control GmbH',
      fieldset: 'contact',
    }),
    defineField({
      name: 'phoneMain',
      title: 'Haupttelefonnummer',
      type: 'string',
      description: 'z.B. "+49 6196 523010" — wird in Header und Footer angezeigt',
      initialValue: '+49 6196 523010',
      fieldset: 'contact',
    }),
    defineField({
      name: 'phoneMainFormatted',
      title: 'Telefon (formatiert, Anzeige)',
      type: 'string',
      description: 'z.B. "+49 6196 – 52 30 10"',
      initialValue: '+49 6196 – 52 30 10',
      fieldset: 'contact',
    }),
    defineField({
      name: 'phoneMainTel',
      title: 'Telefon (tel: Link)',
      type: 'string',
      description: 'Ohne Leerzeichen, z.B. "+496196523010"',
      initialValue: '+496196523010',
      fieldset: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail-Adresse',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'addressMain',
      title: 'Hauptadresse',
      type: 'object',
      fieldset: 'contact',
      fields: [
        defineField({ name: 'street', title: 'Straße & Hausnummer', type: 'string' }),
        defineField({ name: 'zip', title: 'PLZ', type: 'string' }),
        defineField({ name: 'city', title: 'Stadt', type: 'string' }),
      ],
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Header CTA Button Text',
      type: 'string',
      description: 'Text des Buttons rechts im Header',
      initialValue: 'Express-Angebot',
      fieldset: 'contact',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'Header CTA Button Link',
      type: 'string',
      initialValue: '/express-angebot',
      fieldset: 'contact',
    }),

    /* ─── FARBEN ─── */
    defineField({
      name: 'colorPrimary',
      title: 'Primärfarbe (Navy)',
      type: 'color',
      description: 'Hauptfarbe für Hintergründe, Headlines etc.',
      options: { disableAlpha: true },
      fieldset: 'colors',
    }),
    defineField({
      name: 'colorSecondary',
      title: 'Sekundärfarbe (Cream)',
      type: 'color',
      description: 'Helle Farbe für Hintergründe, Text auf dunklem Grund',
      options: { disableAlpha: true },
      fieldset: 'colors',
    }),
    defineField({
      name: 'colorAccent',
      title: 'Akzentfarbe (Sage)',
      type: 'color',
      description: 'Buttons, Links, Highlights',
      options: { disableAlpha: true },
      fieldset: 'colors',
    }),
    defineField({
      name: 'colorText',
      title: 'Textfarbe',
      type: 'color',
      description: 'Standard-Textfarbe (Charcoal)',
      options: { disableAlpha: true },
      fieldset: 'colors',
    }),
    defineField({
      name: 'colorBackground',
      title: 'Hintergrundfarbe (Body)',
      type: 'color',
      description: 'Haupthintergrund der gesamten Seite',
      options: { disableAlpha: true },
      fieldset: 'colors',
    }),

    /* ─── TYPOGRAFIE ─── */
    defineField({
      name: 'fontDisplay',
      title: 'Überschriften-Schrift',
      type: 'string',
      description: 'Google Fonts Name, z.B. "Playfair Display"',
      fieldset: 'typography',
    }),
    defineField({
      name: 'fontBody',
      title: 'Fließtext-Schrift',
      type: 'string',
      description: 'Google Fonts Name, z.B. "DM Sans"',
      fieldset: 'typography',
    }),
    defineField({
      name: 'fontGoogleUrl',
      title: 'Google Fonts URL',
      type: 'url',
      description: 'Komplette Google Fonts Embed-URL (aus fonts.google.com kopieren)',
      fieldset: 'typography',
    }),

    /* ─── BUTTONS ─── */
    defineField({
      name: 'buttonBgColor',
      title: 'Button-Hintergrundfarbe',
      type: 'color',
      description: 'Standard für alle Buttons (kann pro Modul überschrieben werden)',
      options: { disableAlpha: true },
      fieldset: 'buttons',
    }),
    defineField({
      name: 'buttonTextColor',
      title: 'Button-Textfarbe',
      type: 'color',
      options: { disableAlpha: true },
      fieldset: 'buttons',
    }),
    defineField({
      name: 'buttonBorderRadius',
      title: 'Button-Eckenradius (px)',
      type: 'number',
      description: '0 = eckig, 4 = leicht gerundet, 999 = rund',
      initialValue: 2,
      fieldset: 'buttons',
    }),

    /* ─── BACK TO TOP ─── */
    defineField({
      name: 'backToTopEnabled',
      title: 'Back-to-Top Button anzeigen',
      type: 'boolean',
      initialValue: true,
      fieldset: 'backToTop',
    }),
    defineField({
      name: 'backToTopBgColor',
      title: 'Hintergrundfarbe',
      type: 'color',
      options: { disableAlpha: true },
      fieldset: 'backToTop',
    }),
    defineField({
      name: 'backToTopIconColor',
      title: 'Icon-Farbe',
      type: 'color',
      options: { disableAlpha: true },
      fieldset: 'backToTop',
    }),
    defineField({
      name: 'backToTopSize',
      title: 'Größe (px)',
      type: 'number',
      description: 'Standard: 44px',
      initialValue: 44,
      fieldset: 'backToTop',
    }),
    defineField({
      name: 'backToTopPosition',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          { title: 'Unten rechts', value: 'bottom-right' },
          { title: 'Unten links', value: 'bottom-left' },
        ],
      },
      initialValue: 'bottom-right',
      fieldset: 'backToTop',
    }),
    defineField({
      name: 'backToTopStyle',
      title: 'Form',
      type: 'string',
      options: {
        list: [
          { title: 'Rund', value: 'circle' },
          { title: 'Abgerundet', value: 'rounded' },
          { title: 'Eckig', value: 'square' },
        ],
      },
      initialValue: 'circle',
      fieldset: 'backToTop',
    }),

    /* ─── STANDARD SEO ─── */
    defineField({
      name: 'defaultSeoTitle',
      title: 'Standard-SEO-Titel',
      type: 'string',
      description: 'Fallback-Titel wenn Seiten keinen eigenen SEO-Titel haben',
      fieldset: 'social',
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Standard-SEO-Beschreibung',
      type: 'text',
      rows: 2,
      fieldset: 'social',
    }),
    defineField({
      name: 'defaultSeoImage',
      title: 'Standard-Social-Bild',
      type: 'image',
      description: 'Fallback-Bild für Social Media Shares',
      fieldset: 'social',
    }),
  ],
})
