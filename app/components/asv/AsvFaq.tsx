'use client'

import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface AsvFaqProps {
  title?: string
  faqs: FaqItem[]
}

export default function AsvFaq({ title = 'Häufig gestellte Fragen', faqs }: AsvFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="asv-section asv-section--gray">
      <div className="asv-container">
        <h2 className="asv-section__title reveal">{title}</h2>
        <div className="asv-accordion reveal">
          {faqs.map((faq, i) => (
            <div key={i} className={`asv-accordion__item${openIndex === i ? ' asv-accordion__item--open' : ''}`}>
              <button
                className="asv-accordion__trigger"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.question}</span>
                <svg className="asv-accordion__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  {openIndex === i
                    ? <line x1="4" y1="10" x2="16" y2="10"/>
                    : <><line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/></>
                  }
                </svg>
              </button>
              {openIndex === i && (
                <div className="asv-accordion__body">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
