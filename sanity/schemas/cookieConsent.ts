import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cookieConsent',
  title: 'Cookie-Banner & Tracking',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Cookie-Banner & Tracking' }
    },
  },
  fieldsets: [
    { name: 'mode', title: '⚙️ Consent-Modus', options: { collapsible: true, collapsed: false } },
    { name: 'tracking', title: '📊 Analytics & Tracking', options: { collapsible: true, collapsed: false } },
    { name: 'customCode', title: '💻 Custom Code', options: { collapsible: true, collapsed: true } },
    { name: 'content', title: '📝 Banner-Inhalt', options: { collapsible: true, collapsed: false } },
    { name: 'buttons', title: '🔘 Buttons', options: { collapsible: true, collapsed: false } },
    { name: 'design', title: '🎨 Design', options: { collapsible: true, collapsed: true } },
    { name: 'privacy', title: '🔗 Datenschutz-Link', options: { collapsible: true, collapsed: true } },
    { name: 'revoke', title: '🔄 Widerruf / Opt-Out', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    /* ═══ CONSENT-MODUS ═══ */
    defineField({
      name: 'consentMode',
      title: 'Consent-Lösung',
      type: 'string',
      description: 'Wähle die Consent-Lösung. Bei Usercentrics wird der eigene Banner deaktiviert und stattdessen Usercentrics geladen.',
      options: {
        list: [
          { title: 'Eigener Cookie-Banner (eingebaut)', value: 'built-in' },
          { title: 'Usercentrics', value: 'usercentrics' },
          { title: 'Cookiebot', value: 'cookiebot' },
          { title: 'Anderer externer Anbieter (Custom Script)', value: 'custom' },
          { title: 'Deaktiviert (kein Consent-Banner)', value: 'disabled' },
        ],
      },
      initialValue: 'built-in',
      fieldset: 'mode',
    }),
    defineField({
      name: 'usercentricsId',
      title: 'Usercentrics Settings-ID',
      type: 'string',
      description: 'Die Settings-ID aus deinem Usercentrics-Dashboard, z.B. "XXXXXXXX"',
      hidden: ({ parent }) => parent?.consentMode !== 'usercentrics',
      fieldset: 'mode',
    }),
    defineField({
      name: 'cookiebotId',
      title: 'Cookiebot Domain Group ID',
      type: 'string',
      description: 'Die ID aus deinem Cookiebot-Dashboard',
      hidden: ({ parent }) => parent?.consentMode !== 'cookiebot',
      fieldset: 'mode',
    }),
    defineField({
      name: 'customConsentScript',
      title: 'Custom Consent Script',
      type: 'text',
      rows: 6,
      description: 'JavaScript-Code des externen Consent-Anbieters (ohne <script>-Tags). Wird im <head> geladen.',
      hidden: ({ parent }) => parent?.consentMode !== 'custom',
      fieldset: 'mode',
    }),

    /* ═══ ANALYTICS & TRACKING ═══ */
    defineField({
      name: 'gaId',
      title: 'Google Analytics 4 — Mess-ID',
      type: 'string',
      description: 'z.B. G-XXXXXXXXXX — Wird erst nach Cookie-Consent geladen.',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'gtagManagerId',
      title: 'Google Tag Manager — Container-ID',
      type: 'string',
      description: 'z.B. GTM-XXXXXXX — Wird erst nach Cookie-Consent geladen. Bei Usercentrics/Cookiebot empfohlen: Tracking über GTM steuern.',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'fbPixelId',
      title: 'Meta/Facebook Pixel-ID',
      type: 'string',
      description: 'z.B. 123456789 — Wird erst nach Marketing-Consent geladen.',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'gadsConversionId',
      title: 'Google Ads Conversion-ID',
      type: 'string',
      description: 'z.B. AW-XXXXXXXXX',
      fieldset: 'tracking',
    }),

    /* ═══ CUSTOM CODE ═══ */
    defineField({
      name: 'customHeadCode',
      title: 'Custom Code (Head) — Global',
      type: 'text',
      rows: 5,
      description: 'Wird auf jeder Seite im <head> eingefügt (ohne <script>-Tags). Lädt IMMER, unabhängig von Consent.',
      fieldset: 'customCode',
    }),
    defineField({
      name: 'customBodyCode',
      title: 'Custom Code (Body-Ende) — Global',
      type: 'text',
      rows: 5,
      description: 'Wird auf jeder Seite am Ende des <body> eingefügt. Lädt IMMER, unabhängig von Consent.',
      fieldset: 'customCode',
    }),
    defineField({
      name: 'consentRequiredHeadCode',
      title: 'Custom Code (Head) — Nur nach Consent',
      type: 'text',
      rows: 5,
      description: 'JavaScript im <head>, wird NUR nach Statistik-Consent geladen (ohne <script>-Tags).',
      fieldset: 'customCode',
    }),

    /* ═══ BANNER-INHALT (nur für built-in) ═══ */
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
      initialValue: 'Wir verwenden Cookies',
      fieldset: 'content',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in',
    }),
    defineField({
      name: 'text',
      title: 'Beschreibung',
      type: 'text',
      rows: 3,
      initialValue: 'Wir nutzen Cookies und ähnliche Technologien, um die Website zu optimieren. Einige sind notwendig, andere helfen uns die Nutzung zu analysieren und das Erlebnis zu verbessern.',
      fieldset: 'content',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in',
    }),

    /* ═══ BUTTONS ═══ */
    defineField({
      name: 'acceptAllText',
      title: 'Button: Alle akzeptieren',
      type: 'string',
      initialValue: 'Alle akzeptieren',
      fieldset: 'buttons',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in',
    }),
    defineField({
      name: 'acceptEssentialText',
      title: 'Button: Nur notwendige',
      type: 'string',
      initialValue: 'Nur notwendige',
      fieldset: 'buttons',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in',
    }),

    /* ═══ DATENSCHUTZ-LINK ═══ */
    defineField({
      name: 'privacyLinkText',
      title: 'Datenschutz-Link Text',
      type: 'string',
      initialValue: 'Datenschutzerklärung',
      fieldset: 'privacy',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in',
    }),
    defineField({
      name: 'privacyLinkUrl',
      title: 'Datenschutz-Link URL',
      type: 'string',
      initialValue: '/datenschutz',
      fieldset: 'privacy',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in',
    }),

    /* ═══ DESIGN ═══ */
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          { title: 'Unten (volle Breite)', value: 'bottom' },
          { title: 'Unten Links', value: 'bottom-left' },
          { title: 'Unten Rechts', value: 'bottom-right' },
          { title: 'Zentriert (Modal)', value: 'center' },
        ],
      },
      initialValue: 'bottom',
      fieldset: 'design',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in',
    }),
    defineField({
      name: 'bgColor',
      title: 'Hintergrundfarbe',
      type: 'color',
      options: { disableAlpha: true },
      fieldset: 'design',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in',
    }),
    defineField({
      name: 'textColor',
      title: 'Textfarbe',
      type: 'color',
      options: { disableAlpha: true },
      fieldset: 'design',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in',
    }),

    /* ═══ WIDERRUF / OPT-OUT ═══ */
    defineField({
      name: 'revokeEnabled',
      title: 'Widerruf-Button anzeigen',
      type: 'boolean',
      description: 'Zeigt einen kleinen Button, über den der User seine Einstellungen ändern und den Banner erneut öffnen kann.',
      initialValue: true,
      fieldset: 'revoke',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in',
    }),
    defineField({
      name: 'revokeText',
      title: 'Widerruf-Button Text',
      type: 'string',
      initialValue: 'Cookie-Einstellungen',
      fieldset: 'revoke',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in' || !parent?.revokeEnabled,
    }),
    defineField({
      name: 'revokePosition',
      title: 'Widerruf-Button Position',
      type: 'string',
      options: {
        list: [
          { title: 'Unten Links', value: 'bottom-left' },
          { title: 'Unten Rechts', value: 'bottom-right' },
        ],
      },
      initialValue: 'bottom-left',
      fieldset: 'revoke',
      hidden: ({ parent }) => parent?.consentMode !== 'built-in' || !parent?.revokeEnabled,
    }),
  ],
})
