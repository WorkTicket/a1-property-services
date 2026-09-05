import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const SITE_URL = 'https://a1pslandscape.com'
const SITE_NAME = 'A1 Property Services'
const SITE_DESC = 'Landscaping, retaining walls, paver patios, and lawn care in Cedar Falls, Waterloo, and Black Hawk County, Iowa.'

function extractPosts(src) {
  const posts = []
  const re =
    /slug:\s*'([^']+)'\s*,\s*title:\s*'((?:\\'|[^'])*)'\s*,\s*excerpt:\s*'((?:\\'|[^'])*)'\s*,\s*date:\s*'([^']+)'\s*,\s*category:\s*'((?:\\'|[^'])*)'/g
  let match
  while ((match = re.exec(src))) {
    posts.push({
      slug: match[1],
      title: match[2].replace(/\\'/g, "'"),
      excerpt: match[3].replace(/\\'/g, "'"),
      date: match[4],
      category: match[5].replace(/\\'/g, "'"),
    })
  }
  return posts
}

function loadBlogPosts() {
  const files = ['lib/blog-posts-new.ts', 'lib/blog.ts']
  const seen = new Set()
  const posts = []
  for (const file of files) {
    const src = readFileSync(path.resolve(file), 'utf8')
    for (const post of extractPosts(src)) {
      if (seen.has(post.slug)) continue
      seen.add(post.slug)
      posts.push(post)
    }
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function pubDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toUTCString()
}

function generateRss(blogPosts) {
  const items = blogPosts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${pubDate(post.date)}</pubDate>
    </item>`,
    )
    .join('\n')

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

const blogPosts = loadBlogPosts()
const publicDir = path.resolve('public')
writeFileSync(path.join(publicDir, 'feed.xml'), generateRss(blogPosts))
console.log(`RSS feed generated → public/feed.xml (${blogPosts.length} posts)`)
