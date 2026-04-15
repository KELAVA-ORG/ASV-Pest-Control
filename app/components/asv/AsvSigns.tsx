interface Sign {
  title: string
  description?: string
}

interface AsvSignsProps {
  title?: string
  signs: Sign[]
}

export default function AsvSigns({ title = 'Typische Anzeichen', signs }: AsvSignsProps) {
  if (!signs || signs.length === 0) return null

  return (
    <section className="asv-section asv-section--gray">
      <div className="asv-container">
        <h2 className="asv-section__title reveal">{title}</h2>
        <div className="asv-cards reveal">
          {signs.map((sign, i) => (
            <div key={i} className="asv-card">
              <div className="asv-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
              </div>
              <h3 className="asv-card__title">{sign.title}</h3>
              {sign.description && <p className="asv-card__text">{sign.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
