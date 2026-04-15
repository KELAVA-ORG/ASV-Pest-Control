import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { seoSettingsQuery, sitemapPagesQuery, blogPostSlugsQuery } from '@/sanity/lib/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

interface SeoSettings {
  sitemapEnabled?: boolean
  sitemapDefaultPriority?: number
  sitemapDefaultFrequency?: string
  sitemapExcludePages?: Array<{ slug: { current: string } }>
  sitemapAdditionalUrls?: Array<{
    url: string
    priority?: number
    changeFrequency?: string
  }>
}

interface SitemapPage {
  slug: { current: string }
  sitemapPriority?: number
  sitemapFrequency?: string
  _updatedAt?: string
}

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, pages, legalPages, blogPosts, blogSettings] = await Promise.all([
    client.fetch<SeoSettings | null>(seoSettingsQuery),
    client.fetch<SitemapPage[]>(sitemapPagesQuery),
    client.fetch<SitemapPage[]>(`*[_type == "legalPage" && !(_id in path("drafts.**"))] { slug { current }, _updatedAt }`),
    client.fetch<Array<{ slug: { current: string }; _updatedAt?: string; excludeFromSitemap?: boolean }>>(
      `*[_type == "blogPost" && !(_id in path("drafts.**")) && excludeFromSitemap != true] { slug { current }, _updatedAt }`
    ),
    client.fetch<{ blogBasePath?: string } | null>(`*[_type == "blogSettings"][0] { blogBasePath }`),
  ])
  const blogBase = blogSettings?.blogBasePath || 'blog'

  // If sitemap is disabled, return empty
  if (settings?.sitemapEnabled === false) {
    return []
  }

  const defaultPriority = settings?.sitemapDefaultPriority ?? 0.8
  const defaultFrequency = (settings?.sitemapDefaultFrequency || 'weekly') as ChangeFreq

  // Excluded page slugs from global settings
  const excludedSlugs = new Set(
    (settings?.sitemapExcludePages || []).map((p) => p.slug.current)
  )

  const now = new Date().toISOString()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: defaultFrequency,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/impressum`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/datenschutz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Dynamic page routes (already filtered by excludeFromSitemap != true in query)
  const pageRoutes: MetadataRoute.Sitemap = (pages || [])
    .filter((page) => !excludedSlugs.has(page.slug.current))
    .map((page) => ({
      url: `${SITE_URL}/${page.slug.current}`,
      lastModified: page._updatedAt || now,
      changeFrequency: (page.sitemapFrequency || defaultFrequency) as ChangeFreq,
      priority: page.sitemapPriority ?? defaultPriority,
    }))

  // Legal page routes
  const legalRoutes: MetadataRoute.Sitemap = (legalPages || []).map((page) => ({
    url: `${SITE_URL}/${page.slug.current}`,
    lastModified: page._updatedAt || now,
    changeFrequency: 'monthly' as const,
    priority: 0.3,
  }))

  // Additional manual URLs from backend
  const additionalRoutes: MetadataRoute.Sitemap = (settings?.sitemapAdditionalUrls || []).map((entry) => ({
    url: entry.url.startsWith('http') ? entry.url : `${SITE_URL}${entry.url}`,
    lastModified: now,
    changeFrequency: (entry.changeFrequency || 'monthly') as ChangeFreq,
    priority: entry.priority ?? 0.5,
  }))

  // Blog post routes
  const blogRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/${blogBase}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    ...(blogPosts || []).map((post) => ({
      url: `${SITE_URL}/${blogBase}/${post.slug.current}`,
      lastModified: post._updatedAt || now,
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.7,
    })),
  ]

  return [...staticRoutes, ...pageRoutes, ...legalRoutes, ...blogRoutes, ...additionalRoutes]
}
