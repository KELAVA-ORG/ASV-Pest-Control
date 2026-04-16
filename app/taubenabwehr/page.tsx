import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery, taubenabwehrPageQuery } from '@/sanity/lib/queries'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'
import AsvFaq from '@/app/components/asv/AsvFaq'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Professionelle Taubenabwehr | ASV Pest Control GmbH',
  description: 'Dauerhafter Schutz vor Tauben – tierschutzkonform und ästhetisch unauffällig. Spikes, Netze, elektrische Systeme. IHK-zertifiziert, kostenlose Beratung.',
}

const DEFAULT_FAQS = [
  {
    question: 'Welche Taubenabwehrsysteme gibt es?',
    answer: 'Es gibt verschiedene Systeme wie Spikes (Abweiserspitzen), Netze, Spanndrähte, elektrische Abwehrsysteme und optische Vergrämungsmittel. Welches System am besten geeignet ist, hängt von der Gebäudesituation und dem Ausmaß des Taubenbefalls ab. Wir beraten Sie kostenlos vor Ort.',
  },
  {
    question: 'Was kostet eine professionelle Taubenabwehr?',
    answer: 'Die Kosten variieren je nach Gebäudegröße, gewähltem System und Installationsaufwand. Einfache Spikesysteme für Fensterbänke beginnen bei einigen hundert Euro. Großflächige Netze oder elektrische Systeme für ganze Gebäudeabschnitte können mehrere tausend Euro kosten. Wir erstellen Ihnen nach einer kostenlosen Vor-Ort-Besichtigung ein transparentes Angebot.',
  },
  {
    question: 'Ist Taubenabwehr tierschutzkonform?',
    answer: 'Ja, absolut. Alle unsere Abwehrsysteme sind tierschutzkonform und entsprechen den geltenden Tierschutzgesetzen. Wir setzen ausschließlich auf Vergrämung – also das Fernhalten der Tauben – und nicht auf Vernichtung. Die Systeme sind so konzipiert, dass Tauben weder verletzt noch gefangen werden.',
  },
  {
    question: 'Wie lange hält eine Taubenabwehr-Installation?',
    answer: 'Hochwertige Taubenabwehrsysteme halten in der Regel 10 bis 20 Jahre und länger, wenn sie fachgerecht installiert und gelegentlich gewartet werden. Wir verwenden ausschließlich witterungsbeständige Materialien, die auch extremen Temperaturen und UV-Strahlung standhalten.',
  },
  {
    question: 'Können auch denkmalgeschützte Gebäude geschützt werden?',
    answer: 'Ja. Wir bieten spezielle Lösungen für denkmalgeschützte Gebäude, die optisch nahezu unsichtbar sind und das Erscheinungsbild des Gebäudes nicht beeinträchtigen. Spanndrähte und transparente Netze lassen sich unauffällig integrieren. Wir arbeiten eng mit Denkmalschutzbehörden zusammen.',
  },
]

const DEFAULT_SYSTEMS = [
  { title: 'Spikesysteme', description: 'Abweiserspitzen aus Edelstahl oder Polycarbonat – ideal für Fensterbänke, Gesimse und Dachkanten. Tierschutzkonform, langlebig und optisch dezent.' },
  { title: 'Netz-Systeme', description: 'Vollflächige Abschirmung von Dachterrassen, Innenhöfen und Gebäudeabschnitten. UV-beständig, nahezu unsichtbar und bis zu 20 Jahre haltbar.' },
  { title: 'Elektrische Systeme', description: 'Strömungsimpulse erzeugen ein unangenehmes Gefühl ohne Verletzungsgefahr. Ideal für historische Gebäude und repräsentative Fassaden.' },
  { title: 'Spanndrahtsysteme', description: 'Feine Stahldrähte stören die Landung der Tauben effektiv. Nahezu unsichtbar und besonders für denkmalgeschützte Gebäude geeignet.' },
  { title: 'Vergrämungsmittel', description: 'Optische und akustische Vergrämung sowie Geruchsmittel (z.B. Superexpel) für den sofortigen Einsatz und als ergänzende Maßnahme.' },
  { title: 'Reinigung & Desinfektion', description: 'Fachgerechte Entfernung von Taubenkot und Desinfektion der betroffenen Bereiche – wichtig vor der Montage von Abwehrsystemen.' },
]

const DEFAULT_CHECKLIST = [
  'Kostenlose Vor-Ort-Besichtigung und Beratung',
  'Individuelle Lösung für jede Gebäudesituation',
  'Tierschutzkonforme Systeme ohne Verletzungsgefahr',
  'Fachgerechte Montage durch geschulte Techniker',
  'Langlebige, wartungsarme Installationen',
  'Optisch unauffällige Integration in die Gebäudestruktur',
  'Auch für denkmalgeschützte Gebäude geeignet',
]

const DEFAULT_STEPS = [
  { num: '01', title: 'Besichtigung', text: 'Kostenlose Begutachtung Ihres Gebäudes und Analyse des Taubenbefalls sowie der Niststellen.' },
  { num: '02', title: 'Konzept', text: 'Erstellung eines maßgeschneiderten Abwehrkonzepts mit transparenter Kostenkalkulation.' },
  { num: '03', title: 'Installation', text: 'Fachgerechte Montage der Abwehrsysteme durch unsere geschulten Techniker.' },
  { num: '04', title: 'Kontrolle', text: 'Nachkontrolle und bei Bedarf Anpassung der Systeme für optimalen Schutz.' },
]

export default async function TaubenabwehrPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [navigation, footer, settings, page] = await Promise.all([
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
    client.fetch(globalSettingsQuery),
    client.fetch(taubenabwehrPageQuery),
  ]) as [any, any, any, any]

  const phone = settings?.phoneMainFormatted || '+49 6196 – 52 30 10'
  const phoneTel = settings?.phoneMainTel || '+496196523010'

  const heroImageUrl = page?.heroImage?.asset?.url || '/images/taubenabwehr.webp'
  const heroSubtitle = page?.heroSubtitle || 'Dauerhafter Schutz für Ihr Gebäude – tierschutzkonform und ästhetisch unauffällig'
  const introTitle = page?.introTitle || 'Das Taubenproblem an Gebäuden'
  const systems = page?.services?.length ? page.services : DEFAULT_SYSTEMS
  const splitTitle = page?.splitTitle || 'Warum ASV Taubenabwehr?'
  const splitChecklist: string[] = page?.splitChecklist?.length ? page.splitChecklist : DEFAULT_CHECKLIST
  const splitImageUrl = page?.splitImage?.asset?.url || '/images/schaedlingsbekaempfer.webp'
  const splitImageAlt = page?.splitImage?.alt || 'ASV Pest Control Techniker bei der Taubenabwehr'
  const processTitle = page?.processTitle || 'Unser Vorgehen'
  const processSteps = page?.processSteps?.length ? page.processSteps : DEFAULT_STEPS
  const faqTitle = page?.faqTitle || 'Häufige Fragen zur Taubenabwehr'
  const faqs = page?.faqs?.length ? page.faqs : DEFAULT_FAQS
  const ctaTitle = page?.ctaTitle || 'Taubenplage? Wir schützen Ihr Gebäude.'
  const ctaText = page?.ctaText || 'Kostenlose Vor-Ort-Besichtigung und individuelles Abwehrkonzept.'

  return (
    <PageLayout navigation={navigation} footer={footer}>
      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Professionelle Taubenabwehr',
        provider: { '@type': 'LocalBusiness', name: 'ASV Pest Control GmbH' },
        description: 'Dauerhafter Schutz für Ihr Gebäude – tierschutzkonform und ästhetisch unauffällig.',
        areaServed: 'Deutschland',
      }) }} />

      {/* Hero */}
      <AsvHero
        title="Professionelle Taubenabwehr"
        subtitle={heroSubtitle}
        heroImageUrl={heroImageUrl}
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Taubenabwehr' },
        ]}
      />

      {/* Problem */}
      <section className="section">
        <div className="container container--narrow" data-animate="fade-up">
          <h2>{introTitle}</h2>
          {page?.introText ? (
            <div>
              {/* Portable text fallback – render plain text blocks */}
              {page.introText.map((block: any, i: number) => (
                block._type === 'block' && block.children ? (
                  <p key={i}>{block.children.map((c: any) => c.text).join('')}</p>
                ) : null
              ))}
            </div>
          ) : (
            <>
              <p>Taubenkot ist nicht nur unansehnlich, sondern greift Fassaden, Dächer und Metallkonstruktionen an. Die aggressive Säure im Kot zersetzt Beton, Sandstein und Metall und verursacht langfristig erhebliche Bauschäden. Unbehandelt können die Reparaturkosten schnell in den fünf- bis sechsstelligen Bereich steigen.</p>
              <p>Gleichzeitig stellt Taubenkot ein ernsthaftes Gesundheitsrisiko dar. Er kann Krankheitserreger wie Salmonellen, Chlamydien und Pilzsporen enthalten, die beim Einatmen von Staubpartikeln übertragen werden. Besonders gefährdet sind Menschen mit geschwächtem Immunsystem.</p>
              <p>Für gewerbliche Betriebe – insbesondere in der Gastronomie und Lebensmittelbranche – bedeutet Taubenbefall zudem ein erhebliches Hygienerisiko und kann zu Bußgeldern bei Kontrollen führen.</p>
            </>
          )}
        </div>
      </section>

      {/* Systeme */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <h2>Taubenabwehrsysteme im Überblick</h2>
          </div>
          <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
            {systems.map((s: { title: string; description: string }, i: number) => (
              <div key={i} className="service-card">
                <div className="service-card__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Split */}
      <section className="section">
        <div className="container">
          <div className="split" data-animate="fade-up">
            <div className="split__content">
              <h2>{splitTitle}</h2>
              {page?.splitText ? (
                page.splitText.map((block: any, i: number) => (
                  block._type === 'block' && block.children ? (
                    <p key={i}>{block.children.map((c: any) => c.text).join('')}</p>
                  ) : null
                ))
              ) : (
                <p>Unsere IHK-zertifizierten Techniker analysieren Ihr Gebäude und entwickeln ein maßgeschneidertes Konzept. Wir kennen die Gewohnheiten der Tauben und wissen, welches System wo am wirkungsvollsten ist – und vor allem welches zu Ihrem Gebäude und Budget passt.</p>
              )}
              <ul className="check-list">
                {splitChecklist.map((v: string, i: number) => <li key={i}>{v}</li>)}
              </ul>
            </div>
            <div className="split__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={splitImageUrl} alt={splitImageAlt} width="972" height="800" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
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
        ctaText="Kostenlos beraten lassen"
      />

      {/* FAQ */}
      <AsvFaq title={faqTitle} faqs={faqs} />
    </PageLayout>
  )
}
