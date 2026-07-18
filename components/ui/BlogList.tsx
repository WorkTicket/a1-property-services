'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import { CTA_COPY } from '@/lib/cta'
import {
  blogCategories,
  formatBlogDate,
  getReadingTime,
  getSortedPosts,
  type BlogPost,
} from '@/lib/blog'

const INITIAL_COUNT = 9
const LOAD_COUNT = 6

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const sorted = useMemo(() => getSortedPosts(posts), [posts])
  const [category, setCategory] = useState<string>('All')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  const filtered = useMemo(
    () => (category === 'All' ? sorted : sorted.filter((p) => p.category === category)),
    [sorted, category],
  )

  const featured = filtered[0]
  const rest = filtered.slice(1)
  const visiblePosts = rest.slice(0, visibleCount)
  const hasMore = visibleCount < rest.length

  function selectCategory(next: string) {
    setCategory(next)
    setVisibleCount(INITIAL_COUNT)
  }

  function loadMore() {
    setVisibleCount((prev) => Math.min(prev + LOAD_COUNT, rest.length))
  }

  const filters = ['All', ...blogCategories]

  return (
    <div>
      <div
        className="flex flex-wrap gap-x-1 gap-y-1 border-b border-black/10 pb-px"
        role="tablist"
        aria-label="Filter articles by category"
      >
        {filters.map((name) => {
          const active = category === name
          return (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectCategory(name)}
              className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? 'border-brand-gold text-brand-dark'
                  : 'border-transparent text-brand-muted hover:text-brand-dark'
              }`}
            >
              {name}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-brand-body">No articles in this category yet.</p>
      ) : (
        <>
          {featured && (
            <article className="mt-10 border-b border-black/10 pb-12">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-green-800">
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
                  {getReadingTime(featured)} min read
                </span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight text-brand-dark">
                <Link href={`/blog/${featured.slug}`} className="transition-colors hover:text-brand-green-800">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-brand-body">{featured.excerpt}</p>
              <Link href={`/blog/${featured.slug}`} className="link-cta-md group mt-6">
                {CTA_COPY.readMore}
                <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          )}

          {visiblePosts.length > 0 && (
            <StaggerContainer className="mt-4 divide-y divide-black/10">
              {visiblePosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <article className="group py-8 first:pt-6">
                    <div className="grid gap-4 md:grid-cols-[8.5rem_1fr] md:gap-8">
                      <div className="md:pt-1">
                        <time dateTime={post.date} className="block text-sm font-medium text-brand-muted">
                          {formatBlogDate(post.date, 'short')}
                        </time>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand-green-800">
                          {post.category}
                        </p>
                      </div>
                      <div>
                        <h2 className="font-display text-xl font-bold leading-snug text-brand-dark md:text-2xl">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="transition-colors group-hover:text-brand-green-800"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        <p className="mt-2 max-w-2xl leading-relaxed text-brand-body">{post.excerpt}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-muted">
                          <span>{getReadingTime(post)} min read</span>
                          <Link
                            href={`/blog/${post.slug}`}
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
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {hasMore && (
            <div className="mt-4 flex justify-center border-t border-black/10 pt-10">
              <button type="button" onClick={loadMore} className="btn-outline inline-flex items-center gap-2">
                Load More Articles
                <ChevronDown size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
