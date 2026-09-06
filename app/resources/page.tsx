import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ChevronRight, ExternalLink } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from '@/lib/metadata'
import { siteImages } from '@/lib/images'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import CtaBanner from '@/components/sections/CtaBanner'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Resources',
  description:
    'Helpful landscaping resources for Cedar Falls and Waterloo homeowners. Guides, checklists, and expert tips for maintaining your property.',
  path: '/resources',
})

const resourceCategories = [
  'Problems',
  'Costs',
  'Comparisons',
  'Seasonal',
  'Planting',
  'Drainage',
  'Hardscaping',
  'Lawn Care',
  'Design',
] as const

const resources = [
  {
    title: 'Why Does My Yard Flood When It Rains?',
    description: 'Diagnose clay, grade, and downspout problems that pond Cedar Falls and Waterloo yards after a storm.',
    href: '/learn/why-yard-floods-when-it-rains',
    category: 'Problems',
  },
  {
    title: 'Do I Need a Retaining Wall?',
    description: 'Signs a sloped Iowa yard needs a structural wall — and when grading or drainage is the better first move.',
    href: '/learn/do-i-need-a-retaining-wall',
    category: 'Problems',
  },
  {
    title: 'Why Won’t Grass Grow in My Yard?',
    description: 'Why cool-season lawns fail on Black Hawk County clay and which fix actually grows grass.',
    href: '/learn/why-wont-grass-grow-in-my-yard',
    category: 'Problems',
  },
  {
    title: 'How Much Does Hydroseeding Cost?',
    description: 'Typical hydroseeding prices for Cedar Falls and Waterloo yards, plus when sod is still the better spend.',
    href: '/learn/hydroseeding-cost',
    category: 'Costs',
  },
  {
    title: 'How Much Does a Retaining Wall Cost in Cedar Falls?',
    description: 'Real local ranges for block, stone, and timber walls, and what actually drives the number.',
    href: '/blog/retaining-wall-cost-cedar-falls',
    category: 'Costs',
  },
  {
    title: 'Yard Drainage Cost in Cedar Falls',
    description: 'What to budget for French drains, grading, and catch basins on a typical Black Hawk County lot.',
    href: '/blog/yard-drainage-cost-cedar-falls',
    category: 'Costs',
  },
  {
    title: 'Mulch vs Rock Landscaping',
    description: 'Cost, weeds, heat, and maintenance — when hardwood mulch wins and when decorative rock is the better bed.',
    href: '/learn/mulch-vs-rock-landscaping',
    category: 'Comparisons',
  },
  {
    title: 'Hydroseeding vs. Sod in Cedar Falls',
    description: 'Which lawn method fits your timeline, slope, and budget on an Iowa lot.',
    href: '/blog/hydroseeding-vs-sod-cedar-falls',
    category: 'Comparisons',
  },
  {
    title: 'Paver Patio vs Concrete in Iowa',
    description: 'How freeze-thaw changes the patio material decision for Cedar Falls and Waterloo homes.',
    href: '/blog/paver-patio-vs-concrete-iowa',
    category: 'Comparisons',
  },
  {
    title: 'Best Grass Seed for Iowa',
    description: 'Cool-season mixes that actually work in Cedar Falls and Waterloo sun, shade, and clay.',
    href: '/learn/best-grass-seed-for-iowa',
    category: 'Planting',
  },
  // Seasonal
  {
    title: 'Spring Landscape Maintenance Checklist',
    description: 'A practical month-by-month checklist for getting your Iowa yard ready for spring and summer.',
    href: '/blog/spring-landscaping-checklist-iowa',
    category: 'Seasonal',
  },
  {
    title: 'Winter Landscaping Tips for Iowa',
    description: 'Protect your landscape investment through Iowa winters with these practical tips.',
    href: '/blog/winter-landscaping-tips-iowa',
    category: 'Seasonal',
  },
  {
    title: 'Fall Landscaping Checklist for Iowa',
    description: 'Prepare beds, lawns, and hardscape for freeze-thaw season before winter sets in.',
    href: '/blog/fall-landscaping-checklist-iowa',
    category: 'Seasonal',
  },
  // Planting
  {
    title: 'Best Plants for Iowa Landscapes',
    description: 'Top-performing perennials, shrubs, and trees for Cedar Falls and Waterloo gardens and landscapes.',
    href: '/blog/best-plants-for-iowa-landscapes',
    category: 'Planting',
  },
  {
    title: 'Tree Planting Guide for Cedar Falls',
    description: 'How to plant trees that thrive in Black Hawk County soil and climate.',
    href: '/blog/tree-planting-guide-cedar-falls',
    category: 'Planting',
  },
  {
    title: 'Iowa Native Plants for Landscaping',
    description: 'Native perennials and shrubs that handle Iowa clay, winters, and summer heat.',
    href: '/blog/iowa-native-plants-landscaping',
    category: 'Planting',
  },
  // Drainage
  {
    title: 'Common Drainage Problems & Solutions',
    description: 'Identify and fix the most common yard drainage issues on Iowa properties.',
    href: '/blog/common-drainage-problems-iowa',
    category: 'Drainage',
  },
  {
    title: 'Yard Grading Guide for Iowa Homeowners',
    description: 'How proper grading protects your foundation and keeps your yard dry.',
    href: '/blog/yard-grading-guide-iowa',
    category: 'Drainage',
  },
  {
    title: 'French Drain Cost Guide for Iowa',
    description: 'What a French drain costs in Cedar Falls and Waterloo and when it is the right fix.',
    href: '/blog/french-drain-cost-iowa',
    category: 'Drainage',
  },
  // Hardscaping
  {
    title: 'Retaining Wall Material Comparison',
    description: 'Compare concrete block, natural stone, and timber retaining walls for Iowa conditions.',
    href: '/blog/best-retaining-wall-materials-iowa',
    category: 'Hardscaping',
  },
  {
    title: 'Planning Your Paver Patio',
    description: 'Size, pattern, and drainage decisions to get right before you break ground.',
    href: '/blog/paver-patio-planning-guide',
    category: 'Hardscaping',
  },
  {
    title: 'Why Retaining Walls Matter in Iowa',
    description: 'How a properly built wall stops erosion and creates usable space on sloped lots.',
    href: '/blog/retaining-wall-benefits-cedar-falls',
    category: 'Hardscaping',
  },
  // Lawn Care
  {
    title: 'Lawn Aeration Guide for Iowa Lawns',
    description: 'How core aeration helps your lawn grow thicker and handle Iowa summers.',
    href: '/blog/lawn-aeration-importance-iowa',
    category: 'Lawn Care',
  },
  {
    title: 'Seasonal Lawn Care Tips for Iowa',
    description: 'A season-by-season plan for mowing, fertilizing, and keeping grass healthy.',
    href: '/blog/seasonal-lawn-care-tips-iowa',
    category: 'Lawn Care',
  },
  {
    title: 'Lawn Fertilization Schedule for Iowa',
    description: 'When and how to fertilize cool-season lawns for thicker growth without waste.',
    href: '/blog/lawn-fertilization-schedule-iowa',
    category: 'Lawn Care',
  },
  // Design
  {
    title: 'Landscape Design Principles for Iowa',
    description: 'How to plan a landscape that looks great and works for your Cedar Falls or Waterloo property.',
    href: '/blog/landscape-design-principles-iowa',
    category: 'Design',
  },
  {
    title: 'Front Yard Landscaping Ideas',
    description: 'Practical curb-appeal ideas that work with Iowa soil, sun, and snow.',
    href: '/blog/front-yard-landscaping-ideas',
    category: 'Design',
  },
  {
    title: 'Backyard Patio Design Guide',
    description: 'Layout and design tips for outdoor living spaces that fit your yard and lifestyle.',
    href: '/blog/backyard-patio-design-guide',
    category: 'Design',
  },
]

const cedarValleyLinks = [
  {
    title: 'Call 811 Before You Dig',
    description:
      'Free utility locates through Iowa One Call. Required before digging for patios, walls, trees, or drainage work.',
    href: 'https://iowaonecall.com/homeowners/',
    source: 'Iowa One Call',
  },
  {
    title: 'Cedar Falls Building Permits',
    description:
      'Check permit requirements for fences, driveways, retaining walls, and other residential site work in Cedar Falls.',
    href: 'https://www.cedarfalls.com/permit',
    source: 'City of Cedar Falls',
  },
  {
    title: 'Waterloo Building Department',
    description:
      'Permit and inspection info for Waterloo homeowners planning hardscape or structural landscape projects.',
    href: 'https://www.cityofwaterlooiowa.com/departments/building_inspections/index.php',
    source: 'City of Waterloo',
  },
  {
    title: 'Iowa State Extension Horticulture',
    description:
      'Research-based plant, lawn, and yard advice tailored to Iowa soils and growing conditions.',
    href: 'https://www.extension.iastate.edu/horticulture/',
    source: 'Iowa State University',
  },
  {
    title: 'USDA Plant Hardiness Zone Map',
    description:
      'Confirm your hardiness zone so trees, shrubs, and perennials can survive Iowa winters.',
    href: 'https://planthardiness.ars.usda.gov/',
    source: 'USDA',
  },
  {
    title: 'Web Soil Survey',
    description:
      'Look up your property’s soil type — helpful for drainage planning, planting, and grading decisions.',
    href: 'https://websoilsurvey.nrcs.usda.gov/',
    source: 'USDA NRCS',
  },
]

export default function ResourcesPage() {
  const pageSchema = webPageJsonLd({
    name: 'Landscaping Resources | A1 Property Services',
    description: 'Helpful landscaping resources for Cedar Falls and Waterloo homeowners. Guides, checklists, and expert tips for maintaining your property.',
    path: '/resources',
    about: 'Landscaping Resources',
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
                { name: 'Resources', path: '/resources' },
              ]),
            ),
          ),
        }}
      />

      <PageHero
        imageSrc={siteImages.resourcesHero}
        imageAlt="Landscaped Cedar Falls front yard with paver walkway and garden beds"
        eyebrow="Helpful Guides"
        title="Landscaping|Resources"
        subtitle="Expert guides, checklists, and articles for Cedar Falls and Waterloo homeowners working on landscape projects."
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <p className="text-lg leading-relaxed text-brand-body">
            Planning a patio, fixing drainage, or keeping the lawn healthy? These articles cover the basics for Cedar Falls homeowners.
          </p>
        </FadeIn>
      </section>

      <section className="section bg-brand-stone">
        <div className="section-inner">
          <FadeIn>
            <p className="section-eyebrow">Before You Dig</p>
            <h2 className="section-heading">For Cedar Falls &amp; Waterloo Homeowners</h2>
            <p className="mt-3 max-w-2xl text-brand-body">
              Useful official links to review before a landscaping project — permits, utility locates, soil, and plant hardiness for Cedar Falls, Waterloo, and nearby towns.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cedarValleyLinks.map((link) => (
              <StaggerItem key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card block h-full p-6 transition-all hover:-translate-y-1"
                >
                  <ExternalLink size={20} className="text-brand-green-700" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-body/55">
                    {link.source}
                  </p>
                  <h3 className="mt-1 font-bold text-brand-dark">{link.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-body">{link.description}</p>
                  <span className="link-cta-md group mt-4 inline-flex items-center gap-1">
                    Visit Site <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {resourceCategories.map((category) => (
        <section key={category} className="section bg-white even:bg-brand-stone">
          <div className="section-inner">
            <FadeIn>
              <h2 className="section-heading">{category} Resources</h2>
            </FadeIn>
            <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources
                .filter((r) => r.category === category)
                .map((resource) => (
                  <StaggerItem key={resource.href}>
                    <Link href={resource.href} className="card block h-full p-6 transition-all hover:-translate-y-1">
                      <FileText size={20} className="text-brand-green-700" />
                      <h3 className="mt-3 font-bold text-brand-dark">{resource.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-body">{resource.description}</p>
                      <span className="link-cta-md group mt-4 inline-flex items-center gap-1">
                        Read More <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </StaggerItem>
                ))}
            </StaggerContainer>
          </div>
        </section>
      ))}

      <CtaBanner
        title="Need personalized advice?"
        description="Contact us for a free on-site consultation. We will help you figure out the best approach for your property."
      />
    </>
  )
}
