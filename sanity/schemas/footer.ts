import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Footer' }
    },
  },
  fieldsets: [
    { name: 'branding', title: '🏷️ Logo & Branding', options: { collapsible: true, collapsed: false } },
    { name: 'social', title: '📱 Social Media', options: { collapsible: true, collapsed: false } },
    { name: 'links', title: '🔗 Footer-Links', options: { collapsible: true, collapsed: false } },
    { name: 'legal', title: '⚖️ Rechtliches', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    /* ─── BRANDING ─── */
    defineField({
      name: 'logo',
      title: 'Footer-Logo',
      type: 'image',
      description: 'Logo im Footer-Bereich (SVG oder PNG)',
      fieldset: 'branding',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          type: 'string',
        }),
      ],
    }),

    /* ─── SOCIAL MEDIA ─── */
    defineField({
      name: 'socialLinks',
      title: 'Social-Media-Links',
      type: 'array',
      description: 'Alle Social-Media-Profile. Per Drag-and-Drop sortieren.',
      fieldset: 'social',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social-Media-Link',
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
          fields: [
            defineField({
              name: 'platform',
              title: 'Plattform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'X (Twitter)', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Yelp', value: 'yelp' },
                  { title: 'TripAdvisor', value: 'tripadvisor' },
                  { title: 'Google', value: 'google' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Profil-URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Anzeige-Text (optional)',
              type: 'string',
              description: 'z. B. "@meinunternehmen". Wenn leer, wird nur das Icon gezeigt.',
            }),
          ],
        },
      ],
    }),

    /* ─── FOOTER LINKS ─── */
    defineField({
      name: 'footerLinks',
      title: 'Zusätzliche Footer-Links',
      type: 'array',
      description: 'Weitere Links im Footer, z. B. Karriere, Partner, etc.',
      fieldset: 'links',
      of: [
        {
          type: 'object',
          name: 'footerLink',
          title: 'Link',
          preview: {
            select: { title: 'label', subtitle: 'link' },
          },
          fields: [
            defineField({
              name: 'label',
              title: 'Bezeichnung',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Relativer Pfad (/impressum) oder externe URL',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'openInNewTab',
              title: 'In neuem Tab öffnen',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        },
      ],
    }),

    /* ─── RECHTLICHES ─── */
    defineField({
      name: 'copyrightText',
      title: 'Copyright-Text',
      type: 'string',
      description: 'z. B. "© 2025 Mein Unternehmen. Alle Rechte vorbehalten."',
      fieldset: 'legal',
    }),
  ],
})
