import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery } from '@/sanity/lib/queries'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'
import AsvFaq from '@/app/components/asv/AsvFaq'
import Link from 'next/link'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Professionelle Taubenabwehr | ASV Pest Control GmbH',
  description: 'Dauerhafter Schutz vor Tauben – tierschutzkonform und ästhetisch unauffällig. Spikes, Netze, elektrische Systeme. IHK-zertifiziert, kostenlose Beratung.',
}

const FAQS = [
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

const SYSTEMS = [
  {
    title: 'Spikesysteme',
    text: 'Abweiserspitzen aus Edelstahl oder Polycarbonat – ideal für Fensterbänke, Gesimse und Dachkanten. Tierschutzkonform, langlebig und optisch dezent.',
  },
  {
    title: 'Netz-Systeme',
    text: 'Vollflächige Abschirmung von Dachterrassen, Innenhöfen und Gebäudeabschnitten. UV-beständig, nahezu unsichtbar und bis zu 20 Jahre haltbar.',
  },
  {
    title: 'Elektrische Systeme',
    text: 'Strömungsimpulse erzeugen ein unangenehmes Gefühl ohne Verletzungsgefahr. Ideal für historische Gebäude und repräsentative Fassaden.',
  },
  {
    title: 'Spanndrahtsysteme',
    text: 'Feine Stahldrähte stören die Landung der Tauben effektiv. Nahezu unsichtbar und besonders für denkmalgeschützte Gebäude geeignet.',
  },
  {
    title: 'Vergrämungsmittel',
    text: 'Optische und akustische Vergrämung sowie Geruchsmittel (z.B. Superexpel) für den sofortigen Einsatz und als ergänzende Maßnahme.',
  },
  {
    title: 'Reinigung & Desinfektion',
    text: 'Fachgerechte Entfernung von Taubenkot und Desinfektion der betroffenen Bereiche – wichtig vor der Montage von Abwehrsystemen.',
  },
]

const VALUES = [
  'Kostenlose Vor-Ort-Besichtigung und Beratung',
  'Individuelle Lösung für jede Gebäudesituation',
  'Tierschutzkonforme Systeme ohne Verletzungsgefahr',
  'Fachgerechte Montage durch geschulte Techniker',
  'Langlebige, wartungsarme Installationen',
  'Optisch unauffällige Integration in die Gebäudestruktur',
  'Auch für denkmalgeschützte Gebäude geeignet',
]

export default async function TaubenabwehrPage() {
  const [navigation, footer, settings] = await Promise.all([
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
    client.fetch(globalSettingsQuery),
  ])

  const phone = settings?.phoneMainFormatted || '+49 6196 – 52 30 10'
  const phoneTel = settings?.phoneMainTel || '+496196523010'

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
        subtitle="Dauerhafter Schutz für Ihr Gebäude – tierschutzkonform und ästhetisch unauffällig"
        heroImageUrl="/images/taubenabwehr.webp"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Taubenabwehr' },
        ]}
      />

      {/* Problem */}
      <section className="section">
        <div className="container container--narrow" data-animate="fade-up">
          <h2>Das Taubenproblem an Gebäuden</h2>
          <p>Taubenkot ist nicht nur unansehnlich, sondern greift Fassaden, Dächer und Metallkonstruktionen an. Die aggressive Säure im Kot zersetzt Beton, Sandstein und Metall und verursacht langfristig erhebliche Bauschäden. Unbehandelt können die Reparaturkosten schnell in den fünf- bis sechsstelligen Bereich steigen.</p>
          <p>Gleichzeitig stellt Taubenkot ein ernsthaftes Gesundheitsrisiko dar. Er kann Krankheitserreger wie Salmonellen, Chlamydien und Pilzsporen enthalten, die beim Einatmen von Staubpartikeln übertragen werden. Besonders gefährdet sind Menschen mit geschwächtem Immunsystem.</p>
          <p>Für gewerbliche Betriebe – insbesondere in der Gastronomie und Lebensmittelbranche – bedeutet Taubenbefall zudem ein erhebliches Hygienerisiko und kann zu Bußgeldern bei Kontrollen führen.</p>
        </div>
      </section>

      {/* Systeme */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <h2>Taubenabwehrsysteme im Überblick</h2>
          </div>
          <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
            {SYSTEMS.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-card__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
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
              <h2>Warum ASV Taubenabwehr?</h2>
              <p>Unsere IHK-zertifizierten Techniker analysieren Ihr Gebäude und entwickeln ein maßgeschneidertes Konzept. Wir kennen die Gewohnheiten der Tauben und wissen, welches System wo am wirkungsvollsten ist – und vor allem welches zu Ihrem Gebäude und Budget passt.</p>
              <ul className="check-list">
                {VALUES.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
            </div>
            <div className="split__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/schaedlingsbekaempfer.webp" alt="ASV Pest Control Techniker bei der Taubenabwehr" width="972" height="800" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <h2>Unser Vorgehen</h2>
          </div>
          <div className="process__steps" data-animate="fade-up" data-animate-delay="100">
            {[
              { num: '01', title: 'Besichtigung', text: 'Kostenlose Begutachtung Ihres Gebäudes und Analyse des Taubenbefalls sowie der Niststellen.' },
              { num: '02', title: 'Konzept', text: 'Erstellung eines maßgeschneiderten Abwehrkonzepts mit transparenter Kostenkalkulation.' },
              { num: '03', title: 'Installation', text: 'Fachgerechte Montage der Abwehrsysteme durch unsere geschulten Techniker.' },
              { num: '04', title: 'Kontrolle', text: 'Nachkontrolle und bei Bedarf Anpassung der Systeme für optimalen Schutz.' },
            ].map((step, i) => (
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
        title="Taubenplage? Wir schützen Ihr Gebäude."
        text="Kostenlose Vor-Ort-Besichtigung und individuelles Abwehrkonzept."
        phoneFormatted={phone}
        phoneTel={phoneTel}
        ctaText="Kostenlos beraten lassen"
      />

      {/* FAQ */}
      <AsvFaq title="Häufige Fragen zur Taubenabwehr" faqs={FAQS} />
    </PageLayout>
  )
}
