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
    <section className="section">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <h2>{title}</h2>
        </div>
        <div className="process__steps" data-animate="fade-up">
          {steps.map((step, i) => (
            <div key={i} className="process__step">
              <div className="process__number">{step.stepNumber || String(i + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              {step.description && <p>{step.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
