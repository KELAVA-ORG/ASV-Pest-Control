import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'form',
  title: 'Formular',
  type: 'document',
  preview: {
    select: { title: 'name', subtitle: 'internalNote' },
  },
  fieldsets: [
    { name: 'general', title: '📋 Allgemein', options: { collapsible: true, collapsed: false } },
    { name: 'fields', title: '📝 Felder', options: { collapsible: true, collapsed: false } },
    { name: 'email', title: '📧 E-Mail-Benachrichtigung', options: { collapsible: true, collapsed: false } },
    { name: 'autoresponder', title: '↩️ Auto-Responder', options: { collapsible: true, collapsed: true } },
    { name: 'afterSubmit', title: '✅ Nach dem Absenden', options: { collapsible: true, collapsed: false } },
    { name: 'tracking', title: '📊 Tracking & Conversion', options: { collapsible: true, collapsed: true } },
    { name: 'spam', title: '🛡️ Spam-Schutz', options: { collapsible: true, collapsed: true } },
    { name: 'design', title: '🎨 Design', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    /* ─── ALLGEMEIN ─── */
    defineField({
      name: 'name',
      title: 'Formular-Name',
      type: 'string',
      description: 'Interner Name zur Identifikation, z.B. "Kontaktformular", "Reservierung", "Newsletter"',
      validation: (Rule) => Rule.required(),
      fieldset: 'general',
    }),
    defineField({
      name: 'internalNote',
      title: 'Interne Notiz',
      type: 'string',
      description: 'Optional: Hinweis für das Team, z.B. "Wird auf der Kontaktseite verwendet"',
      fieldset: 'general',
    }),

    /* ─── FELDER ─── */
    defineField({
      name: 'fields',
      title: 'Formularfelder',
      type: 'array',
      fieldset: 'fields',
      of: [
        {
          type: 'object',
          name: 'formField',
          preview: {
            select: { title: 'label', subtitle: 'fieldType', required: 'required' },
            prepare({ title, subtitle, required }) {
              return {
                title: `${title}${required ? ' *' : ''}`,
                subtitle: subtitle?.toUpperCase(),
              }
            },
          },
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'fieldName',
              title: 'Feldname (technisch)',
              type: 'slug',
              description: 'Wird automatisch aus dem Label generiert. Für Hidden Fields und Tracking wichtig.',
              options: { source: 'label' },
            }),
            defineField({
              name: 'fieldType',
              title: 'Feldtyp',
              type: 'string',
              options: {
                list: [
                  { title: 'Text (einzeilig)', value: 'text' },
                  { title: 'E-Mail', value: 'email' },
                  { title: 'Telefon', value: 'tel' },
                  { title: 'Nummer', value: 'number' },
                  { title: 'Textarea (mehrzeilig)', value: 'textarea' },
                  { title: 'Dropdown (Auswahl)', value: 'select' },
                  { title: 'Checkboxen (Mehrfachauswahl)', value: 'checkbox' },
                  { title: 'Radio-Buttons (Einzelauswahl)', value: 'radio' },
                  { title: 'Datum', value: 'date' },
                  { title: 'Uhrzeit', value: 'time' },
                  { title: 'Datei-Upload', value: 'file' },
                  { title: 'Verstecktes Feld', value: 'hidden' },
                ],
              },
              initialValue: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'required',
              title: 'Pflichtfeld',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'placeholder',
              title: 'Platzhalter',
              type: 'string',
            }),
            defineField({
              name: 'defaultValue',
              title: 'Standardwert',
              type: 'string',
              description: 'Für Hidden Fields: z.B. "{{utm_source}}" für automatische UTM-Erfassung',
            }),
            defineField({
              name: 'options',
              title: 'Optionen',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Für Dropdown, Checkboxen und Radio-Buttons',
              hidden: ({ parent }) => !['select', 'checkbox', 'radio'].includes(parent?.fieldType || ''),
            }),
            defineField({
              name: 'halfWidth',
              title: 'Halbe Breite',
              type: 'boolean',
              description: 'Feld nimmt nur die halbe Breite ein (für zweispaltige Layouts)',
              initialValue: false,
            }),
            defineField({
              name: 'validation',
              title: 'Validierung',
              type: 'object',
              fields: [
                defineField({
                  name: 'minLength',
                  title: 'Min. Zeichen',
                  type: 'number',
                }),
                defineField({
                  name: 'maxLength',
                  title: 'Max. Zeichen',
                  type: 'number',
                }),
                defineField({
                  name: 'pattern',
                  title: 'Regex-Pattern',
                  type: 'string',
                  description: 'z.B. "^[0-9]{5}$" für PLZ',
                }),
                defineField({
                  name: 'patternMessage',
                  title: 'Fehlermeldung bei Pattern',
                  type: 'string',
                  description: 'z.B. "Bitte geben Sie eine gültige PLZ ein"',
                }),
              ],
            }),
            defineField({
              name: 'acceptedFileTypes',
              title: 'Erlaubte Dateitypen',
              type: 'string',
              description: 'z.B. ".pdf,.jpg,.png" — nur für Datei-Upload',
              hidden: ({ parent }) => parent?.fieldType !== 'file',
            }),
            defineField({
              name: 'maxFileSize',
              title: 'Max. Dateigröße (MB)',
              type: 'number',
              initialValue: 5,
              hidden: ({ parent }) => parent?.fieldType !== 'file',
            }),
          ],
        },
      ],
    }),

    /* ─── E-MAIL ─── */
    defineField({
      name: 'emailTo',
      title: 'Empfänger',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E-Mail-Adressen, an die die Anfrage gesendet wird',
      validation: (Rule) => Rule.required().min(1),
      fieldset: 'email',
    }),
    defineField({
      name: 'emailCc',
      title: 'CC',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'email',
    }),
    defineField({
      name: 'emailBcc',
      title: 'BCC',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'email',
    }),
    defineField({
      name: 'emailSubject',
      title: 'Betreffzeile',
      type: 'string',
      description: 'Platzhalter möglich: {{Name}}, {{Email}} etc. werden durch Feldwerte ersetzt',
      initialValue: 'Neue Anfrage: {{_formName}}',
      fieldset: 'email',
    }),
    defineField({
      name: 'emailReplyToField',
      title: 'Antwort-an Feld',
      type: 'string',
      description: 'Feldname (Label) des E-Mail-Felds, das als Reply-To verwendet wird',
      fieldset: 'email',
    }),

    /* ─── AUTO-RESPONDER ─── */
    defineField({
      name: 'autoresponderEnabled',
      title: 'Auto-Responder aktivieren',
      type: 'boolean',
      description: 'Sendet automatisch eine Bestätigungs-E-Mail an den Absender',
      initialValue: false,
      fieldset: 'autoresponder',
    }),
    defineField({
      name: 'autoresponderEmailField',
      title: 'E-Mail-Feld des Absenders',
      type: 'string',
      description: 'Feldname (Label) des E-Mail-Felds, an das die Bestätigung gesendet wird',
      fieldset: 'autoresponder',
    }),
    defineField({
      name: 'autoresponderSubject',
      title: 'Betreff der Bestätigung',
      type: 'string',
      initialValue: 'Vielen Dank für Ihre Anfrage',
      fieldset: 'autoresponder',
    }),
    defineField({
      name: 'autoresponderMessage',
      title: 'Nachricht',
      type: 'text',
      rows: 6,
      description: 'Text der Bestätigungs-E-Mail. Platzhalter wie {{Name}} möglich.',
      initialValue: 'Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.',
      fieldset: 'autoresponder',
    }),

    /* ─── NACH DEM ABSENDEN ─── */
    defineField({
      name: 'afterSubmitAction',
      title: 'Aktion nach dem Absenden',
      type: 'string',
      options: {
        list: [
          { title: 'Erfolgsmeldung anzeigen', value: 'message' },
          { title: 'Auf Danke-Seite weiterleiten', value: 'redirect' },
        ],
        layout: 'radio',
      },
      initialValue: 'message',
      fieldset: 'afterSubmit',
    }),
    defineField({
      name: 'successMessage',
      title: 'Erfolgsmeldung',
      type: 'text',
      rows: 3,
      initialValue: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.',
      hidden: ({ parent }) => parent?.afterSubmitAction !== 'message',
      fieldset: 'afterSubmit',
    }),
    defineField({
      name: 'redirectType',
      title: 'Weiterleitungs-Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Interne Seite', value: 'internal' },
          { title: 'Externe URL', value: 'external' },
        ],
      },
      initialValue: 'internal',
      hidden: ({ parent }) => parent?.afterSubmitAction !== 'redirect',
      fieldset: 'afterSubmit',
    }),
    defineField({
      name: 'redirectPage',
      title: 'Danke-Seite (intern)',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.afterSubmitAction !== 'redirect' || parent?.redirectType !== 'internal',
      fieldset: 'afterSubmit',
    }),
    defineField({
      name: 'redirectUrl',
      title: 'Danke-Seite URL (extern)',
      type: 'url',
      hidden: ({ parent }) => parent?.afterSubmitAction !== 'redirect' || parent?.redirectType !== 'external',
      fieldset: 'afterSubmit',
    }),

    /* ─── TRACKING & CONVERSION ─── */
    defineField({
      name: 'trackingEnabled',
      title: 'Tracking aktiviert',
      type: 'boolean',
      initialValue: false,
      fieldset: 'tracking',
    }),
    defineField({
      name: 'ga4EventName',
      title: 'GA4 Event-Name',
      type: 'string',
      description: 'z.B. "generate_lead", "form_submit", "contact_request"',
      initialValue: 'generate_lead',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'ga4EventParams',
      title: 'GA4 Event-Parameter',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'key', title: 'Parameter', type: 'string' }),
            defineField({ name: 'value', title: 'Wert', type: 'string' }),
          ],
          preview: {
            select: { title: 'key', subtitle: 'value' },
          },
        },
      ],
      description: 'Zusätzliche Parameter für das GA4 Event, z.B. form_name, form_id, campaign',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'gadsConversionId',
      title: 'Google Ads Conversion-ID',
      type: 'string',
      description: 'z.B. "AW-123456789"',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'gadsConversionLabel',
      title: 'Google Ads Conversion-Label',
      type: 'string',
      description: 'z.B. "abcDEF123"',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'gadsConversionValue',
      title: 'Conversion-Wert',
      type: 'number',
      description: 'Monetärer Wert eines Leads (z.B. 50 für 50€)',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'gadsCurrency',
      title: 'Währung',
      type: 'string',
      initialValue: 'EUR',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'metaPixelEvent',
      title: 'Meta/Facebook Pixel Event',
      type: 'string',
      options: {
        list: [
          { title: 'Kein Event', value: '' },
          { title: 'Lead', value: 'Lead' },
          { title: 'CompleteRegistration', value: 'CompleteRegistration' },
          { title: 'Contact', value: 'Contact' },
          { title: 'SubmitApplication', value: 'SubmitApplication' },
          { title: 'Schedule', value: 'Schedule' },
          { title: 'Custom Event', value: 'custom' },
        ],
      },
      fieldset: 'tracking',
    }),
    defineField({
      name: 'metaPixelCustomEvent',
      title: 'Custom Event-Name (Meta)',
      type: 'string',
      hidden: ({ parent }) => parent?.metaPixelEvent !== 'custom',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'captureUtmParams',
      title: 'UTM-Parameter automatisch erfassen',
      type: 'boolean',
      description: 'Speichert utm_source, utm_medium, utm_campaign, utm_term, utm_content automatisch mit',
      initialValue: true,
      fieldset: 'tracking',
    }),

    /* ─── SPAM-SCHUTZ ─── */
    defineField({
      name: 'honeypotEnabled',
      title: 'Honeypot aktivieren',
      type: 'boolean',
      description: 'Unsichtbares Feld das Bots erkennt (empfohlen)',
      initialValue: true,
      fieldset: 'spam',
    }),
    defineField({
      name: 'rateLimitPerMinute',
      title: 'Max. Einreichungen pro Minute',
      type: 'number',
      description: 'Schutz vor Spam-Floods. 0 = kein Limit.',
      initialValue: 5,
      fieldset: 'spam',
    }),
    defineField({
      name: 'recaptchaEnabled',
      title: 'Google reCAPTCHA v3',
      type: 'boolean',
      description: 'Aktiviert unsichtbares reCAPTCHA. Benötigt RECAPTCHA_SECRET_KEY und NEXT_PUBLIC_RECAPTCHA_SITE_KEY.',
      initialValue: false,
      fieldset: 'spam',
    }),

    /* ─── DESIGN ─── */
    defineField({
      name: 'submitButtonText',
      title: 'Button-Text',
      type: 'string',
      initialValue: 'Absenden',
      fieldset: 'design',
    }),
    defineField({
      name: 'submitButtonBgColor',
      title: 'Button-Hintergrundfarbe',
      type: 'color',
      options: { disableAlpha: true },
      fieldset: 'design',
    }),
    defineField({
      name: 'submitButtonTextColor',
      title: 'Button-Textfarbe',
      type: 'color',
      options: { disableAlpha: true },
      fieldset: 'design',
    }),
    defineField({
      name: 'privacyNote',
      title: 'Datenschutz-Hinweis',
      type: 'string',
      description: 'Wird unter dem Formular angezeigt',
      initialValue: 'Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.',
      fieldset: 'design',
    }),
    defineField({
      name: 'cssClass',
      title: 'CSS-Klasse',
      type: 'string',
      description: 'Eigene CSS-Klasse für individuelles Styling',
      fieldset: 'design',
    }),
  ],
})
