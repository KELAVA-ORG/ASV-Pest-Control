import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const env = dotenv.parse(readFileSync(join(__dirname, '../.env.local')))

const client = createClient({
  projectId: 'z59ogw16',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
})

await client.createOrReplace({
  _id: 'cookieConsent',
  _type: 'cookieConsent',
  consentMode: 'built-in',
  text: 'Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Einige Cookies sind technisch notwendig, während andere uns helfen, die Nutzung unserer Website zu analysieren und zu verbessern. Weitere Informationen finden Sie in unserer',
  acceptAllText: 'Alle akzeptieren',
  acceptEssentialText: 'Nur notwendige',
  settingsEnabled: true,
  settingsButtonText: 'Einstellungen',
  saveSelectionText: 'Auswahl speichern',
  privacyLinkText: 'Datenschutzerklärung',
  privacyLinkUrl: '/datenschutz',
  necessaryName: 'Notwendig',
  necessaryDesc: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich (z.\u202fB. Speicherung Ihrer Cookie-Einstellungen).',
  analyticsEnabled: true,
  analyticsName: 'Analyse & Statistiken',
  analyticsDesc: 'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen (z.\u202fB. Google Analytics).',
  marketingEnabled: true,
  marketingName: 'Marketing',
  marketingDesc: 'Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten (z.\u202fB. Google Ads Conversion-Tracking).',
  revokeEnabled: true,
  revokeText: 'Cookie-Einstellungen',
  revokePosition: 'bottom-left',
})

console.log('✅ cookieConsent seeded')
