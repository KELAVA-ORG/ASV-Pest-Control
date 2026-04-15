interface Testimonial {
  text: string
  author: string
  location?: string
  rating?: number
}

interface AsvTestimonialsProps {
  title?: string
  testimonials: Testimonial[]
}

export default function AsvTestimonials({
  title = 'Das sagen unsere Kunden',
  testimonials,
}: AsvTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="asv-section">
      <div className="asv-container">
        <h2 className="asv-section__title reveal">{title}</h2>
        <div className="asv-cards asv-cards--testimonials reveal">
          {testimonials.map((t, i) => (
            <div key={i} className="asv-testimonial">
              {t.rating && (
                <div className="asv-testimonial__stars" aria-label={`${t.rating} von 5 Sternen`}>
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <svg key={si} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
              )}
              <p className="asv-testimonial__text">&ldquo;{t.text}&rdquo;</p>
              <div className="asv-testimonial__author">
                <strong>{t.author}</strong>
                {t.location && <span className="asv-testimonial__location">{t.location}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
