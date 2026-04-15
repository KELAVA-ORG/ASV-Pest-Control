import { client } from '@/sanity/lib/client'
import { pageQuery, allPagesQuery, navigationQuery, footerQuery, blogPostsQuery, stadtseiteQuery, stadtseiteAllSlugsQuery, globalSettingsQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ModuleRenderer from '../components/ModuleRenderer'
import PageLayout from '../components/PageLayout'
import SchemaJsonLd from '../components/SchemaJsonLd'
import StadtseiteView from '../components/asv/StadtseiteView'

export const revalidate = 60

interface SanityColor {
  hex?: string
}

export interface FormFieldValidation {
  minLength?: number
  maxLength?: number
  pattern?: string
  patternMessage?: string
}

export interface FormField {
  label: string
  fieldName?: { current: string }
  fieldType: string
  required?: boolean
  placeholder?: string
  defaultValue?: string
  options?: string[]
  halfWidth?: boolean
  validation?: FormFieldValidation
  acceptedFileTypes?: string
  maxFileSize?: number
}

export interface FormData {
  _id: string
  name: string
  fields?: FormField[]
  emailTo?: string[]
  emailCc?: string[]
  emailBcc?: string[]
  emailSubject?: string
  emailReplyToField?: string
  autoresponderEnabled?: boolean
  autoresponderEmailField?: string
  autoresponderSubject?: string
  autoresponderMessage?: string
  afterSubmitAction?: string
  successMessage?: string
  redirectType?: string
  redirectPage?: { slug: { current: string } }
  redirectUrl?: string
  trackingEnabled?: boolean
  ga4EventName?: string
  ga4EventParams?: Array<{ key: string; value: string }>
  gadsConversionId?: string
  gadsConversionLabel?: string
  gadsConversionValue?: number
  gadsCurrency?: string
  metaPixelEvent?: string
  metaPixelCustomEvent?: string
  captureUtmParams?: boolean
  honeypotEnabled?: boolean
  rateLimitPerMinute?: number
  recaptchaEnabled?: boolean
  submitButtonText?: string
  submitButtonBgColor?: SanityColor
  submitButtonTextColor?: SanityColor
  privacyNote?: string
  cssClass?: string
}

interface PageData {
  title: string
  slug: { current: string }
  // SEO
  seoTitle?: string
  seoDescription?: string
  seoImage?: { asset: { url: string } }
  canonicalUrl?: string
  noIndex?: boolean
  // Schema
  schemaType?: string
  schemaRestaurant?: {
    name?: string
    description?: string
    cuisine?: string
    priceRange?: string
    phone?: string
    email?: string
    street?: string
    city?: string
    postalCode?: string
    country?: string
  }
  schemaEvent?: {
    eventName?: string
    eventDescription?: string
    startDate?: string
    endDate?: string
    location?: string
    organizer?: string
  }
  schemaArticle?: {
    author?: string
    publishDate?: string
    modifiedDate?: string
  }
  schemaProduct?: {
    productName?: string
    productDescription?: string
    price?: string
    currency?: string
    availability?: string
  }
  customBreadcrumbs?: Array<{ label: string; url: string }>
  // Custom Code
  customCss?: string
  customHeadJs?: string
  customBodyJs?: string
  customHeadTags?: string
  // Module
  modules?: Module[]
}

export interface Module {
  _type: string
  _key: string
  // Gemeinsam
  heading?: string
  headingLevel?: string
  headingSize?: number
  body?: unknown[]
  // Button-Design (alle Module mit Buttons)
  buttonBgColor?: SanityColor
  buttonTextColor?: SanityColor
  // Hero
  backgroundImage?: { asset: { url: string }; alt?: string }
  overlayOpacity?: number
  ctaText?: string
  ctaLinkType?: string
  ctaLink?: string
  ctaInternalPage?: { slug: { current: string } }
  ctaNewTab?: boolean
  // Text
  alignment?: string
  narrowWidth?: boolean
  // Image + Text
  image?: { asset: { url: string }; alt?: string }
  imagePosition?: string
  // Gallery
  images?: Array<{ asset: { url: string }; alt?: string; caption?: string }>
  columns?: number
  // CTA-Modul
  buttonText?: string
  buttonLinkType?: string
  buttonLink?: string
  buttonInternalPage?: { slug: { current: string } }
  buttonNewTab?: boolean
  backgroundColor?: SanityColor
  backgroundOpacity?: number
  textColor?: SanityColor
  style?: string
  // Divider
  spacing?: string
  // Quote
  quote?: unknown[]
  author?: string
  // FAQ
  items?: Array<{ _key: string; question: string; answer: unknown[] }>
  openFirst?: boolean
  // Form Module
  form?: FormData
  // Blog Posts Module
  postsCount?: number
  loadMoreEnabled?: boolean
  loadMoreText?: string
  sortBy?: string
  filterType?: string
  filterCategory?: { _id: string; name: string; slug: { current: string } }
  filterTag?: string
  showImage?: boolean
  showExcerpt?: boolean
  showDate?: boolean
  showCategory?: boolean
  showReadingTime?: boolean
  linkToAll?: boolean
  linkToAllText?: string
  // Video Module
  videoType?: string
  youtubeUrl?: string
  vimeoUrl?: string
  videoFile?: { asset?: { url: string } }
  posterImage?: { asset?: { url: string }; alt?: string }
  caption?: string
  autoplay?: boolean
  loop?: boolean
  maxWidth?: string
  // Injected at render time (not from Sanity)
  _blogBasePath?: string
  _blogPosts?: Array<{
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    featuredImage?: { asset?: { url: string }; alt?: string }
    publishedAt?: string
    readingTime?: number
    categories?: Array<{ name: string; slug: { current: string } }>
    tags?: string[]
    body?: unknown[]
  }>
}

interface NavigationData {
  logoText?: string
  logoImage?: { asset?: { url: string }; alt?: string }
  menuItems?: Array<{
    label: string
    linkType?: string
    link?: string
    internalPage?: { slug: { current: string } }
    openInNewTab?: boolean
    mobileOnly?: boolean
  }>
  ctaEnabled?: boolean
  ctaText?: string
  ctaLink?: string
  ctaOpenInNewTab?: boolean
}

interface FooterData {
  logo?: { asset?: { url: string }; alt?: string }
  socialLinks?: Array<{ platform: string; url: string; label?: string }>
  footerLinks?: Array<{ label: string; link: string; openInNewTab?: boolean }>
  copyrightText?: string
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const [pages, staedte] = await Promise.all([
    client.fetch(allPagesQuery),
    client.fetch(stadtseiteAllSlugsQuery),
  ])
  const pageSlugs = (pages || []).map((p: { slug: { current: string } }) => ({ slug: p.slug.current }))
  const stadtSlugs = (staedte || []).map((s: { slug: { current: string } }) => ({ slug: s.slug.current }))
  return [...pageSlugs, ...stadtSlugs]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const stadtseite = await client.fetch(stadtseiteQuery, { slug })
  if (stadtseite) {
    return {
      title: stadtseite.seoTitle || `Kammerjäger ${stadtseite.cityName} | ASV Pest Control GmbH`,
      description: stadtseite.seoDescription || '',
    }
  }
  const page: PageData | null = await client.fetch(pageQuery, { slug })

  if (!page) return {}

  const meta: Metadata = {
    title: page.seoTitle || `${page.title}`,
    description: page.seoDescription || undefined,
    openGraph: page.seoImage?.asset?.url
      ? { images: [{ url: page.seoImage.asset.url }] }
      : undefined,
  }

  if (page.canonicalUrl) {
    meta.alternates = { canonical: page.canonicalUrl }
  }

  if (page.noIndex) {
    meta.robots = { index: false, follow: true }
  }

  return meta
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params

  const [stadtseite, navigation, footer, settings] = await Promise.all([
    client.fetch(stadtseiteQuery, { slug }),
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
    client.fetch(globalSettingsQuery),
  ])

  // Stadtseite gefunden → City-Template rendern
  if (stadtseite) {
    return (
      <PageLayout navigation={navigation} footer={footer}>
        <StadtseiteView city={stadtseite} settings={settings} />
      </PageLayout>
    )
  }

  const [page] = await Promise.all([
    client.fetch(pageQuery, { slug }),
  ]) as [PageData | null]

  if (!page) {
    notFound()
  }

  // Extrahiere FAQ-Items für automatisches Schema
  const faqItems = page.modules
    ?.filter((m) => m._type === 'module.faq')
    .flatMap((m) => m.items || []) || []

  // Fetch blog posts if any module.blogPosts exists
  const hasBlogModule = page.modules?.some((m) => m._type === 'module.blogPosts')
  if (hasBlogModule) {
    const [allPosts, blogSettings] = await Promise.all([
      client.fetch(blogPostsQuery),
      client.fetch<{ blogBasePath?: string } | null>(`*[_type == "blogSettings"][0] { blogBasePath }`),
    ])
    const blogBase = blogSettings?.blogBasePath || 'blog'
    page.modules?.forEach((m) => {
      if (m._type !== 'module.blogPosts') return
      let filtered = [...(allPosts || [])]

      // Filter
      if (m.filterType === 'category' && m.filterCategory?.slug?.current) {
        const catSlug = m.filterCategory.slug.current
        filtered = filtered.filter((p: { categories?: Array<{ slug: { current: string } }> }) =>
          p.categories?.some((c) => c.slug.current === catSlug)
        )
      } else if (m.filterType === 'tag' && m.filterTag) {
        const tag = m.filterTag
        filtered = filtered.filter((p: { tags?: string[] }) =>
          p.tags?.includes(tag)
        )
      } else if (m.filterType === 'featured') {
        filtered = filtered.filter((p: { featured?: boolean }) => p.featured)
      }

      // Sort
      if (m.sortBy === 'date_asc') {
        filtered.sort((a: { publishedAt?: string }, b: { publishedAt?: string }) =>
          (a.publishedAt || '').localeCompare(b.publishedAt || '')
        )
      } else if (m.sortBy === 'title_asc') {
        filtered.sort((a: { title: string }, b: { title: string }) =>
          a.title.localeCompare(b.title, 'de')
        )
      } else if (m.sortBy === 'title_desc') {
        filtered.sort((a: { title: string }, b: { title: string }) =>
          b.title.localeCompare(a.title, 'de')
        )
      }
      // date_desc is the default from GROQ query

      m._blogBasePath = blogBase
      m._blogPosts = filtered
    })
  }

  return (
    <PageLayout navigation={navigation} footer={footer}>
      {/* Custom Head Tags */}
      {page.customHeadTags && (
        <head>
          <meta name="custom-head" content="" />
          {/* eslint-disable-next-line react/no-danger */}
          <script dangerouslySetInnerHTML={{ __html: '' }} />
        </head>
      )}

      {/* Schema.org JSON-LD */}
      <SchemaJsonLd page={page} faqItems={faqItems} />

      {/* Custom CSS */}
      {page.customCss && (
        <style dangerouslySetInnerHTML={{ __html: page.customCss }} />
      )}

      {/* Custom Head JS */}
      {page.customHeadJs && (
        <script dangerouslySetInnerHTML={{ __html: page.customHeadJs }} />
      )}

      <main className="page-content">
        {page.modules?.map((module) => (
          <ModuleRenderer key={module._key} module={module} />
        ))}
      </main>

      {/* Custom Body JS (am Ende) */}
      {page.customBodyJs && (
        <script dangerouslySetInnerHTML={{ __html: page.customBodyJs }} />
      )}
    </PageLayout>
  )
}
