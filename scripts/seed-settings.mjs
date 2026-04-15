/**
 * ASV Pest Control – Sanity Seed Script
 * Befüllt Navigation, Footer und GlobalSettings mit ASV-Standardwerten.
 * Aufruf: node scripts/seed-settings.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z59ogw16',
  dataset: 'production',
  token: 'skTHUAv7if1vZB8QLzSC1euPEriFHRdcnCx0GHKXsFBu3ytyRZouPlveptCZKe4M36ptZiclDtQkavzd38BCwifKNic8IUbkc0vtizUu0QZ5MeiEYTmSyQ6qZuzbf0EO4O4kuEPLnP6RMFJKstmtfVMmNDoV8t3AqCjFpa5rrJUZMY9JrafF',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─── Global Settings ─────────────────────────────────────
const globalSettings = {
  _id: 'globalSettings',
  _type: 'globalSettings',
  siteName: 'ASV Pest Control GmbH',
  companyName: 'ASV Pest Control GmbH',
  phoneMain: '+49 6196 52 30 10',
  phoneMainFormatted: '+49 6196 52 30 10',
  phoneMainTel: '+496196523010',
  email: 'info@asv-schaedlingsbekaempfung.de',
  ctaButtonText: 'Kostenloses Angebot',
  ctaButtonLink: '/express-angebot',
  defaultSeoTitle: 'ASV Pest Control GmbH – Professionelle Schädlingsbekämpfung',
  defaultSeoDescription: 'Ihr zuverlässiger Kammerjäger in der Region. Über 30 Jahre Erfahrung, 24h Notdienst, IHK-zertifiziert.',
}

// ─── Navigation ──────────────────────────────────────────
const navigation = {
  _id: 'navigation',
  _type: 'navigation',
  logoText: 'ASV Pest Control',
  menuItems: [
    {
      _type: 'menuItem',
      _key: 'nav_start',
      label: 'Startseite',
      linkType: 'external',
      link: '/',
    },
    {
      _type: 'menuItem',
      _key: 'nav_schaedlinge',
      label: 'Schädlinge',
      hasDropdown: true,
      dropdownItems: [
        { _type: 'dropdownItem', _key: 'dd_ratten', label: 'Ratten', link: '/schaedlinge/ratten', description: 'Rattenbekämpfung' },
        { _type: 'dropdownItem', _key: 'dd_maeuse', label: 'Mäuse', link: '/schaedlinge/maeuse', description: 'Mäusebekämpfung' },
        { _type: 'dropdownItem', _key: 'dd_wespen', label: 'Wespen', link: '/schaedlinge/wespen', description: 'Nestentfernung' },
        { _type: 'dropdownItem', _key: 'dd_schaben', label: 'Schaben', link: '/schaedlinge/schaben', description: 'Schabenbekämpfung' },
        { _type: 'dropdownItem', _key: 'dd_ameisen', label: 'Ameisen', link: '/schaedlinge/ameisen', description: 'Ameisenbekämpfung' },
        { _type: 'dropdownItem', _key: 'dd_bettwanzen', label: 'Bettwanzen', link: '/schaedlinge/bettwanzen', description: 'Wanzenbekämpfung' },
        { _type: 'dropdownItem', _key: 'dd_floehe', label: 'Flöhe', link: '/schaedlinge/floehe', description: 'Flohbekämpfung' },
        { _type: 'dropdownItem', _key: 'dd_marder', label: 'Marder', link: '/schaedlinge/marder', description: 'Marderabwehr' },
        { _type: 'dropdownItem', _key: 'dd_tauben', label: 'Taubenabwehr', link: '/schaedlinge/taubenabwehr', description: 'Vogelabwehr' },
        { _type: 'dropdownItem', _key: 'dd_motten', label: 'Motten', link: '/schaedlinge/motten', description: 'Mottenbekämpfung' },
        { _type: 'dropdownItem', _key: 'dd_silber', label: 'Silberfische', link: '/schaedlinge/silberfische', description: 'Silberfischbekämpfung' },
      ],
    },
    {
      _type: 'menuItem',
      _key: 'nav_staedte',
      label: 'Standorte',
      linkType: 'external',
      link: '/standorte',
    },
    {
      _type: 'menuItem',
      _key: 'nav_ueber',
      label: 'Über uns',
      linkType: 'external',
      link: '/ueber-uns',
    },
  ],
  ctaEnabled: true,
  ctaText: 'Express-Angebot',
  ctaLink: '/express-angebot',
  ctaOpenInNewTab: false,
}

// ─── Footer ──────────────────────────────────────────────
const footer = {
  _id: 'footer',
  _type: 'footer',
  footerLinks: [
    { _type: 'footerLink', _key: 'fl_impressum', label: 'Impressum', link: '/impressum' },
    { _type: 'footerLink', _key: 'fl_datenschutz', label: 'Datenschutz', link: '/datenschutz' },
    { _type: 'footerLink', _key: 'fl_kontakt', label: 'Kontakt', link: '/express-angebot' },
  ],
  copyrightText: `© ${new Date().getFullYear()} ASV Pest Control GmbH. Alle Rechte vorbehalten.`,
  socialLinks: [],
}

// ─── Import ──────────────────────────────────────────────
console.log('\n🌱 Seede ASV Grunddaten in Sanity...\n')

for (const doc of [globalSettings, navigation, footer]) {
  try {
    await client.createOrReplace(doc)
    console.log(`  ✅ ${doc._type} (${doc._id})`)
  } catch (err) {
    console.error(`  ❌ ${doc._type}:`, err.message)
  }
}

console.log('\n🎉 Seed abgeschlossen!\n')
console.log('   Tipp: Logo im Sanity Studio unter "Globale Einstellungen" hochladen.')
console.log('   Studio: http://localhost:3000/studio\n')
