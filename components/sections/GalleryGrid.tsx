'use client'

import { useEffect, useRef, useState } from 'react'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import type { GalleryProject } from '@/lib/images'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'

type GalleryGridProps = {
  projects: GalleryProject[]
}

function ShowcasePhoto({ project }: { project: GalleryProject }) {
  return (
    <div>
      <h3 className="mb-3 font-display text-xl font-semibold text-brand-dark">{project.title}</h3>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <ResponsiveImage
          src={project.after.src}
          alt={project.after.alt}
          fill
          style={project.after.objectPosition ? { objectPosition: project.after.objectPosition } : undefined}
          sizes={IMAGE_SIZES.galleryGrid}
          priority={project.after.priority}
        />
      </div>
    </div>
  )
}

function GalleryItem({ project }: { project: GalleryProject }) {
  if (project.showcase || !project.before) {
    return <ShowcasePhoto project={project} />
  }

  return (
    <BeforeAfterSlider
      title={project.title}
      before={project.before}
      after={project.after}
    />
  )
}

function LazyGalleryItem({ project, eager }: { project: GalleryProject; eager: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(eager)

  useEffect(() => {
    if (eager || visible) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [eager, visible])

  return (
    <div ref={ref}>
      {visible ? (
        <GalleryItem project={project} />
      ) : (
        <div>
          <div className="mb-3 h-7 w-40 animate-pulse rounded bg-neutral-200" />
          <div className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-200" />
        </div>
      )}
    </div>
  )
}

export default function GalleryGrid({ projects }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {projects.map((project, index) => (
        <LazyGalleryItem key={project.id} project={project} eager={index < 4} />
      ))}
    </div>
  )
}
