'use client'

import { useCallback, useState } from 'react'
import LazyProjectCard from '@/components/gallery/LazyProjectCard'
import ProjectModal from '@/components/gallery/ProjectModal'
import type { GalleryProject } from '@/lib/images'

type GalleryGridProps = {
  projects: GalleryProject[]
}

export default function GalleryGrid({ projects }: GalleryGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {projects.map((project) => (
          <LazyProjectCard
            key={project.id}
            project={project}
            onSelect={handleSelect}
          />
        ))}
      </div>
      {selectedId ? <ProjectModal projectId={selectedId} onClose={() => setSelectedId(null)} /> : null}
    </>
  )
}
