import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { seoSettingsQuery } from '@/sanity/lib/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

interface SeoSettings {
  robotsEnabled?: boolean
  robotsDisallowPaths?: string[]
  robotsAllowPaths?: string[]
  robotsCrawlDelay?: number
  robotsCustomRules?: string
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings: SeoSettings | null = await client.fetch(seoSettingsQuery)

  // If indexing is disabled, block everything
  if (settings?.robotsEnabled === false) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    }
  }

  // Default disallow paths + custom ones from backend
  const defaultDisallow = ['/studio/', '/api/']
  const customDisallow = settings?.robotsDisallowPaths || []
  const disallow = [...defaultDisallow, ...customDisallow]

  // Allow paths from backend
  const allow = settings?.robotsAllowPaths?.length
    ? ['/', ...settings.robotsAllowPaths]
    : '/'

  const rules: MetadataRoute.Robots['rules'] = [
    {
      userAgent: '*',
      allow,
      disallow,
      ...(settings?.robotsCrawlDelay ? { crawlDelay: settings.robotsCrawlDelay } : {}),
    },
  ]

  return {
    rules,
    sitemap: `${SITE_URL}/sitemap.xml`,
    ...(settings?.robotsCustomRules ? { host: undefined } : {}),
  }
}
