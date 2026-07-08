'use client'

import { useState } from 'react'
import type { GalleryCategory } from '@/lib/images'
import { galleryProjects } from '@/lib/images'
import { CTA_COPY } from '@/lib/cta'
import { trackGalleryFilter, trackCtaClick } from '@/lib/analytics'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/motion/FadeIn'
import GalleryGrid from '@/components/sections/GalleryGrid'

const categories: { key: GalleryCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'hardscape', label: 'Hardscape' },
  { key: 'water', label: 'Water Features' },
]

export default function GalleryFilter() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')

  const filtered =
    activeCategory === 'all'
      ? galleryProjects
      : galleryProjects.filter((p) => p.category === activeCategory)

  const isWaterOnly = activeCategory === 'water'

  return (
    <section className="section bg-brand-stone">
      <div className="section-inner">
        <div className="flex flex-wrap justify-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); trackGalleryFilter(cat.label) }}
              className={`px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'text-brand-green-800 border-b-2 border-brand-gold'
                  : 'text-brand-body/60 hover:text-brand-green-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <FadeIn className="mt-10 text-center">
          <h2 className="section-heading">
            {isWaterOnly ? 'Water Features' : 'Before & After'}
          </h2>
          <p className="mt-2 text-brand-muted max-w-xl mx-auto">
            {isWaterOnly
              ? 'Custom ponds, waterfalls, and water gardens built across the Cedar Valley.'
              : 'Drag the slider on each project to compare before and after.'}
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
          <p className="text-brand-body">Ready to start your own project?</p>
          <Button href="/contact" className="mt-4" onClick={() => trackCtaClick('Gallery Bottom')}>
            {CTA_COPY.quote}
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
