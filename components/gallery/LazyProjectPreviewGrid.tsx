'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import type { GalleryProject } from '@/lib/images'

type LazyProjectPreviewGridProps = {
  projects: GalleryProject[]
  columns?: 2 | 3
}

export default function LazyProjectPreviewGrid({
  projects,
  columns = 2,
}: LazyProjectPreviewGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [Grid, setGrid] = useState<ComponentType<LazyProjectPreviewGridProps> | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let cancelled = false
    const load = () => {
      void import('@/components/gallery/ProjectPreviewGrid').then((mod) => {
        if (!cancelled) setGrid(() => mod.default)
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load()
          observer.disconnect()
        }
      },
      { rootMargin: '400px' },
    )

    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={ref}>
      {Grid ? (
        <Grid projects={projects} columns={columns} />
      ) : (
        <div
          className={
            columns === 3
              ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8'
              : 'grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'
          }
          aria-hidden
        >
          {projects.map((project) => (
            <div key={project.id} className="aspect-[4/3] rounded-2xl bg-black/[0.04]" />
          ))}
        </div>
      )}
    </div>
  )
}
