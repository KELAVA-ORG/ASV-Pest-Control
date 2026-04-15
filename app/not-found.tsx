import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { notFoundQuery } from '@/sanity/lib/queries'

interface NotFoundData {
  heading?: string
  text?: string
  buttonText?: string
  buttonLink?: string
  backgroundImage?: { asset?: { url: string }; alt?: string }
}

export default async function NotFound() {
  const data: NotFoundData | null = await client.fetch(notFoundQuery)

  const heading = data?.heading || 'Seite nicht gefunden'
  const text = data?.text || 'Die gesuchte Seite existiert leider nicht.'
  const buttonText = data?.buttonText || 'Zur Startseite'
  const buttonLink = data?.buttonLink || '/'
  const bgImage = data?.backgroundImage?.asset?.url

  return (
    <div
      className="not-found"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      {bgImage && <div className="not-found__overlay" />}
      <div className="not-found__inner">
        <span className="not-found__code">404</span>
        <h1 className="not-found__heading">{heading}</h1>
        <p className="not-found__text">{text}</p>
        <Link href={buttonLink} className="not-found__btn">
          {buttonText}
        </Link>
      </div>
    </div>
  )
}
