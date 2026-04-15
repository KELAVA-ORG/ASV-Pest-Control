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
    <section className="cta-banner">
      <div className="container">
        <h2>{title}</h2>
        {text && <p>{text}</p>}
        <div className="cta-banner__actions">
          <a href={ctaLink} className="btn btn--white btn--lg">{ctaText}</a>
          {phoneTel && phoneFormatted && (
            <a href={`tel:${phoneTel}`} className="btn btn--outline-white btn--lg">
              Jetzt anrufen: {phoneFormatted}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
