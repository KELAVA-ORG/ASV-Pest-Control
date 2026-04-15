# Kelava Website Template

## Projekt-Überblick
Master-Template für Websites mit Next.js + Sanity CMS Backend.
Erstellt von Agentur Kelava. Alle Inhalte werden über das Sanity CMS Backend verwaltet.

## Tech-Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **CMS:** Sanity v3 (Studio eingebettet unter `/studio`)
- **Hosting:** Vercel (auto-deploy via GitHub)
- **Styling:** Vanilla CSS (`app/globals.css`)
- **Sprache:** TypeScript

## Sanity-Konfiguration
- **Project ID:** Wird über `.env.local` gesetzt
- **Dataset:** production
- **Studio-Pfad:** /studio
- **Plugins:** structureTool, visionTool, media, colorInput
- **Config:** sanity.config.ts (mit custom Studio-Struktur)

## Setup für neues Projekt
1. "Use this template" auf GitHub
2. Neues Sanity-Projekt auf sanity.io/manage erstellen
3. `.env.local` anlegen (siehe `.env.example`)
4. `npm install && npm run dev`
5. Studio unter `/studio` öffnen und Inhalte befüllen

## Architektur

### Datenfetching
- Server Components via `@/sanity/lib/client.ts`
- GROQ-Queries in `@/sanity/lib/queries.ts`
- ISR mit `revalidate = 60`

### Enthaltene Module (Page Builder)
- Hero, Text, Bild+Text, CTA, FAQ, Galerie, Video, Zitat, Formular, Trennlinie, Blog-Posts

### Backend-Features
- Globale Einstellungen (Farben, Fonts, Logo, SEO)
- Navigation + Footer (dynamisch aus Sanity)
- Blog mit Kategorien, Autoren, Custom Blocks
- Formulare mit Backend-Einträgen
- Cookie-Banner & Tracking (GDPR, Usercentrics, Cookiebot)
- Redirect-Manager (301/302)
- Analytics-Event-Tracking
- SEO & Crawling Einstellungen
- Ankündigungsleiste
- 404-Seite
- Öffnungszeiten
- Speisekarte (Restaurant-Beispiel — anpassen pro Branche)

### Wichtige Dateien
- `sanity/schemas/` — Alle Sanity Schema-Definitionen
- `sanity/lib/queries.ts` — Alle GROQ-Queries
- `sanity.config.ts` — Studio-Struktur und Konfiguration
- `app/layout.tsx` — Root Layout mit Consent, Analytics, Fonts
- `app/globals.css` — CSS-Variablen und Basis-Styles
- `app/components/` — Alle Frontend-Komponenten

### Konventionen
- Sanity-Singletons: camelCase documentId (z.B. `globalSettings`)
- Module: `module.` Prefix (z.B. `module.hero`)
- String-Arrays: Plain Strings, KEINE Objekte mit `_key`/`_type`/`value`
- Farben: CSS-Variablen die durch Sanity Global Settings überschrieben werden
