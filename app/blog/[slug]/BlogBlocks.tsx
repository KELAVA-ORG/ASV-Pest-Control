'use client'

import { useState } from 'react'
import FormRenderer from '../../components/FormRenderer'

/* ─── Video Embed ─── */
function extractYouTubeId(url?: string): string | null {
  if (!url) return null
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

function extractVimeoId(url?: string): string | null {
  if (!url) return null
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return m ? m[1] : null
}

interface VideoEmbedProps {
  value: {
    videoType?: string
    url?: string
    file?: { asset?: { url: string } }
    caption?: string
  }
}

export function VideoEmbed({ value }: VideoEmbedProps) {
  return (
    <figure className="post__video">
      <div className="post__video-wrapper">
        {value.videoType === 'youtube' && (() => {
          const id = extractYouTubeId(value.url)
          if (!id) return null
          return (
            <iframe
              className="post__video-iframe"
              src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        })()}
        {value.videoType === 'vimeo' && (() => {
          const id = extractVimeoId(value.url)
          if (!id) return null
          return (
            <iframe
              className="post__video-iframe"
              src={`https://player.vimeo.com/video/${id}?dnt=1`}
              title="Vimeo Video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )
        })()}
        {value.videoType === 'selfhosted' && value.file?.asset?.url && (
          <video className="post__video-player" controls preload="metadata" playsInline>
            <source src={value.file.asset.url} />
          </video>
        )}
      </div>
      {value.caption && <figcaption className="post__figcaption">{value.caption}</figcaption>}
    </figure>
  )
}

/* ─── CTA Button ─── */
interface CtaButtonProps {
  value: {
    text?: string
    url?: string
    openInNewTab?: boolean
    style?: string
    alignment?: string
  }
}

export function CtaButton({ value }: CtaButtonProps) {
  if (!value.text || !value.url) return null
  return (
    <div className={`post__cta-inline post__cta-inline--${value.alignment || 'left'}`}>
      <a
        href={value.url}
        className={`post__cta-btn post__cta-btn--${value.style || 'primary'}`}
        target={value.openInNewTab ? '_blank' : undefined}
        rel={value.openInNewTab ? 'noopener noreferrer' : undefined}
      >
        {value.text}
      </a>
    </div>
  )
}

/* ─── Info Box ─── */
interface InfoBoxProps {
  value: {
    variant?: string
    title?: string
    body?: Array<{
      _type: string
      _key?: string
      children?: Array<{ text?: string; marks?: string[] }>
      markDefs?: Array<{ _key: string; _type: string; href?: string }>
    }>
  }
}

export function InfoBox({ value }: InfoBoxProps) {
  const variant = value.variant || 'info'
  const icons: Record<string, string> = { info: 'ℹ️', tip: '💡', warning: '⚠️', error: '❌' }
  return (
    <aside className={`post__infobox post__infobox--${variant}`}>
      <div className="post__infobox-header">
        <span className="post__infobox-icon">{icons[variant]}</span>
        {value.title && <strong className="post__infobox-title">{value.title}</strong>}
      </div>
      {value.body && (
        <div className="post__infobox-body">
          {value.body.map((block, i) => (
            <p key={block._key || i}>
              {block.children?.map((child, j) => {
                let content: React.ReactNode = child.text || ''
                if (child.marks?.includes('strong')) content = <strong key={j}>{content}</strong>
                if (child.marks?.includes('em')) content = <em key={j}>{content}</em>
                const linkMark = child.marks?.find(m => !['strong', 'em'].includes(m))
                if (linkMark && block.markDefs) {
                  const def = block.markDefs.find(d => d._key === linkMark)
                  if (def?.href) content = <a key={j} href={def.href}>{content}</a>
                }
                return <span key={j}>{content}</span>
              })}
            </p>
          ))}
        </div>
      )}
    </aside>
  )
}

/* ─── Inline Gallery ─── */
interface GalleryBlockProps {
  value: {
    images?: Array<{ asset?: { url: string }; alt?: string; caption?: string }>
    columns?: number
  }
}

export function GalleryBlock({ value }: GalleryBlockProps) {
  const cols = value.columns || 2
  return (
    <div className={`post__gallery post__gallery--${cols}`}>
      {value.images?.map((img, i) => (
        <figure key={i} className="post__gallery-item">
          {img.asset?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img.asset.url} alt={img.alt || ''} loading="lazy" />
          )}
          {img.caption && <figcaption>{img.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}

/* ─── FAQ Block ─── */
interface FaqBlockProps {
  value: {
    items?: Array<{
      _key?: string
      question: string
      answer?: Array<{
        _type: string
        _key?: string
        children?: Array<{ text?: string; marks?: string[] }>
      }>
    }>
  }
}

export function FaqBlock({ value }: FaqBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="post__faq">
      {value.items?.map((item, i) => (
        <div key={item._key || i} className={`post__faq-item ${openIndex === i ? 'post__faq-item--open' : ''}`}>
          <button
            className="post__faq-question"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            <span className="post__faq-icon">{openIndex === i ? '−' : '+'}</span>
          </button>
          <div
            className="post__faq-answer"
            style={{ maxHeight: openIndex === i ? '500px' : '0', opacity: openIndex === i ? 1 : 0 }}
          >
            {item.answer?.map((block, j) => (
              <p key={block._key || j}>
                {block.children?.map((child, k) => {
                  let content: React.ReactNode = child.text || ''
                  if (child.marks?.includes('strong')) content = <strong key={k}>{content}</strong>
                  if (child.marks?.includes('em')) content = <em key={k}>{content}</em>
                  return <span key={k}>{content}</span>
                })}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Form Embed ─── */
interface FormEmbedProps {
  value: {
    form?: {
      _id: string
      name: string
      fields?: Array<Record<string, unknown>>
      [key: string]: unknown
    }
  }
}

export function FormEmbed({ value }: FormEmbedProps) {
  if (!value.form) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <FormRenderer form={value.form as any} />
}
