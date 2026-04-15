import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { navigationQuery, footerQuery, globalSettingsQuery } from '@/sanity/lib/queries'
import PageLayout from '@/app/components/PageLayout'
import AsvHero from '@/app/components/asv/AsvHero'
import AsvCtaBanner from '@/app/components/asv/AsvCtaBanner'
import Link from 'next/link'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Schädlingsbekämpfung – Alle Schädlinge | ASV Pest Control GmbH',
  description: 'Professionelle Lösungen für alle gängigen Schädlinge – IHK-zertifiziert, 24h Notdienst. Wespen, Ratten, Mäuse, Schaben, Ameisen, Bettwanzen und mehr.',
}

const PESTS = [
  {
    title: 'Wespen & Hornissen',
    sub: 'Nestentfernung',
    href: '/schaedlinge/wespen',
    desc: 'Sichere Nestentfernung und Umsiedlung durch zertifizierte Fachkräfte – schnell, diskret und tierschutzkonform.',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="8" rx="4" ry="5"/><path d="M8 13c0 3 1.8 6 4 6s4-3 4-6"/><path d="M9 8h6M9 10h6"/><path d="M7 6L4 3M17 6l3-3"/><path d="M8 13l-3 2M16 13l3 2"/></svg>,
  },
  {
    title: 'Ratten',
    sub: 'Rattenbekämpfung',
    href: '/schaedlinge/ratten',
    desc: 'Ratten übertragen Krankheitserreger und verursachen Gebäudeschäden. Wir bekämpfen den Befall und sichern Ihr Gebäude gegen Wiederbefall.',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="14" cy="13" rx="7" ry="5"/><path d="M7 13c-2-1-4 0-4 2"/><circle cx="17" cy="11" r="1" fill="currentColor"/><path d="M10 9c-1-2-3-3-5-2"/><path d="M10 9c-1-2 0-4 2-4"/><path d="M21 13c1 0 2 1 2 2"/></svg>,
  },
  {
    title: 'Mäuse',
    sub: 'Mäusebekämpfung',
    href: '/schaedlinge/maeuse',
    desc: 'Mäuse vermehren sich rasant und kontaminieren Lebensmittel. Gezielte Bekämpfung und Zugangswege-Versiegelung stoppen den Befall dauerhaft.',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="13" cy="14" rx="6" ry="4"/><circle cx="9" cy="10" r="3"/><circle cx="7" cy="8" r="1.5"/><circle cx="11" cy="8" r="1.5"/><circle cx="8" cy="10" r="0.5" fill="currentColor"/><path d="M19 14c2 0 3-1 3-1"/></svg>,
  },
  {
    title: 'Schaben & Kakerlaken',
    sub: 'Schabenbekämpfung',
    href: '/schaedlinge/schaben',
    desc: 'Schaben sind Krankheitsüberträger und in der Gastronomie besonders gefährlich. Gel- und Sprühverfahren beseitigen den Befall vollständig.',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="14" rx="5" ry="6"/><ellipse cx="12" cy="7" rx="3" ry="2.5"/><path d="M7 11l-3-2M17 11l3-2"/><path d="M7 14l-3 0M17 14l3 0"/><path d="M8 18l-2 2M16 18l2 2"/><path d="M10 5L8 2M14 5l2-3"/></svg>,
  },
  {
    title: 'Ameisen',
    sub: 'Ameisenbekämpfung',
    href: '/schaedlinge/ameisen',
    desc: 'Ameisen dringen in Küchen, Lagerräume und Gebäudesubstanz ein. Wir lokalisieren das Volk und bekämpfen es an der Wurzel.',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="6" r="2.5"/><ellipse cx="12" cy="12" rx="3" ry="2.5"/><ellipse cx="12" cy="18" rx="2.5" ry="2"/><path d="M9 10L6 7M15 10l3-3"/><path d="M9 14l-3 1M15 14l3 1"/><path d="M10 19l-2 2M14 19l2 2"/></svg>,
  },
  {
    title: 'Bettwanzen',
    sub: 'Bettwanzenbekämpfung',
    href: '/schaedlinge/bettwanzen',
    desc: 'Bettwanzen verstecken sich in Matratzen, Möbeln und Ritzen. Thermische Verfahren und gezielte Behandlung sorgen für vollständige Beseitigung.',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="14" rx="6" ry="7"/><ellipse cx="12" cy="6" rx="2.5" ry="2"/><path d="M6 10c-2-1-4 0-4 1M18 10c2-1 4 0 4 1"/><path d="M6 14c-2 0-4 1-4 2M18 14c2 0 4 1 4 2"/><path d="M10 8h4"/></svg>,
  },
  {
    title: 'Motten',
    sub: 'Mottenbekämpfung',
    href: '/schaedlinge/motten',
    desc: 'Textil- und Lebensmittelmotten werden artgerecht bekämpft. Wir beraten Sie auch zu Lagerung und Prävention.',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="14" rx="2" ry="4"/><path d="M10 10C6 8 4 4 5 2c2 1 5 3 7 8"/><path d="M14 10c4-2 6-6 5-8-2 1-5 3-7 8"/><path d="M10 14c-4 1-7 3-7 5 2 0 5-1 7-3"/><path d="M14 14c4 1 7 3 7 5-2 0-5-1-7-3"/><path d="M11 6l-1-3M13 6l1-3"/></svg>,
  },
  {
    title: 'Marder',
    sub: 'Marderabwehr',
    href: '/schaedlinge/marder',
    desc: 'Marder richten Schäden an Fahrzeugen, Dachböden und Leitungen an. Humane Vergrämung und dauerhafte Gebäudesicherung sind unsere Lösung.',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="14" cy="14" rx="7" ry="4"/><path d="M7 14c-2-1-4 0-5 1l2 1"/><ellipse cx="9" cy="10" rx="3.5" ry="2.5"/><path d="M6.5 8.5l-1-2"/><path d="M11.5 8.5l1-2"/><circle cx="8" cy="10" r="0.5" fill="currentColor"/><circle cx="10.5" cy="10" r="0.5" fill="currentColor"/><path d="M21 14c1.5 1 2 2 1 3"/></svg>,
  },
  {
    title: 'Flöhe',
    sub: 'Flohbekämpfung',
    href: '/schaedlinge/floehe',
    desc: 'Flohbefall betrifft Polster, Teppiche und Haustiere. Mehrstufige Bekämpfung aller Entwicklungsstadien beseitigt das Problem vollständig.',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="12" rx="4" ry="6"/><circle cx="12" cy="6" r="2.5"/><path d="M8 9l-3-1M16 9l3-1"/><path d="M8 15l-3 2M16 15l3 2"/><path d="M9 18c-1 2-1 3 0 4M15 18c1 2 1 3 0 4"/><path d="M10 12h4M10 14h4"/></svg>,
  },
  {
    title: 'Silberfische',
    sub: 'Silberfischbekämpfung',
    href: '/schaedlinge/silberfische',
    desc: 'Silberfische zeigen Feuchtigkeitsprobleme an und schädigen Bücher, Tapeten und Lebensmittel. Wir bekämpfen die Ursache und das Tier.',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M4 12c2-2 5-3 8-3s6 1 8 3c-2 2-5 3-8 3s-6-1-8-3z"/><path d="M20 12c1.5 0 3 .5 3 .5M20 12c1.5 0 2.5-.5 2.5-.5"/><path d="M4 12c-1.5 0-2-.5-2-.5M4 12c-1.5 0-2 .5-2 .5"/><path d="M20 12l2.5 1.5M4 12l-2.5 1.5"/><path d="M9 10l-1-2M15 10l1-2"/></svg>,
  },
]

export default async function SchaedlingePage() {
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
        title="Schädlingsbekämpfung – Alle Schädlinge im Überblick"
        subtitle="Professionelle Lösungen für alle gängigen Schädlinge – IHK-zertifiziert, 24h Notdienst"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Schädlinge' },
        ]}
      />

      {/* Intro */}
      <section className="section">
        <div className="container container--narrow" data-animate="fade-up">
          <h2>Ihr zuverlässiger Partner bei jedem Schädlingsbefall</h2>
          <p>ASV Pest Control betreut Privathaushalte, Gewerbebetriebe und öffentliche Einrichtungen im gesamten Rhein-Main-Gebiet und darüber hinaus. Unsere IHK-zertifizierten Techniker setzen moderne, umweltschonende Methoden ein und beraten Sie individuell zu nachhaltigen Schutzmaßnahmen.</p>
        </div>
      </section>

      {/* Pest Grid */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Unsere Leistungen</span>
            <h2>Alle Schädlingsarten</h2>
          </div>
          <div className="grid grid--5 pest-grid" data-animate="fade-up" data-animate-delay="100">
            {PESTS.map((p, i) => (
              <Link key={i} href={p.href} className="pest-card">
                <div className="pest-card__icon">{p.icon}</div>
                <h3 className="pest-card__title">{p.title}</h3>
                <p className="pest-card__text">{p.sub}</p>
                <span className="pest-card__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Taubenabwehr */}
      <section className="section">
        <div className="container">
          <div className="split" data-animate="fade-up">
            <div className="split__content">
              <span className="section__label">Spezialgebiet</span>
              <h2>Professionelle Taubenabwehr</h2>
              <p>Tauben verursachen erhebliche Schäden an Gebäuden und stellen ein Gesundheitsrisiko dar. Wir bieten maßgeschneiderte Lösungen zum Schutz Ihrer Immobilie – von Spikesystemen über Netze bis hin zu elektrischen Abwehrsystemen.</p>
              <ul className="check-list">
                <li>Dauerhafte Vergrämungssysteme</li>
                <li>Gebäudeschutz ohne optische Beeinträchtigung</li>
                <li>Reinigung und Desinfektion von Taubenkot</li>
              </ul>
              <Link href="/taubenabwehr" className="btn btn--ghost">Mehr erfahren</Link>
            </div>
            <div className="split__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/schaedlingsbekaempfer.webp" alt="ASV Pest Control Techniker" width="972" height="800" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AsvCtaBanner
        title="Schädlingsbefall? Wir helfen sofort."
        text="Fordern Sie jetzt Ihr kostenloses Express-Angebot an – unverbindlich und schnell."
        phoneFormatted={phone}
        phoneTel={phoneTel}
      />
    </PageLayout>
  )
}
