# Kelava Website Template

Master-Template für Websites mit **Next.js 16 + Sanity CMS v3**. Erstellt von Agentur Kelava.

## Features

- **Page Builder** — Module: Hero, Text, Bild+Text, CTA, FAQ, Galerie, Video, Zitat, Formular, Trennlinie, Blog-Posts
- **Blog** — Kategorien, Autoren, Custom Blocks (Video, CTA, InfoBox, Galerie, FAQ, Formular)
- **Formulare** — Drag & Drop Builder mit Backend-Einträgen
- **Cookie-Banner & Tracking** — GDPR-konform, Usercentrics, Cookiebot oder Built-in
- **Redirect-Manager** — 301/302 Weiterleitungen aus Sanity
- **Analytics-Events** — GA4 Event-Tracking konfigurierbar
- **SEO** — Meta-Tags, robots.txt, Sitemap, JSON-LD
- **Globale Einstellungen** — Farben, Fonts, Logo, Buttons aus dem Backend

## Setup

```bash
# 1. Repo erstellen via "Use this template"
# 2. .env.local anlegen
cp .env.example .env.local
# 3. Sanity Project ID eintragen
# 4. Dependencies installieren
npm install
# 5. Dev-Server starten
npm run dev
```

Studio öffnen: `http://localhost:3000/studio`

## Anpassung

- **Design:** `app/globals.css` (CSS-Variablen) + Komponenten in `app/components/`
- **Schemas:** `sanity/schemas/` — Module hinzufügen/entfernen
- **Queries:** `sanity/lib/queries.ts`
- **Studio-Struktur:** `sanity.config.ts`

## Tech-Stack

- Next.js 16 (App Router)
- Sanity v3 (eingebettetes Studio)
- TypeScript
- Vanilla CSS
- Vercel Hosting
