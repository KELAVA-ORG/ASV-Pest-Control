import type { Metadata } from 'next'

interface SeoData {
  seoTitle?: string
  seoDescription?: string
  seoImage?: { asset?: { url: string } }
  noIndex?: boolean
}

/**
 * Build Next.js Metadata from Sanity SEO fields.
 * Falls back to the provided defaults.
 */
export function buildMetadata(
  seo: SeoData | null | undefined,
  defaults: { title: string; description?: string }
): Metadata {
  const meta: Metadata = {
    title: seo?.seoTitle || defaults.title,
    description: seo?.seoDescription || defaults.description || undefined,
  }

  if (seo?.seoImage?.asset?.url) {
    meta.openGraph = { images: [{ url: seo.seoImage.asset.url }] }
    meta.twitter = { card: 'summary_large_image', images: [seo.seoImage.asset.url] }
  }

  if (seo?.noIndex) {
    meta.robots = { index: false, follow: true }
  }

  return meta
}
