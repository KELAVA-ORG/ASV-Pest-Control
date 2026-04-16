import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery, karrierePageQuery } from '@/sanity/lib/queries'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Karriere | ASV Pest Control GmbH',
  description: 'Werden Sie Teil unseres Teams! Wir suchen Schädlingsbekämpfer, Servicetechniker und Auszubildende. Faire Bezahlung, Weiterbildung, Firmenwagen.',
}

const DEFAULT_BENEFITS = [
  { title: 'Faire Bezahlung', text: 'Überdurchschnittliches Gehalt, pünktliche Zahlung und Notdienstzuschläge.' },
  { title: 'Weiterbildung', text: 'Regelmäßige Schulungen, IHK-Prüfungen und Spezialisierungsmöglichkeiten werden vollständig gefördert.' },
  { title: 'Sicherer Arbeitsplatz', text: 'Unbefristete Festanstellung und langfristige Perspektiven in einem wachsenden Berufsfeld.' },
  { title: 'Teamkultur', text: 'Kollegiales Arbeitsumfeld mit flachen Hierarchien und respektvollem Miteinander.' },
  { title: 'Moderne Ausstattung', text: 'Firmenwagen, Berufskleidung und hochwertige Werkzeuge werden gestellt.' },
  { title: 'Flexible Einsätze', text: 'Planbare Einsätze und faire Dienstplanung für eine gute Work-Life-Balance.' },
]

const DEFAULT_JOBS = [
  {
    title: 'Schädlingsbekämpfer/in (m/w/d)',
    type: 'Vollzeit',
    location: 'Rhein-Main Region',
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
    location: 'Rhein-Main Region',
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
    location: 'Rhein-Main Region',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [navigation, footer, settings, page] = await Promise.all([
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
    client.fetch(globalSettingsQuery),
    client.fetch(karrierePageQuery),
  ]) as [any, any, any, any]

  const phone = settings?.phoneMainFormatted || '+49 6196 – 52 30 10'
  const phoneTel = settings?.phoneMainTel || '+496196523010'

  const heroSubtitle = page?.heroSubtitle || 'Werden Sie Teil eines starken Teams – mit Perspektive und Verantwortung'
  const introTitle = page?.introTitle || 'Mehr als nur ein Arbeitsplatz'
  const benefitsTitle = page?.benefitsTitle || 'Was wir bieten'
  const benefits = page?.benefits?.length ? page.benefits : DEFAULT_BENEFITS
  const jobsTitle = page?.jobsTitle || 'Aktuelle Stellenangebote'
  const jobs = page?.jobs?.length ? page.jobs : DEFAULT_JOBS
  const initiativeTitle = page?.initiativeTitle || 'Kein passendes Angebot?'
  const initiativeText = page?.initiativeText || 'Wir freuen uns jederzeit über Initiativbewerbungen. Schicken Sie uns einfach Ihren Lebenslauf und ein kurzes Motivationsschreiben an karriere@asv-schaedlingsbekaempfung.de – wir melden uns bei Ihnen, sobald eine passende Stelle frei wird.'
  const ctaTitle = page?.ctaTitle || 'Interesse geweckt?'
  const ctaText = page?.ctaText || 'Rufen Sie uns an oder senden Sie uns Ihre Bewerbung – wir freuen uns auf Sie.'

  return (
    <PageLayout navigation={navigation} footer={footer}>
      {/* Hero */}
      <AsvHero
        title="Karriere bei ASV Pest Control"
        subtitle={heroSubtitle}
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Karriere' },
        ]}
      />

      {/* Intro */}
      <section className="section">
        <div className="container container--narrow" data-animate="fade-up">
          <h2>{introTitle}</h2>
          {page?.introText ? (
            page.introText.map((block: any, i: number) => (
              block._type === 'block' && block.children ? (
                <p key={i}>{block.children.map((c: any) => c.text).join('')}</p>
              ) : null
            ))
          ) : (
            <p>Bei ASV Pest Control bieten wir Ihnen nicht einfach einen Job – wir bieten Ihnen eine sinnvolle Tätigkeit, bei der Sie täglich Menschen helfen. Seit über 30 Jahren verbinden wir bewährte Qualität mit modernsten Technologien und freuen uns immer über engagierte Verstärkung für unser Team.</p>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Ihre Vorteile</span>
            <h2>{benefitsTitle}</h2>
          </div>
          <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
            {benefits.map((b: { title: string; text: string }, i: number) => (
              <div key={i} className="benefit-card">
                <div className="benefit-card__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                </div>
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
            <h2>{jobsTitle}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-animate="fade-up">
            {jobs.map((job: { title: string; type: string; location: string; description: string; requirements: string[] }, i: number) => (
              <div key={i} className="service-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0 }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[job.type, job.location].filter(Boolean).map((tag, ti) => (
                      <span key={ti} style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>{job.description}</p>
                {job.requirements?.length > 0 && (
                  <ul className="check-list">
                    {job.requirements.map((r: string, ri: number) => <li key={ri}>{r}</li>)}
                  </ul>
                )}
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
          <h2>{initiativeTitle}</h2>
          <p>{initiativeText}</p>
        </div>
      </section>

      {/* CTA */}
      <AsvCtaBanner
        title={ctaTitle}
        text={ctaText}
        phoneFormatted={phone}
        phoneTel={phoneTel}
        ctaText="Jetzt bewerben"
        ctaLink="mailto:karriere@asv-schaedlingsbekaempfung.de"
      />
    </PageLayout>
  )
}
