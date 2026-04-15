import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './sanity/schemas'
import type { StructureBuilder } from 'sanity/structure'

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Inhalte')
    .items([
      // Einzeldokumente (Singletons)
      S.listItem()
        .title('Globale Einstellungen')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('globalSettings')
            .documentId('globalSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Startseite')
        .icon(() => '🏠')
        .child(
          S.document()
            .schemaType('siteContent')
            .documentId('siteContent')
        ),
      S.listItem()
        .title('Navigation')
        .icon(() => '🧭')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('navigation')
        ),
      S.listItem()
        .title('Footer')
        .icon(() => '🔻')
        .child(
          S.document()
            .schemaType('footer')
            .documentId('footer')
        ),
      S.listItem()
        .title('Ankündigungsleiste')
        .icon(() => '📢')
        .child(
          S.document()
            .schemaType('announcementBar')
            .documentId('announcementBar')
        ),
      S.listItem()
        .title('SEO & Crawling')
        .icon(() => '🔍')
        .child(
          S.document()
            .schemaType('seoSettings')
            .documentId('seoSettings')
        ),
      S.listItem()
        .title('Cookie-Banner & Tracking')
        .icon(() => '🍪')
        .child(
          S.document()
            .schemaType('cookieConsent')
            .documentId('cookieConsent')
        ),
      S.listItem()
        .title('Weiterleitungen')
        .icon(() => '↗️')
        .child(
          S.documentTypeList('redirect')
            .title('Weiterleitungen')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Analytics-Events')
        .icon(() => '📊')
        .child(
          S.document()
            .schemaType('analyticsEvents')
            .documentId('analyticsEvents')
        ),
      S.listItem()
        .title('404-Seite')
        .icon(() => '🚫')
        .child(
          S.document()
            .schemaType('notFoundPage')
            .documentId('notFoundPage')
        ),
      S.divider(),

      // Seiten (Page Builder)
      S.listItem()
        .title('Seiten')
        .icon(() => '📄')
        .child(
          S.documentTypeList('page').title('Seiten')
        ),

      // Formulare
      S.listItem()
        .title('Formulare')
        .icon(() => '📋')
        .child(
          S.list()
            .title('Formulare')
            .items([
              S.listItem()
                .title('Alle Formulare')
                .icon(() => '📋')
                .child(S.documentTypeList('form').title('Formulare')),
              S.listItem()
                .title('Einträge / Anfragen')
                .icon(() => '📬')
                .child(
                  S.documentTypeList('formSubmission')
                    .title('Formular-Einträge')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
            ])
        ),

      // Blog
      S.listItem()
        .title('Blog')
        .icon(() => '✍️')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Alle Beiträge')
                .icon(() => '📝')
                .child(
                  S.documentTypeList('blogPost')
                    .title('Blog-Beiträge')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Kategorien')
                .icon(() => '🏷️')
                .child(S.documentTypeList('blogCategory').title('Kategorien')),
              S.listItem()
                .title('Autoren')
                .icon(() => '👤')
                .child(S.documentTypeList('blogAuthor').title('Autoren')),
              S.divider(),
              S.listItem()
                .title('Blog-Einstellungen')
                .icon(() => '⚙️')
                .child(
                  S.document()
                    .schemaType('blogSettings')
                    .documentId('blogSettings')
                ),
            ])
        ),

      S.divider(),

      // Restaurant-Inhalte (BEISPIEL — anpassen pro Projekt)
      S.listItem()
        .title('Speisekarte')
        .icon(() => '🍽️')
        .child(
          S.list()
            .title('Speisekarte')
            .items([
              S.listItem()
                .title('Kategorien')
                .child(S.documentTypeList('menuCategory').title('Kategorien')),
              S.listItem()
                .title('Beilagen')
                .child(S.documentTypeList('sideCategory').title('Beilagen')),
            ])
        ),
      S.listItem()
        .title('Öffnungszeiten')
        .icon(() => '🕐')
        .child(
          S.document()
            .schemaType('openingHours')
            .documentId('openingHours')
        ),
      S.listItem()
        .title('Rechtliche Seiten')
        .icon(() => '⚖️')
        .child(
          S.documentTypeList('legalPage').title('Rechtliche Seiten')
        ),
    ])

export default defineConfig({
  name: 'kelava-template',
  title: 'Kelava Website Template',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool(),
    media(),
    colorInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})
