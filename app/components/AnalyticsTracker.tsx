'use client'

import { useEffect, useRef } from 'react'

interface CustomEvent {
  eventName: string
  selector: string
  trigger?: string
  params?: Array<{ key: string; value: string }>
}

interface AnalyticsConfig {
  trackCtaClicks?: boolean
  ctaEventName?: string
  trackPhoneClicks?: boolean
  phoneEventName?: string
  trackEmailClicks?: boolean
  emailEventName?: string
  trackExternalLinks?: boolean
  externalLinkEventName?: string
  trackMenuViews?: boolean
  trackScrollDepth?: boolean
  scrollThresholds?: number[]
  trackTimeOnPage?: boolean
  timeThresholds?: number[]
  trackFormSubmissions?: boolean
  formEventName?: string
  customEvents?: CustomEvent[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sendEvent(name: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params)
  }
}

export default function AnalyticsTracker({ config }: { config: AnalyticsConfig | null }) {
  const scrollFired = useRef<Set<number>>(new Set())
  const timeFired = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (!config) return

    const cleanup: Array<() => void> = []

    /* ─── Click Tracking (CTA, Phone, Email, External) ─── */
    const cfg = config // capture non-null reference
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      if (link) {
        const href = link.getAttribute('href') || ''

        // Phone clicks
        if (cfg.trackPhoneClicks && href.startsWith('tel:')) {
          sendEvent(cfg.phoneEventName || 'phone_click', {
            phone_number: href.replace('tel:', ''),
          })
        }

        // Email clicks
        if (cfg.trackEmailClicks && href.startsWith('mailto:')) {
          sendEvent(cfg.emailEventName || 'email_click', {
            email: href.replace('mailto:', ''),
          })
        }

        // External links
        if (cfg.trackExternalLinks && href.startsWith('http') && !href.includes(window.location.hostname)) {
          sendEvent(cfg.externalLinkEventName || 'outbound_click', {
            link_url: href,
            link_text: link.textContent?.trim().slice(0, 100),
          })
        }
      }

      // CTA button clicks
      if (cfg.trackCtaClicks) {
        const cta = target.closest('a.hero__cta, a.mod-hero__cta, a.mod-cta__button, a.mod-imgtext__cta, .cookie-banner__btn--accept, [data-track-cta]')
        if (cta) {
          sendEvent(cfg.ctaEventName || 'cta_click', {
            cta_text: cta.textContent?.trim().slice(0, 100),
            cta_url: (cta as HTMLAnchorElement).href || '',
            page_path: window.location.pathname,
          })
        }
      }
    }

    document.addEventListener('click', handleClick)
    cleanup.push(() => document.removeEventListener('click', handleClick))

    /* ─── Scroll Depth Tracking ─── */
    if (cfg.trackScrollDepth) {
      const thresholds = cfg.scrollThresholds?.length ? cfg.scrollThresholds : [25, 50, 75, 100]

      function handleScroll() {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        if (docHeight <= 0) return
        const percent = Math.round((scrollTop / docHeight) * 100)

        for (const threshold of thresholds) {
          if (percent >= threshold && !scrollFired.current.has(threshold)) {
            scrollFired.current.add(threshold)
            sendEvent('scroll_depth', {
              depth_threshold: threshold,
              page_path: window.location.pathname,
            })
          }
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      cleanup.push(() => window.removeEventListener('scroll', handleScroll))
    }

    /* ─── Time on Page Tracking ─── */
    if (cfg.trackTimeOnPage) {
      const thresholds = cfg.timeThresholds?.length ? cfg.timeThresholds : [30, 60, 180]
      const timers: ReturnType<typeof setTimeout>[] = []

      for (const seconds of thresholds) {
        const timer = setTimeout(() => {
          if (!timeFired.current.has(seconds)) {
            timeFired.current.add(seconds)
            sendEvent('time_on_page', {
              time_seconds: seconds,
              page_path: window.location.pathname,
            })
          }
        }, seconds * 1000)
        timers.push(timer)
      }

      cleanup.push(() => timers.forEach(clearTimeout))
    }

    /* ─── Menu Section View Tracking ─── */
    if (cfg.trackMenuViews) {
      const menuSection = document.querySelector('#speisekarte, .menu, [data-track-menu]')
      if (menuSection) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                sendEvent('menu_view', { page_path: window.location.pathname })
                observer.disconnect()
              }
            })
          },
          { threshold: 0.3 }
        )
        observer.observe(menuSection)
        cleanup.push(() => observer.disconnect())
      }
    }

    /* ─── Custom Events ─── */
    if (cfg.customEvents?.length) {
      for (const evt of cfg.customEvents) {
        const params: Record<string, string> = {}
        evt.params?.forEach((p) => { if (p.key) params[p.key] = p.value })

        if (evt.trigger === 'visible') {
          const el = document.querySelector(evt.selector)
          if (el) {
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    sendEvent(evt.eventName, { ...params, page_path: window.location.pathname })
                    observer.disconnect()
                  }
                })
              },
              { threshold: 0.3 }
            )
            observer.observe(el)
            cleanup.push(() => observer.disconnect())
          }
        } else {
          // Click trigger
          function handleCustomClick(e: MouseEvent) {
            const target = e.target as HTMLElement
            if (target.closest(evt.selector)) {
              sendEvent(evt.eventName, { ...params, page_path: window.location.pathname })
            }
          }
          document.addEventListener('click', handleCustomClick)
          cleanup.push(() => document.removeEventListener('click', handleCustomClick))
        }
      }
    }

    return () => cleanup.forEach((fn) => fn())
  }, [config])

  // Reset scroll/time tracking on route changes
  useEffect(() => {
    scrollFired.current.clear()
    timeFired.current.clear()
  }, [])

  return null
}
