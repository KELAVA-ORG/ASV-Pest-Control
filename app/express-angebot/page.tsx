import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery } from '@/sanity/lib/queries'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import ExpressAngebotForm from './ExpressAngebotForm'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Express-Angebot | ASV Pest Control GmbH',
  description: 'Kostenloses Express-Angebot anfordern – unverbindlich, schnell und transparent. Wir melden uns innerhalb von 24 Stunden.',
}

const expressFormQuery = `*[_type == "form" && _id == "form-express-angebot"][0] {
  _id,
  name,
  fields[] {
    label,
    fieldName,
    fieldType,
    required,
    placeholder,
    defaultValue,
    options,
    halfWidth,
    validation { minLength, maxLength, pattern, patternMessage },
    acceptedFileTypes,
    maxFileSize
  },
  emailTo,
  emailCc,
  emailBcc,
  emailSubject,
  emailReplyToField,
  autoresponderEnabled,
  autoresponderEmailField,
  autoresponderSubject,
  autoresponderMessage,
  afterSubmitAction,
  successMessage,
  redirectType,
  redirectPage-> { slug { current } },
  redirectUrl,
  trackingEnabled,
  ga4EventName,
  ga4EventParams[] { key, value },
  gadsConversionId,
  gadsConversionLabel,
  gadsConversionValue,
  gadsCurrency,
  metaPixelEvent,
  metaPixelCustomEvent,
  captureUtmParams,
  honeypotEnabled,
  rateLimitPerMinute,
  submitButtonText,
  submitButtonBgColor,
  submitButtonTextColor,
  privacyNote,
  cssClass
}`

export default async function ExpressAngebotPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [navigation, footer, form] = await Promise.all([
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
    client.fetch(expressFormQuery),
  ]) as [any, any, any]

  return (
    <PageLayout navigation={navigation} footer={footer}>
      <AsvHero
        title="Express-Angebot"
        subtitle="Fordern Sie jetzt Ihr kostenloses Angebot an – wir melden uns innerhalb von 24 Stunden."
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Express-Angebot' },
        ]}
      />
      <ExpressAngebotForm form={form} />
    </PageLayout>
  )
}
