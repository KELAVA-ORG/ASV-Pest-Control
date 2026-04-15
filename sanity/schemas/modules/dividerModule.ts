import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'module.divider',
  title: 'Trennlinie',
  type: 'object',
  preview: {
    prepare() {
      return { title: '── Trennlinie ──', subtitle: 'Trennlinie' }
    },
  },
  fields: [
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Linie', value: 'line' },
          { title: 'Punkte', value: 'dots' },
          { title: 'Abstand (unsichtbar)', value: 'space' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'line',
    }),
    defineField({
      name: 'spacing',
      title: 'Abstand',
      type: 'string',
      options: {
        list: [
          { title: 'Klein', value: 'small' },
          { title: 'Normal', value: 'medium' },
          { title: 'Groß', value: 'large' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'medium',
    }),
  ],
})
