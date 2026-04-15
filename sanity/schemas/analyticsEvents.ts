import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'analyticsEvents',
  title: 'Analytics-Events',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Analytics-Events' }
    },
  },
  fieldsets: [
    { name: 'clicks', title: '🖱️ Klick-Tracking', options: { collapsible: true, collapsed: false } },
    { name: 'scroll', title: '📜 Scroll-Tracking', options: { collapsible: true, collapsed: true } },
    { name: 'engagement', title: '⏱️ Engagement-Tracking', options: { collapsible: true, collapsed: true } },
    { name: 'custom', title: '🛠️ Eigene Events', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    /* ═══ KLICK-TRACKING ═══ */
    defineField({
      name: 'trackCtaClicks',
      title: 'CTA-Button-Klicks tracken',
      type: 'boolean',
      description: 'Sendet ein Event wenn ein CTA-Button (z.B. "Tisch reservieren") geklickt wird.',
      initialValue: true,
      fieldset: 'clicks',
    }),
    defineField({
      name: 'ctaEventName',
      title: 'GA4 Event-Name für CTA-Klicks',
      type: 'string',
      description: 'Standard: cta_click',
      initialValue: 'cta_click',
      fieldset: 'clicks',
      hidden: ({ parent }) => !parent?.trackCtaClicks,
    }),
    defineField({
      name: 'trackPhoneClicks',
      title: 'Telefon-Klicks tracken',
      type: 'boolean',
      description: 'Sendet ein Event wenn eine Telefonnummer angeklickt wird (tel:-Links).',
      initialValue: true,
      fieldset: 'clicks',
    }),
    defineField({
      name: 'phoneEventName',
      title: 'GA4 Event-Name für Telefon-Klicks',
      type: 'string',
      initialValue: 'phone_click',
      fieldset: 'clicks',
      hidden: ({ parent }) => !parent?.trackPhoneClicks,
    }),
    defineField({
      name: 'trackEmailClicks',
      title: 'E-Mail-Klicks tracken',
      type: 'boolean',
      description: 'Sendet ein Event wenn eine E-Mail-Adresse angeklickt wird (mailto:-Links).',
      initialValue: true,
      fieldset: 'clicks',
    }),
    defineField({
      name: 'emailEventName',
      title: 'GA4 Event-Name für E-Mail-Klicks',
      type: 'string',
      initialValue: 'email_click',
      fieldset: 'clicks',
      hidden: ({ parent }) => !parent?.trackEmailClicks,
    }),
    defineField({
      name: 'trackExternalLinks',
      title: 'Externe Links tracken',
      type: 'boolean',
      description: 'Sendet ein Event wenn ein externer Link (andere Domain) geklickt wird.',
      initialValue: false,
      fieldset: 'clicks',
    }),
    defineField({
      name: 'externalLinkEventName',
      title: 'GA4 Event-Name für externe Links',
      type: 'string',
      initialValue: 'outbound_click',
      fieldset: 'clicks',
      hidden: ({ parent }) => !parent?.trackExternalLinks,
    }),
    defineField({
      name: 'trackMenuViews',
      title: 'Speisekarten-Ansichten tracken',
      type: 'boolean',
      description: 'Sendet ein Event wenn der Speisekarten-Bereich angezeigt wird.',
      initialValue: false,
      fieldset: 'clicks',
    }),

    /* ═══ SCROLL-TRACKING ═══ */
    defineField({
      name: 'trackScrollDepth',
      title: 'Scroll-Tiefe tracken',
      type: 'boolean',
      description: 'Sendet Events bei 25%, 50%, 75% und 100% Scroll-Tiefe.',
      initialValue: false,
      fieldset: 'scroll',
    }),
    defineField({
      name: 'scrollThresholds',
      title: 'Scroll-Schwellwerte (%)',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'Standard: 25, 50, 75, 100',
      fieldset: 'scroll',
      hidden: ({ parent }) => !parent?.trackScrollDepth,
    }),

    /* ═══ ENGAGEMENT-TRACKING ═══ */
    defineField({
      name: 'trackTimeOnPage',
      title: 'Verweildauer tracken',
      type: 'boolean',
      description: 'Sendet Events nach bestimmten Sekunden auf der Seite (z.B. 30s, 60s, 180s).',
      initialValue: false,
      fieldset: 'engagement',
    }),
    defineField({
      name: 'timeThresholds',
      title: 'Zeitschwellen (Sekunden)',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'Standard: 30, 60, 180',
      fieldset: 'engagement',
      hidden: ({ parent }) => !parent?.trackTimeOnPage,
    }),
    defineField({
      name: 'trackFormSubmissions',
      title: 'Formular-Absendungen tracken',
      type: 'boolean',
      description: 'Sendet ein GA4-Event bei jeder Formular-Absendung (zusätzlich zu den formular-spezifischen Events).',
      initialValue: true,
      fieldset: 'engagement',
    }),
    defineField({
      name: 'formEventName',
      title: 'GA4 Event-Name für Formular-Absendungen',
      type: 'string',
      initialValue: 'form_submit',
      fieldset: 'engagement',
      hidden: ({ parent }) => !parent?.trackFormSubmissions,
    }),

    /* ═══ EIGENE EVENTS ═══ */
    defineField({
      name: 'customEvents',
      title: 'Eigene Events',
      type: 'array',
      description: 'Definiere eigene Events die bei Klick auf bestimmte CSS-Selektoren ausgelöst werden.',
      fieldset: 'custom',
      of: [
        {
          type: 'object',
          name: 'customEvent',
          title: 'Event',
          preview: {
            select: { title: 'eventName', subtitle: 'selector' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: title || 'Event', subtitle: subtitle || 'Kein Selektor' }
            },
          },
          fields: [
            defineField({
              name: 'eventName',
              title: 'Event-Name',
              type: 'string',
              description: 'GA4 Event-Name, z.B. reservation_click',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'selector',
              title: 'CSS-Selektor',
              type: 'string',
              description: 'Element das getrackt wird, z.B. .hero__cta oder [data-track="reservation"]',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'trigger',
              title: 'Trigger',
              type: 'string',
              options: {
                list: [
                  { title: 'Klick', value: 'click' },
                  { title: 'Sichtbar (im Viewport)', value: 'visible' },
                ],
              },
              initialValue: 'click',
            }),
            defineField({
              name: 'params',
              title: 'Zusätzliche Parameter',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'key', title: 'Key', type: 'string' }),
                    defineField({ name: 'value', title: 'Value', type: 'string' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
