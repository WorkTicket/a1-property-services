import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DeferredAppClient from '@/components/layout/DeferredAppClient'
import StickyCtaBar from '@/components/layout/StickyCtaBar'
import SitePreloader, { SitePreloaderHead } from '@/components/layout/SitePreloader'
import { localSeoKeywords, siteConfig, defaultOpenGraph, defaultTwitter, websiteJsonLd, organizationJsonLd, buildLocalBusinessJsonLd, jsonLdGraph } from '@/lib/metadata'
import {
  buildGoogleTagsBootstrap,
  isValidAdsId,
  isValidGaId,
} from '@/lib/google-tags'

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

const gaId = isValidGaId(process.env.NEXT_PUBLIC_GA_ID) ? process.env.NEXT_PUBLIC_GA_ID : undefined
const adsId = isValidAdsId(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID)
  ? process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
  : undefined
/** Prefer Ads ID in the script URL so Google Ads scanners find AW-… in page source. */
const googleTagId = adsId || gaId
const googleTagsBootstrap = buildGoogleTagsBootstrap(gaId, adsId)

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['700'],
  preload: false,
  adjustFontFallback: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: false,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.homeTitle,
    template: '%s | A1 Property Services',
  },
  description: siteConfig.description,
  keywords: localSeoKeywords,
  metadataBase: new URL(siteConfig.url),
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
    title: siteConfig.homeTitle,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    ...defaultTwitter,
    title: siteConfig.homeTitle,
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
  themeColor: '#9E1B24',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const localBusinessJsonLd = buildLocalBusinessJsonLd()

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <SitePreloaderHead fontClassNames={[playfair.variable, inter.variable]} />
        <link rel="icon" href="/images/icon.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/images/icon.webp" />
        <link rel="alternate" type="application/rss+xml" title="A1 Property Services Blog" href="/feed.xml" />
        <meta name="geo.region" content="US-IA" />
        <meta name="geo.placename" content="Cedar Falls" />
        <meta name="geo.position" content="42.5364;-92.4455" />
        <meta name="ICBM" content="42.5364, -92.4455" />
        <meta name="language" content="English" />
        {googleTagId && googleTagsBootstrap ? (
          <>
            {/* Google tag URL is injected after load so it does not compete with LCP.
                AW-/G- IDs remain in page source via the inline bootstrap below. */}
            <script
              id="google-tags-bootstrap"
              dangerouslySetInnerHTML={{ __html: googleTagsBootstrap }}
            />
          </>
        ) : null}
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <SitePreloader />
        <Navbar />
        <main
          id="main-content"
          role="main"
          className="min-w-0 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
        >
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdGraph(websiteJsonLd(), organizationJsonLd(), localBusinessJsonLd)),
          }}
        />
        <StickyCtaBar />
        <DeferredAppClient />
      </body>
    </html>
  )
}
