import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery, standortePageQuery } from '@/sanity/lib/queries'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Unsere Standorte | ASV Pest Control GmbH',
  description: '13 Standorte in der Region – immer ein Kammerjäger in Ihrer Nähe. 24h Notdienst, kostenlose Erstberatung.',
}

const DEFAULT_STANDORTE = [
  { name: 'Frankfurt am Main', address: 'Friesengasse 27, 60487 Frankfurt am Main', phone: '+49 69 – 95 86 21 83', phoneTel: '+496995862183' },
  { name: 'Bad Soden am Taunus', address: 'Königsteiner Str. 6, 65812 Bad Soden am Taunus', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010' },
  { name: 'Bad Homburg', address: 'Daimlerstr. 11, 61352 Bad Homburg', phone: '+49 6172 – 497 82 95', phoneTel: '+4961724978295' },
  { name: 'Offenbach am Main', address: 'Aliceplatz 11, 63065 Offenbach am Main', phone: '+49 69 – 95 86 22 30', phoneTel: '+496995862230' },
  { name: 'Fulda', address: 'Königstr. 84, 36037 Fulda', phone: '+49 661 – 972 091 67', phoneTel: '+4966197209167' },
  { name: 'Hanau', address: 'Römerstr. 1, 63450 Hanau', phone: '+49 6181 – 435 62 10', phoneTel: '+4961814356210' },
  { name: 'Koblenz', address: 'Friedrich-Mohr-Str. 14, 56070 Koblenz', phone: '+49 261 – 899 290 63', phoneTel: '+4926189929063' },
  { name: 'Limburg an der Lahn', address: 'Elzer Str. 9, 65556 Limburg an der Lahn', phone: '+49 6431 – 286 71 27', phoneTel: '+4964312867127' },
  { name: 'Bensheim', address: 'Rodensteinerstr. 13, 64625 Bensheim', phone: '+49 6251 – 861 85 51', phoneTel: '+4962518618551' },
  { name: 'Aschaffenburg', address: 'Ridinger Str. 1, 63739 Aschaffenburg', phone: '+49 6021 – 439 75 99', phoneTel: '+4960214397599' },
  { name: 'Karlsruhe', address: 'Stuttgarter Str. 41, 76137 Karlsruhe', phone: '+49 721 – 966 996 19', phoneTel: '+4972196699619' },
  { name: 'Mainz', address: 'Hans-Böckler-Str. 8, 55128 Mainz', phone: '+49 6131 – 919 54 22', phoneTel: '+4961319195422' },
  { name: 'Wiesbaden', address: 'Dotzheimer Str. 36, 65185 Wiesbaden', phone: '+49 611 – 946 985 43', phoneTel: '+4961194698543' },
]

export default async function StandortePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [navigation, footer, settings, page] = await Promise.all([
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
    client.fetch(globalSettingsQuery),
    client.fetch(standortePageQuery),
  ]) as [any, any, any, any]

  const phone = settings?.phoneMainFormatted || '+49 6196 – 52 30 10'
  const phoneTel = settings?.phoneMainTel || '+496196523010'

  const heroSubtitle = page?.heroSubtitle || '13 Standorte in der Region – immer ein Kammerjäger in Ihrer Nähe. 24h Notdienst, kostenlose Erstberatung.'
  const introText = page?.introText || 'Mit unseren Standorten in der gesamten Region Rhein-Main und darüber hinaus sind wir immer schnell bei Ihnen vor Ort. Klicken Sie auf einen Standort, um direkt Kontakt aufzunehmen oder mehr über das Einsatzgebiet zu erfahren.'
  const locations = page?.locations?.length ? page.locations : DEFAULT_STANDORTE
  const hotlineTitle = page?.hotlineTitle || 'Kein Standort in Ihrer Nähe?'
  const hotlineText = page?.hotlineText || 'Wir helfen trotzdem! Rufen Sie unsere zentrale Hotline an – wir vermitteln Ihnen den nächsten verfügbaren Techniker oder empfehlen Ihnen einen zertifizierten Partner in Ihrer Region.'
  const ctaTitle = page?.ctaTitle || 'Schädlinge in Ihrer Nähe? Wir helfen sofort.'
  const ctaText = page?.ctaText || 'Fordern Sie jetzt Ihr kostenloses Express-Angebot an.'

  return (
    <PageLayout navigation={navigation} footer={footer}>
      {/* Hero */}
      <AsvHero
        title="Unsere Standorte"
        subtitle={heroSubtitle}
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Standorte' },
        ]}
      />

      {/* Einleitung */}
      <section className="section">
        <div className="container container--narrow" data-animate="fade-up">
          <h2>Finden Sie Ihren lokalen Kammerjäger</h2>
          <p>{introText}</p>
        </div>
      </section>

      {/* Standorte Grid */}
      <section className="section section--gray">
        <div className="container">
          <div className="grid grid--3" data-animate="fade-up">
            {locations.map((s: { name: string; address: string; phone: string; phoneTel: string }, i: number) => (
              <div key={i} className="service-card">
                <div className="service-card__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3>{s.name}</h3>
                <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
                  {s.address}
                </p>
                <a href={`tel:${s.phoneTel}`} style={{ color: 'var(--brand-red)', fontWeight: 600, fontSize: '0.9rem' }}>
                  {s.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kein Standort */}
      <section className="section">
        <div className="container container--narrow" data-animate="fade-up">
          <div className="section__header">
            <h2>{hotlineTitle}</h2>
            <p className="section__desc">{hotlineText}</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href={`tel:${phoneTel}`} className="btn btn--primary btn--lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AsvCtaBanner
        title={ctaTitle}
        text={ctaText}
        phoneFormatted={phone}
        phoneTel={phoneTel}
      />
    </PageLayout>
  )
}
