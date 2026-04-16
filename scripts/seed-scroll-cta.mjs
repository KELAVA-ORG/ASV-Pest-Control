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

async function seed() {
  console.log('Seeding scrollCtaSettings document...\n')

  await client.createOrReplace({
    _id: 'scrollCtaSettings',
    _type: 'scrollCtaSettings',
    enabled: true,
    scrollTriggerPercent: 40,
    showOnPages: 'all',
    specificPages: [],
    badgeText: 'Wir sind gerade erreichbar',
    title: 'Schädlingsproblem?',
    text: 'Kostenlose Erstberatung & Express-Angebot innerhalb von 24h.',
    ctaButtonText: 'Express-Angebot',
    ctaButtonLink: '/express-angebot',
  })

  console.log('scrollCtaSettings seeded successfully.')
}

seed().catch(console.error)
