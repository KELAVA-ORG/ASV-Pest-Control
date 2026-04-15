import { PortableText } from '@portabletext/react'

interface AsvTreatmentProps {
  title?: string
  text?: unknown[]
  imageUrl?: string
  imageAlt?: string
  checkList?: string[]
}

export default function AsvTreatment({ title, text, imageUrl, imageAlt, checkList }: AsvTreatmentProps) {
  if (!title && !text && !checkList) return null

  return (
    <section className="section section--gray">
      <div className="container">
        <div className="split" data-animate="fade-up">
          <div className="split__content">
            {title && <h2>{title}</h2>}
            {text && text.length > 0 && (
              <PortableText value={text as Parameters<typeof PortableText>[0]['value']} />
            )}
            {checkList && checkList.length > 0 && (
              <ul className="check-list">
                {checkList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          {imageUrl && (
            <div className="split__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={imageAlt || ''} loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
