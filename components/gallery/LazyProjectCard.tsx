'use client'

import { useEffect, useRef, useState } from 'react'
import ProjectCard from '@/components/gallery/ProjectCard'
import type { GalleryProject } from '@/lib/images'

type LazyProjectCardProps = {
  project: GalleryProject
  onSelect?: (id: string) => void
}

export default function LazyProjectCard({ project, onSelect }: LazyProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let cancelled = false
    let observer: IntersectionObserver | null = null

    const reveal = () => {
      if (cancelled || !el) return
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer?.disconnect()
          }
        },
        { rootMargin: '200px' },
      )
      observer.observe(el)
    }

    const onReady = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(reveal, { timeout: 2500 })
      } else {
        setTimeout(reveal, 400)
      }
    }

    if (document.readyState === 'complete') onReady()
    else window.addEventListener('load', onReady, { once: true })

    return () => {
      cancelled = true
      observer?.disconnect()
      window.removeEventListener('load', onReady)
    }
  }, [])

  return (
    <div ref={ref}>
      {visible ? (
        <ProjectCard project={project} onSelect={onSelect} />
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-card">
          <div className="aspect-[4/3] bg-neutral-200" />
          <div className="space-y-2 p-5">
            <div className="h-4 w-28 rounded bg-neutral-200" />
            <div className="h-6 w-56 rounded bg-neutral-200" />
            <div className="h-3 w-36 rounded bg-neutral-200" />
            <div className="h-[2.625rem] w-full rounded bg-neutral-200" />
          </div>
        </div>
      )}
    </div>
  )
}
