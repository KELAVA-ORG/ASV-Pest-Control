'use client'

import { useState } from 'react'
import type { Module } from '../[slug]/page'
import FormRenderer from './FormRenderer'
import BlogPostsGrid from './BlogPostsGrid'

interface ModuleRendererProps {
  module: Module
}

/* ───────────────────────────────────────────────────
   Link-Auflösung: manuell, intern oder Anker
   ─────────────────────────────────────────────────── */
function resolveLink(
  linkType?: string,
  manualLink?: string,
  internalPage?: { slug: { current: string } }
): string {
  if (linkType === 'internal' && internalPage?.slug?.current) {
    return `/${internalPage.slug.current}`
  }
  return manualLink || '#'
}

/* Button-Inline-Styles aus Sanity-Farben */
function buttonStyle(bgColor?: { hex?: string }, textColor?: { hex?: string }): React.CSSProperties {
  const s: React.CSSProperties = {}
  if (bgColor?.hex) s.backgroundColor = bgColor.hex
  if (textColor?.hex) s.color = textColor.hex
  return s
}

/* ───────────────────────────────────────────────────
   Hero Module
   ─────────────────────────────────────────────────── */
function HeroModule({ module: m }: ModuleRendererProps) {
  const bgUrl = m.backgroundImage?.asset?.url
  const overlayOpacity = (m.overlayOpacity ?? 55) / 100
  return (
    <section
      className="mod-hero"
      style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
    >
      <div className="mod-hero__overlay" style={{ opacity: overlayOpacity }} />
      <div className="mod-hero__content">
        {m.heading && (() => {
          const Tag = (m.headingLevel || 'h1') as keyof React.JSX.IntrinsicElements
          return <Tag className="mod-hero__heading" style={m.headingSize ? { fontSize: `${m.headingSize}px` } : undefined}>{m.heading}</Tag>
        })()}
        {m.body && <div className="mod-hero__subtitle"><PortableTextRenderer blocks={m.body} /></div>}
        {m.ctaText && (() => {
          const href = resolveLink(m.ctaLinkType, m.ctaLink, m.ctaInternalPage)
          return href !== '#' ? (
            <a
              href={href}
              className="mod-hero__cta"
              style={buttonStyle(m.buttonBgColor, m.buttonTextColor)}
              target={m.ctaNewTab ? '_blank' : undefined}
              rel={m.ctaNewTab ? 'noopener noreferrer' : undefined}
            >
              {m.ctaText}
            </a>
          ) : null
        })()}
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────
   Text Module (Portable Text - simplified)
   ─────────────────────────────────────────────────── */
function TextModule({ module: m }: ModuleRendererProps) {
  const HeadingTag = (m.headingLevel || 'h2') as keyof React.JSX.IntrinsicElements
  return (
    <section className={`mod-text ${m.alignment === 'center' ? 'mod-text--center' : ''} ${m.narrowWidth !== false ? 'mod-text--narrow' : ''}`}>
      <div className="mod-text__inner">
        {m.heading && <HeadingTag className="mod-text__heading" style={m.headingSize ? { fontSize: `${m.headingSize}px` } : undefined}>{m.heading}</HeadingTag>}
        {m.body && <PortableTextRenderer blocks={m.body} />}
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────
   Portable Text Renderer (simplified)
   ─────────────────────────────────────────────────── */
interface Block {
  _type: string
  _key?: string
  style?: string
  children?: Array<{
    _type: string
    _key?: string
    text?: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _key: string
    _type: string
    href?: string
    openInNewTab?: boolean
  }>
  asset?: { url: string }
  alt?: string
  caption?: string
}

function PortableTextRenderer({ blocks }: { blocks: unknown[] }) {
  return (
    <div className="mod-text__body">
      {(blocks as Block[]).map((block, i) => {
        if (block._type === 'image') {
          return (
            <figure key={block._key || i} className="mod-text__figure">
              {block.asset?.url && (
                <img src={block.asset.url} alt={block.alt || ''} loading="lazy" />
              )}
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          )
        }

        if (block._type === 'block') {
          const Tag = (
            block.style === 'h2' ? 'h2' :
            block.style === 'h3' ? 'h3' :
            block.style === 'h4' ? 'h4' :
            block.style === 'blockquote' ? 'blockquote' :
            'p'
          ) as keyof React.JSX.IntrinsicElements

          return (
            <Tag key={block._key || i}>
              {block.children?.map((child, j) => {
                if (!child.text) return null
                let content: React.ReactNode = child.text

                // Apply marks
                if (child.marks?.includes('strong')) content = <strong key={j}>{content}</strong>
                if (child.marks?.includes('em')) content = <em key={j}>{content}</em>
                if (child.marks?.includes('underline')) content = <u key={j}>{content}</u>

                // Check for link annotations
                const linkMark = child.marks?.find(
                  (mark) => !['strong', 'em', 'underline'].includes(mark)
                )
                if (linkMark && block.markDefs) {
                  const def = block.markDefs.find((d) => d._key === linkMark)
                  if (def?.href) {
                    content = (
                      <a
                        key={j}
                        href={def.href}
                        target={def.openInNewTab ? '_blank' : undefined}
                        rel={def.openInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        {content}
                      </a>
                    )
                  }
                }

                return <span key={j}>{content}</span>
              })}
            </Tag>
          )
        }

        return null
      })}
    </div>
  )
}

/* ───────────────────────────────────────────────────
   Image + Text Module
   ─────────────────────────────────────────────────── */
function ImageTextModule({ module: m }: ModuleRendererProps) {
  const isLeft = m.imagePosition !== 'right'
  return (
    <section className={`mod-imgtext ${isLeft ? 'mod-imgtext--left' : 'mod-imgtext--right'}`}>
      <div className="mod-imgtext__inner">
        <div className="mod-imgtext__image">
          {m.image?.asset?.url && (
            <img src={m.image.asset.url} alt={m.image.alt || ''} loading="lazy" />
          )}
        </div>
        <div className="mod-imgtext__content">
          {m.heading && (() => {
            const Tag = (m.headingLevel || 'h2') as keyof React.JSX.IntrinsicElements
            return <Tag className="mod-imgtext__heading" style={m.headingSize ? { fontSize: `${m.headingSize}px` } : undefined}>{m.heading}</Tag>
          })()}
          {m.body && <div className="mod-imgtext__text"><PortableTextRenderer blocks={m.body} /></div>}
          {m.ctaText && (() => {
            const href = resolveLink(m.ctaLinkType, m.ctaLink, m.ctaInternalPage)
            return href !== '#' ? (
              <a
                href={href}
                className="mod-imgtext__cta"
                style={buttonStyle(m.buttonBgColor, m.buttonTextColor)}
                target={m.ctaNewTab ? '_blank' : undefined}
                rel={m.ctaNewTab ? 'noopener noreferrer' : undefined}
              >
                {m.ctaText}
              </a>
            ) : null
          })()}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────
   Gallery Module
   ─────────────────────────────────────────────────── */
function GalleryModule({ module: m }: ModuleRendererProps) {
  const cols = m.columns || 3
  return (
    <section className="mod-gallery">
      <div className="mod-gallery__inner">
        {m.heading && (() => {
          const Tag = (m.headingLevel || 'h2') as keyof React.JSX.IntrinsicElements
          return <Tag className="mod-gallery__heading" style={m.headingSize ? { fontSize: `${m.headingSize}px` } : undefined}>{m.heading}</Tag>
        })()}
        <div className={`mod-gallery__grid mod-gallery__grid--${cols}`}>
          {m.images?.map((img, i) => (
            <figure key={i} className="mod-gallery__item">
              {img.asset?.url && (
                <img src={img.asset.url} alt={img.alt || ''} loading="lazy" />
              )}
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────
   CTA Module
   ─────────────────────────────────────────────────── */
function CtaModule({ module: m }: ModuleRendererProps) {
  const bgImageUrl = m.backgroundImage?.asset?.url
  const bgColor = m.backgroundColor?.hex
  const txtColor = m.textColor?.hex
  const overlayOpacity = (m.backgroundOpacity ?? 50) / 100

  const sectionStyle: React.CSSProperties = {}
  if (bgColor) sectionStyle.backgroundColor = bgColor
  if (bgImageUrl) sectionStyle.backgroundImage = `url(${bgImageUrl})`
  if (txtColor) sectionStyle.color = txtColor

  // Fallback: wenn keine Farben gesetzt, nutze Navy-Standard
  const hasCustomBg = bgColor || bgImageUrl
  if (!hasCustomBg) {
    sectionStyle.backgroundColor = 'var(--navy)'
    if (!txtColor) sectionStyle.color = 'var(--cream)'
  }

  return (
    <section className="mod-cta" style={sectionStyle}>
      {bgImageUrl && <div className="mod-cta__overlay" style={{ opacity: overlayOpacity }} />}
      <div className="mod-cta__inner">
        {(() => {
          const Tag = (m.headingLevel || 'h2') as keyof React.JSX.IntrinsicElements
          return <Tag className="mod-cta__heading" style={m.headingSize ? { fontSize: `${m.headingSize}px` } : undefined}>{m.heading}</Tag>
        })()}
        {m.body && <div className="mod-cta__text"><PortableTextRenderer blocks={m.body} /></div>}
        {m.buttonText && (() => {
          const href = resolveLink(m.buttonLinkType, m.buttonLink, m.buttonInternalPage)
          return href !== '#' ? (
            <a
              href={href}
              className="mod-cta__button"
              style={buttonStyle(m.buttonBgColor, m.buttonTextColor)}
              target={m.buttonNewTab ? '_blank' : undefined}
              rel={m.buttonNewTab ? 'noopener noreferrer' : undefined}
            >
              {m.buttonText}
            </a>
          ) : null
        })()}
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────
   Divider Module
   ─────────────────────────────────────────────────── */
function DividerModule({ module: m }: ModuleRendererProps) {
  const style = m.style || 'line'
  const spacing = m.spacing || 'medium'
  return (
    <div className={`mod-divider mod-divider--${style} mod-divider--${spacing}`}>
      {style === 'line' && <hr />}
      {style === 'dots' && <span className="mod-divider__dots">• • •</span>}
    </div>
  )
}

/* ───────────────────────────────────────────────────
   Quote Module
   ─────────────────────────────────────────────────── */
function QuoteModule({ module: m }: ModuleRendererProps) {
  const style = m.style || 'elegant'
  return (
    <section className={`mod-quote mod-quote--${style}`}>
      <div className="mod-quote__inner">
        <blockquote className="mod-quote__text">
          {m.quote && <PortableTextRenderer blocks={m.quote as unknown[]} />}
        </blockquote>
        {m.author && <cite className="mod-quote__author">— {m.author}</cite>}
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────
   FAQ Module
   ─────────────────────────────────────────────────── */
function FaqModule({ module: m }: ModuleRendererProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(m.openFirst ? 0 : null)

  return (
    <section className="mod-faq">
      <div className="mod-faq__inner">
        {m.heading && (() => {
          const Tag = (m.headingLevel || 'h2') as keyof React.JSX.IntrinsicElements
          return <Tag className="mod-faq__heading" style={m.headingSize ? { fontSize: `${m.headingSize}px` } : undefined}>{m.heading}</Tag>
        })()}
        <div className="mod-faq__list">
          {m.items?.map((item, i) => (
            <div
              key={item._key || i}
              className={`mod-faq__item ${openIndex === i ? 'mod-faq__item--open' : ''}`}
            >
              <button
                className="mod-faq__question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <span className="mod-faq__icon">{openIndex === i ? '−' : '+'}</span>
              </button>
              <div
                className="mod-faq__answer"
                style={{
                  maxHeight: openIndex === i ? '500px' : '0',
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                {item.answer && <PortableTextRenderer blocks={item.answer as unknown[]} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────
   Form Module (references form document)
   ─────────────────────────────────────────────────── */
function FormModule({ module: m }: ModuleRendererProps) {
  if (!m.form) return null

  return (
    <section className={`mod-form ${m.narrowWidth ? 'mod-form--narrow' : ''}`}>
      <div className="mod-form__inner">
        {m.heading && (() => {
          const Tag = (m.headingLevel || 'h2') as keyof React.JSX.IntrinsicElements
          return <Tag className="mod-form__heading" style={m.headingSize ? { fontSize: `${m.headingSize}px` } : undefined}>{m.heading}</Tag>
        })()}
        {m.body && <div className="mod-form__text"><PortableTextRenderer blocks={m.body as unknown[]} /></div>}
        <FormRenderer form={m.form} />
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────
   Blog Posts Module
   ─────────────────────────────────────────────────── */
function BlogPostsModule({ module: m }: ModuleRendererProps) {
  return (
    <section className="mod-blogposts">
      <div className="mod-blogposts__inner">
        {m.heading && (() => {
          const Tag = (m.headingLevel || 'h2') as keyof React.JSX.IntrinsicElements
          return <Tag className="mod-blogposts__heading" style={m.headingSize ? { fontSize: `${m.headingSize}px` } : undefined}>{m.heading}</Tag>
        })()}
        <BlogPostsGrid
          posts={m._blogPosts || []}
          postsCount={m.postsCount || 6}
          loadMoreEnabled={m.loadMoreEnabled !== false}
          loadMoreText={m.loadMoreText || 'Mehr Beiträge laden'}
          columns={m.columns || 3}
          showImage={m.showImage !== false}
          showExcerpt={m.showExcerpt !== false}
          showDate={m.showDate !== false}
          showCategory={m.showCategory !== false}
          showReadingTime={m.showReadingTime === true}
          linkToAll={m.linkToAll === true}
          linkToAllText={m.linkToAllText || 'Alle Beiträge ansehen'}
          blogBasePath={m._blogBasePath || 'blog'}
        />
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────
   Video Module
   ─────────────────────────────────────────────────── */
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

function VideoModule({ module: m }: ModuleRendererProps) {
  const maxW = m.maxWidth === 'full' ? '100%' : m.maxWidth === 'medium' ? '720px' : '960px'

  return (
    <section className="mod-video">
      <div className="mod-video__inner" style={{ maxWidth: maxW }}>
        {m.heading && (() => {
          const Tag = (m.headingLevel || 'h2') as keyof React.JSX.IntrinsicElements
          return <Tag className="mod-video__heading" style={m.headingSize ? { fontSize: `${m.headingSize}px` } : undefined}>{m.heading}</Tag>
        })()}
        <div className="mod-video__wrapper">
          {m.videoType === 'youtube' && (() => {
            const id = extractYouTubeId(m.youtubeUrl)
            if (!id) return null
            return (
              <iframe
                className="mod-video__iframe"
                src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
                title={m.heading || 'YouTube Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )
          })()}
          {m.videoType === 'vimeo' && (() => {
            const id = extractVimeoId(m.vimeoUrl)
            if (!id) return null
            return (
              <iframe
                className="mod-video__iframe"
                src={`https://player.vimeo.com/video/${id}?dnt=1`}
                title={m.heading || 'Vimeo Video'}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )
          })()}
          {m.videoType === 'selfhosted' && m.videoFile?.asset?.url && (
            <video
              className="mod-video__player"
              controls
              preload="metadata"
              autoPlay={m.autoplay || false}
              muted={m.autoplay || false}
              loop={m.loop || false}
              playsInline
              poster={m.posterImage?.asset?.url}
            >
              <source src={m.videoFile.asset.url} />
            </video>
          )}
        </div>
        {m.caption && <p className="mod-video__caption">{m.caption}</p>}
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────
   Main Renderer
   ─────────────────────────────────────────────────── */
export default function ModuleRenderer({ module }: ModuleRendererProps) {
  switch (module._type) {
    case 'module.hero':
      return <HeroModule module={module} />
    case 'module.text':
      return <TextModule module={module} />
    case 'module.imageText':
      return <ImageTextModule module={module} />
    case 'module.gallery':
      return <GalleryModule module={module} />
    case 'module.cta':
      return <CtaModule module={module} />
    case 'module.divider':
      return <DividerModule module={module} />
    case 'module.quote':
      return <QuoteModule module={module} />
    case 'module.faq':
      return <FaqModule module={module} />
    case 'module.form':
      return <FormModule module={module} />
    case 'module.blogPosts':
      return <BlogPostsModule module={module} />
    case 'module.video':
      return <VideoModule module={module} />
    default:
      console.warn(`Unknown module type: ${module._type}`)
      return null
  }
}
