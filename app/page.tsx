import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery, homePageQuery } from '@/sanity/lib/queries'
import type { Metadata } from 'next'
import PageLayout from './components/PageLayout'
import AsvHomePage from './components/asv/AsvHomePage'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'ASV Pest Control GmbH – Professionelle Schädlingsbekämpfung',
  description:
    'ASV Pest Control GmbH – Ihr zuverlässiger Partner für professionelle Schädlingsbekämpfung. Über 30 Jahre Erfahrung, 24h Notdienst. Jetzt kostenloses Express-Angebot anfordern.',
}

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [navigation, footer, settings, homePage] = await Promise.all([
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
    client.fetch(globalSettingsQuery),
    client.fetch(homePageQuery),
  ]) as [any, any, any, any]

  return (
    <PageLayout navigation={navigation} footer={footer}>
      <AsvHomePage settings={settings} homePage={homePage} />
    </PageLayout>
  )
}
