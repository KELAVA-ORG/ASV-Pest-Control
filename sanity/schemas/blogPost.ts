import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog-Beitrag',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'featuredImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
          : 'Entwurf',
        media,
      }
    },
  },
  groups: [
    { name: 'content', title: 'Inhalt', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Einstellungen' },
  ],
  fields: [
    /* ═══ INHALT ═══ */
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required().max(70).warning('Ideal: unter 60 Zeichen für Google'),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'URL-Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Auszug / Teaser',
      type: 'text',
      rows: 3,
      description: 'Kurzbeschreibung für Übersichtsseiten und als Fallback-Meta-Description. Ideal: 120–160 Zeichen.',
      validation: (Rule) => Rule.max(200).warning('Ideal: unter 160 Zeichen'),
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Beitragsbild',
      type: 'image',
      description: 'Wird in der Übersicht, im Artikel und als Social-Bild verwendet',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text (SEO-relevant!)', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'caption', title: 'Bildunterschrift', type: 'string' }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Inhalt',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Zitat', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Fett', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
              { title: 'Unterstrichen', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL', validation: (Rule) => Rule.required() }),
                  { name: 'blank', type: 'boolean', title: 'In neuem Tab öffnen', initialValue: false },
                  {
                    name: 'rel',
                    type: 'string',
                    title: 'Rel-Attribut',
                    description: 'z.B. "nofollow" für externe Links',
                    options: {
                      list: [
                        { title: 'Standard (dofollow)', value: '' },
                        { title: 'nofollow', value: 'nofollow' },
                        { title: 'sponsored', value: 'sponsored' },
                        { title: 'ugc', value: 'ugc' },
                      ],
                    },
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Interner Link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Seite',
                    to: [{ type: 'page' }, { type: 'blogPost' }],
                  },
                ],
              },
            ],
          },
          lists: [
            { title: 'Aufzählung', value: 'bullet' },
            { title: 'Nummerierung', value: 'number' },
          ],
        },
        {
          type: 'image',
          fields: [
            defineField({ name: 'alt', title: 'Alt-Text', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'caption', title: 'Bildunterschrift', type: 'string' }),
          ],
        },
        /* ─── Video Embed ─── */
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video',
          icon: () => '🎬',
          preview: {
            select: { videoType: 'videoType', url: 'url' },
            prepare({ videoType, url }: { videoType?: string; url?: string }) {
              const label = videoType === 'youtube' ? 'YouTube' : videoType === 'vimeo' ? 'Vimeo' : 'Eigenes Video'
              return { title: `Video — ${label}`, subtitle: url || '' }
            },
          },
          fields: [
            defineField({
              name: 'videoType',
              title: 'Video-Typ',
              type: 'string',
              options: {
                list: [
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Vimeo', value: 'vimeo' },
                  { title: 'Eigenes Video', value: 'selfhosted' },
                ],
                layout: 'radio',
              },
              initialValue: 'youtube',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Video-URL',
              type: 'url',
              description: 'YouTube- oder Vimeo-URL',
              hidden: ({ parent }) => parent?.videoType === 'selfhosted',
            }),
            defineField({
              name: 'file',
              title: 'Video-Datei',
              type: 'file',
              options: { accept: 'video/mp4,video/webm' },
              hidden: ({ parent }) => parent?.videoType !== 'selfhosted',
            }),
            defineField({ name: 'caption', title: 'Bildunterschrift', type: 'string' }),
          ],
        },
        /* ─── CTA Button ─── */
        {
          type: 'object',
          name: 'ctaButton',
          title: 'CTA-Button',
          icon: () => '🔘',
          preview: {
            select: { title: 'text' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'CTA-Button', subtitle: 'Button' }
            },
          },
          fields: [
            defineField({ name: 'text', title: 'Button-Text', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'url',
              title: 'Link-URL',
              type: 'url',
              validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'tel', 'mailto'] }),
            }),
            defineField({ name: 'openInNewTab', title: 'In neuem Tab öffnen', type: 'boolean', initialValue: false }),
            defineField({
              name: 'style',
              title: 'Stil',
              type: 'string',
              options: {
                list: [
                  { title: 'Primär (ausgefüllt)', value: 'primary' },
                  { title: 'Sekundär (Outline)', value: 'secondary' },
                ],
                layout: 'radio',
              },
              initialValue: 'primary',
            }),
            defineField({
              name: 'alignment',
              title: 'Ausrichtung',
              type: 'string',
              options: {
                list: [
                  { title: 'Links', value: 'left' },
                  { title: 'Zentriert', value: 'center' },
                ],
                layout: 'radio',
              },
              initialValue: 'left',
            }),
          ],
        },
        /* ─── Info-Box ─── */
        {
          type: 'object',
          name: 'infoBox',
          title: 'Info-Box',
          icon: () => 'ℹ️',
          preview: {
            select: { title: 'title', variant: 'variant' },
            prepare({ title, variant }: { title?: string; variant?: string }) {
              const labels: Record<string, string> = { info: 'Info', tip: 'Tipp', warning: 'Warnung', error: 'Fehler' }
              return { title: title || 'Info-Box', subtitle: labels[variant || 'info'] || 'Info' }
            },
          },
          fields: [
            defineField({
              name: 'variant',
              title: 'Variante',
              type: 'string',
              options: {
                list: [
                  { title: 'Info (blau)', value: 'info' },
                  { title: 'Tipp (grün)', value: 'tip' },
                  { title: 'Warnung (gelb)', value: 'warning' },
                  { title: 'Fehler (rot)', value: 'error' },
                ],
                layout: 'radio',
              },
              initialValue: 'info',
            }),
            defineField({ name: 'title', title: 'Titel (optional)', type: 'string' }),
            defineField({
              name: 'body',
              title: 'Inhalt',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  marks: {
                    decorators: [
                      { title: 'Fett', value: 'strong' },
                      { title: 'Kursiv', value: 'em' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          defineField({ name: 'href', type: 'url', title: 'URL', validation: (Rule) => Rule.required() }),
                        ],
                      },
                    ],
                  },
                },
              ],
            }),
          ],
        },
        /* ─── Inline Gallery ─── */
        {
          type: 'object',
          name: 'gallery',
          title: 'Galerie',
          icon: () => '🖼️',
          preview: {
            select: { i0: 'images.0.alt', i1: 'images.1.alt', i2: 'images.2.alt' },
            prepare({ i0, i1, i2 }: { i0?: string; i1?: string; i2?: string }) {
              const count = [i0, i1, i2].filter(Boolean).length
              return { title: `Galerie (${count}+ Bilder)`, subtitle: 'Bildergalerie' }
            },
          },
          fields: [
            defineField({
              name: 'images',
              title: 'Bilder',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
                    defineField({ name: 'caption', title: 'Bildunterschrift', type: 'string' }),
                  ],
                },
              ],
              validation: (Rule) => Rule.min(2),
            }),
            defineField({
              name: 'columns',
              title: 'Spalten',
              type: 'number',
              options: { list: [{ title: '2', value: 2 }, { title: '3', value: 3 }, { title: '4', value: 4 }] },
              initialValue: 2,
            }),
          ],
        },
        /* ─── Inline FAQ / Accordion ─── */
        {
          type: 'object',
          name: 'faqBlock',
          title: 'FAQ / Akkordeon',
          icon: () => '❓',
          preview: {
            select: { q0: 'items.0.question', q1: 'items.1.question' },
            prepare({ q0, q1 }: { q0?: string; q1?: string }) {
              return { title: q0 || 'FAQ', subtitle: q1 ? `+ ${q1} …` : 'Akkordeon' }
            },
          },
          fields: [
            defineField({
              name: 'items',
              title: 'Fragen & Antworten',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'faqItem',
                  fields: [
                    defineField({ name: 'question', title: 'Frage', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({
                      name: 'answer',
                      title: 'Antwort',
                      type: 'array',
                      of: [
                        {
                          type: 'block',
                          styles: [{ title: 'Normal', value: 'normal' }],
                          marks: {
                            decorators: [
                              { title: 'Fett', value: 'strong' },
                              { title: 'Kursiv', value: 'em' },
                            ],
                          },
                        },
                      ],
                    }),
                  ],
                },
              ],
              validation: (Rule) => Rule.min(1),
            }),
          ],
        },
        /* ─── Form Reference ─── */
        {
          type: 'object',
          name: 'formEmbed',
          title: 'Kontaktformular',
          icon: () => '📋',
          preview: {
            select: { title: 'form.name' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Formular', subtitle: 'Kontaktformular' }
            },
          },
          fields: [
            defineField({
              name: 'form',
              title: 'Formular auswählen',
              type: 'reference',
              to: [{ type: 'form' }],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),

    /* ═══ SEO ═══ */
    defineField({
      name: 'seoTitle',
      title: 'SEO-Titel',
      type: 'string',
      description: 'Überschreibt den Artikel-Titel in Suchmaschinen. Ideal: 50–60 Zeichen.',
      validation: (Rule) => Rule.max(70).warning('Google schneidet nach ~60 Zeichen ab'),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta-Description',
      type: 'text',
      rows: 2,
      description: 'Beschreibung für Google-Suchergebnisse. Ideal: 120–155 Zeichen. Fallback: Auszug.',
      validation: (Rule) => Rule.max(160).warning('Google schneidet nach ~155 Zeichen ab'),
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'Social/OG-Bild',
      type: 'image',
      description: 'Überschreibt das Beitragsbild für Social Media. Ideal: 1200x630px.',
      group: 'seo',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Nur setzen wenn dieser Artikel woanders zuerst veröffentlicht wurde (Duplicate Content)',
      group: 'seo',
    }),
    defineField({
      name: 'noIndex',
      title: 'Von Suchmaschinen ausschließen',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Fokus-Keyword',
      type: 'string',
      description: 'Das Haupt-Keyword für diesen Artikel (zur internen Planung, wird nicht ausgegeben)',
      group: 'seo',
    }),

    /* ═══ EINSTELLUNGEN ═══ */
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'blogAuthor' }],
      group: 'settings',
    }),
    defineField({
      name: 'categories',
      title: 'Kategorien',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }],
      group: 'settings',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Freitext-Tags für Themen-Clustering (SEO: hilft Google bei der Themen-Zuordnung)',
      group: 'settings',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlichungsdatum',
      type: 'datetime',
      description: 'Wird für Sortierung und als datePublished in Schema.org verwendet',
      initialValue: () => new Date().toISOString(),
      group: 'settings',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Zuletzt aktualisiert',
      type: 'datetime',
      description: 'Für das dateModified in Schema.org — wichtig für Content-Freshness',
      group: 'settings',
    }),
    defineField({
      name: 'readingTime',
      title: 'Lesezeit (Minuten)',
      type: 'number',
      description: 'Optional: Wird automatisch berechnet wenn leer',
      group: 'settings',
    }),
    defineField({
      name: 'featured',
      title: 'Hervorgehoben',
      type: 'boolean',
      description: 'Wird prominent auf der Blog-Übersicht angezeigt',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Verwandte Beiträge',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      description: 'Manuell ausgewählte verwandte Artikel (stärkt interne Verlinkung)',
      validation: (Rule) => Rule.max(4),
      group: 'settings',
    }),
    defineField({
      name: 'excludeFromSitemap',
      title: 'Von Sitemap ausschließen',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
  ],
})
