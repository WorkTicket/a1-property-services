import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Playfair_Display, Inter } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import MicrosoftClarity from '@/components/analytics/MicrosoftClarity'
import { localSeoKeywords, siteConfig, defaultOpenGraph, defaultTwitter, websiteJsonLd, localBusinessJsonLd } from '@/lib/metadata'

const ScrollTracker = dynamic(() => import('@/components/analytics/ScrollTracker'), { ssr: false })
const StickyCtaBar = dynamic(() => import('@/components/layout/StickyCtaBar'), { ssr: false })

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'optional',
  weight: ['400', '700'],
  preload: true,
  adjustFontFallback: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'optional',
  weight: ['400', '600'],
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: {
    default: 'A1 Property Services | Landscaping in Cedar Falls, IA',
    template: '%s | A1 Property Services',
  },
  description: siteConfig.description,
  keywords: localSeoKeywords,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': siteConfig.url,
      'x-default': siteConfig.url,
    },
  },
  category: 'Landscaping',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    ...defaultOpenGraph,
    title: 'A1 Property Services | Landscaping in Cedar Falls, IA',
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    ...defaultTwitter,
    title: 'A1 Property Services | Landscaping in Cedar Falls, IA',
    description: siteConfig.description,
  },
  ...(googleSiteVerification || bingSiteVerification
    ? {
        verification: {
          ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
          ...(bingSiteVerification ? { other: { 'msvalidate.01': bingSiteVerification } } : {}),
        },
      }
    : {}),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2D5016',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/images/icon.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/images/icon.webp" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://clarity.microsoft.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
        <link rel="alternate" type="application/rss+xml" title="A1 Property Services Blog" href="/feed.xml" />
        <meta name="geo.region" content="US-IA" />
        <meta name="geo.placename" content="Cedar Falls" />
        <meta name="geo.position" content="42.5364;-92.4455" />
        <meta name="ICBM" content="42.5364, -92.4455" />
        <meta name="language" content="English" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <ScrollTracker />
        <GoogleAnalytics />
        <MicrosoftClarity />
        <Navbar />
        <main id="main-content" role="main" className="min-w-0 overflow-x-clip">
          {children}
        </main>
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  )
}
