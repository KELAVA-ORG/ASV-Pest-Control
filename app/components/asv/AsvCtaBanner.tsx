interface AsvCtaBannerProps {
  title?: string
  text?: string
  phoneFormatted?: string
  phoneTel?: string
  ctaText?: string
  ctaLink?: string
}

export default function AsvCtaBanner({
  title = 'Schädlinge entdeckt? Wir helfen sofort.',
  text = 'Fordern Sie jetzt Ihr kostenloses Express-Angebot an.',
  phoneFormatted,
  phoneTel,
  ctaText = 'Express-Angebot anfordern',
  ctaLink = '/express-angebot',
}: AsvCtaBannerProps) {
  return (
    <section className="asv-cta-banner">
      <div className="asv-container">
        <h2 className="asv-cta-banner__title">{title}</h2>
        {text && <p className="asv-cta-banner__text">{text}</p>}
        <div className="asv-cta-banner__actions">
          <a href={ctaLink} className="asv-btn asv-btn--white asv-btn--lg">{ctaText}</a>
          {phoneTel && phoneFormatted && (
            <a href={`tel:${phoneTel}`} className="asv-btn asv-btn--outline-white asv-btn--lg">
              Jetzt anrufen: {phoneFormatted}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
