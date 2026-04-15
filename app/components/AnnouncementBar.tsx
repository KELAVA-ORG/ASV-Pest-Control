'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AnnouncementData {
  enabled?: boolean
  text?: string
  linkText?: string
  linkUrl?: string
  linkNewTab?: boolean
  dismissible?: boolean
  bgColor?: { hex?: string }
  textColor?: { hex?: string }
}

export default function AnnouncementBar({ data }: { data: AnnouncementData | null }) {
  const [dismissed, setDismissed] = useState(false)

  if (!data?.enabled || !data?.text || dismissed) return null

  const style: React.CSSProperties = {}
  if (data.bgColor?.hex) style.backgroundColor = data.bgColor.hex
  if (data.textColor?.hex) style.color = data.textColor.hex

  return (
    <div className="announcement-bar" style={style}>
      <div className="announcement-bar__inner">
        <p className="announcement-bar__text">
          {data.text}
          {data.linkText && data.linkUrl && (
            <>
              {' '}
              {data.linkNewTab ? (
                <a href={data.linkUrl} target="_blank" rel="noopener noreferrer" className="announcement-bar__link">
                  {data.linkText}
                </a>
              ) : (
                <Link href={data.linkUrl} className="announcement-bar__link">
                  {data.linkText}
                </Link>
              )}
            </>
          )}
        </p>
        {data.dismissible && (
          <button
            className="announcement-bar__close"
            onClick={() => setDismissed(true)}
            aria-label="Schließen"
            type="button"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  )
}
