'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ProjectCard from '@/components/gallery/ProjectCard'
import ProjectModal from '@/components/gallery/ProjectModal'
import type { GalleryProject } from '@/lib/images'
import { getCaseStudyHref } from '@/lib/project-case-studies'

type GalleryGridProps = {
  projects: GalleryProject[]
}

function LazyProjectCard({
  project,
  eager,
  onSelect,
  href,
}: {
  project: GalleryProject
  eager: boolean
  onSelect?: (id: string) => void
  href?: string
}) {
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
          <ProjectCard project={project} onSelect={onSelect} href={href} eager={eager} />
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-card">
          <div className="aspect-[4/3] animate-pulse bg-neutral-200" />
          <div className="space-y-2 p-5">
            <div className="h-3 w-24 animate-pulse rounded bg-neutral-200" />
            <div className="h-6 w-40 animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function GalleryGrid({ projects }: GalleryGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {projects.map((project, index) => {
          const href = getCaseStudyHref(project.id)
          return (
            <LazyProjectCard
              key={project.id}
              project={project}
              eager={index < 6}
              href={href}
              onSelect={href ? undefined : handleSelect}
            />
          )
        })}
      </div>
      {selectedId ? <ProjectModal projectId={selectedId} onClose={() => setSelectedId(null)} /> : null}
    </>
  )
}
