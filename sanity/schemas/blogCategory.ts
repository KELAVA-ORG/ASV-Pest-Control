import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogCategory',
  title: 'Blog-Kategorie',
  type: 'document',
  preview: {
    select: { title: 'name' },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 2,
      description: 'Kurzbeschreibung für die Kategorie-Seite (wird auch als Meta-Description verwendet)',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO-Titel',
      type: 'string',
      description: 'Überschreibt den Standard-Titel für die Kategorie-Seite',
    }),
    defineField({
      name: 'order',
      title: 'Sortierung',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
