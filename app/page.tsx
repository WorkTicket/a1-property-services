import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ChevronRight, MapPin, Phone, Star } from 'lucide-react'
import { hardscapeFeatures, services } from '@/lib/services'
import { CTA_COPY } from '@/lib/cta'
import { generatePageMetadata, siteConfig, faqPageJsonLd, webPageJsonLd } from '@/lib/metadata'
import Button from '@/components/ui/Button'
import { siteImages, homepageGalleryPreview } from '@/lib/images'
import { blogPosts, getSortedPosts } from '@/lib/blog'
import RelatedContent from '@/components/sections/RelatedContent'
import ServiceCard from '@/components/ui/ServiceCard'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import LcpHeroImage from '@/components/ui/LcpHeroImage'
import HeroImagePreload from '@/components/ui/HeroImagePreload'
import HeroCopyDeferred from '@/components/ui/HeroCopyDeferred'
import HeroOverlay from '@/components/ui/HeroOverlay'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import LazyQuoteForm from '@/components/ui/LazyQuoteForm'
import LazyGoogleReviews from '@/components/ui/LazyGoogleReviews'
import LazyGoogleMap from '@/components/ui/LazyGoogleMap'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { getYearsInBusiness, establishedEyebrow, sinceYearPhrase, startedInYearPhrase } from '@/lib/years-in-business'
import { projectsCompletedValue } from '@/lib/projects-completed'
import { cities } from '@/lib/cities'
import TrackPhoneLink from '@/components/analytics/TrackPhoneLink'
import FaqAccordion from '@/components/ui/FaqAccordion'
import ProjectPreviewGrid from '@/components/gallery/ProjectPreviewGrid'

export const metadata: Metadata = generatePageMetadata({
  title: siteConfig.homeTitle,
  description: siteConfig.description,
  path: '/',
  absoluteTitle: true,
  keywords: [
    'landscaping cedar falls',
    'cedar falls iowa landscaping',
    'waterloo landscaping',
    'landscaping waterloo ia',
    'black hawk county landscaping',
    'retaining wall cedar falls',
    'paver patio cedar falls',
    'paver driveway cedar falls',
    'lawn care cedar falls iowa',
    'a1 landscaping',
    'a1 landscaping cedar falls',
    'a1 property services',
  ],
  ogImage: '/images/hero-background-image.webp',
  ogImageAlt: 'Aerial drone view of Cedar Falls, Iowa',
})

const trustPoints = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Local & Based in Cedar Falls',
    desc: 'We live and work in Cedar Falls and Waterloo. We know Black Hawk County soil, seasons, and what lasts here.',
  },
  {
    icon: <Check className="h-6 w-6" />,
    title: 'Insured & Licensed',
    desc: 'Fully licensed Iowa contractor. Every job is insured, and we can show you proof before we start.',
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: '5-Star Rated',
    desc: 'Our reputation is built on quality work and reliable service. Read what our customers say.',
  },
]

function getStats() {
  return [
    { value: projectsCompletedValue(), label: 'Projects Completed' },
    { value: String(getYearsInBusiness()), label: 'Years in Cedar Falls' },
    { value: String(cities.length), label: 'Cities Served' },
    { value: '24-Hr', label: 'Typical Response' },
  ]
}

const faqItems = [
  {
    q: 'Is A1 Landscaping the same as A1 Property Services?',
    a: 'Yes. A1 Property Services is the Cedar Falls landscaping company people search as A1 Landscaping. We are the local crew for patios, retaining walls, lawn care, and full installs in Cedar Falls, Waterloo, and Black Hawk County.',
  },
  {
    q: 'How much does landscaping cost in Cedar Falls?',
    a: 'Landscaping cost in Cedar Falls depends on scope — plantings and lawn care cost less than retaining walls or paver patios. We visit your property and give a free written estimate with clear pricing and no surprises.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. A1 Property Services is a licensed Iowa contractor with full liability insurance. We provide proof before any job starts.',
  },
  {
    q: 'How quickly can you start my project?',
    a: 'Spring and fall fill up fast. Call (319) 464-1889 or request a quote online — we typically respond within 24 hours and get you on the schedule.',
  },
  {
    q: 'Do you serve Waterloo and Black Hawk County?',
    a: 'Yes. We are based in Cedar Falls, Iowa (50613) and serve Waterloo, Hudson, Evansdale, Elk Run Heights, Dunkerton, La Porte City, and the rest of Black Hawk County. Call (319) 464-1889 for a free estimate.',
  },
]

const faqJsonLd = faqPageJsonLd(
  faqItems.map((faq) => ({ question: faq.q, answer: faq.a })),
)

export default function HomePage() {
  const stats = getStats()

  const pageSchema = webPageJsonLd({
    name: siteConfig.homeTitle,
    description: siteConfig.description,
    path: '/',
    image: '/og-image.jpg',
    about: 'A1 Landscaping and A1 Property Services in Cedar Falls, Waterloo, and Black Hawk County, Iowa',
  })

  return (
    <>
      <HeroImagePreload src={siteImages.homeHero} maxWidth={1920} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* HERO: full first screen on mobile; trust bar is below the fold until scroll */}
      <section className="relative flex flex-col overflow-hidden md:h-[100dvh]">
        <LcpHeroImage
          src={siteImages.homeHero}
          alt="Aerial view of Cedar Falls, Iowa"
          maxWidth={1920}
        />
        <HeroOverlay imageSrc={siteImages.homeHero} variant="left" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-24 pt-28 sm:px-6 md:min-h-0 md:pb-8 lg:px-8">
          <div>
            <HeroCopyDeferred
              eyebrow={establishedEyebrow()}
              title={'A1 Property Services, Landscaping in Cedar Falls, IA|Yards Black Hawk County Homeowners Are Proud Of'}
              subtitle="We design, build, and maintain outdoor spaces in Cedar Falls, Waterloo, and nearby towns. Paver patios, retaining walls, full installs."
              evenTitleLines
              titleMaxWidth="64rem"
            >
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#estimate" trackLabel="Home Hero Quote">
                  {CTA_COPY.quote}
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button href={`tel:${siteConfig.phone}`} variant="ghost" trackLabel="Home Hero Phone">
                  <Phone className="h-4 w-4" aria-hidden />
                  {CTA_COPY.callNow}
                </Button>
              </div>
            </HeroCopyDeferred>
          </div>
        </div>

        <div className="relative z-10 shrink-0 border-t border-white/10 bg-black/55">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/85 sm:gap-10">
            <span className="flex items-center gap-1.5">
              <Star size={12} className="fill-brand-gold text-brand-gold" /> 5-Star Rated
            </span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <span>Licensed &amp; Insured</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <span>Free Estimates</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <span>Cedar Falls &amp; Waterloo</span>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bar">
        <div className="section-inner">
          <div className="grid grid-cols-2 divide-x divide-y divide-black/[0.08] md:grid-cols-4 md:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-8 text-center sm:px-6 md:py-6">
                <p className="stats-value">{stat.value}</p>
                <p className="stats-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section id="services" className="section bg-brand-stone">
        <div className="section-inner">
          <FadeIn className="text-center">
            <p className="section-eyebrow">What We Do</p>
            <h2 className="section-heading mt-4">Our Services</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-body">
              Weekly mowing, retaining walls, a new patio, a full yard redo. We handle it for Cedar Falls, Waterloo, and Black Hawk County homeowners.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((service) => (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-10 text-center" delay={0.15}>
            <Button href="/services">
              View All Services &rarr;
            </Button>
            <p className="mt-3 text-sm text-brand-muted">
              Lawn care, hardscaping, drainage, and more — organized in one list.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* HARDSCAPE RANKING PAGES — same targets as live site footer/CTAs */}
      <section className="section bg-white">
        <div className="section-inner">
          <FadeIn className="text-center">
            <p className="section-eyebrow">Hardscaping</p>
            <h2 className="section-heading mt-4">Retaining Walls, Patios, Driveways &amp; Water Features</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-body">
              Dedicated pages for our most-requested hardscape services — retaining walls, paver patios, paver driveways, and water features.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hardscapeFeatures
              .filter((feature) => Boolean(feature.oldHref))
              .map((feature) => {
              const imageSrc =
                feature.slug === 'retaining-walls'
                  ? siteImages.hardscapeRetainingWalls
                  : feature.slug === 'paver-patio'
                    ? siteImages.hardscapePaverPatio
                    : feature.slug === 'paver-driveway'
                      ? siteImages.hardscapePaverDriveway
                      : siteImages.hardscapePondsWaterFeatures

              return (
                <StaggerItem key={feature.slug}>
                  <Link href={feature.oldHref || feature.href} className="card group flex h-full flex-col overflow-hidden">
                    <div className="card-image relative aspect-[4/3]">
                      <ResponsiveImage
                        src={imageSrc}
                        alt={feature.name}
                        fill
                        sizes={IMAGE_SIZES.thirdCol}
                        className="card-image-zoom object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <h3 className="text-lg font-bold text-brand-dark transition-colors group-hover:text-brand-green-800">
                        {feature.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-brand-muted">{feature.shortDesc}</p>
                      <span className="link-cta-sm mt-auto">
                        View {feature.name}{' '}
                        <ChevronRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* BEFORE & AFTER GALLERY */}
      <section className="section bg-brand-stone">
        <div className="section-inner">
          <FadeIn className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow">Our Work</p>
              <h2 className="section-heading mt-4">Before &amp; After</h2>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-brand-body">
                Drag the slider to compare, then open a project to see materials and how we built it.
              </p>
            </div>
            <Button href="/gallery" variant="outline" size="sm" className="hidden sm:inline-flex">
              View Full Gallery
            </Button>
          </FadeIn>

          <div className="mt-10">
            <ProjectPreviewGrid projects={homepageGalleryPreview} />
          </div>

          <FadeIn className="mt-8 text-center sm:hidden" delay={0.1}>
            <Button href="/gallery" variant="outline" size="sm">View Full Gallery &rarr;</Button>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT / TRUST BLOCK */}
      <section className="section bg-white">
        <div className="section-inner">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <p className="section-eyebrow">Who We Are</p>
              <h2 className="section-heading mt-4">
                A Local Landscaping Crew in Cedar Falls &amp; Waterloo
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-brand-body">
                A1 Property Services {startedInYearPhrase()} with one goal: do good work and keep showing up. Retaining walls, paver patios, full yard installs, seasonal maintenance. Big jobs and small ones.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-brand-body">
                We&rsquo;ve served Cedar Falls, Waterloo, and Black Hawk County {sinceYearPhrase()}. When you hire us, you&rsquo;re hiring neighbors who care how your yard looks when we drive past it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#estimate">
                  {CTA_COPY.quote}
                </Button>
                <Button href="/about" variant="outline">
                  Our Story
                </Button>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="media-frame relative aspect-[4/3]">
                <ResponsiveImage
                  src={siteImages.aboutCrew}
                  alt="A1 Property Services crew on a retaining wall jobsite in Cedar Falls, Iowa"
                  fill
                  objectPosition="center 30%"
                  sizes={IMAGE_SIZES.halfCol}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TRUST POINTS */}
      <section className="section bg-brand-green-100">
        <div className="section-inner">
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {trustPoints.map((point) => (
              <StaggerItem key={point.title}>
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-green-800 shadow-[0_8px_24px_-12px_rgba(158,27,36,0.45)] ring-1 ring-brand-gold/10">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-brand-dark">{point.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-muted">{point.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <LazyGoogleReviews />

      {/* FAQ */}
      <section className="section bg-brand-stone">
        <div className="section-inner-narrow">
          <FadeIn className="text-center">
            <p className="section-eyebrow">Questions?</p>
            <h2 className="section-heading mt-4">Frequently Asked Questions</h2>
          </FadeIn>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Related Content */}
      <RelatedContent
        className="bg-white"
        eyebrow="From the Blog"
        heading="Yard Tips & Project Ideas"
        groups={[
        ...(blogPosts.length > 0 ? [{
          heading: 'Latest Articles',
          items: getSortedPosts().slice(0, 3).map(p => ({
            type: 'blog' as const,
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            url: `/blog/${p.slug}`,
            relevance: 5,
          })),
        }] : []),
      ]} />

      {/* CTA / QUOTE FORM */}
      <section id="estimate" className="section bg-brand-stone">
        <div className="section-inner relative">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="section-eyebrow">Get Started</p>
              <h2 className="section-heading mt-4">
                Want a Quote on Your Project?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-brand-body">
                Tell us about your project and we&rsquo;ll get back to you within 24 hours with honest, upfront pricing.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  Free on-site estimates in Cedar Falls, Waterloo &amp; Black Hawk County
                </li>
                <li className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  Licensed &amp; insured Iowa contractor
                </li>
                <li className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  Response within one business day
                </li>
              </ul>
              <TrackPhoneLink
                location="Homepage Estimate"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-gold"
              >
                <Phone size={16} className="text-brand-gold" />
                Or call {siteConfig.phoneDisplay}
              </TrackPhoneLink>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="form-card">
                <h3 className="font-display text-xl font-bold text-brand-dark">Request a Free Quote</h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Name and phone are enough — we&rsquo;ll take it from there.
                </p>
                <div className="mt-6">
                  <LazyQuoteForm variant="light" formLocation="Homepage" compact />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MAP + CONTACT */}
      <section className="section bg-white">
        <div className="section-inner">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <p className="section-eyebrow">Find Us</p>
              <h2 className="section-heading mt-4">Serving Cedar Falls, Waterloo &amp; Black Hawk County</h2>
              <p className="mt-5 text-lg leading-relaxed text-brand-body">
                A1 Property Services is a locally owned and operated{' '}
                <Link
                  href="/landscaping-services-in-cedar-falls"
                  className="text-brand-green-800 underline underline-offset-2 transition-colors hover:text-brand-gold"
                >
                  landscaping company
                </Link>{' '}
                based in Cedar Falls, Iowa (50613). We serve Waterloo and Black Hawk County homeowners — Hudson, Evansdale, Elk Run Heights, Dunkerton, and La Porte City included.
              </p>
              <div className="mt-8 space-y-3 text-sm text-brand-body">
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-gold shrink-0" />
                  <span>503 Bergstrom Blvd, Cedar Falls, IA 50613</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-brand-gold shrink-0" />
                  <TrackPhoneLink
                    location="Homepage Map"
                    className="link-touch text-brand-green-800 transition-colors hover:underline"
                  >
                    {siteConfig.phoneDisplay}
                  </TrackPhoneLink>
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="overflow-hidden rounded-2xl shadow-premium-lg ring-1 ring-black/5">
                <LazyGoogleMap />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
