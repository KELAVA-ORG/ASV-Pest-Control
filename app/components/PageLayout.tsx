'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface SanityImage {
  asset?: { url: string }
  alt?: string
}

interface DropdownItem {
  label: string
  link: string
  description?: string
}

interface MenuItem {
  label: string
  linkType?: string
  link?: string
  internalPage?: { _type?: string; slug: { current: string } }
  openInNewTab?: boolean
  mobileOnly?: boolean
  hasDropdown?: boolean
  dropdownItems?: DropdownItem[]
}

interface NavigationData {
  logoText?: string
  logoImage?: SanityImage
  menuItems?: MenuItem[]
  ctaEnabled?: boolean
  ctaText?: string
  ctaLink?: string
  ctaOpenInNewTab?: boolean
}

interface FooterData {
  logo?: SanityImage
  socialLinks?: Array<{ platform: string; url: string; label?: string }>
  footerLinks?: Array<{ label: string; link: string; openInNewTab?: boolean }>
  copyrightText?: string
}

interface PageLayoutProps {
  navigation: NavigationData | null
  footer: FooterData | null
  blogBasePath?: string
  children: React.ReactNode
}

// SVG icons for nav dropdown pest items
const PEST_NAV_ICONS: Record<string, React.ReactNode> = {
  'wespen': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="8" rx="4" ry="5"/><path d="M8 13c0 3 1.8 6 4 6s4-3 4-6"/><path d="M9 8h6M9 10h6"/><path d="M7 6L4 3M17 6l3-3"/><path d="M8 13l-3 2M16 13l3 2"/></svg>,
  'ratten': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="14" cy="13" rx="7" ry="5"/><path d="M7 13c-2-1-4 0-4 2"/><circle cx="17" cy="11" r="1" fill="currentColor"/><path d="M10 9c-1-2-3-3-5-2"/><path d="M10 9c-1-2 0-4 2-4"/><path d="M21 13c1 0 2 1 2 2"/></svg>,
  'maeuse': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="13" cy="14" rx="6" ry="4"/><circle cx="9" cy="10" r="3"/><circle cx="7" cy="8" r="1.5"/><circle cx="11" cy="8" r="1.5"/><circle cx="8" cy="10" r="0.5" fill="currentColor"/><path d="M19 14c2 0 3-1 3-1"/></svg>,
  'schaben': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="14" rx="5" ry="6"/><ellipse cx="12" cy="7" rx="3" ry="2.5"/><path d="M7 11l-3-2M17 11l3-2"/><path d="M7 14l-3 0M17 14l3 0"/><path d="M8 18l-2 2M16 18l2 2"/><path d="M10 5L8 2M14 5l2-3"/></svg>,
  'ameisen': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="6" r="2.5"/><ellipse cx="12" cy="12" rx="3" ry="2.5"/><ellipse cx="12" cy="18" rx="2.5" ry="2"/><path d="M9 10L6 7M15 10l3-3"/><path d="M9 14l-3 1M15 14l3 1"/><path d="M10 19l-2 2M14 19l2 2"/></svg>,
  'bettwanzen': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="14" rx="6" ry="7"/><ellipse cx="12" cy="6" rx="2.5" ry="2"/><path d="M6 10c-2-1-4 0-4 1M18 10c2-1 4 0 4 1"/><path d="M6 14c-2 0-4 1-4 2M18 14c2 0 4 1 4 2"/><path d="M10 8h4"/></svg>,
  'motten': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="14" rx="2" ry="4"/><path d="M10 10C6 8 4 4 5 2c2 1 5 3 7 8"/><path d="M14 10c4-2 6-6 5-8-2 1-5 3-7 8"/><path d="M10 14c-4 1-7 3-7 5 2 0 5-1 7-3"/><path d="M14 14c4 1 7 3 7 5-2 0-5-1-7-3"/><path d="M11 6l-1-3M13 6l1-3"/></svg>,
  'marder': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="14" cy="14" rx="7" ry="4"/><path d="M7 14c-2-1-4 0-5 1l2 1"/><ellipse cx="9" cy="10" rx="3.5" ry="2.5"/><path d="M6.5 8.5l-1-2"/><path d="M11.5 8.5l1-2"/><circle cx="8" cy="10" r="0.5" fill="currentColor"/><circle cx="10.5" cy="10" r="0.5" fill="currentColor"/><path d="M21 14c1.5 1 2 2 1 3"/></svg>,
  'floehe': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="12" rx="4" ry="6"/><circle cx="12" cy="6" r="2.5"/><path d="M8 9l-3-1M16 9l3-1"/><path d="M8 15l-3 2M16 15l3 2"/><path d="M9 18c-1 2-1 3 0 4M15 18c1 2 1 3 0 4"/><path d="M10 12h4M10 14h4"/></svg>,
  'silberfische': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12c2-2 5-3 8-3s6 1 8 3c-2 2-5 3-8 3s-6-1-8-3z"/><path d="M20 12c1.5 0 3 .5 3 .5M20 12c1.5 0 2.5-.5 2.5-.5"/><path d="M4 12c-1.5 0-2-.5-2-.5M4 12c-1.5 0-2 .5-2 .5"/><path d="M20 12l2.5 1.5M4 12l-2.5 1.5"/><path d="M9 10l-1-2M15 10l1-2"/></svg>,
}

export default function PageLayout({ navigation: nav, footer: foot, blogBasePath, children }: PageLayoutProps) {

  useEffect(() => {
    // 1. Sticky Header
    const header = document.getElementById('header')
    function handleHeaderScroll() {
      if (!header) return
      header.classList.toggle('header--scrolled', window.scrollY > 50)
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true })
    handleHeaderScroll()

    // 2. Mobile Menu
    const burgerBtn = document.getElementById('burgerBtn')
    const mainNav = document.getElementById('mainNav')

    function isMobileMenuOpen() {
      return mainNav?.classList.contains('nav--open') ?? false
    }
    function openMobileMenu() {
      burgerBtn?.classList.add('burger--active')
      mainNav?.classList.add('nav--open')
      document.body.style.overflow = 'hidden'
    }
    function closeMobileMenu() {
      burgerBtn?.classList.remove('burger--active')
      mainNav?.classList.remove('nav--open')
      document.body.style.overflow = ''
      closeAllDropdowns()
    }

    function burgerClick() {
      isMobileMenuOpen() ? closeMobileMenu() : openMobileMenu()
    }
    burgerBtn?.addEventListener('click', burgerClick)

    // Close on nav link click (except dropdown triggers on mobile)
    mainNav?.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        const parentItem = link.closest('.nav__item--dropdown')
        if (window.innerWidth <= 768 && parentItem && link === parentItem.querySelector('.nav__link')) return
        if (isMobileMenuOpen()) closeMobileMenu()
      })
    })

    // Close on ESC
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isMobileMenuOpen()) closeMobileMenu()
    }
    document.addEventListener('keydown', onKeyDown)

    // Close on outside click
    function onOutsideClick(e: MouseEvent) {
      if (isMobileMenuOpen() && !mainNav?.contains(e.target as Node) && !burgerBtn?.contains(e.target as Node)) {
        closeMobileMenu()
      }
    }
    document.addEventListener('click', onOutsideClick)

    // 3. Dropdown menus
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown')
    let dropdownTimeout: ReturnType<typeof setTimeout> | null = null

    function openDropdown(item: Element) { item.classList.add('dropdown--open') }
    function closeDropdown(item: Element) { item.classList.remove('dropdown--open') }
    function closeAllDropdowns() { dropdownItems.forEach(closeDropdown) }

    const dropdownListeners: Array<{ el: Element; type: string; fn: EventListener }> = []

    dropdownItems.forEach(item => {
      const triggerLink = item.querySelector('.nav__link')

      const onMouseEnter = () => {
        if (window.innerWidth <= 768) return
        if (dropdownTimeout) clearTimeout(dropdownTimeout)
        closeAllDropdowns()
        openDropdown(item)
      }
      const onMouseLeave = () => {
        if (window.innerWidth <= 768) return
        dropdownTimeout = setTimeout(() => closeDropdown(item), 150)
      }
      item.addEventListener('mouseenter', onMouseEnter)
      item.addEventListener('mouseleave', onMouseLeave)
      dropdownListeners.push({ el: item, type: 'mouseenter', fn: onMouseEnter })
      dropdownListeners.push({ el: item, type: 'mouseleave', fn: onMouseLeave })

      if (triggerLink) {
        const onMobileClick = (e: Event) => {
          if (window.innerWidth > 768) return
          e.preventDefault()
          item.classList.toggle('dropdown--open')
        }
        triggerLink.addEventListener('click', onMobileClick)
        dropdownListeners.push({ el: triggerLink, type: 'click', fn: onMobileClick })
      }
    })

    // 4. Scroll reveal
    const reveals = document.querySelectorAll('[data-animate]')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const delay = el.getAttribute('data-animate-delay')
          if (delay) el.style.transitionDelay = delay + 'ms'
          el.classList.add('is-visible')
          revealObserver.unobserve(el)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })
    reveals.forEach(el => revealObserver.observe(el))

    // 5. Sticky CTA (mobile)
    const stickyCta = document.getElementById('stickyCta')
    if (stickyCta) {
      document.body.classList.add('has-sticky-cta')
      function showStickyCta() {
        stickyCta?.classList.toggle('sticky-cta--visible', window.scrollY > 200)
      }
      window.addEventListener('scroll', showStickyCta, { passive: true })
      showStickyCta()
    }

    // 6. Scroll CTA (desktop)
    const scrollCta = document.getElementById('scrollCta')
    const scrollCtaClose = document.getElementById('scrollCtaClose')
    let scrollCtaDismissed = false

    if (scrollCta) {
      const triggerFraction = parseFloat(scrollCta.dataset.trigger || '40') / 100
      const pagesAttr = scrollCta.dataset.pages

      // Check page filter
      let shouldActivate = true
      if (pagesAttr) {
        try {
          const config = JSON.parse(pagesAttr) as { mode: string; pages: string[] }
          const currentPath = window.location.pathname
          const matches = config.pages.some(p =>
            p.endsWith('/') && p !== '/'
              ? currentPath.startsWith(p)
              : currentPath === p
          )
          shouldActivate = config.mode === 'specific' ? matches : !matches
        } catch { /* ignore parse errors */ }
      }

      if (shouldActivate) {
        const handleScrollCta = () => {
          if (scrollCtaDismissed) return
          const scrollable = document.documentElement.scrollHeight - window.innerHeight
          if (scrollable <= 0) return
          const scrolled = window.scrollY / scrollable
          scrollCta.classList.toggle('scroll-cta--visible', scrolled > triggerFraction)
        }
        window.addEventListener('scroll', handleScrollCta, { passive: true })
        scrollCtaClose?.addEventListener('click', () => {
          scrollCtaDismissed = true
          scrollCta.classList.remove('scroll-cta--visible')
        })
      }
    }

    return () => {
      window.removeEventListener('scroll', handleHeaderScroll)
      burgerBtn?.removeEventListener('click', burgerClick)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onOutsideClick)
      dropdownListeners.forEach(({ el, type, fn }) => el.removeEventListener(type, fn))
      revealObserver.disconnect()
    }
  }, [])

  // Nav data — logo always uses the local asset
  const logoImageUrl = '/images/ASV-logo-grad500-300x82-1.webp'
  const logoAlt = nav?.logoImage?.alt || nav?.logoText || 'ASV Pest Control GmbH'
  const logoText = nav?.logoText || 'ASV Pest Control'
  const ctaEnabled = nav?.ctaEnabled !== false
  const ctaText = nav?.ctaText || 'Express-Angebot'
  const ctaLink = nav?.ctaLink || '/express-angebot'

  // Footer data — logo always uses the local asset
  const footerLogoUrl = '/images/ASV-logo-grad500-300x82-1.webp'
  const footerLogoAlt = foot?.logo?.alt || 'ASV Pest Control GmbH'
  const footerLinks = foot?.footerLinks || [
    { label: 'Impressum', link: '/impressum' },
    { label: 'Datenschutz', link: '/datenschutz' },
  ]
  const copyright = foot?.copyrightText || `© ${new Date().getFullYear()} ASV Pest Control GmbH. Alle Rechte vorbehalten.`

  const phoneMain = '+49 6196 – 52 30 10'
  const phoneTel = '+496196523010'

  return (
    <>
      {/* ══════════════ HEADER ══════════════ */}
      <header className="header" id="header">
        <div className="container header__inner">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Link href="/" className="header__logo">
            <img src={logoImageUrl} alt={logoAlt} width="300" height="82" />
          </Link>

          {/* Nav */}
          <nav className="header__nav" id="mainNav">
            <ul className="nav__list">
              <li className="nav__item">
                <Link href="/" className="nav__link">Startseite</Link>
              </li>

              {/* Schädlinge dropdown */}
              <li className="nav__item nav__item--dropdown">
                <a href="/schaedlinge" className="nav__link">
                  Schädlinge
                  <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <div className="dropdown">
                  <div className="dropdown__inner">
                    {[
                      { label: 'Wespen', href: '/schaedlinge/wespen', key: 'wespen' },
                      { label: 'Ratten', href: '/schaedlinge/ratten', key: 'ratten' },
                      { label: 'Mäuse', href: '/schaedlinge/maeuse', key: 'maeuse' },
                      { label: 'Schaben', href: '/schaedlinge/schaben', key: 'schaben' },
                      { label: 'Ameisen', href: '/schaedlinge/ameisen', key: 'ameisen' },
                      { label: 'Bettwanzen', href: '/schaedlinge/bettwanzen', key: 'bettwanzen' },
                      { label: 'Motten', href: '/schaedlinge/motten', key: 'motten' },
                      { label: 'Marder', href: '/schaedlinge/marder', key: 'marder' },
                      { label: 'Flöhe', href: '/schaedlinge/floehe', key: 'floehe' },
                      { label: 'Silberfische', href: '/schaedlinge/silberfische', key: 'silberfische' },
                    ].map(item => (
                      <Link key={item.key} href={item.href} className="dropdown__link">
                        <span className="dropdown__icon">{PEST_NAV_ICONS[item.key]}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              <li className="nav__item">
                <Link href="/taubenabwehr" className="nav__link">Taubenabwehr</Link>
              </li>

              {/* Unternehmen dropdown */}
              <li className="nav__item nav__item--dropdown">
                <a href="#" className="nav__link">
                  Unternehmen
                  <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <div className="dropdown">
                  <div className="dropdown__inner">
                    <Link href="/ueber-uns" className="dropdown__link">Über uns</Link>
                    <Link href="/standorte" className="dropdown__link">Standorte</Link>
                    <Link href="/karriere" className="dropdown__link">Karriere</Link>
                    <Link href="/superexpel" className="dropdown__link">Superexpel</Link>
                  </div>
                </div>
              </li>
            </ul>

            {/* Mobile CTA inside nav */}
            <div className="nav__mobile-cta">
              <a href={`tel:${phoneTel}`} className="nav__mobile-phone">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {phoneMain}
              </a>
              {ctaEnabled && (
                <Link href={ctaLink} className="btn btn--primary nav__mobile-btn">{ctaText} anfordern</Link>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          {ctaEnabled && (
            <a href={ctaLink} className="btn btn--primary header__cta">{ctaText}</a>
          )}

          {/* Burger */}
          <button className="header__burger" id="burgerBtn" aria-label="Menü öffnen" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* ══════════════ PAGE CONTENT ══════════════ */}
      {children}

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            {/* Col 1: Logo + Beschreibung */}
            <div className="footer__col">
              <a href="/" className="footer__logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={footerLogoUrl} alt={footerLogoAlt} width="200" height="55" />
              </a>
              <p className="footer__desc">
                Professionelle Schädlingsbekämpfung seit über 30 Jahren. Diskret und zuverlässig.
              </p>
            </div>

            {/* Col 2: Schädlinge */}
            <div className="footer__col">
              <h4 className="footer__heading">Schädlinge</h4>
              <ul className="footer__links">
                {[
                  ['Wespen', '/schaedlinge/wespen'],
                  ['Ratten', '/schaedlinge/ratten'],
                  ['Mäuse', '/schaedlinge/maeuse'],
                  ['Schaben', '/schaedlinge/schaben'],
                  ['Ameisen', '/schaedlinge/ameisen'],
                  ['Bettwanzen', '/schaedlinge/bettwanzen'],
                  ['Motten', '/schaedlinge/motten'],
                  ['Marder', '/schaedlinge/marder'],
                  ['Flöhe', '/schaedlinge/floehe'],
                  ['Silberfische', '/schaedlinge/silberfische'],
                ].map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Col 3: Unternehmen */}
            <div className="footer__col">
              <h4 className="footer__heading">Unternehmen</h4>
              <ul className="footer__links">
                {[
                  ['Über uns', '/ueber-uns'],
                  ['Karriere', '/karriere'],
                  ['Superexpel', '/superexpel'],
                  ['Taubenabwehr', '/taubenabwehr'],
                  ['Express-Angebot', '/express-angebot'],
                ].map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Col 4: Kontakt */}
            <div className="footer__col">
              <h4 className="footer__heading">Kontakt</h4>
              <ul className="footer__contact">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <a href={`tel:${phoneTel}`}>{phoneMain}</a>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="M22 6l-10 7L2 6"/>
                  </svg>
                  <a href="mailto:info@asv-schaedlingsbekaempfung.de">info@asv-schaedlingsbekaempfung.de</a>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  <span>Mo–Fr: 08:00–18:00 Uhr</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>24h Notdienst verfügbar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer bottom — OUTSIDE the main container */}
        <div className="footer__bottom">
          <div className="container footer__bottom-inner">
            <p>{copyright}</p>
            <div className="footer__legal">
              {footerLinks.map((fl, idx) => (
                fl.link.startsWith('/') && !fl.openInNewTab
                  ? <Link key={idx} href={fl.link}>{fl.label}</Link>
                  : <a key={idx} href={fl.link} {...(fl.openInNewTab ? { target: '_blank', rel: 'noopener' } : {})}>{fl.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══════════════ STICKY MOBILE CTA ══════════════ */}
      <div className="sticky-cta" id="stickyCta">
        <div className="sticky-cta__status">
          <span className="sticky-cta__dot sticky-cta__dot--green"></span>
          <span className="sticky-cta__label">Wir sind erreichbar</span>
        </div>
        <div className="sticky-cta__buttons">
          <a href="/express-angebot" className="sticky-cta__btn sticky-cta__btn--form">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Anfrage senden
          </a>
          <a href={`tel:${phoneTel}`} className="sticky-cta__btn sticky-cta__btn--call">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Jetzt anrufen
          </a>
        </div>
      </div>

    </>
  )
}
