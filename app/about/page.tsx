import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Award, Heart, Phone, Check, MapPin } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, siteConfig, webPageJsonLd, jsonLdGraph } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { siteImages } from '@/lib/images'
import Button from '@/components/ui/Button'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import CtaBanner from '@/components/sections/CtaBanner'
import EstimateSection from '@/components/sections/EstimateSection'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import {
  getYearsInBusiness,
  yearsInBusinessOverPhrase,
  yearsInBusinessPhrase,
  sinceYearPhrase,
  startedInYearPhrase,
  FOUNDING_YEAR,
} from '@/lib/years-in-business'
import { projectsCompletedValue } from '@/lib/projects-completed'
import { cities } from '@/lib/cities'

const GoogleReviews = dynamic(() => import('@/components/ui/GoogleReviews'))

export async function generateMetadata(): Promise<Metadata> {
  const years = getYearsInBusiness()
  return generatePageMetadata({
    title: 'About Us',
    description: `Meet A1 Property Services — Cedar Falls and Waterloo landscaping and hardscaping experts with ${years} years serving Black Hawk County, Iowa.`,
    path: '/about',
  })
}

const values = [
  {
    icon: <Award className="h-6 w-6" />,
    title: 'We Do It Right',
    desc: 'Proper technique, solid materials, and attention to the details that matter in Iowa weather.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Customer First',
    desc: 'Straight answers, clear pricing, and realistic timelines. Your trust is what keeps us in business.',
  },
  {
    icon: <Check className="h-6 w-6" />,
    title: 'Finish What We Start',
    desc: 'We leave the site graded, cleaned up, and ready to use. A job is not done until you can enjoy the yard.',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Built for Iowa',
    desc: 'Clay soil, freeze-thaw, and short growing seasons. We build walls, patios, and plantings that last here.',
  },
]

export default function AboutPage() {
  const stats = [
    { value: projectsCompletedValue(), label: 'Projects Completed' },
    { value: String(cities.length), label: 'Cities Served' },
    { value: 'Licensed', label: 'Iowa Contractor' },
    { value: `Est. ${FOUNDING_YEAR}`, label: 'Cedar Falls, Iowa' },
  ]

  const pageSchema = webPageJsonLd({
    name: 'About Us | A1 Property Services',
    description: `Meet A1 Property Services — Cedar Falls and Waterloo landscaping and hardscaping experts with ${yearsInBusinessPhrase()} serving Black Hawk County, Iowa.`,
    path: '/about',
    about: 'Landscaping Company',
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
                { name: 'About', path: '/about' },
              ]),
            ),
          ),
        }}
      />
      <PageHero
        imageSrc={siteImages.aboutHero}
        imageAlt="A1 Property Services team in Cedar Falls, Iowa"
        eyebrow="Our Story"
        title="Cedar Falls Landscaping|Built on Trust"
        subtitle={`For ${yearsInBusinessOverPhrase()}, A1 Property Services has been building and maintaining yards across Cedar Falls, Waterloo, and Black Hawk County.`}
      />

      <section className="section bg-white">
        <div className="section-inner">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                <ResponsiveImage
                  src={siteImages.aboutPrimary}
                  alt="A1 Property Services landscape installation project in Cedar Falls"
                  fill
                  className="transition-transform duration-700 hover:scale-105"
                  sizes={IMAGE_SIZES.halfCol}
                />
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <p className="section-eyebrow">Who We Are</p>
              <h2 className="section-heading mt-3">Your Local Landscaping Partner</h2>
              <p className="mt-6 leading-relaxed text-brand-body">
                A1 Property Services {startedInYearPhrase()} because Cedar Falls and Waterloo homeowners needed a crew they could count on. We&apos;re still here, still doing the work.
              </p>
              <p className="mt-4 leading-relaxed text-brand-body">
                Retaining walls, paver patios, full yard installs, seasonal maintenance. We have the equipment and the experience to get it done right the first time.
              </p>
              <p className="mt-4 leading-relaxed text-brand-body">
                We have served Cedar Falls, Waterloo, and Black Hawk County {sinceYearPhrase()}. When you hire us, you are hiring neighbors who care how your yard looks when we drive past it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#estimate" trackLabel="About Quote">
                  {CTA_COPY.quote}
                </Button>
                <Button href={`tel:${siteConfig.phone}`} variant="outline" trackLabel="About Phone">
                  <Phone size={16} />
                  {siteConfig.phoneDisplay}
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section bg-brand-stone">
        <div className="section-inner">
          <FadeIn className="text-center">
            <p className="section-eyebrow">What Drives Us</p>
            <h2 className="section-heading mt-3">Our Values</h2>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="card h-full p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-800/10 text-brand-green-800 transition-transform duration-300 hover:scale-110">
                    {v.icon}
                  </div>
                  <h3 className="mt-4 font-bold text-brand-dark">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-body">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

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

      <GoogleReviews />

      <EstimateSection
        formLocation="About"
        heading="Ready to Talk About Your Yard?"
        description="Tell us what you're working on and we'll take it from there — free estimate, no pressure."
        defaultCity="Cedar Falls"
      />

      <CtaBanner
        title="Prefer to call?"
        description="We're happy to talk through your project over the phone."
        quoteHref="#estimate"
      />
    </>
  )
}
