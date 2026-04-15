import { client } from '@/sanity/lib/client'
import { blogPostQuery, blogPostSlugsQuery, blogSettingsQuery, navigationQuery, footerQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import PageLayout from '../../components/PageLayout'
import { estimateReadingTime, formatDate } from '../utils'
import ShareButtons from './ShareButtons'
import { VideoEmbed, CtaButton, InfoBox, GalleryBlock, FaqBlock, FormEmbed } from './BlogBlocks'
import { blogUrl, blogCategoryUrl } from '../blogPath'

export const revalidate = 60

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

/* ─── Types ─── */
interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: { asset?: { url: string }; alt?: string; caption?: string }
  body?: PortableTextBlock[]
  publishedAt?: string
  updatedAt?: string
  readingTime?: number
  featured?: boolean
  author?: {
    name: string
    slug?: { current: string }
    image?: { asset?: { url: string }; alt?: string }
    role?: string
    bio?: string
    website?: string
    socialLinks?: Array<{ platform: string; url: string }>
  }
  categories?: Array<{ name: string; slug: { current: string } }>
  tags?: string[]
  relatedPosts?: Array<{
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    featuredImage?: { asset?: { url: string }; alt?: string }
    publishedAt?: string
    author?: { name: string }
  }>
  seoTitle?: string
  seoDescription?: string
  seoImage?: { asset?: { url: string } }
  canonicalUrl?: string
  noIndex?: boolean
}

interface BlogSettings {
  blogBasePath?: string
  showAuthor?: boolean
  showDate?: boolean
  showReadingTime?: boolean
  showCategories?: boolean
  showRelatedPosts?: boolean
  showShareButtons?: boolean
  ctaEnabled?: boolean
  ctaHeading?: string
  ctaText?: string
  ctaButtonText?: string
  ctaButtonLink?: string
}

/* ─── Static Params ─── */
export async function generateStaticParams() {
  const posts = await client.fetch<Array<{ slug: { current: string } }>>(blogPostSlugsQuery)
  return posts.map((p) => ({ slug: p.slug.current }))
}

/* ─── Metadata ─── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post: BlogPost | null = await client.fetch(blogPostQuery, { slug })
  if (!post) return { title: 'Nicht gefunden' }

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt || undefined
  const image = post.seoImage?.asset?.url || post.featuredImage?.asset?.url

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
    ...(post.canonicalUrl ? { alternates: { canonical: post.canonicalUrl } } : {}),
    ...(post.noIndex ? { robots: { index: false, follow: true } } : {}),
  }
}

/* ─── Portable Text Components ─── */
const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { url: string }; alt?: string; caption?: string } }) => (
      <figure className="post__figure">
        {value.asset?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value.asset.url} alt={value.alt || ''} className="post__img" loading="lazy" />
        )}
        {value.caption && <figcaption className="post__figcaption">{value.caption}</figcaption>}
      </figure>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    videoEmbed: ({ value }: { value: any }) => <VideoEmbed value={value} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctaButton: ({ value }: { value: any }) => <CtaButton value={value} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    infoBox: ({ value }: { value: any }) => <InfoBox value={value} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gallery: ({ value }: { value: any }) => <GalleryBlock value={value} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    faqBlock: ({ value }: { value: any }) => <FaqBlock value={value} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formEmbed: ({ value }: { value: any }) => <FormEmbed value={value} />,
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string; rel?: string } }) => {
      const rel = [value?.rel, 'noopener'].filter(Boolean).join(' ')
      return (
        <a href={value?.href} rel={rel} target={value?.href?.startsWith('http') ? '_blank' : undefined}>
          {children}
        </a>
      )
    },
    internalLink: ({ children, value }: { children: React.ReactNode; value?: { reference?: { _type?: string; slug?: { current: string } } } }) => {
      const ref = value?.reference
      if (!ref?.slug?.current) return <>{children}</>
      if (ref._type === 'blogPost') return <Link href={`/blog/${ref.slug.current}`}>{children}</Link>
      return <Link href={`/${ref.slug.current}`}>{children}</Link>
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="post__h2">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="post__h3">{children}</h3>,
    h4: ({ children }: { children?: React.ReactNode }) => <h4 className="post__h4">{children}</h4>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="post__blockquote">{children}</blockquote>,
  },
}

/* ─── Page Component ─── */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, settings, nav, footer] = await Promise.all([
    client.fetch(blogPostQuery, { slug }),
    client.fetch(blogSettingsQuery),
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ]) as [BlogPost | null, BlogSettings | null, any, any]

  if (!post) notFound()

  const bp = settings?.blogBasePath || 'blog'
  const readingTime = post.readingTime || estimateReadingTime(post.body)
  const postUrl = `${SITE_URL}${blogUrl(bp, post.slug.current)}`

  /* ─── JSON-LD Article Schema ─── */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.featuredImage?.asset?.url ? { image: post.featuredImage.asset.url } : {}),
    url: postUrl,
    datePublished: post.publishedAt,
    ...(post.updatedAt ? { dateModified: post.updatedAt } : { dateModified: post.publishedAt }),
    ...(post.author ? {
      author: {
        '@type': 'Person',
        name: post.author.name,
        ...(post.author.website ? { url: post.author.website } : {}),
        ...(post.author.image?.asset?.url ? { image: post.author.image.asset.url } : {}),
      },
    } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Mein Unternehmen',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    wordCount: post.body ? post.body.reduce((count: number, block) => {
      const b = block as unknown as { _type?: string; children?: Array<{ text?: string }> }
      if (b._type === 'block' && b.children) {
        return count + b.children.reduce((c, child) => c + (child.text?.split(/\s+/).filter(Boolean).length || 0), 0)
      }
      return count
    }, 0) : undefined,
  }

  return (
    <PageLayout navigation={nav} footer={footer}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="post">
        {/* Breadcrumb */}
        <nav className="post__breadcrumb" aria-label="Breadcrumb">
          <Link href={blogUrl(bp)}>{settings?.blogBasePath === 'news' ? 'News' : settings?.blogBasePath === 'magazin' ? 'Magazin' : settings?.blogBasePath === 'aktuelles' ? 'Aktuelles' : settings?.blogBasePath === 'journal' ? 'Journal' : 'Blog'}</Link>
          {post.categories?.[0] && (
            <>
              <span className="post__breadcrumb-sep">/</span>
              <Link href={blogCategoryUrl(bp, post.categories[0].slug.current)}>
                {post.categories[0].name}
              </Link>
            </>
          )}
          <span className="post__breadcrumb-sep">/</span>
          <span>{post.title}</span>
        </nav>

        {/* Header */}
        <header className="post__header">
          {settings?.showCategories !== false && post.categories && post.categories.length > 0 && (
            <div className="post__cats">
              {post.categories.map((cat) => (
                <Link key={cat.slug.current} href={blogCategoryUrl(bp, cat.slug.current)} className="post__cat">
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
          <h1 className="post__title">{post.title}</h1>
          <div className="post__meta">
            {settings?.showAuthor !== false && post.author && (
              <div className="post__meta-author">
                {post.author.image?.asset?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.author.image.asset.url} alt={post.author.name} className="post__meta-avatar" />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            {settings?.showDate !== false && post.publishedAt && (
              <time className="post__meta-date" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            )}
            {settings?.showReadingTime !== false && (
              <span className="post__meta-time">{readingTime} Min. Lesezeit</span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage?.asset?.url && (
          <figure className="post__hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.featuredImage.asset.url} alt={post.featuredImage.alt || post.title} className="post__hero-img" />
            {post.featuredImage.caption && (
              <figcaption className="post__hero-caption">{post.featuredImage.caption}</figcaption>
            )}
          </figure>
        )}

        {/* Body */}
        <div className="post__body">
          {post.body && (
            <PortableText value={post.body} components={portableTextComponents} />
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="post__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="post__tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Share Buttons */}
        {settings?.showShareButtons !== false && (
          <ShareButtons url={postUrl} title={post.title} />
        )}

        {/* Author Box */}
        {settings?.showAuthor !== false && post.author && (
          <div className="post__author-box">
            {post.author.image?.asset?.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.author.image.asset.url} alt={post.author.name} className="post__author-img" />
            )}
            <div className="post__author-info">
              <strong className="post__author-name">{post.author.name}</strong>
              {post.author.role && <span className="post__author-role">{post.author.role}</span>}
              {post.author.bio && <p className="post__author-bio">{post.author.bio}</p>}
              {post.author.socialLinks && post.author.socialLinks.length > 0 && (
                <div className="post__author-social">
                  {post.author.socialLinks.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noopener" className="post__author-social-link">
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        {settings?.ctaEnabled && settings.ctaHeading && (
          <div className="post__cta">
            <h3 className="post__cta-heading">{settings.ctaHeading}</h3>
            {settings.ctaText && <p className="post__cta-text">{settings.ctaText}</p>}
            {settings.ctaButtonText && settings.ctaButtonLink && (
              <a href={settings.ctaButtonLink} className="post__cta-button">{settings.ctaButtonText}</a>
            )}
          </div>
        )}
      </article>

      {/* Related Posts */}
      {settings?.showRelatedPosts !== false && post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="related">
          <h2 className="related__heading">Verwandte Beiträge</h2>
          <div className="related__grid">
            {post.relatedPosts.map((rp) => (
              <article key={rp._id} className="blog__card">
                <Link href={blogUrl(bp, rp.slug.current)} className="blog__card-link">
                  {rp.featuredImage?.asset?.url && (
                    <div className="blog__card-image">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={rp.featuredImage.asset.url} alt={rp.featuredImage.alt || rp.title} loading="lazy" />
                    </div>
                  )}
                  <div className="blog__card-body">
                    <h3 className="blog__card-title">{rp.title}</h3>
                    {rp.excerpt && <p className="blog__card-excerpt">{rp.excerpt}</p>}
                    {rp.publishedAt && (
                      <time className="blog__meta-date">{formatDate(rp.publishedAt)}</time>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  )
}
