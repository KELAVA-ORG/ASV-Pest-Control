import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'module.video',
  title: 'Video',
  type: 'object',
  preview: {
    select: { title: 'heading', videoType: 'videoType' },
    prepare({ title, videoType }) {
      const label = videoType === 'youtube' ? 'YouTube' : videoType === 'vimeo' ? 'Vimeo' : 'Eigenes Video'
      return { title: title || 'Video', subtitle: `Video — ${label}` }
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
          { title: 'H1 — Seitenüberschrift', value: 'h1' },
          { title: 'H2 — Abschnitt', value: 'h2' },
          { title: 'H3 — Unterabschnitt', value: 'h3' },
          { title: 'H4 — Klein', value: 'h4' },
          { title: 'H5 — Sehr klein', value: 'h5' },
          { title: 'H6 — Kleinste', value: 'h6' },
        ],
      },
      initialValue: 'h2',
      hidden: ({ parent }) => !parent?.heading,
    }),
    defineField({
      name: 'headingSize',
      title: 'Schriftgröße (px)',
      type: 'number',
      description: 'Individuelle Größe in Pixel. Leer lassen = globaler Standard.',
      validation: (Rule) => Rule.min(12).max(120),
      hidden: ({ parent }) => !parent?.heading,
    }),
    defineField({
      name: 'videoType',
      title: 'Video-Typ',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Eigenes Video (Self-hosted)', value: 'selfhosted' },
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube-URL',
      type: 'url',
      description: 'Vollständige YouTube-URL, z.B. https://www.youtube.com/watch?v=xxxxx oder https://youtu.be/xxxxx',
      hidden: ({ parent }) => parent?.videoType !== 'youtube',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { videoType?: string }
          if (parent?.videoType === 'youtube' && !value) return 'YouTube-URL ist erforderlich'
          return true
        }),
    }),
    defineField({
      name: 'vimeoUrl',
      title: 'Vimeo-URL',
      type: 'url',
      description: 'Vollständige Vimeo-URL, z.B. https://vimeo.com/123456789',
      hidden: ({ parent }) => parent?.videoType !== 'vimeo',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { videoType?: string }
          if (parent?.videoType === 'vimeo' && !value) return 'Vimeo-URL ist erforderlich'
          return true
        }),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video-Datei',
      type: 'file',
      description: 'MP4-Datei hochladen (max. empfohlen: 50 MB)',
      options: { accept: 'video/mp4,video/webm' },
      hidden: ({ parent }) => parent?.videoType !== 'selfhosted',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { videoType?: string }
          if (parent?.videoType === 'selfhosted' && !value) return 'Video-Datei ist erforderlich'
          return true
        }),
    }),
    defineField({
      name: 'posterImage',
      title: 'Vorschaubild (Poster)',
      type: 'image',
      description: 'Wird angezeigt bevor das Video abgespielt wird. Bei YouTube/Vimeo optional (wird automatisch geladen).',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt-Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Bildunterschrift (optional)',
      type: 'string',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay (stumm)',
      type: 'boolean',
      description: 'Video startet automatisch ohne Ton. Nur für Self-hosted.',
      initialValue: false,
      hidden: ({ parent }) => parent?.videoType !== 'selfhosted',
    }),
    defineField({
      name: 'loop',
      title: 'Endlosschleife',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.videoType !== 'selfhosted',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Maximale Breite',
      type: 'string',
      options: {
        list: [
          { title: 'Volle Breite', value: 'full' },
          { title: 'Groß (960px)', value: 'large' },
          { title: 'Mittel (720px)', value: 'medium' },
        ],
      },
      initialValue: 'large',
    }),
  ],
})
