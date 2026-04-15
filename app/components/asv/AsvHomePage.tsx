'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface GlobalSettings {
  phoneMain?: string
  phoneMainFormatted?: string
  phoneMainTel?: string
  companyName?: string
}

interface Props {
  settings?: GlobalSettings | null
}

const PESTS = [
  {
    title: 'Wespen', sub: 'Nestentfernung', href: '/schaedlinge/wespen',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="8" rx="4" ry="5"/><path d="M8 13c0 3 1.8 6 4 6s4-3 4-6"/><path d="M9 8h6M9 10h6"/><path d="M7 6L4 3M17 6l3-3"/><path d="M8 13l-3 2M16 13l3 2"/></svg>,
  },
  {
    title: 'Ratten', sub: 'Rattenbekämpfung', href: '/schaedlinge/ratten',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="14" cy="13" rx="7" ry="5"/><path d="M7 13c-2-1-4 0-4 2"/><circle cx="17" cy="11" r="1" fill="currentColor"/><path d="M10 9c-1-2-3-3-5-2"/><path d="M10 9c-1-2 0-4 2-4"/><path d="M21 13c1 0 2 1 2 2"/></svg>,
  },
  {
    title: 'Mäuse', sub: 'Mäusebekämpfung', href: '/schaedlinge/maeuse',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="13" cy="14" rx="6" ry="4"/><circle cx="9" cy="10" r="3"/><circle cx="7" cy="8" r="1.5"/><circle cx="11" cy="8" r="1.5"/><circle cx="8" cy="10" r="0.5" fill="currentColor"/><path d="M19 14c2 0 3-1 3-1"/></svg>,
  },
  {
    title: 'Schaben', sub: 'Schabenbekämpfung', href: '/schaedlinge/schaben',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="14" rx="5" ry="6"/><ellipse cx="12" cy="7" rx="3" ry="2.5"/><path d="M7 11l-3-2M17 11l3-2"/><path d="M7 14l-3 0M17 14l3 0"/><path d="M8 18l-2 2M16 18l2 2"/><path d="M10 5L8 2M14 5l2-3"/></svg>,
  },
  {
    title: 'Ameisen', sub: 'Ameisenbekämpfung', href: '/schaedlinge/ameisen',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="6" r="2.5"/><ellipse cx="12" cy="12" rx="3" ry="2.5"/><ellipse cx="12" cy="18" rx="2.5" ry="2"/><path d="M9 10L6 7M15 10l3-3"/><path d="M9 14l-3 1M15 14l3 1"/><path d="M10 19l-2 2M14 19l2 2"/></svg>,
  },
  {
    title: 'Bettwanzen', sub: 'Bettwanzenbekämpfung', href: '/schaedlinge/bettwanzen',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="14" rx="6" ry="7"/><ellipse cx="12" cy="6" rx="2.5" ry="2"/><path d="M6 10c-2-1-4 0-4 1M18 10c2-1 4 0 4 1"/><path d="M6 14c-2 0-4 1-4 2M18 14c2 0 4 1 4 2"/><path d="M10 8h4"/></svg>,
  },
  {
    title: 'Motten', sub: 'Mottenbekämpfung', href: '/schaedlinge/motten',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="14" rx="2" ry="4"/><path d="M10 10C6 8 4 4 5 2c2 1 5 3 7 8"/><path d="M14 10c4-2 6-6 5-8-2 1-5 3-7 8"/><path d="M10 14c-4 1-7 3-7 5 2 0 5-1 7-3"/><path d="M14 14c4 1 7 3 7 5-2 0-5-1-7-3"/><path d="M11 6l-1-3M13 6l1-3"/></svg>,
  },
  {
    title: 'Marder', sub: 'Marderabwehr', href: '/schaedlinge/marder',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="14" cy="14" rx="7" ry="4"/><path d="M7 14c-2-1-4 0-5 1l2 1"/><ellipse cx="9" cy="10" rx="3.5" ry="2.5"/><path d="M6.5 8.5l-1-2"/><path d="M11.5 8.5l1-2"/><circle cx="8" cy="10" r="0.5" fill="currentColor"/><circle cx="10.5" cy="10" r="0.5" fill="currentColor"/><path d="M21 14c1.5 1 2 2 1 3"/></svg>,
  },
  {
    title: 'Flöhe', sub: 'Flohbekämpfung', href: '/schaedlinge/floehe',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="12" rx="4" ry="6"/><circle cx="12" cy="6" r="2.5"/><path d="M8 9l-3-1M16 9l3-1"/><path d="M8 15l-3 2M16 15l3 2"/><path d="M9 18c-1 2-1 3 0 4M15 18c1 2 1 3 0 4"/><path d="M10 12h4M10 14h4"/></svg>,
  },
  {
    title: 'Silberfische', sub: 'Silberfischbekämpfung', href: '/schaedlinge/silberfische',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M4 12c2-2 5-3 8-3s6 1 8 3c-2 2-5 3-8 3s-6-1-8-3z"/><path d="M20 12c1.5 0 3 .5 3 .5M20 12c1.5 0 2.5-.5 2.5-.5"/><path d="M4 12c-1.5 0-2-.5-2-.5M4 12c-1.5 0-2 .5-2 .5"/><path d="M20 12l2.5 1.5M4 12l-2.5 1.5"/><path d="M9 10l-1-2M15 10l1-2"/></svg>,
  },
]

const SERVICES = [
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
    title: 'Inspektion & Analyse',
    text: 'Gründliche Begutachtung vor Ort – wir identifizieren den Schädlingsbefall und seine Ursachen.',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    title: 'Bekämpfung',
    text: 'Gezielte, sichere Maßnahmen mit modernsten Verfahren und zugelassenen Mitteln.',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>,
    title: 'Prävention',
    text: 'Nachhaltige Schutzmaßnahmen und Beratung, damit Schädlinge nicht wiederkommen.',
  },
]

const BENEFITS = [
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, title: 'Schnelle Reaktionszeit', text: 'Im Notfall sind wir innerhalb kürzester Zeit bei Ihnen – 24 Stunden am Tag, 7 Tage die Woche.' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>, title: 'IHK-zertifiziert', text: 'Alle unsere Techniker sind IHK-geprüft und bilden sich regelmäßig weiter.' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Diskret & zuverlässig', text: 'Wir arbeiten unauffällig und professionell – Ihre Privatsphäre ist uns wichtig.' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, title: 'Regional verwurzelt', text: 'Als lokales Unternehmen kennen wir die Region und sind schnell vor Ort.' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>, title: 'Kostenlose Beratung', text: 'Rufen Sie uns an – wir beraten Sie unverbindlich und erstellen ein transparentes Angebot.' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>, title: 'Garantie auf Leistung', text: 'Wir stehen für den Erfolg unserer Arbeit ein – mit Nachkontrolle und Zufriedenheitsgarantie.' },
]

const CITIES = ['Frankfurt', 'Wiesbaden', 'Mainz', 'Darmstadt', 'Offenbach', 'Hanau', 'Bad Homburg', 'Friedberg', 'Gießen', 'Aschaffenburg', 'Rüsselsheim', 'Oberursel']

const TESTIMONIALS = [
  { text: 'Schnelle und professionelle Hilfe bei unserem Wespenproblem. Das Team war innerhalb weniger Stunden vor Ort und hat das Nest sicher entfernt. Sehr empfehlenswert!', author: 'Thomas M.', location: 'Frankfurt am Main' },
  { text: 'Wir hatten einen hartnäckigen Rattenbefall im Keller. ASV Pest Control hat das Problem gründlich und diskret gelöst. Die Nachkontrolle war vorbildlich.', author: 'Sandra K.', location: 'Wiesbaden' },
  { text: 'Als Gastronomiebetrieb sind wir auf zuverlässige Schädlingsbekämpfung angewiesen. ASV betreut uns seit Jahren und wir sind äußerst zufrieden mit dem Service.', author: 'Marco R.', location: 'Mainz' },
]

const FAQS = [
  { q: 'Was kostet eine professionelle Schädlingsbekämpfung?', a: 'Die Kosten hängen von der Art des Befalls, der Größe der betroffenen Fläche und den erforderlichen Maßnahmen ab. Wir erstellen Ihnen nach einer kostenlosen Erstberatung ein transparentes Angebot – ohne versteckte Kosten.' },
  { q: 'Wie schnell können Sie vor Ort sein?', a: 'Im Notfall sind wir in der Regel innerhalb weniger Stunden bei Ihnen. Für reguläre Einsätze vereinbaren wir einen zeitnahen Termin, der in Ihren Zeitplan passt.' },
  { q: 'Sind die verwendeten Mittel sicher für Kinder und Haustiere?', a: 'Ja. Wir verwenden ausschließlich zugelassene und geprüfte Mittel. Selbstverständlich beraten wir Sie zu allen Sicherheitsmaßnahmen und Vorsichtshinweisen vor der Behandlung.' },
  { q: 'Bieten Sie auch vorbeugende Maßnahmen an?', a: 'Absolut. Prävention ist ein wichtiger Bestandteil unserer Arbeit. Wir bieten regelmäßige Monitoring-Programme und individuelle Schutzkonzepte für Privathaushalte und Gewerbebetriebe.' },
  { q: 'Arbeiten Sie auch für Gewerbebetriebe und Hausverwaltungen?', a: 'Ja, wir betreuen sowohl Privathaushalte als auch Gewerbebetriebe, Gastronomiebetriebe, Hausverwaltungen und öffentliche Einrichtungen. Gerne erstellen wir Ihnen ein maßgeschneidertes Angebot.' },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  function toggle() {
    const next = !open
    setOpen(next)
    if (contentRef.current) {
      contentRef.current.style.maxHeight = next ? contentRef.current.scrollHeight + 'px' : '0'
      contentRef.current.setAttribute('aria-hidden', next ? 'false' : 'true')
    }
  }

  return (
    <div className={`accordion__item${open ? ' accordion__item--active' : ''}`}>
      <button className="accordion__trigger" onClick={toggle} aria-expanded={open}>
        <span>{question}</span>
        <svg className="accordion__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="10" y1="4" x2="10" y2="16"/>
          <line x1="4" y1="10" x2="16" y2="10"/>
        </svg>
      </button>
      <div className="accordion__content" ref={contentRef} aria-hidden="true" style={{ maxHeight: '0' }}>
        <div className="accordion__body">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function AsvHomePage({ settings }: Props) {
  const phone = settings?.phoneMainFormatted || '+49 6196 – 52 30 10'
  const phoneTel = settings?.phoneMainTel || '+496196523010'

  return (
    <>
      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'ASV Pest Control GmbH',
        description: 'Professionelle Schädlingsbekämpfung mit über 30 Jahren Erfahrung',
        url: 'https://www.asv-schaedlingsbekaempfung.de',
        telephone: phoneTel,
        address: { '@type': 'PostalAddress', addressCountry: 'DE' },
        areaServed: 'Deutschland',
        priceRange: '$$',
      }) }} />

      {/* ── Hero ── */}
      <section
        className="hero hero--home"
        style={{ backgroundImage: "url('/images/kammerjaeger-desinfektion-kueche-scaled.webp')" }}
      >
        <div className="hero__overlay" />
        <div className="container hero__container">
          <div className="hero__content" data-animate="fade-up">
            <span className="hero__badge">Ihr Schädlingsbekämpfer in der Region</span>
            <h1 className="hero__title">Professionelle Schädlings&shy;bekämpfung</h1>
            <p className="hero__subtitle">
              Seit über 30 Jahren schützen wir Ihr Zuhause und Ihr Unternehmen – schnell, diskret und nachhaltig wirksam.
            </p>
            <div className="hero__actions">
              <Link href="/express-angebot" className="btn btn--primary btn--lg">Kostenloses Angebot</Link>
              <a href={`tel:${phoneTel}`} className="btn btn--white btn--lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Jetzt anrufen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__items" data-animate="fade-up">
            {[
              { num: '30+', label: 'Jahre Erfahrung' },
              { num: '20.000+', label: 'Zufriedene Kunden' },
              { num: '24h', label: 'Notdienst' },
              { num: 'IHK', label: 'Zertifiziert' },
            ].map((item, i) => (
              <div key={i} className="trust-bar__item">
                <span className="trust-bar__number">{item.num}</span>
                <span className="trust-bar__label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leistungsübersicht ── */}
      <section className="section" id="leistungen">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Unsere Leistungen</span>
            <h2>Umfassender Schutz vor Schädlingen</h2>
            <p className="section__desc">Von der Analyse über die Bekämpfung bis zur Prävention – wir bieten Ihnen professionelle Lösungen für jedes Schädlingsproblem.</p>
          </div>
          <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-card__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schädlinge Grid ── */}
      <section className="section section--gray" id="schaedlinge">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Schädlingsbekämpfung</span>
            <h2>Wir bekämpfen alle gängigen Schädlinge</h2>
            <p className="section__desc">Klicken Sie auf einen Schädling, um mehr über unsere spezialisierten Bekämpfungsmethoden zu erfahren.</p>
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
          <div className="text-center" style={{ marginTop: 'var(--space-10)' }} data-animate="fade-up">
            <Link href="/schaedlinge" className="btn btn--outline">Alle Schädlinge ansehen</Link>
          </div>
        </div>
      </section>

      {/* ── Taubenabwehr Teaser ── */}
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

      {/* ── So funktioniert's ── */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">In 4 Schritten</span>
            <h2>So funktioniert&apos;s</h2>
          </div>
          <div className="process__steps" data-animate="fade-up" data-animate-delay="100">
            {[
              { num: '01', title: 'Kontakt aufnehmen', text: 'Rufen Sie uns an oder nutzen Sie unser Express-Formular für eine kostenlose Erstberatung.' },
              { num: '02', title: 'Inspektion vor Ort', text: 'Unsere Experten begutachten den Befall und erstellen einen individuellen Bekämpfungsplan.' },
              { num: '03', title: 'Bekämpfung', text: 'Professionelle Beseitigung mit modernsten, umweltschonenden Verfahren.' },
              { num: '04', title: 'Nachkontrolle', text: 'Wir prüfen den Erfolg und beraten Sie zu vorbeugenden Maßnahmen.' },
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

      {/* ── Warum ASV ── */}
      <section className="section">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Ihre Vorteile</span>
            <h2>Warum ASV Pest Control?</h2>
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

      {/* ── Einsatzgebiete ── */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Einsatzgebiete</span>
            <h2>Wir sind in Ihrer Nähe</h2>
            <p className="section__desc">Schnell vor Ort – unser Einsatzgebiet umfasst die gesamte Region.</p>
          </div>
          <div className="region" data-animate="fade-up" data-animate-delay="100">
            <div className="region__cities">
              {CITIES.map((city, i) => (
                <span key={i} className="region__city">{city}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Kundenstimmen</span>
            <h2>Das sagen unsere Kunden</h2>
          </div>
          <div className="testimonial-grid" data-animate="fade-up" data-animate-delay="100">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial">
                <div className="testimonial__stars">★★★★★</div>
                <p className="testimonial__text">&ldquo;{t.text}&rdquo;</p>
                <p className="testimonial__author">{t.author}</p>
                <p className="testimonial__location">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section--gray">
        <div className="container container--narrow">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Häufige Fragen</span>
            <h2>FAQ</h2>
          </div>
          <div className="accordion" data-animate="fade-up" data-animate-delay="100">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="container" data-animate="fade-up">
          <h2>Schädlingsbefall? Wir helfen sofort.</h2>
          <p>Fordern Sie jetzt Ihr kostenloses Express-Angebot an – unverbindlich und schnell.</p>
          <div className="cta-banner__actions">
            <Link href="/express-angebot" className="btn btn--white btn--lg">Express-Angebot anfordern</Link>
            <a href={`tel:${phoneTel}`} className="btn btn--outline-white btn--lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Jetzt anrufen
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
