import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery } from '@/sanity/lib/queries'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'
import AsvFaq from '@/app/components/asv/AsvFaq'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Superexpel – Das Nr. 1 Vergrämungsmittel | ASV Pest Control GmbH',
  description: 'Superexpel – effektives Vergrämungsmittel gegen Marder und Wildtiere auf natürlicher Basis. 20.000+ Anwendungen. Sicher für Mensch und Tier.',
}

const USES = [
  {
    title: 'Motorraum',
    text: 'Schützen Sie Ihr Fahrzeug vor Marderbissen. Superexpel hält Marder dauerhaft fern – ohne Falle, ohne Elektroschock.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  },
  {
    title: 'Dachboden & Keller',
    text: 'Gegen Marder, Ratten und andere Wildtiere in Gebäuden. Einfach ausbringen und mehrere Wochen geschützt.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    title: 'Garten & Außenbereich',
    text: 'Halten Sie Wildtiere aus Ihrem Garten, Ihrer Terrasse oder von Mülltonnen fern – tierschutzkonform.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22V12m0 0C12 7 8 4 3 5c0 5 3 9 9 7m0 0c0-5 4-8 9-7-1 5-4 9-9 7"/></svg>,
  },
]

const STEPS = [
  { num: '01', title: 'Bereich reinigen', text: 'Entfernen Sie vorhandene Spuren und reinigen Sie die betroffene Fläche vor der Anwendung.' },
  { num: '02', title: 'Pulver verteilen', text: 'Streuen Sie Superexpel gleichmäßig im betroffenen Bereich aus. Keine Schutzausrüstung nötig.' },
  { num: '03', title: 'Wirken lassen', text: 'Die natürlichen Duftstoffe entfalten ihre Wirkung sofort und halten mehrere Wochen an.' },
  { num: '04', title: 'Nachbehandlung', text: 'Tragen Sie nach 4–6 Wochen oder nach starkem Regen erneut auf für dauerhaften Schutz.' },
]

const FAQS = [
  {
    question: 'Für welche Tiere ist Superexpel geeignet?',
    answer: 'Superexpel ist besonders wirksam gegen Marder, aber auch gegen andere Wildtiere wie Ratten, Mäuse und Katzen, die sich in unerwünschten Bereichen aufhalten. Das Mittel stört die Tiere durch natürliche Duftstoffe, ohne ihnen zu schaden.',
  },
  {
    question: 'Ist Superexpel sicher für Kinder und Haustiere?',
    answer: 'Ja. Superexpel basiert auf natürlichen Inhaltsstoffen und ist bei bestimmungsgemäßer Anwendung sicher für Menschen und Haustiere. Es enthält keine giftigen Substanzen. Vermeiden Sie trotzdem direkten Hautkontakt und Einatmen des Pulvers während der Anwendung.',
  },
  {
    question: 'Wie lange hält die Wirkung an?',
    answer: 'Bei trockenen Bedingungen hält die Wirkung 4 bis 6 Wochen an. Nach starkem Regen oder in feuchten Bereichen empfehlen wir eine frühere Nachbehandlung. Im Motorraum empfehlen wir alle 4 Wochen eine neue Anwendung.',
  },
  {
    question: 'Wo kann ich Superexpel kaufen?',
    answer: 'Superexpel ist direkt über ASV Pest Control erhältlich. Kontaktieren Sie uns für aktuelle Verfügbarkeit und Preise. Wir beraten Sie auch gerne, ob Superexpel für Ihr spezifisches Problem die richtige Lösung ist.',
  },
]

export default async function SuperexpelPage() {
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
        title="Superexpel – Das Nr. 1 Vergrämungsmittel"
        subtitle="Effektiver Schutz gegen Marder und Wildtiere auf natürlicher Basis"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Superexpel' },
        ]}
      />

      {/* Produkt Intro */}
      <section className="section">
        <div className="container">
          <div className="split" data-animate="fade-up">
            <div className="split__content">
              <span className="section__label">Preisgekröntes Produkt</span>
              <h2>Superexpel – Effektiver Schutz auf natürlicher Basis</h2>
              <p>Superexpel ist unser preisgekröntes Vergrämungsmittel auf Basis einer speziell entwickelten Rezeptur natürlicher Duftstoffe. Es vertreibt Marder, Ratten und andere Wildtiere zuverlässig – ohne Fallen, ohne Chemie, ohne Verletzungsgefahr.</p>
              <ul className="check-list">
                <li>Natürliche Inhaltsstoffe – sicher für Mensch und Tier</li>
                <li>Langanhaltende Wirkung über mehrere Wochen</li>
                <li>Einfache Anwendung ohne Fachkenntnisse</li>
                <li>Über 20.000 erfolgreiche Anwendungen</li>
                <li>Tierschutzkonform und unbedenklich</li>
              </ul>
            </div>
            <div className="split__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/marderbekaempfung.webp" alt="Superexpel Vergrämungsmittel" width="972" height="800" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Auszeichnung */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__items" data-animate="fade-up">
            {[
              { num: 'Nr. 1', label: 'Vergrämungsmittel' },
              { num: '20.000+', label: 'Anwendungen' },
              { num: '100%', label: 'Natürliche Basis' },
              { num: '4–6', label: 'Wochen Wirkung' },
            ].map((item, i) => (
              <div key={i} className="trust-bar__item">
                <span className="trust-bar__number">{item.num}</span>
                <span className="trust-bar__label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anwendungsbereiche */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Vielseitig einsetzbar</span>
            <h2>Anwendungsbereiche</h2>
          </div>
          <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
            {USES.map((u, i) => (
              <div key={i} className="service-card">
                <div className="service-card__icon">{u.icon}</div>
                <h3>{u.title}</h3>
                <p>{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anwendung */}
      <section className="section">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Einfache Handhabung</span>
            <h2>So einfach geht&apos;s</h2>
          </div>
          <div className="process__steps" data-animate="fade-up" data-animate-delay="100">
            {STEPS.map((step, i) => (
              <div key={i} className="process__step">
                <div className="process__number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <AsvCtaBanner
        title="Interesse an Superexpel?"
        text="Kontaktieren Sie uns für Verfügbarkeit, Preise und persönliche Beratung."
        phoneFormatted={phone}
        phoneTel={phoneTel}
        ctaText="Jetzt anfragen"
      />

      {/* FAQ */}
      <AsvFaq title="Häufige Fragen zu Superexpel" faqs={FAQS} />
    </PageLayout>
  )
}
