'use client'

import { useState } from 'react'
import Link from 'next/link'
import { blogUrl } from '../blog/blogPath'

interface BlogPostItem {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: { asset?: { url: string }; alt?: string }
  publishedAt?: string
  readingTime?: number
  categories?: Array<{ name: string; slug: { current: string } }>
  body?: unknown[]
}

interface BlogPostsGridProps {
  posts: BlogPostItem[]
  postsCount: number
  loadMoreEnabled: boolean
  loadMoreText: string
  columns: number
  showImage: boolean
  showExcerpt: boolean
  showDate: boolean
  showCategory: boolean
  showReadingTime: boolean
  linkToAll: boolean
  linkToAllText: string
  blogBasePath: string
}

function estimateReadingTime(body?: unknown[]): number {
  if (!body || !Array.isArray(body)) return 1
  let wordCount = 0
  for (const block of body) {
    const b = block as { _type?: string; children?: Array<{ text?: string }> }
    if (b._type === 'block' && b.children) {
      for (const child of b.children) {
        if (child.text) {
          wordCount += child.text.split(/\s+/).filter(Boolean).length
        }
      }
    }
  }
  return Math.max(1, Math.round(wordCount / 200))
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPostsGrid({
  posts,
  postsCount,
  loadMoreEnabled,
  loadMoreText,
  columns,
  showImage,
  showExcerpt,
  showDate,
  showCategory,
  showReadingTime,
  linkToAll,
  linkToAllText,
  blogBasePath,
}: BlogPostsGridProps) {
  const [visibleCount, setVisibleCount] = useState(postsCount)

  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  return (
    <>
      <div className={`mod-blogposts__grid mod-blogposts__grid--${columns}`}>
        {visiblePosts.map((post) => (
          <article key={post._id} className="blog__card">
            <Link href={blogUrl(blogBasePath, post.slug.current)} className="blog__card-link">
              {showImage && post.featuredImage?.asset?.url && (
                <div className="blog__card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featuredImage.asset.url}
                    alt={post.featuredImage.alt || post.title}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="blog__card-body">
                {showCategory && post.categories?.[0] && (
                  <span className="blog__card-cat">{post.categories[0].name}</span>
                )}
                <h3 className="blog__card-title">{post.title}</h3>
                {showExcerpt && post.excerpt && (
                  <p className="blog__card-excerpt">{post.excerpt}</p>
                )}
                <div className="blog__meta">
                  {showDate && post.publishedAt && (
                    <time className="blog__meta-date">{formatDate(post.publishedAt)}</time>
                  )}
                  {showReadingTime && (
                    <span className="blog__meta-time">
                      {post.readingTime || estimateReadingTime(post.body)} Min.
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {visiblePosts.length === 0 && (
        <p className="blog__empty">Keine Beiträge vorhanden.</p>
      )}

      <div className="mod-blogposts__footer">
        {loadMoreEnabled && hasMore && (
          <button
            type="button"
            className="mod-blogposts__load-more"
            onClick={() => setVisibleCount((prev) => prev + postsCount)}
          >
            {loadMoreText}
          </button>
        )}

        {linkToAll && (
          <Link href={blogUrl(blogBasePath)} className="mod-blogposts__all-link">
            {linkToAllText}
          </Link>
        )}
      </div>
    </>
  )
}
