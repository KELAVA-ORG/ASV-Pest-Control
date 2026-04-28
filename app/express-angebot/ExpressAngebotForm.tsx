'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import FormRenderer from '@/app/components/FormRenderer'
import type { FormData } from '@/app/[slug]/page'

const CONTACT_FACTS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    title: 'Telefonische Sofort-Hilfe',
    text: 'Rufen Sie uns direkt an – wir beraten Sie kostenlos.',
    cta: <a href="tel:+496196523010" style={{ color: 'var(--brand-red)', fontWeight: 700 }}>+49 6196 – 52 30 10</a>,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: '24h Notdienst',
    text: 'Bei akuter Gefährdung sind wir auch außerhalb der Geschäftszeiten für Sie da.',
    cta: null,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
      </svg>
    ),
    title: 'Kostenlose Beratung',
    text: 'Unverbindliche Erstberatung – ohne versteckte Kosten.',
    cta: null,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'IHK-zertifiziert',
    text: 'Alle Techniker sind IHK-geprüfte Schädlingsbekämpfer.',
    cta: null,
  },
]

const FAQS = [
  { q: 'Wie schnell erhalte ich ein Angebot?', a: 'Wir melden uns innerhalb von 24 Stunden bei Ihnen. Bei dringenden Fällen empfehlen wir den direkten Anruf.' },
  { q: 'Ist das Angebot wirklich kostenlos und unverbindlich?', a: 'Ja, absolut. Die Erstberatung und das Angebot sind vollständig kostenlos und ohne jede Verpflichtung.' },
  { q: 'Welche Informationen benötige ich für das Formular?', a: 'Name, Kontaktdaten, Postleitzahl und die Art des Schädlingsbefalls – mehr brauchen wir zunächst nicht.' },
  { q: 'Muss ich für ein Angebot vor Ort sein?', a: 'Für die Erstberatung oft nicht. Viele Fälle können wir telefonisch oder per E-Mail einschätzen.' },
]

function FaqItem({ q, a }: { q: string; a: string }) {
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
        <span>{q}</span>
        <svg className="accordion__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="10" y1="4" x2="10" y2="16"/>
          <line x1="4" y1="10" x2="16" y2="10"/>
        </svg>
      </button>
      <div className="accordion__content" ref={contentRef} aria-hidden="true" style={{ maxHeight: '0' }}>
        <div className="accordion__body"><p>{a}</p></div>
      </div>
    </div>
  )
}

interface Props {
  form: FormData | null
}

export default function ExpressAngebotForm({ form }: Props) {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="split" data-animate="fade-up" style={{ alignItems: 'flex-start' }}>

            {/* Formular aus Sanity */}
            <div className="split__content">
              <h2 style={{ marginBottom: '1.5rem' }}>Kostenloses Angebot anfordern</h2>
              {form ? (
                <FormRenderer form={form} />
              ) : (
                <p style={{ color: 'var(--gray-500)' }}>
                  Das Formular wird gerade geladen. Bitte rufen Sie uns direkt an:{' '}
                  <a href="tel:+496196523010" style={{ color: 'var(--brand-red)', fontWeight: 700 }}>
                    +49 6196 – 52 30 10
                  </a>
                </p>
              )}
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '1rem' }}>
                * Pflichtfelder. Ihre Daten werden gemäß unserer{' '}
                <Link href="/datenschutz" style={{ color: 'var(--brand-red)' }}>Datenschutzerklärung</Link>{' '}
                verarbeitet.
              </p>
            </div>

            {/* Sidebar */}
            <div className="split__content">
              <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--gray-100)' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Sofort-Hilfe</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {CONTACT_FACTS.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--brand-red)', flexShrink: 0, marginTop: '2px' }}>{f.icon}</div>
                      <div>
                        <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{f.title}</strong>
                        <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', margin: 0 }}>{f.text}</p>
                        {f.cta && <div style={{ marginTop: '0.5rem' }}>{f.cta}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--gray">
        <div className="container container--narrow">
          <div className="section__header" data-animate="fade-up">
            <h2>Häufige Fragen</h2>
          </div>
          <div className="accordion" data-animate="fade-up">
            {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>
    </>
  )
}
