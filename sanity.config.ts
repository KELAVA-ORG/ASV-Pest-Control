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
      // ── Einstellungen ──────────────────────────────────────
      S.listItem()
        .title('Globale Einstellungen')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('globalSettings')
            .documentId('globalSettings')
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
        .title('Scroll-CTA (Slide-in Banner)')
        .icon(() => '💬')
        .child(
          S.document()
            .schemaType('scrollCtaSettings')
            .documentId('scrollCtaSettings')
        ),
      S.listItem()
        .title('E-Mail Einstellungen')
        .icon(() => '📧')
        .child(
          S.document()
            .schemaType('emailSettings')
            .documentId('emailSettings')
        ),
      S.divider(),

      // ── ASV Seiten ─────────────────────────────────────────
      S.listItem()
        .title('Startseite')
        .icon(() => '🏠')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('Taubenabwehr')
        .icon(() => '🐦')
        .child(
          S.document()
            .schemaType('taubenabwehrPage')
            .documentId('taubenabwehrPage')
        ),
      S.listItem()
        .title('Über uns')
        .icon(() => '🏢')
        .child(
          S.document()
            .schemaType('ueberUnsPage')
            .documentId('ueberUnsPage')
        ),
      S.listItem()
        .title('Standorte')
        .icon(() => '📍')
        .child(
          S.document()
            .schemaType('standortePage')
            .documentId('standortePage')
        ),
      S.listItem()
        .title('Karriere')
        .icon(() => '💼')
        .child(
          S.document()
            .schemaType('karrierePage')
            .documentId('karrierePage')
        ),
      S.listItem()
        .title('Superexpel')
        .icon(() => '🧪')
        .child(
          S.document()
            .schemaType('superexpelPage')
            .documentId('superexpelPage')
        ),
      S.divider(),

      // ── ASV Hauptinhalte ───────────────────────────────────
      S.listItem()
        .title('Schädlingsseiten')
        .icon(() => '🐀')
        .child(
          S.documentTypeList('schaedlingsseite')
            .title('Schädlingsseiten')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      S.listItem()
        .title('Stadtseiten')
        .icon(() => '🏙️')
        .child(
          S.documentTypeList('stadtseite')
            .title('Stadtseiten')
            .defaultOrdering([{ field: 'cityName', direction: 'asc' }])
        ),
      S.divider(),

      // ── Seiten & Blog ──────────────────────────────────────
      S.listItem()
        .title('Seiten')
        .icon(() => '📄')
        .child(
          S.documentTypeList('page').title('Seiten')
        ),
      S.listItem()
        .title('Rechtliche Seiten')
        .icon(() => '⚖️')
        .child(
          S.documentTypeList('legalPage').title('Rechtliche Seiten')
        ),
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

      // ── Tools ──────────────────────────────────────────────
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
    ])

export default defineConfig({
  name: 'asv-pest-control',
  title: 'ASV Pest Control GmbH',
  projectId: 'z59ogw16',
  dataset: 'production',
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
