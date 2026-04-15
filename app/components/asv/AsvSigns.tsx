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
    <section className="section section--gray">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <h2>{title}</h2>
        </div>
        <div className="grid grid--3" data-animate="fade-up" data-animate-delay="100">
          {signs.map((sign, i) => (
            <div key={i} className="service-card">
              <div className="service-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
              </div>
              <h3>{sign.title}</h3>
              {sign.description && <p>{sign.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
