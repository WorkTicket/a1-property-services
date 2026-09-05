import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from '@/lib/metadata'
import { getHtmlSitemapGroups } from '@/lib/site-urls'
import FadeIn from '@/components/motion/FadeIn'

export const metadata: Metadata = generatePageMetadata({
  title: 'Site Map',
  description:
    'Browse every A1 Property Services page — landscaping services, Cedar Falls and Waterloo city pages, guides, and blog articles.',
  path: '/site-map',
})

export default function SiteMapPage() {
  const groups = getHtmlSitemapGroups()
  const pageSchema = webPageJsonLd({
    name: 'Site Map | A1 Property Services',
    description:
      'Browse every A1 Property Services page — landscaping services, Cedar Falls and Waterloo city pages, guides, and blog articles.',
    path: '/site-map',
    about: 'Site map',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Site Map', path: '/site-map' },
              ]),
            ),
          ),
        }}
      />

      <div className="pt-24">
        <section className="section bg-white">
          <FadeIn className="section-inner">
            <p className="section-eyebrow">Index</p>
            <h1 className="section-heading mt-3">Site Map</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-body">
              Every public page on a1pslandscape.com, grouped by topic so you can find services, cities, and guides quickly.
            </p>

            <div className="mt-12 space-y-12">
              {groups.map((group) => (
                <section key={group.heading}>
                  <h2 className="font-display text-2xl font-bold text-brand-dark">{group.heading}</h2>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-brand-green-800 underline-offset-2 hover:text-brand-gold hover:underline"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </FadeIn>
        </section>
      </div>
    </>
  )
}
