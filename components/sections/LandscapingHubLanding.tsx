import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Check, ChevronRight, Phone, Star } from 'lucide-react'
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  generatePageMetadata,
  jsonLdGraph,
  siteConfig,
  webPageJsonLd,
} from '@/lib/metadata'
import { landscapingHubPage } from '@/lib/landscaping-hub-page'
import { hubGalleryPreview } from '@/lib/images'
import { CTA_COPY } from '@/lib/cta'
import { yearsInBusinessLabel } from '@/lib/years-in-business'
import Button from '@/components/ui/Button'
import CtaBanner from '@/components/sections/CtaBanner'
import FaqAccordion from '@/components/ui/FaqAccordion'
import LcpHeroImage from '@/components/ui/LcpHeroImage'
import HeroImagePreload from '@/components/ui/HeroImagePreload'
import HeroOverlay from '@/components/ui/HeroOverlay'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'

const BeforeAfterSlider = dynamic(() => import('@/components/ui/BeforeAfterSlider'), {
  loading: () => <div className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-200" />,
  ssr: false,
})

const GoogleReviews = dynamic(() => import('@/components/ui/GoogleReviews'))

const QuoteForm = dynamic(() => import('@/components/ui/QuoteForm'))

export function landscapingHubMetadata() {
  const page = landscapingHubPage
  return generatePageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: page.keywords,
    ogImage: page.ogImage,
    ogImageAlt: page.ogImageAlt,
    absoluteTitle: true,
  })
}

export default function LandscapingHubLanding() {
  const page = landscapingHubPage

  const pageSchema = webPageJsonLd({
    name: page.title,
    description: page.description,
    path: page.path,
    image: page.heroImage,
    about: 'Landscaping Cedar Falls',
  })

  const localBusinessServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Landscaping Cedar Falls',
    name: 'Landscaping Cedar Falls',
    provider: { '@id': `${siteConfig.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Cedar Falls', containedInPlace: { '@type': 'State', name: 'Iowa' } },
      { '@type': 'City', name: 'Waterloo' },
      { '@type': 'Place', name: 'Cedar Valley' },
    ],
    description: page.description,
    url: `${siteConfig.url}${page.path}`,
    image: `${siteConfig.url}${page.heroImage}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              localBusinessServiceJsonLd,
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Landscaping Cedar Falls', path: page.path },
              ]),
              faqPageJsonLd(page.faqs),
            ),
          ),
        }}
      />

      <section
        className="relative flex min-h-[55vh] flex-col overflow-hidden pt-24 pb-0 text-white md:min-h-[60vh]"
        style={{ position: 'relative' }}
      >
        <HeroImagePreload src={page.heroImage} />
        <LcpHeroImage src={page.heroImage} alt={page.heroImageAlt} />
        <HeroOverlay imageSrc={page.heroImage} variant="center" />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 pb-8 text-center sm:px-6">
          <div>
            <p className="hero-eyebrow">{page.eyebrow}</p>
            <h1 className="hero-title mt-4">{page.h1}</h1>
            <h2 className="hero-subtitle mx-auto mt-4 max-w-3xl md:mt-6">{page.heroHeading}</h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#estimate" size="lg">
                {CTA_COPY.quote}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href={`tel:${siteConfig.phone}`} variant="ghost" size="lg">
                <Phone className="h-4 w-4" aria-hidden />
                {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>

        <div className="relative z-10 shrink-0 border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-sm text-white/90 sm:gap-10">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="fill-brand-gold text-brand-gold" /> 5-Star Rated
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>Licensed &amp; Insured</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>{yearsInBusinessLabel()}</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>Free Estimates</span>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="section-inner">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="section-heading">{page.introHeading}</h2>
              <div className="mt-6 space-y-4 text-brand-body leading-relaxed">
                {page.introParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                <ResponsiveImage
                  src={page.contentImage}
                  alt={page.contentImageAlt}
                  fill
                  className="transition-transform duration-700 hover:scale-105"
                  sizes={IMAGE_SIZES.halfCol}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <GoogleReviews />

      <section className="section bg-brand-stone">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">{page.coreServicesHeading}</h2>
          <p className="mt-6 text-brand-body leading-relaxed">{page.coreServicesIntro}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {page.featuredServices.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="flex items-center justify-between rounded-xl border border-black/10 bg-brand-stone px-5 py-4 text-brand-dark transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
                >
                  <span className="font-display text-lg font-semibold">{service.label}</span>
                  <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#estimate">
              {CTA_COPY.quote}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/services" variant="outline">
              Browse All Services
            </Button>
          </div>
        </FadeIn>
      </section>

      <section className="section bg-white">
        <div className="section-inner">
          <FadeIn className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow">Cedar Falls Projects</p>
              <h2 className="section-heading mt-3">Recent Cedar Falls Projects</h2>
              <p className="mt-2 max-w-xl text-brand-body">
                Real work from Cedar Falls and the Cedar Valley — retaining walls, patios, water features, and full installs.
              </p>
            </div>
            <Button href="/gallery" variant="outline" size="sm" className="hidden sm:inline-flex">
              View Full Gallery
            </Button>
          </FadeIn>

          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.recentProjects.map((project) => (
              <StaggerItem key={project.href + project.title}>
                <Link href={project.href} className="group card block h-full overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ResponsiveImage
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="transition-transform duration-500 group-hover:scale-105"
                      sizes={IMAGE_SIZES.thirdCol}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-brand-dark group-hover:text-brand-gold">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-brand-body">{project.description}</p>
                    <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-green-700">
                      View Project <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section bg-brand-stone">
        <div className="section-inner">
          <FadeIn className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow">Our Work</p>
              <h2 className="section-heading mt-3">Before &amp; After</h2>
              <p className="mt-2 max-w-xl text-brand-body">
                Drag the slider to compare before and after on recent Cedar Falls landscaping projects.
              </p>
            </div>
            <Button href="/gallery" variant="outline" size="sm" className="hidden sm:inline-flex">
              View Full Gallery
            </Button>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {hubGalleryPreview.map((project) => (
              <BeforeAfterSlider
                key={project.id}
                title={project.title}
                before={{ ...project.before, priority: false }}
                after={{ ...project.after, priority: false }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">{page.allServicesHeading}</h2>
          <p className="mt-6 text-brand-body leading-relaxed">{page.allServicesIntro}</p>
        </FadeIn>
      </section>

      {page.serviceSections.map((section, index) => (
        <section
          key={section.heading}
          className={`section ${index % 2 === 0 ? 'bg-white' : 'bg-brand-stone'}`}
        >
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">{section.heading}</h2>
            <div className="mt-6 space-y-4 text-brand-body leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            {section.bulletsHeading ? (
              <h3 className="mt-8 font-display text-xl font-bold text-brand-dark">{section.bulletsHeading}</h3>
            ) : null}
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-brand-body">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#estimate">
                {CTA_COPY.quote}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
              {section.serviceHref ? (
                <Button href={section.serviceHref} variant="outline">
                  {CTA_COPY.learnMore}
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              ) : null}
              <Button href={`tel:${siteConfig.phone}`} variant="outline">
                <Phone className="h-4 w-4" aria-hidden />
                Call Now
              </Button>
            </div>
            {section.serviceHref ? (
              <p className="mt-4 text-sm text-brand-body">
                Full details:{' '}
                <Link
                  href={section.serviceHref}
                  className="font-semibold text-brand-green-800 underline-offset-2 hover:text-brand-gold hover:underline"
                >
                  {section.serviceLinkLabel ?? section.heading.toLowerCase()}
                </Link>
              </p>
            ) : null}
          </FadeIn>
        </section>
      ))}

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">{page.faqHeading}</h2>
          <FaqAccordion
            items={page.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))}
          />
        </FadeIn>
      </section>

      <section id="estimate" className="section bg-neutral-50">
        <div className="section-inner relative">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="section-eyebrow">Get Started</p>
              <h2 className="section-heading mt-3">{page.contactHeading}</h2>
              <p className="mt-4 leading-relaxed text-brand-body">{page.contactIntro}</p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  Free on-site estimates for Cedar Falls homeowners
                </li>
                <li className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  Licensed &amp; insured Iowa contractor
                </li>
                <li className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  5-star Google rating from local customers
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
                <QuoteForm variant="light" formLocation="Landscaping Hub" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow text-center">
          <p className="text-lg text-brand-body leading-relaxed">{page.closingCopy}</p>
          <p className="mt-4 text-lg font-semibold text-brand-dark">
            <Link href="#estimate" className="text-brand-green-800 underline-offset-2 hover:text-brand-gold hover:underline">
              Get your free estimate today!
            </Link>
          </p>
        </FadeIn>
      </section>

      <CtaBanner
        title="Get Your Free Landscaping Estimate"
        description="Tell us about your landscaping Cedar Falls project. We serve Cedar Falls, Waterloo, and the full Cedar Valley."
        eyebrow="Landscaping Cedar Falls"
      />
    </>
  )
}
