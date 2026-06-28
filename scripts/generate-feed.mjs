import { writeFileSync } from 'fs'
import path from 'path'

const SITE_URL = 'https://a1pslandscape.com'
const SITE_NAME = 'A1 Property Services'
const SITE_DESC = 'Landscaping, retaining walls, paver patios, and lawn care in Cedar Falls, IA and the Cedar Valley.'

const blogPosts = [
  {
    slug: 'outdoor-living-trends-2025',
    title: 'Outdoor Living Trends in the Cedar Valley',
    excerpt: 'Popular outdoor living features Cedar Falls homeowners are adding this year.',
    date: '2025-07-01',
    category: 'Outdoor Living',
  },
  {
    slug: 'how-long-does-mulch-last',
    title: 'How Long Does Mulch Last? A Guide for Iowa Landscapes',
    excerpt: 'Learn how long different mulch types last in Iowa weather and when to replace them.',
    date: '2025-06-15',
    category: 'Maintenance',
  },
  {
    slug: 'yard-grading-guide-iowa',
    title: 'Yard Grading Guide for Iowa Homeowners',
    excerpt: 'How proper grading protects your foundation and keeps your yard dry.',
    date: '2025-06-10',
    category: 'Drainage',
  },
  {
    slug: 'french-drain-cost-iowa',
    title: 'French Drain Cost in Iowa: What to Expect',
    excerpt: 'Average pricing for French drain installation in Cedar Falls and the Cedar Valley.',
    date: '2025-06-01',
    category: 'Drainage',
  },
  {
    slug: 'common-drainage-problems-iowa',
    title: 'Common Drainage Problems on Iowa Properties',
    excerpt: 'Identify and fix the most common yard drainage issues in the Cedar Valley.',
    date: '2025-05-20',
    category: 'Drainage',
  },
  {
    slug: 'best-retaining-wall-materials-iowa',
    title: 'Best Retaining Wall Materials for Iowa Properties',
    excerpt: 'Compare concrete block, natural stone, and timber retaining walls for Iowa freeze-thaw conditions.',
    date: '2025-05-10',
    category: 'Hardscaping',
  },
  {
    slug: 'landscaping-costs-cedar-falls',
    title: 'Landscaping Costs in Cedar Falls: What to Expect',
    excerpt: 'Average pricing for landscaping services in Cedar Falls and the Cedar Valley area.',
    date: '2025-05-01',
    category: 'Pricing',
  },
  {
    slug: 'retaining-wall-permit-guide-cedar-falls',
    title: 'Retaining Wall Permit Guide for Cedar Falls',
    excerpt: 'When you need a permit and how to navigate Cedar Falls retaining wall regulations.',
    date: '2025-04-25',
    category: 'Hardscaping',
  },
  {
    slug: 'patio-cost-guide-cedar-falls',
    title: 'How Much Does a Patio Cost in Cedar Falls?',
    excerpt: 'Complete pricing guide for paver patios, concrete patios, and natural stone patios in Iowa.',
    date: '2025-04-20',
    category: 'Pricing',
  },
  {
    slug: 'best-plants-for-iowa-landscapes',
    title: 'Best Plants for Iowa Landscapes: A Complete Guide',
    excerpt: 'Top-performing perennials, shrubs, and trees for Black Hawk County gardens.',
    date: '2025-04-10',
    category: 'Landscaping',
  },
  {
    slug: 'spring-landscape-maintenance-checklist',
    title: 'Spring Landscape Maintenance Checklist for Cedar Valley Homeowners',
    excerpt: 'A practical spring cleanup checklist from local landscaping pros in the Cedar Valley.',
    date: '2025-04-01',
    category: 'Maintenance',
  },
  {
    slug: 'spring-landscaping-checklist-iowa',
    title: 'Spring Landscaping Checklist for Iowa Homeowners',
    excerpt: 'A month-by-month guide to getting your Iowa yard ready for spring and summer.',
    date: '2025-03-01',
    category: 'Maintenance',
  },
  {
    slug: 'retaining-wall-benefits-cedar-falls',
    title: 'Why Retaining Walls Are Essential for Iowa Sloped Yards',
    excerpt: 'How a properly built retaining wall stops erosion, adds usable space, and holds up on Cedar Valley slopes.',
    date: '2025-03-12',
    category: 'Hardscaping',
  },
  {
    slug: 'paver-patio-planning-guide',
    title: 'Planning Your Paver Patio: Size, Pattern & Drainage',
    excerpt: 'A few things to think about before you break ground on a new patio in the Cedar Valley.',
    date: '2025-02-08',
    category: 'Patios & Hardscape',
  },
]

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

function generateRss() {
  const items = blogPosts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/images/icon.webp</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`
}

const publicDir = path.resolve('public')
writeFileSync(path.join(publicDir, 'feed.xml'), generateRss())
console.log('RSS feed generated → public/feed.xml')
