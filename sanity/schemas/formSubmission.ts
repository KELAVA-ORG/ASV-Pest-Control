import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'formSubmission',
  title: 'Formular-Eintrag',
  type: 'document',
  preview: {
    select: {
      formName: 'form.name',
      date: '_createdAt',
      data: 'data',
    },
    prepare({ formName, date, data }) {
      // Try to find a name or email field for the subtitle
      const entries = data || []
      const nameEntry = entries.find((e: { label: string }) =>
        /name|vorname|nachname/i.test(e.label)
      )
      const emailEntry = entries.find((e: { label: string }) =>
        /e-?mail/i.test(e.label)
      )
      const subtitle = nameEntry?.value || emailEntry?.value || ''
      const dateStr = date ? new Date(date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) : ''
      return {
        title: `${formName || 'Formular'} — ${dateStr}`,
        subtitle,
      }
    },
  },
  readOnly: true,
  fields: [
    defineField({
      name: 'form',
      title: 'Formular',
      type: 'reference',
      to: [{ type: 'form' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'data',
      title: 'Formulardaten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Feld', type: 'string' }),
            defineField({ name: 'value', title: 'Wert', type: 'text' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'utmParams',
      title: 'UTM-Parameter',
      type: 'object',
      fields: [
        defineField({ name: 'utm_source', title: 'Source', type: 'string' }),
        defineField({ name: 'utm_medium', title: 'Medium', type: 'string' }),
        defineField({ name: 'utm_campaign', title: 'Campaign', type: 'string' }),
        defineField({ name: 'utm_term', title: 'Term', type: 'string' }),
        defineField({ name: 'utm_content', title: 'Content', type: 'string' }),
      ],
    }),
    defineField({
      name: 'pageUrl',
      title: 'Seite',
      type: 'string',
      description: 'URL der Seite, auf der das Formular abgeschickt wurde',
    }),
    defineField({
      name: 'userAgent',
      title: 'User-Agent',
      type: 'string',
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP-Adresse',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Neu', value: 'new' },
          { title: 'Gelesen', value: 'read' },
          { title: 'Bearbeitet', value: 'done' },
          { title: 'Spam', value: 'spam' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: 'Interne Notizen',
      type: 'text',
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})
