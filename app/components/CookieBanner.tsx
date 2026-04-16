'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

/* ─── Types ─── */
interface CookieConsentData {
  consentMode?: string
  // Banner content
  heading?: string
  text?: string
  acceptAllText?: string
  acceptEssentialText?: string
  privacyLinkText?: string
  privacyLinkUrl?: string
  position?: string
  bgColor?: { hex?: string }
  textColor?: { hex?: string }
  // Settings panel
  settingsEnabled?: boolean
  settingsButtonText?: string
  saveSelectionText?: string
  // Categories
  necessaryName?: string
  necessaryDesc?: string
  analyticsEnabled?: boolean
  analyticsName?: string
  analyticsDesc?: string
  marketingEnabled?: boolean
  marketingName?: string
  marketingDesc?: string
  // Tracking IDs
  gaId?: string
  gtagManagerId?: string
  fbPixelId?: string
  gadsConversionId?: string
  consentRequiredHeadCode?: string
  // Revoke
  revokeEnabled?: boolean
  revokeText?: string
  revokePosition?: string
}

interface GranularConsent {
  analytics: boolean
  marketing: boolean
}

const CONSENT_KEY = 'cc-consent-v2'

function getStoredConsent(): GranularConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function storeConsent(consent: GranularConsent) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
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
  if (!window.gtag) window.gtag = gtagPush
  window.gtag!('js', new Date())
  window.gtag!('config', gaId)
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

function loadAnalyticsScripts(data: CookieConsentData) {
  if (data.gaId) loadGA4(data.gaId)
  if (data.gtagManagerId) loadGTM(data.gtagManagerId)
  if (data.consentRequiredHeadCode) {
    if (!document.querySelector('script[data-consent-required]')) {
      const s = document.createElement('script')
      s.setAttribute('data-consent-required', 'true')
      s.textContent = data.consentRequiredHeadCode
      document.head.appendChild(s)
    }
  }
}

function loadMarketingScripts(data: CookieConsentData) {
  if (data.fbPixelId) loadFBPixel(data.fbPixelId)
  if (data.gadsConversionId && window.gtag) window.gtag('config', data.gadsConversionId)
}

/* ─── Google Consent Mode v2 (granular) ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtagPush(...args: any[]) { window.dataLayer!.push(args) }

function ensureGtag() {
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) window.gtag = gtagPush
}

function initGoogleConsentDefaults() {
  ensureGtag()
  window.gtag!('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })
}

function updateGoogleConsent(analytics: boolean, marketing: boolean) {
  ensureGtag()
  window.gtag!('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  })
}

/* ═══════════════════════════════════════════════════
   Cookie Banner Component
   ═══════════════════════════════════════════════════ */
export default function CookieBanner({ data }: { data: CookieConsentData | null }) {
  const [bannerVisible, setBannerVisible] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [analyticsChecked, setAnalyticsChecked] = useState(false)
  const [marketingChecked, setMarketingChecked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!data || data.consentMode === 'disabled') return

    // Set Google Consent Mode v2 defaults FIRST (before any scripts)
    initGoogleConsentDefaults()

    // Check existing consent
    const existing = getStoredConsent()

    if (existing !== null) {
      // Restore previous choices to checkboxes
      setAnalyticsChecked(existing.analytics)
      setMarketingChecked(existing.marketing)
      updateGoogleConsent(existing.analytics, existing.marketing)
      if (existing.analytics && data) loadAnalyticsScripts(data)
      if (existing.marketing && data) loadMarketingScripts(data)
    } else if (data.consentMode === 'built-in') {
      // No consent yet → show banner
      setBannerVisible(true)
    }
  }, [data])

  const handleAcceptAll = useCallback(() => {
    storeConsent({ analytics: true, marketing: true })
    setAnalyticsChecked(true)
    setMarketingChecked(true)
    setBannerVisible(false)
    setSettingsOpen(false)
    updateGoogleConsent(true, true)
    if (data) {
      loadAnalyticsScripts(data)
      loadMarketingScripts(data)
    }
  }, [data])

  const handleRejectAll = useCallback(() => {
    storeConsent({ analytics: false, marketing: false })
    setAnalyticsChecked(false)
    setMarketingChecked(false)
    setBannerVisible(false)
    setSettingsOpen(false)
    updateGoogleConsent(false, false)
  }, [])

  const handleSaveSelection = useCallback(() => {
    storeConsent({ analytics: analyticsChecked, marketing: marketingChecked })
    setBannerVisible(false)
    setSettingsOpen(false)
    updateGoogleConsent(analyticsChecked, marketingChecked)
    if (data) {
      if (analyticsChecked) loadAnalyticsScripts(data)
      if (marketingChecked) loadMarketingScripts(data)
    }
  }, [analyticsChecked, marketingChecked, data])

  const handleRevoke = useCallback(() => {
    clearConsent()
    setAnalyticsChecked(false)
    setMarketingChecked(false)
    setBannerVisible(true)
  }, [])

  // Don't render anything server-side or if not built-in
  if (!mounted || !data) return null
  if (data.consentMode !== 'built-in') return null

  const style: React.CSSProperties = {}
  if (data.bgColor?.hex) style.backgroundColor = data.bgColor.hex
  if (data.textColor?.hex) style.color = data.textColor.hex

  return (
    <>
      {bannerVisible && (
        <div
          className="cc-banner cc-banner--visible"
          id="cookieBanner"
          role="dialog"
          aria-label="Cookie-Einstellungen"
          style={Object.keys(style).length > 0 ? style : undefined}
        >
          <div className="cc-banner__inner">
            <div className="cc-banner__content">
              <p className="cc-banner__text">
                {data.text || 'Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.'}{' '}
                {data.privacyLinkUrl && (
                  <Link href={data.privacyLinkUrl} className="cc-banner__link">
                    {data.privacyLinkText || 'Datenschutzerklärung'}
                  </Link>
                )}.
              </p>
            </div>
            <div className="cc-banner__actions">
              <button onClick={handleRejectAll} className="btn btn--outline cc-banner__btn">
                {data.acceptEssentialText || 'Nur notwendige'}
              </button>
              <button onClick={handleAcceptAll} className="btn btn--primary cc-banner__btn">
                {data.acceptAllText || 'Alle akzeptieren'}
              </button>
              {data.settingsEnabled !== false && (
                <button
                  onClick={() => setSettingsOpen(o => !o)}
                  className="cc-banner__settings-toggle"
                  aria-expanded={settingsOpen}
                >
                  {settingsOpen ? 'Weniger' : (data.settingsButtonText || 'Einstellungen')}
                </button>
              )}
            </div>
          </div>

          {/* Granular settings panel */}
          {settingsOpen && (
            <div className="cc-settings" id="ccSettings">
              <div className="cc-settings__inner">
                {/* Notwendig – always active */}
                <div className="cc-settings__group">
                  <div className="cc-settings__header">
                    <label className="cc-settings__label">
                      <input type="checkbox" checked readOnly disabled />
                      <span className="cc-settings__name">{data.necessaryName || 'Notwendig'}</span>
                    </label>
                    <span className="cc-settings__badge">Immer aktiv</span>
                  </div>
                  <p className="cc-settings__desc">
                    {data.necessaryDesc || 'Diese Cookies sind für die Grundfunktionen der Website erforderlich.'}
                  </p>
                </div>

                {/* Analytics */}
                {data.analyticsEnabled !== false && (
                  <div className="cc-settings__group">
                    <div className="cc-settings__header">
                      <label className="cc-settings__label">
                        <input
                          type="checkbox"
                          id="ccAnalytics"
                          checked={analyticsChecked}
                          onChange={e => setAnalyticsChecked(e.target.checked)}
                        />
                        <span className="cc-settings__name">{data.analyticsName || 'Analyse & Statistiken'}</span>
                      </label>
                    </div>
                    <p className="cc-settings__desc">
                      {data.analyticsDesc || 'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen.'}
                    </p>
                  </div>
                )}

                {/* Marketing */}
                {data.marketingEnabled !== false && (
                  <div className="cc-settings__group">
                    <div className="cc-settings__header">
                      <label className="cc-settings__label">
                        <input
                          type="checkbox"
                          id="ccMarketing"
                          checked={marketingChecked}
                          onChange={e => setMarketingChecked(e.target.checked)}
                        />
                        <span className="cc-settings__name">{data.marketingName || 'Marketing'}</span>
                      </label>
                    </div>
                    <p className="cc-settings__desc">
                      {data.marketingDesc || 'Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten.'}
                    </p>
                  </div>
                )}

                <div className="cc-settings__actions">
                  <button onClick={handleSaveSelection} className="btn btn--primary cc-banner__btn">
                    {data.saveSelectionText || 'Auswahl speichern'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Revoke button */}
      {!bannerVisible && data.revokeEnabled && (
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
