import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd, siteConfig, itemListJsonLd } from '@/lib/metadata'
import { learnArticles, getLearnReadingTime } from '@/lib/learn'
import { getLearnArticleImage } from '@/lib/content-images'
import { siteImages } from '@/lib/images'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import CtaBanner from '@/components/sections/CtaBanner'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Resources & Guides',
  description:
    'Educational guides, buying tips, and comparison resources for Cedar Falls and Waterloo homeowners planning landscape work.',
  path: '/learn',
})

const categoryColors: Record<string, string> = {
  educational: 'bg-blue-100 text-blue-800',
  'buying-guide': 'bg-amber-100 text-amber-800',
  comparison: 'bg-purple-100 text-purple-800',
}

export default function LearnPage() {
  const pageSchema = webPageJsonLd({
    name: 'Landscaping Resources & Guides | A1 Property Services',
    description: 'Educational guides, buying tips, and comparison resources for Cedar Falls and Waterloo homeowners.',
    path: '/learn',
    about: 'Landscaping Resources',
  })

  const listSchema = itemListJsonLd(
    learnArticles.map((a) => ({
      name: a.title,
      url: `${siteConfig.url}/learn/${a.slug}`,
    })),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              listSchema,
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Learn', path: '/learn' },
              ]),
            ),
          ),
        }}
      />

      <PageHero
        imageSrc={siteImages.learnHero}
        imageAlt="Professionally designed Cedar Falls garden with stone path and perennials"
        eyebrow="Educational Resources"
        title="Landscaping|Knowledge Center"
        subtitle="Guides, comparisons, and buying tips for Cedar Falls and Waterloo homeowners planning a landscape project."
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <p className="text-lg leading-relaxed text-brand-body">
            Whether you are planning your first landscaping project or looking to maintain a mature landscape, our educational resources give you the information you need to make confident decisions. Every guide is written with Iowa homeowners in mind and focuses on what matters most for Cedar Falls and Waterloo properties.
          </p>
        </FadeIn>
      </section>

      <section className="section bg-brand-stone">
        <div className="section-inner">
          <StaggerContainer className="grid gap-8 lg:grid-cols-2">
            {learnArticles.map((article) => {
              const photo = getLearnArticleImage(article)
              return (
                <StaggerItem key={article.slug}>
                  <Link href={`/learn/${article.slug}`} className="card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="card-image relative aspect-[16/9]">
                      <ResponsiveImage
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={IMAGE_SIZES.halfCol}
                        className="card-image-zoom object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-8">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColors[article.category]}`}>
                          {article.categoryLabel}
                        </span>
                        <span className="text-xs text-brand-body/60">{getLearnReadingTime(article)} read</span>
                      </div>
                      <h2 className="mt-3 text-xl font-bold text-brand-dark transition-colors group-hover:text-brand-green-800">
                        {article.title}
                      </h2>
                      <p className="mt-2 leading-relaxed text-brand-body">{article.excerpt}</p>
                      <span className="link-cta-md group mt-4 inline-flex items-center gap-1">
                        Read Guide <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      <CtaBanner
        title="Ready to start your project?"
        description="Contact us for a free consultation. We will help you bring your landscape vision to life."
      />
    </>
  )
}
