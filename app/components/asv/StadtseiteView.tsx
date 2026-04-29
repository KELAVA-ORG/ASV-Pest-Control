import Link from 'next/link'
import AsvHero from './AsvHero'
import AsvTrustBar from './AsvTrustBar'
import AsvCtaBanner from './AsvCtaBanner'
import AsvFaq from './AsvFaq'
import AsvTestimonials from './AsvTestimonials'

interface Address { street?: string; zip?: string; city?: string }
interface Geo { lat?: number; lng?: number }
interface Testimonial { text: string; author: string; location?: string; rating?: number }
interface Faq { question: string; answer: string; answerSchema?: string }

interface Stadtseite {
  cityName: string
  cityShort: string
  slug: { current: string }
  phone?: string
  phoneFormatted?: string
  phoneTel?: string
  address?: Address
  geo?: Geo
  plzExample?: string
  heroImage?: { asset?: { url: string }; alt?: string }
  heroSubtitle?: string
  cityDescription?: string
  districts?: string[]
  einsatzgebietDesc?: string
  testimonials?: Testimonial[]
  faqs?: Faq[]
}

interface GlobalSettings {
  phoneMain?: string
  phoneMainFormatted?: string
  phoneMainTel?: string
  companyName?: string
}

interface Props {
  city: Stadtseite
  settings?: GlobalSettings | null
}

const PEST_LINKS = [
  { title: 'Ratten', sub: 'Rattenbekämpfung', href: '/schaedlinge/ratten' },
  { title: 'Schaben', sub: 'Schabenbekämpfung', href: '/schaedlinge/schaben' },
  { title: 'Bettwanzen', sub: 'Bettwanzenbekämpfung', href: '/schaedlinge/bettwanzen' },
  { title: 'Wespen', sub: 'Nestentfernung', href: '/schaedlinge/wespen' },
  { title: 'Ameisen', sub: 'Ameisenbekämpfung', href: '/schaedlinge/ameisen' },
  { title: 'Taubenabwehr', sub: 'Vergrämung', href: '/taubenabwehr' },
]

export default function StadtseiteView({ city, settings }: Props) {
  const phone = city.phoneFormatted || settings?.phoneMainFormatted || settings?.phoneMain
  const phoneTel = city.phoneTel || settings?.phoneMainTel

  const benefits = [
    {
      title: 'Schnelle Anfahrt',
      text: `In unter 60 Minuten bei Ihnen in ${city.cityShort} – auch im Notfall sofort verfügbar.`,
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    },
    {
      title: 'IHK-zertifiziert',
      text: 'Alle Techniker sind IHK-geprüfte Schädlingsbekämpfer mit regelmäßiger Fortbildung.',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
    },
    {
      title: 'Festpreisgarantie',
      text: 'Transparente Preise ohne versteckte Kosten. Sie wissen vorher, was es kostet.',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
    },
    {
      title: 'Diskrete Anfahrt',
      text: 'Neutrale Fahrzeuge ohne auffällige Beschriftung – Ihre Privatsphäre ist geschützt.',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    },
    {
      title: '24h Notdienst',
      text: 'Rund um die Uhr erreichbar – auch an Wochenenden und Feiertagen.',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    },
    {
      title: 'Kostenlose Erstberatung',
      text: 'Unverbindliche telefonische Beratung und Einschätzung Ihres Schädlingsproblems.',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    },
  ]

  const processSteps = [
    { num: '01', title: 'Anruf oder Anfrage', text: 'Kontaktieren Sie uns telefonisch oder über das Formular. Wir beraten Sie kostenlos.' },
    { num: '02', title: 'Termin & Inspektion', text: `Wir kommen zu Ihnen nach ${city.cityShort} und begutachten den Befall vor Ort.` },
    { num: '03', title: 'Bekämpfung', text: 'Professionelle Beseitigung mit modernsten, umweltschonenden Verfahren.' },
    { num: '04', title: 'Nachkontrolle', text: 'Wir prüfen den Erfolg und beraten Sie zu vorbeugenden Maßnahmen.' },
  ]

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: `ASV Pest Control GmbH – Kammerjäger ${city.cityShort}`,
              description: `Professionelle Schädlingsbekämpfung in ${city.cityName}. 24h Notdienst, IHK-zertifiziert.`,
              url: `https://www.asv-schaedlingsbekaempfung.de/${city.slug.current}`,
              telephone: city.phone,
              address: city.address ? {
                '@type': 'PostalAddress',
                streetAddress: city.address.street,
                addressLocality: city.address.city,
                postalCode: city.address.zip,
                addressCountry: 'DE',
              } : undefined,
              geo: city.geo ? {
                '@type': 'GeoCoordinates',
                latitude: city.geo.lat,
                longitude: city.geo.lng,
              } : undefined,
              areaServed: { '@type': 'City', name: city.cityName },
              priceRange: '$$',
            },
            ...(city.faqs && city.faqs.length > 0 ? [{
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: city.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answerSchema || faq.answer },
              })),
            }] : []),
          ]),
        }}
      />

      {/* Hero */}
      <AsvHero
        title={`Schädlingsbekämpfung ${city.cityShort} – Schnell & Diskret`}
        subtitle={city.heroSubtitle || `Ihr Kammerjäger in ${city.cityName} – schnell, diskret, IHK-zertifiziert.`}
        heroImageUrl={city.heroImage?.asset?.url || '/images/kammerjaeger-desinfektion-kueche-scaled.webp'}
        phoneFormatted={phone}
        phoneTel={phoneTel}
        ctaText="Kostenlose Beratung anfordern"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Standorte', href: '/standorte' },
          { label: city.cityName },
        ]}
      />

      {/* Trust Bar – city-specific */}
      <AsvTrustBar items={[
        { number: '30+', label: 'Jahre Erfahrung' },
        { number: '20.000+', label: 'Zufriedene Kunden' },
        { number: '24h', label: 'Notdienst' },
        { number: '<60 Min', label: `Anfahrt ${city.cityShort}` },
      ]} />

      {/* Stadt-Beschreibung + Schädlingslinks */}
      {city.cityDescription && (
        <section className="section">
          <div className="container">
            <div className="section__header" data-animate="fade-up">
              <span className="section__label">Schädlingsbekämpfung {city.cityShort}</span>
              <h2>Schädlingsbefall in {city.cityName}?</h2>
              <p className="section__desc">{city.cityDescription}</p>
            </div>
            <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
              {PEST_LINKS.map((p, i) => (
                <Link key={i} href={p.href} className="pest-card pest-card--lg">
                  <h3 className="pest-card__title">{p.title}</h3>
                  <p className="pest-card__text">{p.sub}</p>
                  <span className="pest-card__arrow">→</span>
                </Link>
              ))}
            </div>
            <div className="text-center" style={{ marginTop: 'var(--space-8)' }} data-animate="fade-up">
              <Link href="/schaedlinge" className="btn btn--outline">Alle Schädlinge ansehen</Link>
            </div>
          </div>
        </section>
      )}

      {/* Ihre Vorteile */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Ihre Vorteile</span>
            <h2>Ihr lokaler Partner in {city.cityShort}</h2>
          </div>
          <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-card__icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* So funktioniert's */}
      <section className="section">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">In 4 Schritten</span>
            <h2>So funktioniert&apos;s</h2>
          </div>
          <div className="process__steps" data-animate="fade-up" data-animate-delay="100">
            {processSteps.map((step, i) => (
              <div key={i} className="process__step">
                <div className="process__number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt / Sofort-Hilfe */}
      <section className="section section--gray">
        <div className="container">
          <div className="split" data-animate="fade-up">
            <div className="split__content">
              <span className="section__label">Kontakt</span>
              <h2>Jetzt kostenlose Beratung anfordern</h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Beschreiben Sie Ihr Schädlingsproblem und wir melden uns innerhalb kürzester Zeit bei Ihnen.
              </p>
              <Link href="/express-angebot" className="btn btn--primary btn--lg" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                Rückruf &amp; Angebot anfordern
              </Link>
            </div>
            <div className="split__content">
              <div className="service-card" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sofort-Hilfe</div>
                    {phone && <a href={`tel:${phoneTel}`} style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--brand-red)', display: 'block' }}>{phone}</a>}
                  </div>
                </div>
                <ul className="check-list" style={{ fontSize: '0.9rem' }}>
                  <li>Kostenlose Erstberatung</li>
                  <li>24h Notdienst</li>
                  <li>Auch an Sonn- und Feiertagen für Sie erreichbar. Im Notfall sind wir schnell vor Ort in {city.cityShort}.</li>
                  <li>IHK-zertifiziert – geprüfte Qualität und über 30 Jahre Erfahrung.</li>
                  <li>Festpreisgarantie – transparentes Angebot vorab, keine versteckten Kosten.</li>
                </ul>
                {city.address && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-100)', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                    <strong>Standort {city.cityShort}</strong><br />
                    {city.address.street}<br />{city.address.zip} {city.address.city}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {city.testimonials && city.testimonials.length > 0 && (
        <AsvTestimonials
          title={`Das sagen unsere Kunden aus ${city.cityName}`}
          testimonials={city.testimonials}
        />
      )}

      {/* Einsatzgebiet */}
      {city.districts && city.districts.length > 0 && (
        <section className="section section--gray">
          <div className="container">
            <div className="section__header" data-animate="fade-up">
              <span className="section__label">Einsatzgebiet</span>
              <h2>Schädlingsbekämpfung in ganz {city.cityShort}</h2>
              {city.einsatzgebietDesc && <p className="section__desc">{city.einsatzgebietDesc}</p>}
            </div>
            <div className="region__cities" data-animate="fade-up" style={{ marginTop: '1.5rem' }}>
              {city.districts.map((d, i) => (
                <span key={i} className="region__city">{d}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {city.faqs && city.faqs.length > 0 && (
        <AsvFaq
          title={`FAQ – Kammerjäger ${city.cityShort}`}
          faqs={city.faqs}
        />
      )}

      {/* CTA Banner */}
      <AsvCtaBanner
        title={`Schädlinge in ${city.cityName}? Wir helfen sofort.`}
        text="Fordern Sie jetzt Ihre kostenlose Beratung an – unverbindlich und schnell."
        phoneFormatted={phone}
        phoneTel={phoneTel}
        ctaText="Jetzt Anfrage senden"
      />
    </>
  )
}
