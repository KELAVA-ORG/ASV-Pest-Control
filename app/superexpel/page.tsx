import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery, superexpelPageQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/app/lib/seo'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'
import AsvFaq from '@/app/components/asv/AsvFaq'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await client.fetch(superexpelPageQuery) as any
  return buildMetadata(page, {
    title: 'Superexpel – Das Nr. 1 Vergrämungsmittel | ASV Pest Control GmbH',
    description: 'Superexpel – effektives Vergrämungsmittel gegen Marder und Wildtiere auf natürlicher Basis. 20.000+ Anwendungen. Sicher für Mensch und Tier.',
  })
}

const DEFAULT_USES = [
  { title: 'Motorraum', text: 'Schützen Sie Ihr Fahrzeug vor Marderbissen. Superexpel hält Marder dauerhaft fern – ohne Falle, ohne Elektroschock.' },
  { title: 'Dachboden & Keller', text: 'Gegen Marder, Ratten und andere Wildtiere in Gebäuden. Einfach ausbringen und mehrere Wochen geschützt.' },
  { title: 'Garten & Außenbereich', text: 'Halten Sie Wildtiere aus Ihrem Garten, Ihrer Terrasse oder von Mülltonnen fern – tierschutzkonform.' },
]

const DEFAULT_STATS = [
  { num: 'Nr. 1', label: 'Vergrämungsmittel' },
  { num: '20.000+', label: 'Anwendungen' },
  { num: '100%', label: 'Natürliche Basis' },
  { num: '4–6', label: 'Wochen Wirkung' },
]

const DEFAULT_STEPS = [
  { num: '01', title: 'Bereich reinigen', text: 'Entfernen Sie vorhandene Spuren und reinigen Sie die betroffene Fläche vor der Anwendung.' },
  { num: '02', title: 'Pulver verteilen', text: 'Streuen Sie Superexpel gleichmäßig im betroffenen Bereich aus. Keine Schutzausrüstung nötig.' },
  { num: '03', title: 'Wirken lassen', text: 'Die natürlichen Duftstoffe entfalten ihre Wirkung sofort und halten mehrere Wochen an.' },
  { num: '04', title: 'Nachbehandlung', text: 'Tragen Sie nach 4–6 Wochen oder nach starkem Regen erneut auf für dauerhaften Schutz.' },
]

const DEFAULT_FAQS = [
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

const DEFAULT_CHECKLIST = [
  'Natürliche Inhaltsstoffe – sicher für Mensch und Tier',
  'Langanhaltende Wirkung über mehrere Wochen',
  'Einfache Anwendung ohne Fachkenntnisse',
  'Über 20.000 erfolgreiche Anwendungen',
  'Tierschutzkonform und unbedenklich',
]

export default async function SuperexpelPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [navigation, footer, settings, page] = await Promise.all([
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
    client.fetch(globalSettingsQuery),
    client.fetch(superexpelPageQuery),
  ]) as [any, any, any, any]

  const phone = settings?.phoneMainFormatted || '+49 6196 – 52 30 10'
  const phoneTel = settings?.phoneMainTel || '+496196523010'

  const heroSubtitle = page?.heroSubtitle || 'Effektiver Schutz gegen Marder und Wildtiere auf natürlicher Basis'
  const introTitle = page?.introTitle || 'Superexpel – Effektiver Schutz auf natürlicher Basis'
  const introImageUrl = page?.introImage?.asset?.url || '/images/marderbekaempfung.webp'
  const introImageAlt = page?.introImage?.alt || 'Superexpel Vergrämungsmittel'
  const introChecklist: string[] = page?.introChecklist?.length ? page.introChecklist : DEFAULT_CHECKLIST
  const stats = page?.stats?.length ? page.stats : DEFAULT_STATS
  const usesTitle = page?.usesTitle || 'Anwendungsbereiche'
  const uses = page?.uses?.length ? page.uses : DEFAULT_USES
  const processTitle = page?.processTitle || 'So einfach geht\'s'
  const processSteps = page?.processSteps?.length ? page.processSteps : DEFAULT_STEPS
  const faqTitle = page?.faqTitle || 'Häufige Fragen zu Superexpel'
  const faqs = page?.faqs?.length ? page.faqs : DEFAULT_FAQS
  const ctaTitle = page?.ctaTitle || 'Interesse an Superexpel?'
  const ctaText = page?.ctaText || 'Kontaktieren Sie uns für Verfügbarkeit, Preise und persönliche Beratung.'

  return (
    <PageLayout navigation={navigation} footer={footer}>
      {/* Hero */}
      <AsvHero
        title="Superexpel – Das Nr. 1 Vergrämungsmittel"
        subtitle={heroSubtitle}
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
              <h2>{introTitle}</h2>
              {page?.introText ? (
                page.introText.map((block: any, i: number) => (
                  block._type === 'block' && block.children ? (
                    <p key={i}>{block.children.map((c: any) => c.text).join('')}</p>
                  ) : null
                ))
              ) : (
                <p>Superexpel ist unser preisgekröntes Vergrämungsmittel auf Basis einer speziell entwickelten Rezeptur natürlicher Duftstoffe. Es vertreibt Marder, Ratten und andere Wildtiere zuverlässig – ohne Fallen, ohne Chemie, ohne Verletzungsgefahr.</p>
              )}
              <ul className="check-list">
                {introChecklist.map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="split__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={introImageUrl} alt={introImageAlt} width="972" height="800" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Auszeichnung */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__items" data-animate="fade-up">
            {stats.map((item: { num: string; label: string }, i: number) => (
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
            <h2>{usesTitle}</h2>
          </div>
          <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
            {uses.map((u: { title: string; text: string }, i: number) => (
              <div key={i} className="service-card">
                <div className="service-card__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
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
            <h2>{processTitle}</h2>
          </div>
          <div className="process__steps" data-animate="fade-up" data-animate-delay="100">
            {processSteps.map((step: { num: string; title: string; text: string }, i: number) => (
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
        title={ctaTitle}
        text={ctaText}
        phoneFormatted={phone}
        phoneTel={phoneTel}
        ctaText="Jetzt anfragen"
      />

      {/* FAQ */}
      <AsvFaq title={faqTitle} faqs={faqs} />
    </PageLayout>
  )
}
