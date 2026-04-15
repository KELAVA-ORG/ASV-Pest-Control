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
        badge={`Ihr Kammerjäger in ${city.cityName}`}
        title={`Schädlingsbekämpfung ${city.cityShort} – Schnell & Diskret`}
        subtitle={city.heroSubtitle}
        phoneFormatted={phone}
        phoneTel={phoneTel}
        ctaText="Kostenlose Beratung anfordern"
      />

      {/* Trust Bar */}
      <AsvTrustBar />

      {/* Stadt-Beschreibung + Einsatzgebiet */}
      {(city.cityDescription || (city.districts && city.districts.length > 0)) && (
        <section className="asv-section">
          <div className="asv-container">
            <div className="asv-split reveal">
              <div className="asv-split__content">
                <h2>Schädlingsbekämpfung in {city.cityName}</h2>
                {city.cityDescription && <p style={{ marginBottom: '1.5rem' }}>{city.cityDescription}</p>}
                {city.einsatzgebietDesc && <p className="asv-text-muted">{city.einsatzgebietDesc}</p>}
              </div>
              {city.districts && city.districts.length > 0 && (
                <div className="asv-split__content">
                  <h3>Wir sind vor Ort in:</h3>
                  <div className="asv-tags">
                    {city.districts.map((d, i) => (
                      <span key={i} className="asv-tag">{d}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Leistungen Grid */}
      <section className="asv-section asv-section--gray">
        <div className="asv-container">
          <h2 className="asv-section__title reveal">Unsere Leistungen in {city.cityShort}</h2>
          <div className="asv-cards reveal">
            {[
              { title: 'Ratten & Mäuse', href: '/schaedlinge/ratten' },
              { title: 'Wespen & Hornissen', href: '/schaedlinge/wespen' },
              { title: 'Schaben & Kakerlaken', href: '/schaedlinge/schaben' },
              { title: 'Bettwanzen', href: '/schaedlinge/bettwanzen' },
              { title: 'Ameisen', href: '/schaedlinge/ameisen' },
              { title: 'Taubenabwehr', href: '/taubenabwehr' },
            ].map((s, i) => (
              <a key={i} href={s.href} className="asv-card asv-card--link">
                <h3 className="asv-card__title">{s.title}</h3>
                <span className="asv-card__arrow">→</span>
              </a>
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
        <section className="asv-section asv-section--gray">
          <div className="asv-container asv-container--narrow">
            <h2 className="asv-section__title reveal">Ihr Standort in {city.cityShort}</h2>
            <div className="asv-contact-box reveal">
              <div className="asv-contact-box__item">
                <strong>Adresse</strong>
                <p>{city.address.street}<br />{city.address.zip} {city.address.city}</p>
              </div>
              {phone && (
                <div className="asv-contact-box__item">
                  <strong>Telefon</strong>
                  <a href={`tel:${phoneTel}`}>{phone}</a>
                </div>
              )}
              {city.plzExample && (
                <div className="asv-contact-box__item">
                  <strong>PLZ-Beispiel</strong>
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
