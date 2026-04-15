import { client } from '@/sanity/lib/client'
import { blogCategoryPostsQuery, blogCategoriesQuery, blogSettingsQuery, navigationQuery, footerQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '../../../components/PageLayout'
import { estimateReadingTime, formatDate } from '../../utils'
import { blogUrl, blogCategoryUrl } from '../../blogPath'

export const revalidate = 60

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: { asset?: { url: string }; alt?: string }
  publishedAt?: string
  readingTime?: number
  author?: { name: string; slug?: { current: string }; image?: { asset?: { url: string }; alt?: string } }
  categories?: Array<{ name: string; slug: { current: string } }>
  tags?: string[]
  body?: unknown[]
}

interface BlogCategory {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  seoTitle?: string
}

interface BlogSettings {
  blogBasePath?: string
  blogTitle?: string
  showAuthor?: boolean
  showDate?: boolean
  showReadingTime?: boolean
  showCategories?: boolean
}

/* ─── Static Params ─── */
export async function generateStaticParams() {
  const categories = await client.fetch<BlogCategory[]>(blogCategoriesQuery)
  return categories.map((cat) => ({ slug: cat.slug.current }))
}

/* ─── Metadata ─── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const categories = await client.fetch<BlogCategory[]>(blogCategoriesQuery)
  const category = categories.find((c) => c.slug.current === slug)
  if (!category) return { title: 'Kategorie nicht gefunden' }
  return {
    title: category.seoTitle || `${category.name} — Blog`,
    description: category.description || undefined,
  }
}

/* ─── Page ─── */
export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: categorySlug } = await params

  const [posts, categories, settings, nav, footer] = await Promise.all([
    client.fetch(blogCategoryPostsQuery, { categorySlug }),
    client.fetch(blogCategoriesQuery),
    client.fetch(blogSettingsQuery),
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ]) as [BlogPost[], BlogCategory[], BlogSettings | null, any, any]

  const category = categories.find((c) => c.slug.current === categorySlug)
  if (!category) notFound()
  const bp = settings?.blogBasePath || 'blog'

  return (
    <PageLayout navigation={nav} footer={footer}>
      <div className="blog">
        <header className="blog__header">
          <h1 className="blog__title">{category.name}</h1>
          {category.description && (
            <p className="blog__description">{category.description}</p>
          )}
          {categories.length > 0 && settings?.showCategories !== false && (
            <nav className="blog__categories">
              <Link href={blogUrl(bp)} className="blog__cat">Alle</Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={blogCategoryUrl(bp, cat.slug.current)}
                  className={`blog__cat${cat.slug.current === categorySlug ? ' blog__cat--active' : ''}`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          )}
        </header>

        <div className="blog__grid">
          {posts.map((post) => (
            <article key={post._id} className="blog__card">
              <Link href={blogUrl(bp, post.slug.current)} className="blog__card-link">
                {post.featuredImage?.asset?.url && (
                  <div className="blog__card-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.featuredImage.asset.url} alt={post.featuredImage.alt || post.title} loading="lazy" />
                  </div>
                )}
                <div className="blog__card-body">
                  {post.categories?.[0] && (
                    <span className="blog__card-cat">{post.categories[0].name}</span>
                  )}
                  <h2 className="blog__card-title">{post.title}</h2>
                  {post.excerpt && <p className="blog__card-excerpt">{post.excerpt}</p>}
                  <div className="blog__meta">
                    {settings?.showDate !== false && post.publishedAt && (
                      <time className="blog__meta-date">{formatDate(post.publishedAt)}</time>
                    )}
                    {settings?.showReadingTime !== false && (
                      <span className="blog__meta-time">{post.readingTime || estimateReadingTime(post.body)} Min.</span>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="blog__empty">Keine Beiträge in dieser Kategorie.</p>
        )}
      </div>
    </PageLayout>
  )
}
