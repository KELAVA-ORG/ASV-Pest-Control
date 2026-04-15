'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

/* ─── Types ─── */
interface CookieConsentData {
  consentMode?: string
  // Built-in banner
  heading?: string
  text?: string
  acceptAllText?: string
  acceptEssentialText?: string
  privacyLinkText?: string
  privacyLinkUrl?: string
  position?: string
  bgColor?: { hex?: string }
  textColor?: { hex?: string }
  // Revoke
  revokeEnabled?: boolean
  revokeText?: string
  revokePosition?: string
  // Tracking IDs (needed for consent-based loading)
  gaId?: string
  gtagManagerId?: string
  fbPixelId?: string
  gadsConversionId?: string
  // Custom code
  consentRequiredHeadCode?: string
}

type ConsentState = 'all' | 'essential' | null

const CONSENT_KEY = 'cookie-consent'

/* ─── Consent helpers ─── */
function getConsent(): ConsentState {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(CONSENT_KEY) as ConsentState
}

function setConsent(value: 'all' | 'essential') {
  localStorage.setItem(CONSENT_KEY, value)
}

function clearConsent() {
  localStorage.removeItem(CONSENT_KEY)
}

/* ─── Load tracking scripts dynamically ─── */
function loadGA4(gaId: string) {
  if (document.querySelector(`script[src*="${gaId}"]`)) return
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(s)

  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtag(...args: any[]) { window.dataLayer!.push(args) }
  window.gtag = gtag as typeof window.gtag
  gtag('js', new Date())
  gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' })
  gtag('config', gaId)
}

function loadGTM(gtmId: string) {
  if (document.querySelector(`script[src*="gtm.js"]`)) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(s)
}

function loadFBPixel(pixelId: string) {
  if (document.querySelector(`script[data-fb-pixel]`)) return
  const s = document.createElement('script')
  s.setAttribute('data-fb-pixel', 'true')
  s.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`
  document.head.appendChild(s)
}

function loadConsentScripts(data: CookieConsentData) {
  if (data.gaId) loadGA4(data.gaId)
  if (data.gtagManagerId) loadGTM(data.gtagManagerId)
  if (data.fbPixelId) loadFBPixel(data.fbPixelId)
  if (data.gadsConversionId && window.gtag) {
    window.gtag('config', data.gadsConversionId)
  }
  if (data.consentRequiredHeadCode) {
    const s = document.createElement('script')
    s.textContent = data.consentRequiredHeadCode
    document.head.appendChild(s)
  }
}

/* ─── Update Google Consent Mode v2 ─── */
function updateGoogleConsent(granted: boolean) {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtag(...args: any[]) { window.dataLayer!.push(args) }
  if (!window.gtag) window.gtag = gtag

  if (granted) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
  } else {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }
}

/* ═══════════════════════════════════════════════════
   Cookie Banner Component
   ═══════════════════════════════════════════════════ */
export default function CookieBanner({ data }: { data: CookieConsentData | null }) {
  const [bannerVisible, setBannerVisible] = useState(false)
  const [consent, setConsentState] = useState<ConsentState>(null)
  const [mounted, setMounted] = useState(false)

  // Initialize consent defaults on mount
  useEffect(() => {
    setMounted(true)
    if (!data || data.consentMode === 'disabled') return

    // Set Google Consent Mode v2 defaults FIRST (before any scripts)
    window.dataLayer = window.dataLayer || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtag(...args: any[]) { window.dataLayer!.push(args) }
    if (!window.gtag) window.gtag = gtag
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    })

    // Check existing consent
    const existing = getConsent()
    setConsentState(existing)

    if (existing === 'all') {
      // User previously accepted all → load scripts
      updateGoogleConsent(true)
      loadConsentScripts(data)
    } else if (existing === 'essential') {
      updateGoogleConsent(false)
    } else if (data.consentMode === 'built-in') {
      // No consent yet → show banner
      setBannerVisible(true)
    }
  }, [data])

  const handleAcceptAll = useCallback(() => {
    setConsent('all')
    setConsentState('all')
    setBannerVisible(false)
    updateGoogleConsent(true)
    if (data) loadConsentScripts(data)
  }, [data])

  const handleAcceptEssential = useCallback(() => {
    setConsent('essential')
    setConsentState('essential')
    setBannerVisible(false)
    updateGoogleConsent(false)
  }, [])

  const handleRevoke = useCallback(() => {
    clearConsent()
    setConsentState(null)
    setBannerVisible(true)
  }, [])

  // Don't render anything server-side or if not built-in
  if (!mounted || !data) return null
  if (data.consentMode !== 'built-in') return null

  const posClass = data.position === 'bottom-left'
    ? 'cookie-banner--left'
    : data.position === 'bottom-right'
      ? 'cookie-banner--right'
      : data.position === 'center'
        ? 'cookie-banner--center'
        : ''

  const style: React.CSSProperties = {}
  if (data.bgColor?.hex) style.backgroundColor = data.bgColor.hex
  if (data.textColor?.hex) style.color = data.textColor.hex

  return (
    <>
      {/* ─── Cookie Banner ─── */}
      {bannerVisible && (
        <div className={`cookie-banner ${posClass}`} style={style} role="dialog" aria-label="Cookie-Einstellungen">
          <div className="cookie-banner__inner">
            <div className="cookie-banner__content">
              {data.heading && <p className="cookie-banner__heading">{data.heading}</p>}
              {data.text && <p className="cookie-banner__text">{data.text}</p>}
              {data.privacyLinkUrl && (
                <Link href={data.privacyLinkUrl} className="cookie-banner__link">
                  {data.privacyLinkText || 'Datenschutzerklärung'}
                </Link>
              )}
            </div>
            <div className="cookie-banner__actions">
              <button onClick={handleAcceptAll} className="cookie-banner__btn cookie-banner__btn--accept">
                {data.acceptAllText || 'Alle akzeptieren'}
              </button>
              <button onClick={handleAcceptEssential} className="cookie-banner__btn cookie-banner__btn--essential">
                {data.acceptEssentialText || 'Nur notwendige'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Revoke/Opt-Out Button ─── */}
      {!bannerVisible && data.revokeEnabled && consent !== null && (
        <button
          className={`cookie-revoke ${data.revokePosition === 'bottom-right' ? 'cookie-revoke--right' : 'cookie-revoke--left'}`}
          onClick={handleRevoke}
          aria-label={data.revokeText || 'Cookie-Einstellungen'}
          title={data.revokeText || 'Cookie-Einstellungen'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="8" cy="9" r="1.5" fill="currentColor" />
            <circle cx="15" cy="7" r="1" fill="currentColor" />
            <circle cx="10" cy="14" r="1" fill="currentColor" />
            <circle cx="16" cy="13" r="1.5" fill="currentColor" />
            <circle cx="13" cy="17" r="1" fill="currentColor" />
          </svg>
          <span>{data.revokeText || 'Cookie-Einstellungen'}</span>
        </button>
      )}
    </>
  )
}

/* ─── TypeScript declarations ─── */
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer?: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void
  }
}
