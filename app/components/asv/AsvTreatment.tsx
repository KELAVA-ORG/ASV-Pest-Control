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
    <section className="asv-section asv-section--gray">
      <div className="asv-container">
        <div className="asv-split reveal">
          <div className="asv-split__content">
            {title && <h2>{title}</h2>}
            {text && text.length > 0 && (
              <div className="asv-prose">
                <PortableText value={text as Parameters<typeof PortableText>[0]['value']} />
              </div>
            )}
            {checkList && checkList.length > 0 && (
              <ul className="asv-check-list">
                {checkList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          {imageUrl && (
            <div className="asv-split__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={imageAlt || ''} loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
