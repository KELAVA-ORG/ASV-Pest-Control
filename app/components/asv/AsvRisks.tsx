interface Risk {
  title: string
  description?: string
}

interface AsvRisksProps {
  title?: string
  risks: Risk[]
}

export default function AsvRisks({ title = 'Gefahren und Risiken', risks }: AsvRisksProps) {
  if (!risks || risks.length === 0) return null

  return (
    <section className="section">
      <div className="container container--narrow">
        <div className="section__header" data-animate="fade-up">
          <h2>{title}</h2>
        </div>
        <ul className="risk-list" data-animate="fade-up">
          {risks.map((risk, i) => (
            <li key={i}>
              {risk.title && <strong>{risk.title}:</strong>}
              {risk.description && ` ${risk.description}`}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
