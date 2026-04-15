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

export default async function ExpressAngebotPage() {
  const [navigation, footer] = await Promise.all([
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
  ])

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
      <ExpressAngebotForm />
    </PageLayout>
  )
}
