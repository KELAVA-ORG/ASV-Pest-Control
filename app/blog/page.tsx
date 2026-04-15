import { client } from '@/sanity/lib/client'
import { blogPostsQuery, blogSettingsQuery, blogCategoriesQuery, navigationQuery, footerQuery } from '@/sanity/lib/queries'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '../components/PageLayout'
import { estimateReadingTime, formatDate } from './utils'
import { blogUrl, blogCategoryUrl } from './blogPath'

export const revalidate = 60

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: { asset?: { url: string }; alt?: string }
  publishedAt?: string
  readingTime?: number
  featured?: boolean
  author?: { name: string; slug?: { current: string }; image?: { asset?: { url: string }; alt?: string } }
  categories?: Array<{ name: string; slug: { current: string } }>
  tags?: string[]
  body?: unknown[]
}

interface BlogSettings {
  blogBasePath?: string
  blogTitle?: string
  blogDescription?: string
  seoTitle?: string
  postsPerPage?: number
  showAuthor?: boolean
  showDate?: boolean
  showReadingTime?: boolean
  showCategories?: boolean
}

interface BlogCategory {
  _id: string
  name: string
  slug: { current: string }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings: BlogSettings | null = await client.fetch(blogSettingsQuery)
  return {
    title: settings?.seoTitle || settings?.blogTitle || 'Blog',
    description: settings?.blogDescription || undefined,
  }
}

export default async function BlogPage() {
  const [posts, settings, categories, nav, footer] = await Promise.all([
    client.fetch(blogPostsQuery),
    client.fetch(blogSettingsQuery),
    client.fetch(blogCategoriesQuery),
    client.fetch(navigationQuery),
    client.fetch(footerQuery),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ]) as [BlogPost[], BlogSettings | null, BlogCategory[], any, any]

  const bp = settings?.blogBasePath || 'blog'
  const featuredPost = posts.find((p) => p.featured)
  const regularPosts = posts.filter((p) => p !== featuredPost)

  return (
    <PageLayout navigation={nav} footer={footer}>
      <div className="blog">
        <header className="blog__header">
          <h1 className="blog__title">{settings?.blogTitle || 'Blog'}</h1>
          {settings?.blogDescription && (
            <p className="blog__description">{settings.blogDescription}</p>
          )}
          {categories.length > 0 && settings?.showCategories !== false && (
            <nav className="blog__categories">
              <Link href={blogUrl(bp)} className="blog__cat blog__cat--active">Alle</Link>
              {categories.map((cat) => (
                <Link key={cat._id} href={blogCategoryUrl(bp, cat.slug.current)} className="blog__cat">
                  {cat.name}
                </Link>
              ))}
            </nav>
          )}
        </header>

        {featuredPost && (
          <article className="blog__featured">
            <Link href={blogUrl(bp, featuredPost.slug.current)} className="blog__featured-link">
              {featuredPost.featuredImage?.asset?.url && (
                <div className="blog__featured-image">
                  <img src={featuredPost.featuredImage.asset.url} alt={featuredPost.featuredImage.alt || featuredPost.title} />
                </div>
              )}
              <div className="blog__featured-content">
                {featuredPost.categories?.[0] && (
                  <span className="blog__card-cat">{featuredPost.categories[0].name}</span>
                )}
                <h2 className="blog__featured-title">{featuredPost.title}</h2>
                {featuredPost.excerpt && <p className="blog__featured-excerpt">{featuredPost.excerpt}</p>}
                <div className="blog__meta">
                  {settings?.showAuthor !== false && featuredPost.author && (
                    <span className="blog__meta-author">{featuredPost.author.name}</span>
                  )}
                  {settings?.showDate !== false && featuredPost.publishedAt && (
                    <time className="blog__meta-date">{formatDate(featuredPost.publishedAt)}</time>
                  )}
                  {settings?.showReadingTime !== false && (
                    <span className="blog__meta-time">{featuredPost.readingTime || estimateReadingTime(featuredPost.body)} Min. Lesezeit</span>
                  )}
                </div>
              </div>
            </Link>
          </article>
        )}

        <div className="blog__grid">
          {regularPosts.map((post) => (
            <article key={post._id} className="blog__card">
              <Link href={blogUrl(bp, post.slug.current)} className="blog__card-link">
                {post.featuredImage?.asset?.url && (
                  <div className="blog__card-image">
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
          <p className="blog__empty">Noch keine Beiträge vorhanden.</p>
        )}
      </div>
    </PageLayout>
  )
}
