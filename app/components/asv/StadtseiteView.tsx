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
  { title: 'Ratten & Mäuse', href: '/schaedlinge/ratten' },
  { title: 'Wespen & Hornissen', href: '/schaedlinge/wespen' },
  { title: 'Schaben & Kakerlaken', href: '/schaedlinge/schaben' },
  { title: 'Bettwanzen', href: '/schaedlinge/bettwanzen' },
  { title: 'Ameisen', href: '/schaedlinge/ameisen' },
  { title: 'Taubenabwehr', href: '/schaedlinge/taubenabwehr' },
]

export default function StadtseiteView({ city, settings }: Props) {
  const phone = city.phoneFormatted || settings?.phoneMainFormatted || settings?.phoneMain
  const phoneTel = city.phoneTel || settings?.phoneMainTel

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
        phoneFormatted={phone}
        phoneTel={phoneTel}
        ctaText="Kostenlose Beratung anfordern"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Standorte', href: '/standorte' },
          { label: city.cityName },
        ]}
      />

      {/* Trust Bar */}
      <AsvTrustBar />

      {/* Stadt-Beschreibung + Einsatzgebiet */}
      {(city.cityDescription || (city.districts && city.districts.length > 0)) && (
        <section className="section">
          <div className="container">
            <div className="split" data-animate="fade-up">
              <div className="split__content">
                <h2>Schädlingsbekämpfung in {city.cityName}</h2>
                {city.cityDescription && <p style={{ marginBottom: '1.5rem', color: 'var(--gray-600)' }}>{city.cityDescription}</p>}
                {city.einsatzgebietDesc && <p style={{ color: 'var(--gray-400)' }}>{city.einsatzgebietDesc}</p>}
              </div>
              {city.districts && city.districts.length > 0 && (
                <div className="split__content">
                  <h3>Wir sind vor Ort in:</h3>
                  <div className="region__cities" style={{ marginTop: '1rem' }}>
                    {city.districts.map((d, i) => (
                      <span key={i} className="region__city">{d}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Leistungen Grid */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Schädlingsbekämpfung</span>
            <h2>Unsere Leistungen in {city.cityShort}</h2>
          </div>
          <div className="grid grid--3" data-animate="fade-up">
            {PEST_LINKS.map((s, i) => (
              <Link key={i} href={s.href} className="pest-card pest-card--lg">
                <h3 className="pest-card__title">{s.title}</h3>
                <span className="pest-card__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {city.testimonials && city.testimonials.length > 0 && (
        <AsvTestimonials
          title={`Kundenstimmen aus ${city.cityName}`}
          testimonials={city.testimonials}
        />
      )}

      {/* Kontakt-Sektion */}
      {city.address && (
        <section className="section section--gray">
          <div className="container container--narrow">
            <div className="section__header" data-animate="fade-up">
              <h2>Ihr Standort in {city.cityShort}</h2>
            </div>
            <div className="grid grid--3" data-animate="fade-up">
              <div className="service-card">
                <h4>Adresse</h4>
                <p>{city.address.street}<br />{city.address.zip} {city.address.city}</p>
              </div>
              {phone && (
                <div className="service-card">
                  <h4>Telefon</h4>
                  <p><a href={`tel:${phoneTel}`} style={{ color: 'var(--brand-red)' }}>{phone}</a></p>
                </div>
              )}
              {city.plzExample && (
                <div className="service-card">
                  <h4>PLZ-Bereich</h4>
                  <p>{city.plzExample}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <AsvCtaBanner
        title={`Schädlinge in ${city.cityName}? Wir helfen sofort.`}
        text="Kostenlose Erstberatung – wir sind innerhalb kürzester Zeit vor Ort."
        phoneFormatted={phone}
        phoneTel={phoneTel}
      />

      {/* FAQ */}
      {city.faqs && city.faqs.length > 0 && (
        <AsvFaq
          title={`Häufige Fragen zur Schädlingsbekämpfung in ${city.cityShort}`}
          faqs={city.faqs}
        />
      )}
    </>
  )
}
