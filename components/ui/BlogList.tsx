import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CTA_COPY } from '@/lib/cta'
import {
  blogCategories,
  formatBlogDate,
  type BlogIndexPost,
} from '@/lib/blog'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import BlogCategoryFilter from '@/components/ui/BlogCategoryFilter'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

export default function BlogList({ posts }: { posts: BlogIndexPost[] }) {
  const featured = posts[0]
  const rest = posts.slice(1)
  const filters = ['All', ...blogCategories]

  return (
    <div>
      <BlogCategoryFilter categories={filters} />

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-brand-body">No articles in this category yet.</p>
      ) : (
        <div id="blog-index" data-filter="All">
          {featured ? (
            <article
              className="blog-article mt-10 border-b border-black/10 pb-12"
              data-category={featured.category}
            >
              <Link href={`/blog/${featured.slug}`} prefetch={false} className="group block">
                <div className="card-image relative aspect-[16/9] overflow-hidden rounded-2xl">
                  <ResponsiveImage
                    src={featured.imageSrc}
                    alt={featured.imageAlt}
                    fill
                    priority
                    sizes={IMAGE_SIZES.galleryFeatured}
                    className="card-image-zoom object-cover"
                  />
                </div>
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-green-800">
                <span>Featured</span>
                <span className="text-brand-body/30" aria-hidden>
                  ·
                </span>
                <span>{featured.category}</span>
                <span className="text-brand-body/30" aria-hidden>
                  ·
                </span>
                <time dateTime={featured.date} className="font-medium normal-case tracking-normal text-brand-muted">
                  {formatBlogDate(featured.date)}
                </time>
                <span className="text-brand-body/30" aria-hidden>
                  ·
                </span>
                <span className="font-medium normal-case tracking-normal text-brand-muted">
                  {featured.readingMinutes} min read
                </span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight text-brand-dark">
                <Link href={`/blog/${featured.slug}`} prefetch={false} className="transition-colors hover:text-brand-green-800">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-brand-body">{featured.excerpt}</p>
              <Link href={`/blog/${featured.slug}`} prefetch={false} className="link-cta-md group mt-6">
                {CTA_COPY.readMore}
                <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-4 divide-y divide-black/10">
              {rest.map((post) => (
                <article
                  key={post.slug}
                  className="blog-article motion-fade-up group py-8 first:pt-6"
                  data-category={post.category}
                >
                  <div className="grid gap-5 sm:grid-cols-[11rem_1fr] sm:items-start md:grid-cols-[13rem_1fr] md:gap-8">
                    <Link href={`/blog/${post.slug}`} prefetch={false} className="block">
                      <div className="card-image relative aspect-[16/9] overflow-hidden rounded-xl">
                        <ResponsiveImage
                          src={post.imageSrc}
                          alt={post.imageAlt}
                          fill
                          sizes={IMAGE_SIZES.articleThumb}
                          className="card-image-zoom object-cover"
                        />
                      </div>
                    </Link>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <time dateTime={post.date} className="text-sm font-medium text-brand-muted">
                          {formatBlogDate(post.date, 'short')}
                        </time>
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-green-800">
                          {post.category}
                        </p>
                      </div>
                      <h2 className="mt-2 font-display text-xl font-bold leading-snug text-brand-dark md:text-2xl">
                        <Link
                          href={`/blog/${post.slug}`}
                          prefetch={false}
                          className="transition-colors group-hover:text-brand-green-800"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-2 max-w-2xl leading-relaxed text-brand-body">{post.excerpt}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-muted">
                        <span>{post.readingMinutes} min read</span>
                        <Link
                          href={`/blog/${post.slug}`}
                          prefetch={false}
                          className="link-cta-sm group/link inline-flex items-center gap-1"
                        >
                          {CTA_COPY.readMore}
                          <ChevronRight
                            size={12}
                            className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
