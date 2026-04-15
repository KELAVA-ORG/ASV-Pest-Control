import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery } from '@/sanity/lib/queries'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'
import Link from 'next/link'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Unsere Standorte | ASV Pest Control GmbH',
  description: '13 Standorte in der Region – immer ein Kammerjäger in Ihrer Nähe. 24h Notdienst, kostenlose Erstberatung.',
}

const STANDORTE = [
  { city: 'Frankfurt am Main', street: 'Friesengasse 27', zip: '60487', phone: '+49 69 – 95 86 21 83', phoneTel: '+496995862183', slug: 'frankfurt' },
  { city: 'Bad Soden am Taunus', street: 'Königsteiner Str. 6', zip: '65812', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', slug: 'bad-soden-am-taunus' },
  { city: 'Bad Homburg', street: 'Daimlerstr. 11', zip: '61352', phone: '+49 6172 – 497 82 95', phoneTel: '+49617249782 95', slug: 'bad-homburg' },
  { city: 'Offenbach am Main', street: 'Aliceplatz 11', zip: '63065', phone: '+49 69 – 95 86 22 30', phoneTel: '+496995862230', slug: 'offenbach' },
  { city: 'Fulda', street: 'Königstr. 84', zip: '36037', phone: '+49 661 – 972 091 67', phoneTel: '+4966197209167', slug: 'fulda' },
  { city: 'Hanau', street: 'Römerstr. 1', zip: '63450', phone: '+49 6181 – 435 62 10', phoneTel: '+49618143562 10', slug: 'hanau' },
  { city: 'Koblenz', street: 'Friedrich-Mohr-Str. 14', zip: '56070', phone: '+49 261 – 899 290 63', phoneTel: '+4926189929063', slug: 'koblenz' },
  { city: 'Limburg an der Lahn', street: 'Elzer Str. 9', zip: '65556', phone: '+49 6431 – 286 71 27', phoneTel: '+49643128671 27', slug: 'limburg' },
  { city: 'Bensheim', street: 'Rodensteinerstr. 13', zip: '64625', phone: '+49 6251 – 861 85 51', phoneTel: '+49625186185 51', slug: 'bensheim' },
  { city: 'Aschaffenburg', street: 'Ridinger Str. 1', zip: '63739', phone: '+49 6021 – 439 75 99', phoneTel: '+49602143975 99', slug: 'aschaffenburg' },
  { city: 'Karlsruhe', street: 'Stuttgarter Str. 41', zip: '76137', phone: '+49 721 – 966 996 19', phoneTel: '+4972196699619', slug: 'karlsruhe' },
  { city: 'Mainz', street: 'Hans-Böckler-Str. 8', zip: '55128', phone: '+49 6131 – 919 54 22', phoneTel: '+49613191954 22', slug: 'mainz' },
  { city: 'Wiesbaden', street: 'Dotzheimer Str. 36', zip: '65185', phone: '+49 611 – 946 985 43', phoneTel: '+4961194698543', slug: 'wiesbaden' },
]

export default async function StandortePage() {
  const [navigation, footer, settings] = await Promise.all([
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
    client.fetch(globalSettingsQuery),
  ])

  const phone = settings?.phoneMainFormatted || '+49 6196 – 52 30 10'
  const phoneTel = settings?.phoneMainTel || '+496196523010'

  return (
    <PageLayout navigation={navigation} footer={footer}>
      {/* Hero */}
      <AsvHero
        title="Unsere Standorte"
        subtitle="13 Standorte in der Region – immer ein Kammerjäger in Ihrer Nähe. 24h Notdienst, kostenlose Erstberatung."
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Standorte' },
        ]}
      />

      {/* Einleitung */}
      <section className="section">
        <div className="container container--narrow" data-animate="fade-up">
          <h2>Finden Sie Ihren lokalen Kammerjäger</h2>
          <p>Mit unseren Standorten in der gesamten Region Rhein-Main und darüber hinaus sind wir immer schnell bei Ihnen vor Ort. Klicken Sie auf einen Standort, um direkt Kontakt aufzunehmen oder mehr über das Einsatzgebiet zu erfahren.</p>
        </div>
      </section>

      {/* Standorte Grid */}
      <section className="section section--gray">
        <div className="container">
          <div className="grid grid--3" data-animate="fade-up">
            {STANDORTE.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-card__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3>{s.city}</h3>
                <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
                  {s.street}<br />{s.zip} {s.city}
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
            <h2>Kein Standort in Ihrer Nähe?</h2>
            <p className="section__desc">Wir helfen trotzdem! Rufen Sie unsere zentrale Hotline an – wir vermitteln Ihnen den nächsten verfügbaren Techniker oder empfehlen Ihnen einen zertifizierten Partner in Ihrer Region.</p>
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
        title="Schädlinge in Ihrer Nähe? Wir helfen sofort."
        text="Fordern Sie jetzt Ihr kostenloses Express-Angebot an."
        phoneFormatted={phone}
        phoneTel={phoneTel}
      />
    </PageLayout>
  )
}
