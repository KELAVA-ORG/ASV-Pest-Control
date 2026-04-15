'use client'

import { useRef, useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface AsvFaqProps {
  title?: string
  faqs: FaqItem[]
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
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

export default function AsvFaq({ title = 'Häufig gestellte Fragen', faqs }: AsvFaqProps) {
  if (!faqs || faqs.length === 0) return null

  return (
    <section className="section section--gray">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <h2>{title}</h2>
        </div>
        <div className="accordion" data-animate="fade-up" data-animate-delay="100">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
