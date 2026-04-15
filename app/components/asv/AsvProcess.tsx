interface ProcessStep {
  stepNumber?: string
  title: string
  description?: string
}

interface AsvProcessProps {
  title?: string
  steps: ProcessStep[]
}

export default function AsvProcess({ title = 'Unser Vorgehen', steps }: AsvProcessProps) {
  if (!steps || steps.length === 0) return null

  return (
    <section className="asv-section">
      <div className="asv-container">
        <h2 className="asv-section__title reveal">{title}</h2>
        <div className="asv-process reveal">
          {steps.map((step, i) => (
            <div key={i} className="asv-process__step">
              <div className="asv-process__number">{step.stepNumber || String(i + 1).padStart(2, '0')}</div>
              <h3 className="asv-process__title">{step.title}</h3>
              {step.description && <p className="asv-process__text">{step.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
