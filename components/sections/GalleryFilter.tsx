'use client'

import { useState } from 'react'
import type { GalleryCategory } from '@/lib/images'
import {
  galleryProjects,
  galleryFilterCategories,
  galleryCategoryMeta,
} from '@/lib/images'
import { CTA_COPY } from '@/lib/cta'
import { trackGalleryFilter, trackCtaClick } from '@/lib/analytics'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/motion/FadeIn'
import GalleryGrid from '@/components/sections/GalleryGrid'

export default function GalleryFilter() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')

  const filtered =
    activeCategory === 'all'
      ? galleryProjects
      : galleryProjects.filter((p) => p.category === activeCategory)

  const categoryMeta =
    activeCategory === 'all' ? null : galleryCategoryMeta[activeCategory]

  return (
    <section className="section bg-brand-stone">
      <div className="section-inner">
        <div className="flex flex-wrap justify-center gap-2">
          {galleryFilterCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); trackGalleryFilter(cat.label) }}
              className={
                activeCategory === cat.key
                  ? 'filter-chip filter-chip-active'
                  : 'filter-chip'
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <h2 className="section-heading">
            {categoryMeta?.heading ?? 'Before & After'}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-brand-body">
            {categoryMeta?.description ??
              'Drag the slider to compare, then click a project to preview it. Open the project overview for full details.'}
          </p>
        </FadeIn>

        <div key={activeCategory} className="mt-10">
          {filtered.length > 0 ? (
            <GalleryGrid projects={filtered} />
          ) : (
            <p className="text-center text-brand-muted">
              No projects in this category yet.
            </p>
          )}
        </div>

        <FadeIn className="mt-16 text-center">
          <p className="text-brand-body">Got a similar job in mind?</p>
          <Button href="/contact" className="mt-4" onClick={() => trackCtaClick('Gallery Bottom')}>
            {CTA_COPY.quote}
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
