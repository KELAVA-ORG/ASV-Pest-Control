'use client'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="post__share">
      <span className="post__share-label">Teilen:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener"
        className="post__share-btn post__share-btn--fb"
        aria-label="Auf Facebook teilen"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener"
        className="post__share-btn post__share-btn--tw"
        aria-label="Auf X teilen"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M4 4l11.733 16h4.267l-11.733-16z M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/></svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener"
        className="post__share-btn post__share-btn--li"
        aria-label="Auf LinkedIn teilen"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encoded}`}
        className="post__share-btn post__share-btn--mail"
        aria-label="Per E-Mail teilen"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      </a>
      <button
        type="button"
        className="post__share-btn post__share-btn--copy"
        aria-label="Link kopieren"
        onClick={() => {
          navigator.clipboard.writeText(url)
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      </button>
    </div>
  )
}
