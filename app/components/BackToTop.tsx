'use client'

import { useState, useEffect } from 'react'

interface BackToTopProps {
  bgColor?: string
  iconColor?: string
  size?: number
  position?: string
  shape?: string
}

export default function BackToTop({ bgColor, iconColor, size, position, shape }: BackToTopProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const posClass = position === 'bottom-left' ? 'back-to-top--left' : ''
  const shapeClass = shape === 'rounded' ? 'back-to-top--rounded' : shape === 'square' ? 'back-to-top--square' : ''

  const style: React.CSSProperties = {}
  if (bgColor) style.backgroundColor = bgColor
  if (iconColor) style.color = iconColor
  if (size) {
    style.width = `${size}px`
    style.height = `${size}px`
  }

  return (
    <button
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''} ${posClass} ${shapeClass}`}
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      type="button"
      style={style}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4L3 11L4.4 12.4L9 7.8V16H11V7.8L15.6 12.4L17 11L10 4Z" fill="currentColor"/>
      </svg>
    </button>
  )
}
