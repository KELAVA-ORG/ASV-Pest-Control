import Link from 'next/link'

interface AsvHeroProps {
  badge?: string
  title: string
  subtitle?: string
  heroImageUrl?: string
  phoneFormatted?: string
  phoneTel?: string
  ctaText?: string
  ctaLink?: string
  breadcrumbs?: { label: string; href?: string }[]
}

export default function AsvHero({
  badge,
  title,
  subtitle,
  heroImageUrl,
  phoneFormatted,
  phoneTel,
  ctaText = 'Kostenloses Angebot',
  ctaLink = '/express-angebot',
  breadcrumbs,
}: AsvHeroProps) {
  const bgStyle = heroImageUrl
    ? { backgroundImage: `url('${heroImageUrl}')` }
    : { background: 'var(--asv-dark)' }

  return (
    <section className="asv-hero" style={bgStyle}>
      <div className="asv-hero__overlay" />
      <div className="asv-container asv-hero__inner">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="asv-breadcrumb" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i}>
                {i > 0 && <span className="asv-breadcrumb__sep">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="asv-hero__content">
          {badge && <span className="asv-hero__badge">{badge}</span>}
          <h1 className="asv-hero__title">{title}</h1>
          {subtitle && <p className="asv-hero__subtitle">{subtitle}</p>}
          <div className="asv-hero__actions">
            <Link href={ctaLink} className="asv-btn asv-btn--primary asv-btn--lg">
              {ctaText}
            </Link>
            {phoneTel && phoneFormatted && (
              <a href={`tel:${phoneTel}`} className="asv-btn asv-btn--outline-white asv-btn--lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                {phoneFormatted}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
