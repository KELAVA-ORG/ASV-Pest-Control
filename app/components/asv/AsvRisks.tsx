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
    <section className="asv-section">
      <div className="asv-container asv-container--narrow">
        <h2 className="asv-section__title reveal">{title}</h2>
        <ul className="asv-risk-list reveal">
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
