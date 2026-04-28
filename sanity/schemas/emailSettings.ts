import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'emailSettings',
  title: 'E-Mail Einstellungen',
  type: 'document',
  groups: [
    { name: 'absender', title: 'Absender' },
    { name: 'empfaenger', title: 'Empfänger' },
    { name: 'vorlagen', title: 'E-Mail Vorlagen' },
  ],
  fields: [
    // ── Absender ──────────────────────────────────────────────
    defineField({
      name: 'fromName',
      title: 'Absendername',
      description: 'z. B. "ASV Pest Control" – erscheint als Absender in der E-Mail',
      type: 'string',
      group: 'absender',
      initialValue: 'ASV Pest Control',
    }),
    defineField({
      name: 'fromEmail',
      title: 'Absender E-Mail',
      description: 'Muss eine in Resend verifizierte Domain verwenden (z. B. info@a-asv.de). Ohne verifizierte Domain: onboarding@resend.dev',
      type: 'string',
      group: 'absender',
      initialValue: 'onboarding@resend.dev',
    }),
    defineField({
      name: 'replyToEmail',
      title: 'Antwort an (Reply-To)',
      description: 'Optional – wenn leer, wird die E-Mail-Adresse des Absenders verwendet',
      type: 'string',
      group: 'absender',
    }),

    // ── Empfänger ──────────────────────────────────────────────
    defineField({
      name: 'defaultRecipients',
      title: 'Standard-Empfänger',
      description: 'Diese E-Mail-Adressen erhalten alle Formular-Einsendungen (sofern im Formular kein Empfänger definiert ist)',
      type: 'array',
      group: 'empfaenger',
      of: [{ type: 'string' }],
      initialValue: ['info@a-asv.de'],
    }),
    defineField({
      name: 'ccRecipients',
      title: 'CC-Empfänger',
      description: 'Optional – werden in Kopie bei jeder Formular-Einsendung gesetzt',
      type: 'array',
      group: 'empfaenger',
      of: [{ type: 'string' }],
    }),

    // ── Vorlagen ──────────────────────────────────────────────
    defineField({
      name: 'notificationSubject',
      title: 'Betreff (Benachrichtigung)',
      description: 'Betreff der Benachrichtigungs-E-Mail. {{formName}} wird durch den Formularnamen ersetzt.',
      type: 'string',
      group: 'vorlagen',
      initialValue: 'Neue Anfrage: {{formName}}',
    }),
    defineField({
      name: 'autoresponderEnabled',
      title: 'Automatische Bestätigung aktivieren',
      description: 'Sendet dem Absender automatisch eine Bestätigungs-E-Mail',
      type: 'boolean',
      group: 'vorlagen',
      initialValue: true,
    }),
    defineField({
      name: 'autoresponderSubject',
      title: 'Betreff (Bestätigung)',
      type: 'string',
      group: 'vorlagen',
      initialValue: 'Vielen Dank für Ihre Anfrage – ASV Pest Control',
      hidden: ({ document }) => !document?.autoresponderEnabled,
    }),
    defineField({
      name: 'autoresponderMessage',
      title: 'Bestätigungstext',
      description: 'Nachricht an den Absender. {{Name}} wird durch den eingegebenen Namen ersetzt (sofern das Feld vorhanden ist).',
      type: 'text',
      rows: 6,
      group: 'vorlagen',
      initialValue: `Sehr geehrte/r {{Name}},

vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.

Mit freundlichen Grüßen
Ihr ASV Pest Control Team

Tel: +49 6196 – 52 30 10
E-Mail: info@a-asv.de`,
      hidden: ({ document }) => !document?.autoresponderEnabled,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'E-Mail Einstellungen' }
    },
  },
})
