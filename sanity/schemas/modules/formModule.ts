import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'module.form',
  title: 'Formular',
  type: 'object',
  preview: {
    select: { title: 'heading', formName: 'form.name' },
    prepare({ title, formName }) {
      return {
        title: title || formName || 'Formular',
        subtitle: formName ? `Formular: ${formName}` : undefined,
      }
    },
  },
  fields: [
    defineField({
      name: 'form',
      title: 'Formular auswählen',
      type: 'reference',
      to: [{ type: 'form' }],
      description: 'Wähle ein Formular aus der Formularliste',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Überschrift (optional)',
      type: 'string',
      description: 'Überschreibt den Formular-Namen als Überschrift. Leer = keine Überschrift.',
    }),
    defineField({
      name: 'headingLevel',
      title: 'Heading-Level',
      type: 'string',
      options: {
        list: [
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'H5', value: 'h5' },
          { title: 'H6', value: 'h6' },
        ],
      },
      initialValue: 'h2',
    }),
    defineField({
      name: 'headingSize',
      title: 'Überschriften-Größe (px)',
      type: 'number',
      description: 'Optional: individuelle Größe in Pixel',
    }),
    defineField({
      name: 'body',
      title: 'Einleitungstext',
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
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'blank', type: 'boolean', title: 'In neuem Tab öffnen' },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'narrowWidth',
      title: 'Schmale Breite',
      type: 'boolean',
      description: 'Formular zentriert mit max. 600px Breite',
      initialValue: true,
    }),
  ],
})
