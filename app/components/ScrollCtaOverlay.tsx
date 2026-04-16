interface ScrollCtaSettings {
  enabled?: boolean
  scrollTriggerPercent?: number
  showOnPages?: 'all' | 'specific' | 'exclude'
  specificPages?: string[]
  badgeText?: string
  title?: string
  text?: string
  phoneButtonLabel?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  bgColor?: { hex?: string }
  titleColor?: { hex?: string }
  textColor?: { hex?: string }
  primaryBtnBg?: { hex?: string }
  primaryBtnText?: { hex?: string }
}

interface Props {
  settings: ScrollCtaSettings | null
  phoneMain?: string
  phoneTel?: string
}

export default function ScrollCtaOverlay({ settings, phoneMain, phoneTel }: Props) {
  if (settings?.enabled === false) return null

  const trigger = settings?.scrollTriggerPercent ?? 40
  const showMode = settings?.showOnPages ?? 'all'
  const pages = settings?.specificPages ?? []

  // data-pages: JSON string of pages config for client-side filtering
  const dataPages = showMode === 'all' ? '' : JSON.stringify({ mode: showMode, pages })

  // Build inline CSS custom properties for theming
  const style: Record<string, string> = {}
  if (settings?.bgColor?.hex) style['--scta-bg'] = settings.bgColor.hex
  if (settings?.titleColor?.hex) style['--scta-title'] = settings.titleColor.hex
  if (settings?.textColor?.hex) style['--scta-text'] = settings.textColor.hex
  if (settings?.primaryBtnBg?.hex) style['--scta-btn-bg'] = settings.primaryBtnBg.hex
  if (settings?.primaryBtnText?.hex) style['--scta-btn-text'] = settings.primaryBtnText.hex

  const badgeText = settings?.badgeText || 'Wir sind gerade erreichbar'
  const title = settings?.title || 'Schädlingsproblem?'
  const text = settings?.text || 'Kostenlose Erstberatung & Express-Angebot innerhalb von 24h.'
  const ctaText = settings?.ctaButtonText || 'Express-Angebot'
  const ctaLink = settings?.ctaButtonLink || '/express-angebot'
  const phoneLabel = settings?.phoneButtonLabel || phoneMain || '+49 6196 – 52 30 10'
  const tel = phoneTel || '+496196523010'

  return (
    <div
      className="scroll-cta"
      id="scrollCta"
      role="dialog"
      aria-label="Kontakt-Angebot"
      data-trigger={trigger}
      data-pages={dataPages}
      style={style as React.CSSProperties}
    >
      <button className="scroll-cta__close" id="scrollCtaClose" aria-label="Schließen">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <div className="scroll-cta__badge">
        <span className="scroll-cta__badge-dot"></span>
        <span>{badgeText}</span>
      </div>
      <h3 className="scroll-cta__title">{title}</h3>
      <p className="scroll-cta__text">{text}</p>
      <div className="scroll-cta__actions">
        <a href={`tel:${tel}`} className="scroll-cta__btn scroll-cta__btn--phone">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          {phoneLabel}
        </a>
        <a href={ctaLink} className="scroll-cta__btn scroll-cta__btn--primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          {ctaText}
        </a>
      </div>
    </div>
  )
}
