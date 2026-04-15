'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const PEST_OPTIONS = [
  'Wespen', 'Ratten', 'Mäuse', 'Schaben', 'Ameisen',
  'Bettwanzen', 'Motten', 'Marder', 'Flöhe', 'Silberfische',
  'Tauben', 'Sonstiges',
]

const CONTACT_FACTS = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    title: 'Telefonische Sofort-Hilfe',
    text: 'Rufen Sie uns direkt an – wir beraten Sie kostenlos.',
    cta: <a href="tel:+496196523010" style={{ color: 'var(--brand-red)', fontWeight: 700 }}>+49 6196 – 52 30 10</a>,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    title: '24h Notdienst',
    text: 'Bei akuter Gefährdung sind wir auch außerhalb der Geschäftszeiten für Sie da.',
    cta: null,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
    title: 'Kostenlose Beratung',
    text: 'Unverbindliche Erstberatung – ohne versteckte Kosten.',
    cta: null,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
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

export default function ExpressAngebotForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', plz: '', pest: '', message: '', privacy: false })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Bitte geben Sie Ihren Namen ein.'
    if (!form.phone.trim()) e.phone = 'Bitte geben Sie Ihre Telefonnummer ein.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    if (!form.plz.trim()) e.plz = 'Bitte geben Sie Ihre PLZ / Ihren Ort ein.'
    if (!form.pest) e.pest = 'Bitte wählen Sie eine Schädlingsart.'
    if (!form.privacy) e.privacy = 'Bitte akzeptieren Sie die Datenschutzbestimmungen.'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitted(true)
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="split" data-animate="fade-up" style={{ alignItems: 'flex-start' }}>
            {/* Form */}
            <div className="split__content">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" strokeWidth="1.5" style={{ marginBottom: '1.5rem' }}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  <h2>Vielen Dank!</h2>
                  <p style={{ color: 'var(--gray-600)' }}>Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                  <Link href="/" className="btn btn--primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Zurück zur Startseite</Link>
                </div>
              ) : (
                <form id="expressForm" onSubmit={handleSubmit} noValidate>
                  <h2 style={{ marginBottom: '1.5rem' }}>Kostenloses Angebot anfordern</h2>
                  {[
                    { id: 'name', label: 'Name *', type: 'text', placeholder: 'Ihr vollständiger Name', key: 'name' as const },
                    { id: 'phone', label: 'Telefon *', type: 'tel', placeholder: '+49 ...', key: 'phone' as const },
                    { id: 'email', label: 'E-Mail *', type: 'email', placeholder: 'ihre@email.de', key: 'email' as const },
                    { id: 'plz', label: 'PLZ / Ort *', type: 'text', placeholder: 'z.B. 60487 Frankfurt', key: 'plz' as const },
                  ].map(field => (
                    <div key={field.id} className="form__group">
                      <label className="form__label" htmlFor={field.id}>{field.label}</label>
                      <input id={field.id} type={field.type} className={`form__input${errors[field.key] ? ' form__input--error' : ''}`} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} />
                      {errors[field.key] && <span className="form__error form__error--visible">{errors[field.key]}</span>}
                    </div>
                  ))}
                  <div className="form__group">
                    <label className="form__label" htmlFor="pest">Schädlingsart *</label>
                    <select id="pest" className={`form__input${errors.pest ? ' form__input--error' : ''}`} value={form.pest} onChange={e => setForm(f => ({ ...f, pest: e.target.value }))}>
                      <option value="">Bitte wählen ...</option>
                      {PEST_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.pest && <span className="form__error form__error--visible">{errors.pest}</span>}
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="message">Nachricht (optional)</label>
                    <textarea id="message" className="form__input" rows={4} placeholder="Beschreiben Sie das Problem kurz ..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                  </div>
                  <div className="form__group">
                    <label className="form__checkbox">
                      <input type="checkbox" checked={form.privacy} onChange={e => setForm(f => ({ ...f, privacy: e.target.checked }))} />
                      <span>Ich habe die <Link href="/datenschutz" style={{ color: 'var(--brand-red)' }}>Datenschutzerklärung</Link> gelesen und akzeptiere sie. *</span>
                    </label>
                    {errors.privacy && <span className="form__error form__error--visible">{errors.privacy}</span>}
                  </div>
                  <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Kostenloses Angebot anfordern
                  </button>
                </form>
              )}
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
