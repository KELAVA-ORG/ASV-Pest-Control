import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery } from '@/sanity/lib/queries'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'
import Link from 'next/link'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Karriere | ASV Pest Control GmbH',
  description: 'Werden Sie Teil unseres Teams! Wir suchen Schädlingsbekämpfer, Servicetechniker und Auszubildende. Faire Bezahlung, Weiterbildung, Firmenwagen.',
}

const BENEFITS = [
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
    title: 'Faire Bezahlung',
    text: 'Überdurchschnittliches Gehalt, pünktliche Zahlung und Notdienstzuschläge.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
    title: 'Weiterbildung',
    text: 'Regelmäßige Schulungen, IHK-Prüfungen und Spezialisierungsmöglichkeiten werden vollständig gefördert.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Sicherer Arbeitsplatz',
    text: 'Unbefristete Festanstellung und langfristige Perspektiven in einem wachsenden Berufsfeld.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    title: 'Teamkultur',
    text: 'Kollegiales Arbeitsumfeld mit flachen Hierarchien und respektvollem Miteinander.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    title: 'Moderne Ausstattung',
    text: 'Firmenwagen, Berufskleidung und hochwertige Werkzeuge werden gestellt.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: 'Flexible Einsätze',
    text: 'Planbare Einsätze und faire Dienstplanung für eine gute Work-Life-Balance.',
  },
]

const JOBS = [
  {
    title: 'Schädlingsbekämpfer/in (m/w/d)',
    type: 'Vollzeit',
    region: 'Rhein-Main Region',
    start: 'Ab sofort',
    description: 'Sie bekämpfen professionell alle gängigen Schädlinge in Privathaushalten, Gewerbe und öffentlichen Einrichtungen. Mit moderner Ausrüstung und zugelassenen Mitteln sorgen Sie für nachhaltige Lösungen.',
    requirements: [
      'IHK-Abschluss als Schädlingsbekämpfer oder Bereitschaft, diesen zu erwerben',
      'Führerschein Klasse B',
      'Zuverlässigkeit und Kundenorientierung',
      'Teamfähigkeit und selbstständige Arbeitsweise',
    ],
  },
  {
    title: 'Servicetechniker/in Taubenabwehr (m/w/d)',
    type: 'Vollzeit',
    region: 'Rhein-Main Region',
    start: 'Ab sofort',
    description: 'Sie installieren professionelle Taubenabwehrsysteme an Gebäuden aller Art. Von der Planung über die Montage bis zur Nachkontrolle sind Sie der Experte vor Ort.',
    requirements: [
      'Erfahrung im Handwerk oder Gebäudeservice',
      'Schwindelfrei und handwerklich geschickt',
      'Führerschein Klasse B',
      'Kundenfreundliches Auftreten',
    ],
  },
  {
    title: 'Auszubildende/r Schädlingsbekämpfer/in (m/w/d)',
    type: 'Ausbildung',
    region: 'Rhein-Main Region',
    start: 'August 2026',
    description: 'Starten Sie Ihre Karriere in einem zukunftssicheren Beruf. Wir begleiten Sie durch die gesamte Ausbildung und übernehmen Sie danach gerne in ein festes Arbeitsverhältnis.',
    requirements: [
      'Mittlere Reife oder Hauptschulabschluss',
      'Interesse an Naturwissenschaften und Technik',
      'Zuverlässigkeit und Lernbereitschaft',
      'Führerschein oder Bereitschaft, diesen zu erwerben',
    ],
  },
]

export default async function KarrierePage() {
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
        title="Karriere bei ASV Pest Control"
        subtitle="Werden Sie Teil eines starken Teams – mit Perspektive und Verantwortung"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Karriere' },
        ]}
      />

      {/* Intro */}
      <section className="section">
        <div className="container container--narrow" data-animate="fade-up">
          <h2>Mehr als nur ein Arbeitsplatz</h2>
          <p>Bei ASV Pest Control bieten wir Ihnen nicht einfach einen Job – wir bieten Ihnen eine sinnvolle Tätigkeit, bei der Sie täglich Menschen helfen. Seit über 30 Jahren verbinden wir bewährte Qualität mit modernsten Technologien und freuen uns immer über engagierte Verstärkung für unser Team.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Ihre Vorteile</span>
            <h2>Was wir bieten</h2>
          </div>
          <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
            {BENEFITS.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-card__icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stellenangebote */}
      <section className="section">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Offene Stellen</span>
            <h2>Aktuelle Stellenangebote</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-animate="fade-up">
            {JOBS.map((job, i) => (
              <div key={i} className="service-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0 }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[job.type, job.region, `Start: ${job.start}`].map((tag, ti) => (
                      <span key={ti} style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>{job.description}</p>
                <ul className="check-list">
                  {job.requirements.map((r, ri) => <li key={ri}>{r}</li>)}
                </ul>
                <a href="mailto:karriere@asv-schaedlingsbekaempfung.de" className="btn btn--primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                  Jetzt bewerben
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiativbewerbung */}
      <section className="section section--gray">
        <div className="container container--narrow" data-animate="fade-up">
          <h2>Kein passendes Angebot?</h2>
          <p>Wir freuen uns jederzeit über Initiativbewerbungen. Schicken Sie uns einfach Ihren Lebenslauf und ein kurzes Motivationsschreiben an <a href="mailto:karriere@asv-schaedlingsbekaempfung.de" style={{ color: 'var(--brand-red)' }}>karriere@asv-schaedlingsbekaempfung.de</a> – wir melden uns bei Ihnen, sobald eine passende Stelle frei wird.</p>
        </div>
      </section>

      {/* CTA */}
      <AsvCtaBanner
        title="Interesse geweckt?"
        text="Rufen Sie uns an oder senden Sie uns Ihre Bewerbung – wir freuen uns auf Sie."
        phoneFormatted={phone}
        phoneTel={phoneTel}
        ctaText="Jetzt bewerben"
        ctaLink="mailto:karriere@asv-schaedlingsbekaempfung.de"
      />
    </PageLayout>
  )
}
