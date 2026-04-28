import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z59ogw16',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function key() { return Math.random().toString(36).slice(2, 10) }

await client.createOrReplace({
  _id: 'form-express-angebot',
  _type: 'form',
  name: 'Express-Angebot Anfrage',
  internalNote: 'Wird auf der /express-angebot Seite verwendet',

  fields: [
    {
      _type: 'formField',
      _key: key(),
      label: 'Name',
      fieldName: { _type: 'slug', current: 'name' },
      fieldType: 'text',
      placeholder: 'Ihr vollständiger Name',
      required: true,
      halfWidth: true,
    },
    {
      _type: 'formField',
      _key: key(),
      label: 'Telefon',
      fieldName: { _type: 'slug', current: 'telefon' },
      fieldType: 'tel',
      placeholder: '+49 ...',
      required: true,
      halfWidth: true,
    },
    {
      _type: 'formField',
      _key: key(),
      label: 'E-Mail',
      fieldName: { _type: 'slug', current: 'email' },
      fieldType: 'email',
      placeholder: 'ihre@email.de',
      required: true,
      halfWidth: true,
    },
    {
      _type: 'formField',
      _key: key(),
      label: 'PLZ / Ort',
      fieldName: { _type: 'slug', current: 'plz-ort' },
      fieldType: 'text',
      placeholder: 'z.B. 60487 Frankfurt',
      required: true,
      halfWidth: true,
    },
    {
      _type: 'formField',
      _key: key(),
      label: 'Schädlingsart',
      fieldName: { _type: 'slug', current: 'schaedlingsart' },
      fieldType: 'select',
      placeholder: 'Bitte wählen ...',
      required: true,
      halfWidth: false,
      options: [
        'Wespen', 'Ratten', 'Mäuse', 'Schaben', 'Ameisen',
        'Bettwanzen', 'Motten', 'Marder', 'Flöhe', 'Silberfische',
        'Tauben', 'Sonstiges',
      ],
    },
    {
      _type: 'formField',
      _key: key(),
      label: 'Nachricht',
      fieldName: { _type: 'slug', current: 'nachricht' },
      fieldType: 'textarea',
      placeholder: 'Beschreiben Sie das Problem kurz (optional) ...',
      required: false,
      halfWidth: false,
    },
    {
      _type: 'formField',
      _key: key(),
      label: 'Datenschutz',
      fieldName: { _type: 'slug', current: 'datenschutz' },
      fieldType: 'checkbox',
      required: true,
      halfWidth: false,
      options: ['Ich habe die Datenschutzerklärung gelesen und akzeptiere sie.'],
    },
  ],

  // E-Mail-Benachrichtigung
  emailTo: ['info@a-asv.de'],
  emailSubject: 'Neue Express-Anfrage von {{Name}}',
  emailReplyToField: 'E-Mail',

  // Auto-Responder an den Kunden
  autoresponderEnabled: true,
  autoresponderEmailField: 'E-Mail',
  autoresponderSubject: 'Vielen Dank für Ihre Anfrage – ASV Pest Control',
  autoresponderMessage: `Sehr geehrte/r {{Name}},

vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.

Ihre Angaben:
- Telefon: {{Telefon}}
- PLZ / Ort: {{PLZ / Ort}}
- Schädlingsart: {{Schädlingsart}}

Mit freundlichen Grüßen
Ihr ASV Pest Control Team

Tel: +49 6196 – 52 30 10
E-Mail: info@a-asv.de
Web: www.asv-schaedlingsbekaempfung.de`,

  // Nach dem Absenden
  afterSubmitAction: 'message',
  successMessage: 'Vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden bei Ihnen.',

  // Spam-Schutz
  honeypotEnabled: true,
  rateLimitPerMinute: 5,

  // Submit-Button
  submitButtonText: 'Kostenloses Angebot anfordern',
})

console.log('✅ Express-Angebot Formular gespeichert (ID: form-express-angebot)')
