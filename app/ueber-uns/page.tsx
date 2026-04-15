import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery } from '@/sanity/lib/queries'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Über uns | ASV Pest Control GmbH',
  description: 'ASV Pest Control GmbH – Seit über 30 Jahren professionelle Schädlingsbekämpfung. IHK-zertifiziert, 20.000+ zufriedene Kunden, 24h Notdienst.',
}

const STATS = [
  { num: '30+', label: 'Jahre Erfahrung' },
  { num: '20.000+', label: 'Zufriedene Kunden' },
  { num: '24h', label: 'Notdienst-Bereitschaft' },
  { num: '100%', label: 'IHK-zertifiziert' },
]

const VALUES = [
  {
    title: 'Qualität',
    text: 'Wir setzen auf höchste Qualitätsstandards bei Materialien, Verfahren und Service. Jeder Einsatz wird sorgfältig dokumentiert und nachkontrolliert.',
  },
  {
    title: 'Verantwortung',
    text: 'Umweltbewusstes Handeln ist für uns selbstverständlich. Wir wählen die schonendsten Methoden und setzen nur zugelassene Mittel ein.',
  },
  {
    title: 'Kundennähe',
    text: 'Jeder Kunde und jedes Problem ist individuell. Wir hören zu, beraten ehrlich und finden die optimale Lösung für Ihre Situation.',
  },
  {
    title: 'Zuverlässigkeit',
    text: 'Wenn wir einen Termin vereinbaren, halten wir ihn. Im Notfall sind wir innerhalb kürzester Zeit bei Ihnen – darauf können Sie sich verlassen.',
  },
  {
    title: 'Weiterbildung',
    text: 'Unser Team bildet sich kontinuierlich fort. So bleiben wir auf dem neuesten Stand der Technik und können Ihnen die besten Lösungen bieten.',
  },
  {
    title: 'Diskretion',
    text: 'Wir wissen, dass ein Schädlingsbefall sensibel ist. Unsere Techniker arbeiten unauffällig und professionell – Ihre Privatsphäre hat Priorität.',
  },
]

const CERTS = [
  'IHK-zertifizierte Schädlingsbekämpfer',
  'Regelmäßige Fortbildungen und Schulungen',
  'Einhaltung aller gesetzlichen Vorschriften',
  'Dokumentation nach HACCP-Standards',
  'Superexpel – unser preisgekröntes Vergrämungsmittel',
]

export default async function UeberUnsPage() {
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
        title="Über ASV Pest Control"
        subtitle="Seit über 30 Jahren Ihr zuverlässiger Partner für professionelle Schädlingsbekämpfung"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Über uns' },
        ]}
      />

      {/* Geschichte */}
      <section className="section">
        <div className="container">
          <div className="split" data-animate="fade-up">
            <div className="split__content">
              <span className="section__label">Unsere Geschichte</span>
              <h2>Tradition trifft Innovation</h2>
              <p>ASV Pest Control wurde vor über 30 Jahren mit einer klaren Vision gegründet: professionelle Schädlingsbekämpfung, die höchsten Qualitätsstandards entspricht und gleichzeitig umweltbewusst agiert.</p>
              <p>Was als kleines Familienunternehmen begann, hat sich zu einem der führenden Schädlingsbekämpfungsbetriebe der Region entwickelt. Über 20.000 zufriedene Kunden vertrauen auf unsere Expertise – von Privathaushalten über Gastronomiebetriebe bis hin zu Industrieunternehmen und öffentlichen Einrichtungen.</p>
              <p>Unser Erfolg basiert auf drei Säulen: fachliche Kompetenz, modernste Technologien und ein konsequenter Fokus auf Kundenzufriedenheit.</p>
            </div>
            <div className="split__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/schaedlingsbekaempfer.webp" alt="ASV Pest Control Team" width="972" height="800" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Zahlen */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__items" data-animate="fade-up">
            {STATS.map((s, i) => (
              <div key={i} className="trust-bar__item">
                <span className="trust-bar__number">{s.num}</span>
                <span className="trust-bar__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Wofür wir stehen</span>
            <h2>Unsere Werte</h2>
          </div>
          <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
            {VALUES.map((v, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-card__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zertifizierungen */}
      <section className="section">
        <div className="container container--narrow" data-animate="fade-up">
          <span className="section__label">Qualität gesichert</span>
          <h2>Zertifizierungen &amp; Auszeichnungen</h2>
          <p>Unsere Arbeit basiert auf höchsten fachlichen Standards. Alle Techniker der ASV Pest Control GmbH sind IHK-geprüfte Schädlingsbekämpfer und bilden sich regelmäßig weiter.</p>
          <ul className="check-list" style={{ marginTop: '1.5rem' }}>
            {CERTS.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <AsvCtaBanner
        title="Überzeugen Sie sich selbst."
        text="Kontaktieren Sie uns für eine kostenlose Beratung – wir freuen uns auf Sie."
        phoneFormatted={phone}
        phoneTel={phoneTel}
        ctaText="Express-Angebot anfordern"
      />
    </PageLayout>
  )
}
