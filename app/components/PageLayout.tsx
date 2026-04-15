'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/* ───────────────────────────────────────────────────
   Types
   ─────────────────────────────────────────────────── */
interface SanityImage {
  asset?: { url: string }
  alt?: string
}

interface MenuItem {
  label: string
  linkType?: string
  link?: string
  internalPage?: { _type?: string; slug: { current: string } }
  openInNewTab?: boolean
  mobileOnly?: boolean
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

interface SocialLink {
  platform: string
  url: string
  label?: string
}

interface FooterLink {
  label: string
  link: string
  openInNewTab?: boolean
}

interface FooterData {
  logo?: SanityImage
  socialLinks?: SocialLink[]
  footerLinks?: FooterLink[]
  copyrightText?: string
}

interface PageLayoutProps {
  navigation: NavigationData | null
  footer: FooterData | null
  blogBasePath?: string
  children: React.ReactNode
}

/* ─── Social Media Icon Helper ─── */
function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'instagram':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    case 'facebook':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    case 'tiktok':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
    case 'youtube':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
    case 'twitter':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
    case 'linkedin':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
    default:
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  }
}

export default function PageLayout({ navigation: nav, footer: foot, blogBasePath, children }: PageLayoutProps) {
  useEffect(() => {
    // Navigation scroll effect
    const navEl = document.getElementById('nav')
    function handleNavScroll() {
      if (!navEl) return
      if (window.scrollY > 60) {
        navEl.classList.add('scrolled')
      } else {
        navEl.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true })

    // Mobile menu
    const navToggle = document.getElementById('navToggle')
    const mobileMenu = document.getElementById('mobileMenu')

    function toggleMobileMenu() {
      if (!navToggle || !mobileMenu) return
      navToggle.classList.toggle('active')
      mobileMenu.classList.toggle('active')
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : ''
    }

    function closeMobileMenu() {
      if (!navToggle || !mobileMenu) return
      navToggle.classList.remove('active')
      mobileMenu.classList.remove('active')
      document.body.style.overflow = ''
    }

    navToggle?.addEventListener('click', toggleMobileMenu)

    const mobileLinks = document.querySelectorAll('.mobile-menu__link')
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu)
    })

    // Scroll reveal
    const revealElements = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    })
    revealElements.forEach(el => revealObserver.observe(el))

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    function handleAnchorClick(this: HTMLAnchorElement, e: Event) {
      const href = this.getAttribute('href')
      if (!href) return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener)
    })

    return () => {
      window.removeEventListener('scroll', handleNavScroll)
      navToggle?.removeEventListener('click', toggleMobileMenu)
      mobileLinks.forEach(link => {
        link.removeEventListener('click', closeMobileMenu)
      })
      revealObserver.disconnect()
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener)
      })
    }
  }, [])

  // Navigation defaults
  const logoText = nav?.logoText || 'Mein Unternehmen'
  const logoImageUrl = nav?.logoImage?.asset?.url
  const logoAlt = nav?.logoImage?.alt || logoText
  const menuItems = nav?.menuItems || [
    { label: 'Über uns', link: '#ueber-uns' },
    { label: 'Speisekarte', link: '#speisekarte' },
    { label: 'Kontakt', link: '#kontakt' },
  ]
  const ctaEnabled = nav?.ctaEnabled !== false
  const ctaText = nav?.ctaText || 'Reservieren'
  const ctaLink = nav?.ctaLink || '#'
  const ctaNewTab = nav?.ctaOpenInNewTab !== false
  const desktopItems = menuItems.filter(item => !item.mobileOnly)

  // Helper: Link-URL aus MenuItem auflösen
  function resolveMenuLink(item: MenuItem): string {
    if (item.linkType === 'internal' && item.internalPage?.slug?.current) {
      const ref = item.internalPage
      const bp = blogBasePath || 'blog'
      if (ref._type === 'blogPost') return `/${bp}/${ref.slug.current}`
      if (ref._type === 'blogCategory') return `/${bp}/kategorie/${ref.slug.current}`
      return `/${ref.slug.current}`
    }
    return item.link || '#'
  }

  // Footer defaults
  const footerLogoUrl = foot?.logo?.asset?.url || ''
  const footerLogoAlt = foot?.logo?.alt || 'Logo'
  const socialLinks = foot?.socialLinks || []
  const footerLinks = foot?.footerLinks || [
    { label: 'Impressum', link: '/impressum' },
    { label: 'Datenschutz', link: '/datenschutz' },
  ]
  const copyrightText = foot?.copyrightText || `© ${new Date().getFullYear()} Alle Rechte vorbehalten.`

  return (
    <>
      {/* ═══ NAVIGATION ═══ */}
      <nav className="nav" id="nav">
        <Link href="/" className="nav__logo-text">
          {logoImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoImageUrl} alt={logoAlt} className="nav__logo-img" />
          ) : logoText}
        </Link>
        <ul className="nav__links">
          {desktopItems.map((item, idx) => {
            const href = resolveMenuLink(item)
            return (
              <li key={idx}>
                {href.startsWith('/') ? (
                  <Link href={href} className="nav__link">{item.label}</Link>
                ) : (
                  <a
                    href={href}
                    className="nav__link"
                    {...(item.openInNewTab ? { target: '_blank', rel: 'noopener' } : {})}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            )
          })}
          {ctaEnabled && (
            <li>
              <a
                href={ctaLink}
                className="nav__cta"
                {...(ctaNewTab ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {ctaText}
              </a>
            </li>
          )}
        </ul>
        <div className="nav__toggle" id="navToggle" aria-label="Menü öffnen">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu" id="mobileMenu">
        <div className="mobile-menu__scroll">
          {menuItems.map((item, idx) => {
            const href = resolveMenuLink(item)
            return href.startsWith('/') ? (
              <Link key={idx} href={href} className="mobile-menu__link">{item.label}</Link>
            ) : (
              <a
                key={idx}
                href={href}
                className="mobile-menu__link"
                {...(item.openInNewTab ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {item.label}
              </a>
            )
          })}
          {ctaEnabled && (
            <a
              href={ctaLink}
              className="mobile-menu__link mobile-menu__cta"
              {...(ctaNewTab ? { target: '_blank', rel: 'noopener' } : {})}
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>

      {/* ═══ PAGE CONTENT ═══ */}
      {children}

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footer__pattern"></div>
        <div className="footer__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={footerLogoUrl} alt={footerLogoAlt} className="footer__logo" />

          {socialLinks.length > 0 && (
            <div className="footer__social">
              {socialLinks.map((social, idx) => (
                <a key={idx} href={social.url} target="_blank" rel="noopener" className="footer__social-link" aria-label={social.platform}>
                  <SocialIcon platform={social.platform} />
                  {social.label && <span className="footer__social-label">{social.label}</span>}
                </a>
              ))}
            </div>
          )}

          {footerLinks.length > 0 && (
            <div className="footer__links">
              {footerLinks.map((fl, idx) => (
                fl.link.startsWith('/') && !fl.openInNewTab ? (
                  <Link key={idx} href={fl.link} className="footer__link">{fl.label}</Link>
                ) : (
                  <a key={idx} href={fl.link} className="footer__link" {...(fl.openInNewTab ? { target: '_blank', rel: 'noopener' } : {})}>{fl.label}</a>
                )
              ))}
            </div>
          )}

          <p className="footer__copy">{copyrightText}</p>
        </div>
      </footer>
    </>
  )
}
