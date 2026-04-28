import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z59ogw16',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

await client.createOrReplace({
  _id: 'emailSettings',
  _type: 'emailSettings',
  fromName: 'ASV Pest Control',
  fromEmail: 'onboarding@resend.dev',
  defaultRecipients: ['info@a-asv.de'],
  ccRecipients: [],
  notificationSubject: 'Neue Anfrage: {{formName}}',
  autoresponderEnabled: true,
  autoresponderSubject: 'Vielen Dank für Ihre Anfrage – ASV Pest Control',
  autoresponderMessage: `Sehr geehrte/r {{Name}},

vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.

Mit freundlichen Grüßen
Ihr ASV Pest Control Team

Tel: +49 6196 – 52 30 10
E-Mail: info@a-asv.de`,
})

console.log('✅ E-Mail Einstellungen gespeichert')
