import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Check, ChevronRight, MapPin, Phone, Star } from 'lucide-react'
import { services } from '@/lib/services'
import { CTA_COPY } from '@/lib/cta'
import { generatePageMetadata, getGoogleMapsEmbedUrl, localBusinessJsonLd, siteConfig, faqPageJsonLd, webPageJsonLd } from '@/lib/metadata'
import Button from '@/components/ui/Button'
import { siteImages, homepageGalleryPreview } from '@/lib/images'
import { blogPosts } from '@/lib/blog'
import RelatedContent from '@/components/sections/RelatedContent'
import ServiceIcon from '@/components/ui/ServiceIcon'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import HeroTitle from '@/components/ui/HeroTitle'
import LcpHeroImage from '@/components/ui/LcpHeroImage'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import HeroImagePreload from '@/components/ui/HeroImagePreload'
import { IMAGE_SIZES } from '@/lib/image-sizes'

const BeforeAfterSlider = dynamic(() => import('@/components/ui/BeforeAfterSlider'), {
  loading: () => <div className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-200" />,
})

const GoogleReviews = dynamic(() => import('@/components/ui/GoogleReviews'))

const QuoteForm = dynamic(() => import('@/components/ui/QuoteForm'))

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Contractor in Cedar Falls, IA',
  description:
    "Cedar Falls landscaping company. Retaining walls, paver patios, lawn care and more. Licensed and insured. Get your free quote today.",
  path: '/',
  keywords: [
    'landscaping cedar falls',
    'retaining wall cedar falls',
    'paver patio cedar falls',
    'hardscaping cedar falls ia',
    'lawn care cedar falls',
    'snow removal cedar falls',
  ],
  ogImage: '/images/hero-background-image.webp',
  ogImageAlt: 'Professional landscaping project in Cedar Falls, Iowa',
})

const trustPoints = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Local & Based in Cedar Falls',
    desc: 'We live and work in the Cedar Valley. We know the soil, the seasons, and what works here.',
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

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '15', label: 'Years in Cedar Valley' },
  { value: '5.0', label: 'Average Rating' },
  { value: 'Licensed', label: '& Insured Iowa Contractor' },
]

const faqItems = [
  {
    q: 'How much does landscaping cost in Cedar Falls?',
    a: 'Every yard is different. We come to your property, discuss what you need, and provide a free written estimate. No surprises, no pressure.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. A1 Property Services is a licensed Iowa contractor with full liability insurance. We provide proof before any job starts.',
  },
  {
    q: 'How quickly can you start my project?',
    a: 'Spring and fall fill up fast. The best way to get on the schedule is to call us or request a quote online. We typically respond within 24 hours.',
  },
  {
    q: 'Do you serve Waterloo and surrounding areas?',
    a: 'Yes. We serve Cedar Falls, Waterloo, Hudson, Evansdale, and the entire Cedar Valley area.',
  },
]

const faqJsonLd = faqPageJsonLd(
  faqItems.map((faq) => ({ question: faq.q, answer: faq.a })),
)

export default function HomePage() {
  const pageSchema = webPageJsonLd({
    name: 'A1 Property Services | Landscaping in Cedar Falls, IA',
    description: siteConfig.description,
    path: '/',
    image: '/og-image.jpg',
    about: 'Landscaping Services',
  })

  return (
    <>
      <HeroImagePreload src={siteImages.homeHero} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* HERO — photo background, left-aligned, trust bar below content */}
      <section className="relative flex min-h-[100vh] flex-col overflow-hidden md:min-h-[105vh]">
        <LcpHeroImage
          src={siteImages.homeHero}
          alt="Professional landscaping project in Cedar Falls, Iowa"
        />
        <div className="absolute inset-0 bg-hero-overlay" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-8 pt-28 sm:px-6 lg:px-8">
          <div>
            <p className="hero-eyebrow">CEDAR FALLS &middot; IOWA &middot; EST. 2009</p>
            <h1 className="hero-title mt-4 max-w-4xl">
              <HeroTitle>Outdoor Spaces|Cedar Valley Homeowners Are Proud Of</HeroTitle>
            </h1>
            <p className="hero-subtitle mt-5 max-w-[640px]">
              We design, build, and maintain yards you&rsquo;ll actually use. Paver patios, retaining walls, full installs. Whatever your property needs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact">
                {CTA_COPY.quote}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/gallery" variant="ghost">
                {CTA_COPY.gallery}
              </Button>
            </div>
          </div>
        </div>

        {/* Trust bar — flows below hero content, not overlapping CTAs */}
        <div className="relative z-10 shrink-0 border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-sm text-white/90 sm:gap-10">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="fill-brand-gold text-brand-gold" /> 5-Star Rated
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>Licensed &amp; Insured</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>15+ Years</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
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
            <h2 className="section-heading mt-3">Our Services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-body">
              Weekly mowing, retaining walls, a new patio, a full yard redo. We handle it for Cedar Valley homeowners.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="card group flex h-full flex-col gap-4 p-6"
                >
                  <ServiceIcon name={service.icon} />
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark transition-colors group-hover:text-brand-green-800">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-body/70">{service.shortDesc}</p>
                  </div>
                  <span className="link-cta-sm mt-auto">
                    {CTA_COPY.learnMore}{' '}
                    <ChevronRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-10 text-center" delay={0.15}>
            <Button href="/services" variant="outline">
              View All Services &rarr;
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* BEFORE & AFTER GALLERY */}
      <section className="section bg-white">
        <div className="section-inner">
          <FadeIn className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow">Our Work</p>
              <h2 className="section-heading mt-3">Before &amp; After</h2>
              <p className="mt-2 text-brand-body/70 max-w-xl">
                Drag the slider on each project to compare before and after.
              </p>
            </div>
            <Button href="/gallery" variant="outline" size="sm" className="hidden sm:inline-flex">
              View Full Gallery
            </Button>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {homepageGalleryPreview.map((project) => (
              <BeforeAfterSlider
                key={project.id}
                title={project.title}
                before={project.before}
                after={project.after}
              />
            ))}
          </div>

          <FadeIn className="mt-8 text-center sm:hidden" delay={0.1}>
            <Button href="/gallery" variant="outline" size="sm">View Full Gallery &rarr;</Button>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT / TRUST BLOCK */}
      <section className="section bg-brand-stone">
        <div className="section-inner">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <p className="section-eyebrow">Who We Are</p>
              <h2 className="section-heading mt-3">
                A Local Landscaping Crew in the Cedar Valley
              </h2>
              <p className="mt-6 leading-relaxed text-brand-body">
                A1 Property Services started in 2009 with one goal: do good work and keep showing up. Retaining walls, paver patios, full yard installs, seasonal maintenance. Big jobs and small ones.
              </p>
              <p className="mt-4 leading-relaxed text-brand-body">
                We&rsquo;ve served Cedar Falls, Waterloo, and towns across the Cedar Valley since 2009. When you hire us, you&rsquo;re hiring neighbors who care how your yard looks when we drive past it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/about" variant="ghost-dark">
                  Our Story
                </Button>
                <Button href={`tel:${siteConfig.phone}`} variant="ghost-dark">
                  <Phone size={16} />
                  {siteConfig.phoneDisplay}
                </Button>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <ResponsiveImage
                  src={siteImages.aboutSecondary}
                  alt="A1 Property Services landscape project in Cedar Falls"
                  fill
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
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-full bg-brand-green-800/10 p-3 text-brand-green-800">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark">{point.title}</h3>
                    <p className="mt-1 text-sm text-brand-body/70">{point.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <GoogleReviews />

      {/* FAQ */}
      <section className="section bg-brand-stone">
        <div className="section-inner-narrow">
          <FadeIn className="text-center">
            <p className="section-eyebrow">Questions?</p>
            <h2 className="section-heading mt-3">Frequently Asked Questions</h2>
          </FadeIn>
          <div className="mt-12 space-y-4">
            {faqItems.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 0.05}>
                <details className="card group overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-left font-semibold text-brand-dark">
                    {faq.q}
                    <ChevronRight size={16} className="shrink-0 text-brand-gold transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-sm leading-relaxed text-brand-body/70">{faq.a}</p>
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content */}
      <RelatedContent groups={[
        ...(blogPosts.length > 0 ? [{
          heading: 'Latest Articles',
          items: blogPosts.slice(0, 3).map(p => ({
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
      <section id="estimate" className="section bg-neutral-50">
        <div className="section-inner relative">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="section-eyebrow">Get Started</p>
              <h2 className="section-heading mt-3">
                Want a Quote on Your Project?
              </h2>
              <p className="mt-4 leading-relaxed text-brand-body">
                Tell us about your project and we&rsquo;ll get back to you within 24 hours with honest, upfront pricing.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  Free on-site estimates for Cedar Valley homeowners
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
              <a
                href={`tel:${siteConfig.phone}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-gold"
              >
                <Phone size={16} className="text-brand-gold" />
                Or call {siteConfig.phoneDisplay}
              </a>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="form-card">
                <h3 className="font-display text-xl font-bold text-brand-dark">Request a Free Quote</h3>
                <p className="mt-1 text-sm text-brand-body/70">Fill out the form and we&rsquo;ll be in touch shortly.</p>
                <div className="mt-6">
                  <QuoteForm variant="light" />
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
              <h2 className="section-heading mt-3">Serving the Cedar Valley</h2>
              <p className="mt-4 text-brand-body">
                A1 Property Services is a locally owned and operated landscaping company based in Cedar Falls, Iowa.
                We serve homeowners throughout the Cedar Valley.
              </p>
              <div className="mt-8 space-y-3 text-sm text-brand-body">
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-gold shrink-0" />
                  <span>503 Bergstrom Blvd, Cedar Falls, IA 50613</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-brand-gold shrink-0" />
                  <a href={`tel:${siteConfig.phone}`} className="text-brand-green-800 transition-colors hover:underline">
                    {siteConfig.phoneDisplay}
                  </a>
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="overflow-hidden rounded-xl shadow-premium-lg">
                <iframe
                  title="A1 Property Services location"
                  src={getGoogleMapsEmbedUrl()}
                  className="h-[320px] w-full border-0 md:h-[420px]"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
