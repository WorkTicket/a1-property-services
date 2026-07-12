'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import { CTA_COPY } from '@/lib/cta'
import type { BlogPost } from '@/lib/blog'

const INITIAL_COUNT = 9
const LOAD_COUNT = 6

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  function loadMore() {
    setVisibleCount((prev) => Math.min(prev + LOAD_COUNT, posts.length))
  }

  return (
    <div>
      <StaggerContainer className="space-y-8">
        {visiblePosts.map((post) => (
          <StaggerItem key={post.slug}>
            <article className="card p-8">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-brand-green-800">
                <span>{post.category}</span>
                <span className="text-brand-body/30">·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-brand-dark">
                <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-green-800">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-brand-body">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="link-cta-md group mt-4">
                {CTA_COPY.readMore}
                <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMore}
            className="btn-primary inline-flex items-center gap-2"
          >
            Load More Articles
            <ChevronDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  )
}
