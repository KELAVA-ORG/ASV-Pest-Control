'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/* ───────────────────────────────────────────────────
   Types
   ─────────────────────────────────────────────────── */
interface Dish {
  name: string
  description?: string
  price: string
  allergens?: string
}

interface MenuCategory {
  name: string
  order: number
  dishes: Dish[]
}

interface OpeningHoursData {
  title: string
  hours: { day: string; times: string[] }[]
  specialHours?: {
    enabled?: boolean
    label?: string
    items?: { day: string; times: string[] }[]
  }
}

interface SanityImage {
  asset?: { url: string }
  hotspot?: { x: number; y: number }
  alt?: string
}

interface SanityFile {
  asset?: { url: string }
}

interface SiteContent {
  heroLogo?: SanityImage
  heroTagline?: string
  heroSubtitle?: string
  heroBackgroundType?: 'image' | 'video'
  heroBackgroundImage?: SanityImage
  heroBackgroundVideo?: string
  heroBackgroundVideoFile?: SanityFile
  heroIllustration?: SanityImage
  heroCtaText?: string
  heroCtaLink?: string
  heroCtaEnabled?: boolean
  aboutTitle?: string
  aboutText1?: string
  aboutText2?: string
  address?: string
  phone?: string
  email?: string
}

interface MenuItem {
  label: string
  linkType?: string
  link?: string
  internalPage?: { slug: { current: string } }
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

interface HomePageProps {
  menuCategories: MenuCategory[] | null
  sideCategories: MenuCategory[] | null
  openingHours: OpeningHoursData | null
  siteContent: SiteContent | null
  navigation: NavigationData | null
  footer: FooterData | null
}

/* ───────────────────────────────────────────────────
   Static fallback data
   ─────────────────────────────────────────────────── */
const fallbackMenuCategories: MenuCategory[] = [
  {
    name: 'Vorspeisen',
    order: 1,
    dishes: [
      { name: 'Sauerteigbrot', description: 'Mit Aufstrich des Tages', price: '4,50', allergens: 'Gluten, Laktose' },
      { name: 'Ziegenpeters kleine Reise', description: 'In Salzkruste gegarte Rote Beete, Ziegenkäse, geröstete Walnüsse, karamellisierte Birne', price: '18,90', allergens: 'Laktose, Nüsse' },
      { name: 'Geschnittenes klassisch und schick', description: 'Rinder-Tartar, Kapern, Gewürzgurken, gebratenes Wachtelei', price: '24,90', allergens: 'Ei' },
      { name: 'Verzückt zwischen Himmel und Erde', description: 'Zweierlei Blutwurst, gebratener Apfel, Kartoffelpüree, Röstzwiebeln', price: '18,90', allergens: 'Laktose, Sellerie, Sulfit' },
      { name: 'Nordsees blaue Stunde', description: 'Nordseekrabben-Cocktail, Meeresspargel, eingelegte Orangenfilets, Cocktailsoße', price: '22,90', allergens: 'Laktose, Krebstiere, Ei' },
      { name: 'Feines aus dem Frankfurter Kräutergarten', description: 'Frankfurter Grüne Soße, dreierlei Kartoffeln, gekochtes Ei', price: '13,90', allergens: 'Laktose, Ei' },
      { name: 'Gepflücktes grünes Glück', description: 'Wildkräutersalat, Backobst — Optional: Riesengarnelen (pro Stück 8,90)', price: '12,90', allergens: 'Senf, Sellerie · Optional: Krebstiere' },
    ],
  },
  {
    name: 'Hauptgerichte',
    order: 2,
    dishes: [
      { name: 'Glückswickel', description: 'Kohlroulade, Rinderhack, Petersilienkartoffeln', price: '21,90', allergens: 'Gluten, Laktose, Ei, Sellerie, Sulfit' },
      { name: 'Kleines großes Pausbäckchen', description: 'Geschmorte Ochsenbäckchen, Portweinsoße, Kartoffelpüree', price: '28,90', allergens: 'Laktose, Sellerie, Sulfit' },
      { name: 'Das aufgeplusterte Gold', description: 'Wiener Kalbsschnitzel, Kapern, Sardellen, Preiselbeeren, lauwarmer Kartoffelsalat', price: '38,90', allergens: 'Gluten, Laktose, Ei, Senf, Fisch, Sellerie' },
      { name: 'Knuspertraum', description: 'Paniertes Schweinekotelett, Bratkartoffeln, Speck, Zwiebeln', price: '28,90', allergens: 'Gluten, Laktose, Ei' },
      { name: 'Filet Mignon mit beschwipster Charlotte', description: 'Filet Mignon 250 g, Rotwein-Schalotten-Soße', price: '49,90', allergens: 'Laktose, Sulfit, Sellerie' },
      { name: 'Alpenspätzchen', description: 'Handgeschabte Spätzle, Bergkäse, Röstzwiebel', price: '21,90', allergens: 'Gluten, Laktose, Ei' },
      { name: 'Das Blumen-Blatt-Gedicht (Vegan)', description: 'Gebratener Blumenkohl, Süßkartoffelpüree, Blattspinat', price: '21,90', allergens: 'Sellerie, Soja' },
      { name: 'Ein Männlein steht im Walde', description: 'Gebratener Serviettenknödel, Pilzrahmsoße', price: '23,90', allergens: 'Gluten, Laktose, Ei' },
      { name: 'Wie Kraut und Zander', description: 'Gebratenes Zanderfilet, Rahm-Sauerkraut, Salbei', price: '38,90', allergens: 'Laktose, Fisch, Sulfit' },
      { name: "Fritz' Frikassee", description: 'Hühnerfrikassee, Erbsen, Karotten, Pilze, Reis', price: '26,90', allergens: 'Gluten, Laktose, Lupinen, Sulfit' },
    ],
  },
  {
    name: 'Suppen',
    order: 3,
    dishes: [
      { name: 'Gläsernes Gold', description: 'Rinder-Consommé, Kräuterflädle, Eierstich', price: '12,90', allergens: 'Gluten, Ei, Sellerie' },
      { name: 'Ausgeschlafene Prinzessin', description: 'Erbsenschaumsüppchen, Kichererbsen-Crunch', price: '9,90', allergens: 'Laktose, Lupinen' },
      { name: 'Glückspilz', description: 'Steinpilz-Essenz, Pilz-Zigarello', price: '11,90', allergens: 'Sellerie' },
    ],
  },
  {
    name: 'Desserts',
    order: 4,
    dishes: [
      { name: 'Kaisers liebster Schmarrn', description: 'Kaiserschmarrn für 2 Personen, Apfelmus, Kirschen, Vanilleeis', price: '23,90', allergens: 'Gluten, Laktose, Ei' },
      { name: 'Ein Apfel in der Backstub', description: 'Apfelbeignets, Zimt, Vanilleeis', price: '11,90', allergens: 'Gluten, Laktose, Ei' },
      { name: 'Schneewittchens Beerengarten', description: 'Rote Grütze, Tonkabohnen-Schaum', price: '9,90', allergens: 'Laktose, Sulfit' },
      { name: 'Duett der Schokolade', description: 'Zartbitter- und weißes Schokoladenmousse', price: '12,90', allergens: 'Laktose' },
    ],
  },
  {
    name: 'Kids',
    order: 5,
    dishes: [
      { name: 'Reiberdatschi', description: 'Reibekuchen, Apfelmus', price: '12,90', allergens: 'Gluten, Ei' },
      { name: 'Ein Kindlein auf der Weide', description: 'Kleines Wiener Kalbsschnitzel, Fritten oder Kartoffelpüree', price: '19,90', allergens: 'Gluten, Ei, Laktose' },
    ],
  },
]

const fallbackSideCategories: MenuCategory[] = [
  {
    name: 'Beilagen',
    order: 6,
    dishes: [
      { name: 'Beilagensalat', price: '7,90' },
      { name: 'Fritten', price: '6,90' },
      { name: 'Getrüffelte Fritten', price: '11,90' },
      { name: 'Kartoffelpüree', price: '6,90', allergens: 'Laktose' },
      { name: 'Getrüffelte Kartoffelpüree', price: '11,90', allergens: 'Laktose' },
      { name: 'Gemüse der Saison', price: '6,90', allergens: 'Laktose, Sellerie' },
      { name: 'Blattspinat', price: '6,90' },
      { name: 'Bratkartoffel mit Speck', price: '6,90', allergens: 'Laktose' },
    ],
  },
]

const fallbackOpeningHours: OpeningHoursData = {
  title: 'Reguläre Öffnungszeiten',
  hours: [
    { day: 'Montag', times: ['12:00–14:30', '18:00–22:30'] },
    { day: 'Dienstag', times: ['12:00–14:30', '18:00–22:30'] },
    { day: 'Mittwoch', times: ['12:00–14:30', '18:00–22:30'] },
    { day: 'Donnerstag', times: ['12:00–14:30', '18:00–22:30'] },
    { day: 'Freitag', times: ['12:00–22:30'] },
    { day: 'Samstag', times: ['12:00–22:30'] },
    { day: 'Sonntag', times: ['Geschlossen'] },
  ],
  specialHours: {
    enabled: true,
    label: 'Ostern 2026',
    items: [
      { day: 'Karfreitag, 03.04.', times: ['18:00–22:30'] },
      { day: 'Samstag, 04.04.', times: ['12:00–22:30'] },
      { day: 'Ostersonntag, 05.04.', times: ['18:00–22:30'] },
      { day: 'Ostermontag, 06.04.', times: ['Geschlossen'] },
    ],
  },
}

const fallbackSiteContent: SiteContent = {
  heroTagline: 'Frankfurt am Main',
  heroSubtitle: 'Moderne deutsche Küche im Herzen von Frankfurt — wo Tradition auf zeitgenössischen Genuss trifft.',
  heroBackgroundType: 'image',
  heroCtaText: 'Tisch reservieren',
  heroCtaLink: '#',
  heroCtaEnabled: true,
  aboutTitle: 'Willkommen',
  aboutText1: 'Hier steht die Beschreibung Ihres Unternehmens.',
  aboutText2: '',
  address: 'Musterstraße 1\n12345 Musterstadt',
  phone: '0123 456789',
  email: 'info@example.com',
}

/* ───────────────────────────────────────────────────
   Delay class helpers for menu cards
   ─────────────────────────────────────────────────── */
const delayClasses = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3']

/* ───────────────────────────────────────────────────
   Component
   ─────────────────────────────────────────────────── */
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

export default function HomePage({ menuCategories, sideCategories, openingHours, siteContent, navigation, footer }: HomePageProps) {
  const menu = menuCategories && menuCategories.length > 0 ? menuCategories : fallbackMenuCategories
  const sides = sideCategories && sideCategories.length > 0 ? sideCategories : fallbackSideCategories
  const hours = openingHours || fallbackOpeningHours
  const content = siteContent || fallbackSiteContent
  const nav = navigation
  const foot = footer

  const allMenuCards = [...menu, ...sides]

  useEffect(() => {
    // Navigation scroll effect
    const nav = document.getElementById('nav')
    function handleNavScroll() {
      if (!nav) return
      if (window.scrollY > 60) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
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

    // Cleanup
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

  const showSpecialHours = hours.specialHours?.enabled && (hours.specialHours?.items?.length ?? 0) > 0
  const specialLabel = hours.specialHours?.label || ''
  const specialItems = hours.specialHours?.items ?? []

  // Helper: Link-URL aus MenuItem auflösen (manuell oder interne Referenz)
  function resolveMenuLink(item: MenuItem): string {
    if (item.linkType === 'internal' && item.internalPage?.slug?.current) {
      return `/${item.internalPage.slug.current}`
    }
    return item.link || '#'
  }

  return (
    <>
      {/* ═══ NAVIGATION ═══ */}
      {(() => {
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

        return (
          <>
            <nav className="nav" id="nav">
              <a href="#hero" className="nav__logo-text">
                {logoImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoImageUrl} alt={logoAlt} className="nav__logo-img" />
                ) : logoText}
              </a>
              <ul className="nav__links">
                {desktopItems.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={resolveMenuLink(item)}
                      className="nav__link"
                      {...(item.openInNewTab ? { target: '_blank', rel: 'noopener' } : {})}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
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

            {/* Mobile Menu Overlay — scrollbar für viele Links */}
            <div className="mobile-menu" id="mobileMenu">
              <div className="mobile-menu__scroll">
                {menuItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={resolveMenuLink(item)}
                    className="mobile-menu__link"
                    {...(item.openInNewTab ? { target: '_blank', rel: 'noopener' } : {})}
                  >
                    {item.label}
                  </a>
                ))}
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
          </>
        )
      })()}

      {/* ═══ HERO ═══ */}
      {(() => {
        const heroLogoUrl = content.heroLogo?.asset?.url || ''
        const heroLogoAlt = content.heroLogo?.alt || 'Logo'
        const heroTagline = content.heroTagline || 'Frankfurt am Main'
        const heroSubtitle = content.heroSubtitle || ''
        const heroBgType = content.heroBackgroundType || 'image'
        const heroBgImageUrl = content.heroBackgroundImage?.asset?.url
        const heroBgVideoUrl = content.heroBackgroundVideo || content.heroBackgroundVideoFile?.asset?.url
        const heroIllustrationUrl = content.heroIllustration?.asset?.url || ''
        const heroIllustrationAlt = content.heroIllustration?.alt || 'Illustration'
        const heroCtaText = content.heroCtaText || 'Tisch reservieren'
        const heroCtaLink = content.heroCtaLink || '#'
        const heroCtaEnabled = content.heroCtaEnabled !== false

        return (
          <section className="hero" id="hero">
            {/* Background: Video oder Bild */}
            {heroBgType === 'video' && heroBgVideoUrl ? (
              <video
                className="hero__video-bg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src={heroBgVideoUrl} type="video/mp4" />
              </video>
            ) : heroBgImageUrl ? (
              <div
                className="hero__image-bg"
                style={{ backgroundImage: `url(${heroBgImageUrl})` }}
              />
            ) : (
              <div className="hero__pattern"></div>
            )}
            <div className="hero__gradient"></div>

            <div className="hero__content">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroLogoUrl} alt={heroLogoAlt} className="hero__logo" />
              {heroTagline && <p className="hero__tagline">{heroTagline}</p>}
              <div className="hero__divider"></div>
              {heroSubtitle && <p className="hero__subtitle">{heroSubtitle}</p>}
              {heroCtaEnabled && (
                <a href={heroCtaLink} target="_blank" rel="noopener" className="hero__cta">
                  {heroCtaText}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              )}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroIllustrationUrl} alt={heroIllustrationAlt} className="hero__illustration" />
            <div className="hero__scroll">
              <span className="hero__scroll-text">Entdecken</span>
              <div className="hero__scroll-line"></div>
            </div>
          </section>
        )
      })()}

      {/* ═══ ÜBER UNS ═══ */}
      <section className="about" id="ueber-uns">
        <div className="about__inner">
          <div className="about__text">
            <p className="about__label reveal">Über uns</p>
            <h2 className="about__heading reveal reveal-delay-1">{content.aboutTitle}</h2>
            <div className="about__line reveal reveal-delay-2"></div>
            <div className="about__body reveal reveal-delay-3">
              <p>{content.aboutText1}</p>
              <p>{content.aboutText2}</p>
            </div>
          </div>
          <div className="about__image-wrap reveal reveal-delay-2">
            <div className="about__image-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="" alt="Illustration" className="about__illustration" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SPEISEKARTE ═══ */}
      <section className="menu" id="speisekarte">
        <div className="menu__pattern"></div>
        <div className="menu__inner">
          <div className="menu__header">
            <p className="menu__label reveal">Kulinarik</p>
            <h2 className="menu__heading reveal reveal-delay-1">Speisekarte</h2>
            <div className="menu__line reveal reveal-delay-2"></div>
          </div>

          <div className="menu__grid">
            {allMenuCards.map((category, idx) => (
              <div key={category.name} className={`menu__card reveal ${delayClasses[idx % delayClasses.length]}`}>
                <h3 className="menu__card-title">{category.name}</h3>
                {category.dishes?.map((dish, dishIdx) => (
                  <div key={dishIdx} className="menu__item">
                    <div>
                      <div className="menu__item-name">{dish.name}</div>
                      {dish.description && <div className="menu__item-desc">{dish.description}</div>}
                      {dish.allergens && <div className="menu__item-allergens">{dish.allergens}</div>}
                    </div>
                    <span className="menu__item-dots"></span>
                    <span className="menu__item-price">{dish.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="menu__note reveal">&mdash; Alle Preise in Euro inkl. gesetzlicher MwSt. Allergene auf Anfrage. &mdash;</p>

          <div className="menu__cta-wrap reveal">
            <a href="#" target="_blank" rel="noopener" className="menu__cta">
              Tisch reservieren
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ÖFFNUNGSZEITEN & KONTAKT ═══ */}
      <section className="contact" id="kontakt">
        <div className="contact__inner">
          {/* Öffnungszeiten */}
          <div className="contact__hours">
            <p className="contact__label reveal">Besuchen Sie uns</p>
            <h2 className="contact__heading reveal reveal-delay-1">Öffnungszeiten</h2>
            <div className="contact__line reveal reveal-delay-2"></div>

            <div className="hours-table reveal reveal-delay-3">
              {hours.hours?.map((row, idx) => {
                const isClosed = row.times?.length === 1 && row.times[0] === 'Geschlossen'
                return (
                  <div key={idx} className="hours-row">
                    <span className="hours-day">{row.day}</span>
                    <span className={`hours-time${isClosed ? ' hours-closed' : ''}`}>
                      {row.times?.map((t, i) => (
                        <span key={i}>{t}{i < (row.times?.length || 0) - 1 && <br />}</span>
                      ))}
                    </span>
                  </div>
                )
              })}

              {showSpecialHours && (
                <>
                  <div className="hours-divider reveal reveal-delay-3" style={{ margin: '0.5rem 0', paddingTop: '0.5rem' }}>
                    {specialLabel && (
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>{specialLabel}</p>
                    )}
                  </div>
                  {specialItems.map((sh, idx) => {
                    const isClosed = sh.times?.length === 1 && sh.times[0] === 'Geschlossen'
                    return (
                      <div key={idx} className="hours-row reveal reveal-delay-3">
                        <span className="hours-day">{sh.day}</span>
                        <span className={`hours-time${isClosed ? ' hours-closed' : ''}`}>
                          {sh.times?.map((t, i) => (
                            <span key={i}>{t}{i < (sh.times?.length || 0) - 1 && <br />}</span>
                          ))}
                        </span>
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          </div>

          {/* Kontakt & Adresse */}
          <div className="contact__info">
            <p className="contact__label reveal">Finden Sie uns</p>
            <h2 className="contact__info-heading reveal reveal-delay-1">Kontakt</h2>
            <div className="contact__info-line reveal reveal-delay-2"></div>

            <p className="contact__address reveal reveal-delay-3">
              {content.address?.split('\n').map((line, i) => (
                <span key={i}>{line}<br/></span>
              ))}
              <a href={`tel:${content.phone?.replace(/\s/g, '')}`} style={{ color: 'var(--navy)', textDecoration: 'none' }}>{content.phone}</a><br/>
              <a href={`mailto:${content.email}`} style={{ color: 'var(--navy)', textDecoration: 'none' }}>{content.email}</a>
            </p>

            <iframe
              className="contact__map reveal reveal-delay-3"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1279.5!2d8.6742024!3d50.1150958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0f002ae0347b%3A0xe7a5af937c0332d2!2sFrau%20Fritz!5e0!3m2!1sde!2sde!4v1"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Standort"
            ></iframe>

            {(() => {
              const socialLinks = foot?.socialLinks || []
              const reserveText = nav?.ctaText || 'Tisch reservieren'
              const reserveLink = nav?.ctaLink || '#'
              return (
                <>
                  {socialLinks.map((social, idx) => (
                    <div key={idx} className="contact__social reveal reveal-delay-3">
                      <span className="contact__social-icon"><SocialIcon platform={social.platform} /></span>
                      <a href={social.url} target="_blank" rel="noopener" className="contact__social-link">
                        {social.label || social.platform}
                      </a>
                    </div>
                  ))}
                  <a href={reserveLink} target="_blank" rel="noopener" className="contact__reserve-btn reveal reveal-delay-4">
                    {reserveText}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </>
              )
            })()}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      {(() => {
        const footerLogoUrl = foot?.logo?.asset?.url || ''
        const footerLogoAlt = foot?.logo?.alt || 'Logo'
        const socialLinks = foot?.socialLinks || []
        const footerLinks = foot?.footerLinks || [
          { label: 'Impressum', link: '/impressum' },
          { label: 'Datenschutz', link: '/datenschutz' },
        ]
        const copyrightText = foot?.copyrightText || `© ${new Date().getFullYear()} Alle Rechte vorbehalten.`

        return (
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
        )
      })()}
    </>
  )
}
