import { client } from '@/sanity/lib/client'
import {
  schaedlingsseiteQuery,
  schaedlingsseiteAllSlugsQuery,
  navigationQuery,
  footerQuery,
  globalSettingsQuery,
} from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvTrustBar from '@/app/components/asv/AsvTrustBar'
import AsvSigns from '@/app/components/asv/AsvSigns'
import AsvRisks from '@/app/components/asv/AsvRisks'
import AsvTreatment from '@/app/components/asv/AsvTreatment'
import AsvProcess from '@/app/components/asv/AsvProcess'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'
import AsvFaq from '@/app/components/asv/AsvFaq'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(schaedlingsseiteAllSlugsQuery)
  return (slugs || []).map((s: { slug: { current: string } }) => ({ slug: s.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await client.fetch(schaedlingsseiteQuery, { slug })
  if (!page) return {}
  return {
    title: page.seoTitle || `${page.title} | ASV Pest Control GmbH`,
    description: page.seoDescription || '',
  }
}

export default async function SchaedlingsPage({ params }: Props) {
  const { slug } = await params

  const [page, navigation, footer, settings] = await Promise.all([
    client.fetch(schaedlingsseiteQuery, { slug }),
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
    client.fetch(globalSettingsQuery),
  ])

  if (!page) notFound()

  const phone = settings?.phoneMainFormatted || settings?.phoneMain
  const phoneTel = settings?.phoneMainTel

  return (
    <PageLayout navigation={navigation} footer={footer}>
      {/* Hero */}
      <AsvHero
        title={page.title}
        subtitle={page.heroSubtitle}
        heroImageUrl={page.heroImage?.asset?.url}
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Schädlinge', href: '/schaedlinge' },
          { label: page.title },
        ]}
      />

      {/* Trust Bar */}
      <AsvTrustBar />

      {/* Einleitung */}
      {(page.introTitle || page.introText) && (
        <section className="section">
          <div className="container container--narrow" data-animate="fade-up">
            {page.introTitle && <h2>{page.introTitle}</h2>}
            {page.introText && page.introText.length > 0 && (
              <PortableText value={page.introText} />
            )}
          </div>
        </section>
      )}

      {/* Typische Anzeichen */}
      <AsvSigns title={page.signsTitle} signs={page.signs || []} />

      {/* Gefahren & Risiken */}
      <AsvRisks title={page.risksTitle} risks={page.risks || []} />

      {/* Professionelle Behandlung */}
      <AsvTreatment
        title={page.treatmentTitle}
        text={page.treatmentText}
        imageUrl={page.treatmentImage?.asset?.url}
        imageAlt={page.treatmentImage?.alt}
        checkList={page.treatmentCheckList}
      />

      {/* Unser Vorgehen */}
      <AsvProcess title={page.processTitle} steps={page.processSteps || []} />

      {/* CTA Banner */}
      <AsvCtaBanner
        title={page.ctaBannerTitle}
        text={page.ctaBannerText}
        phoneFormatted={phone}
        phoneTel={phoneTel}
      />

      {/* FAQ */}
      <AsvFaq title={page.faqTitle} faqs={page.faqs || []} />
    </PageLayout>
  )
}
