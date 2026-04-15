interface FaqItem {
  _key: string
  question: string
  answer: unknown[]
}

interface PageData {
  title: string
  slug: { current: string }
  seoTitle?: string
  seoDescription?: string
  seoImage?: { asset: { url: string } }
  schemaType?: string
  schemaRestaurant?: {
    name?: string
    description?: string
    cuisine?: string
    priceRange?: string
    phone?: string
    email?: string
    street?: string
    city?: string
    postalCode?: string
    country?: string
  }
  schemaEvent?: {
    eventName?: string
    eventDescription?: string
    startDate?: string
    endDate?: string
    location?: string
    organizer?: string
  }
  schemaArticle?: {
    author?: string
    publishDate?: string
    modifiedDate?: string
  }
  schemaProduct?: {
    productName?: string
    productDescription?: string
    price?: string
    currency?: string
    availability?: string
  }
  customBreadcrumbs?: Array<{ label: string; url: string }>
}

interface SchemaJsonLdProps {
  page: PageData
  faqItems: FaqItem[]
}

/* Portable Text → Plain Text (vereinfacht) */
function toPlainText(blocks: unknown[]): string {
  return (blocks as Array<{ _type: string; children?: Array<{ text?: string }> }>)
    .filter((b) => b._type === 'block')
    .map((b) => b.children?.map((c) => c.text || '').join('') || '')
    .join('\n')
}

const SITE_URL = 'https://example.com'

export default function SchemaJsonLd({ page, faqItems }: SchemaJsonLdProps) {
  const schemas: object[] = []
  const schemaType = page.schemaType || 'auto'

  if (schemaType === 'none') return null

  // Breadcrumbs (immer, außer bei "none")
  const breadcrumbs = page.customBreadcrumbs?.length
    ? page.customBreadcrumbs
    : [
        { label: 'Startseite', url: '/' },
        { label: page.title, url: `/${page.slug.current}` },
      ]

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.url}`,
    })),
  })

  // FAQ-Schema (automatisch wenn FAQ-Module vorhanden, oder manuell gewählt)
  if ((schemaType === 'auto' && faqItems.length > 0) || schemaType === 'faq') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: toPlainText(item.answer),
        },
      })),
    })
  }

  // Restaurant-Schema
  if (schemaType === 'restaurant' && page.schemaRestaurant) {
    const r = page.schemaRestaurant
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: r.name || 'Mein Unternehmen',
      description: r.description || page.seoDescription,
      servesCuisine: r.cuisine || 'German',
      priceRange: r.priceRange,
      telephone: r.phone,
      email: r.email,
      image: page.seoImage?.asset?.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: r.street,
        addressLocality: r.city,
        postalCode: r.postalCode,
        addressCountry: r.country || 'DE',
      },
      url: `${SITE_URL}/${page.slug.current}`,
    })
  }

  // Event-Schema
  if (schemaType === 'event' && page.schemaEvent) {
    const e = page.schemaEvent
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: e.eventName,
      description: e.eventDescription,
      startDate: e.startDate,
      endDate: e.endDate,
      location: {
        '@type': 'Place',
        name: e.location,
      },
      organizer: {
        '@type': 'Organization',
        name: e.organizer,
      },
    })
  }

  // Article-Schema
  if (schemaType === 'article' && page.schemaArticle) {
    const a = page.schemaArticle
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.seoTitle || page.title,
      description: page.seoDescription,
      image: page.seoImage?.asset?.url,
      author: {
        '@type': 'Person',
        name: a.author,
      },
      datePublished: a.publishDate,
      dateModified: a.modifiedDate || a.publishDate,
      publisher: {
        '@type': 'Organization',
        name: 'Mein Unternehmen',
      },
    })
  }

  // Product-Schema
  if (schemaType === 'product' && page.schemaProduct) {
    const p = page.schemaProduct
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.productName,
      description: p.productDescription,
      image: page.seoImage?.asset?.url,
      offers: {
        '@type': 'Offer',
        price: p.price,
        priceCurrency: p.currency || 'EUR',
        availability: p.availability
          ? `https://schema.org/${p.availability}`
          : undefined,
      },
    })
  }

  if (schemas.length === 0) return null

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
