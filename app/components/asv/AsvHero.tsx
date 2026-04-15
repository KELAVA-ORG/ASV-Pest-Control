import Link from 'next/link'

interface Breadcrumb {
  label: string
  href?: string
}

interface AsvHeroProps {
  title: string
  subtitle?: string
  heroImageUrl?: string
  phoneFormatted?: string
  phoneTel?: string
  ctaText?: string
  ctaLink?: string
  breadcrumbs?: Breadcrumb[]
}

export default function AsvHero({
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
    : undefined

  return (
    <section className="hero hero--subpage" style={bgStyle}>
      <div className="container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="breadcrumb" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <>
                {i > 0 && <span key={`sep-${i}`} className="breadcrumb__sep">/</span>}
                {crumb.href
                  ? <Link key={`crumb-${i}`} href={crumb.href}>{crumb.label}</Link>
                  : <span key={`crumb-${i}`}>{crumb.label}</span>
                }
              </>
            ))}
          </nav>
        )}
        <h1>{title}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        {phoneTel && phoneFormatted && (
          <div className="hero__actions" style={{ marginTop: '1.5rem' }}>
            <Link href={ctaLink} className="btn btn--primary btn--lg">{ctaText}</Link>
            <a href={`tel:${phoneTel}`} className="btn btn--outline-white btn--lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              {phoneFormatted}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
