import { client } from '@/sanity/lib/client'
import { menuQuery, sideQuery, openingHoursQuery, siteContentQuery, navigationQuery, footerQuery } from '@/sanity/lib/queries'
import HomePage from './components/HomePage'

export const revalidate = 60

interface Dish {
  name: string
  description?: string
  price: string
  allergens?: string
}

interface MenuCategory {
  name: string
  order: number
  dishes: Dish[]
}

interface OpeningHours {
  title: string
  hours: { day: string; times: string[] }[]
  specialHours?: {
    enabled?: boolean
    label?: string
    items?: { day: string; times: string[] }[]
  }
}

interface SanityImage {
  asset?: { url: string }
  hotspot?: { x: number; y: number }
  alt?: string
}

interface SanityFile {
  asset?: { url: string }
}

interface SiteContent {
  heroLogo?: SanityImage
  heroTagline?: string
  heroSubtitle?: string
  heroBackgroundType?: 'image' | 'video'
  heroBackgroundImage?: SanityImage
  heroBackgroundVideo?: string
  heroBackgroundVideoFile?: SanityFile
  heroIllustration?: SanityImage
  heroCtaText?: string
  heroCtaLink?: string
  heroCtaEnabled?: boolean
  aboutTitle?: string
  aboutText1?: string
  aboutText2?: string
  address?: string
  phone?: string
  email?: string
}

async function getData() {
  try {
    const [menuCategories, sideCategories, openingHours, siteContent, navigation, footer] = await Promise.all([
      client.fetch<MenuCategory[]>(menuQuery),
      client.fetch<MenuCategory[]>(sideQuery),
      client.fetch<OpeningHours>(openingHoursQuery),
      client.fetch<SiteContent>(siteContentQuery),
      client.fetch(navigationQuery),
      client.fetch(footerQuery),
    ])
    return { menuCategories, sideCategories, openingHours, siteContent, navigation, footer }
  } catch (error) {
    console.error('Failed to fetch Sanity data:', error)
    return { menuCategories: null, sideCategories: null, openingHours: null, siteContent: null, navigation: null, footer: null }
  }
}

export default async function Page() {
  const { menuCategories, sideCategories, openingHours, siteContent, navigation, footer } = await getData()

  return (
    <HomePage
      menuCategories={menuCategories}
      sideCategories={sideCategories}
      openingHours={openingHours}
      siteContent={siteContent}
      navigation={navigation}
      footer={footer}
    />
  )
}
