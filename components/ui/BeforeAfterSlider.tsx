'use client'

import { useRef, useCallback, useEffect } from 'react'
import { buildSrcset, getImageDimensions, getVariantUrl } from '@/lib/responsive-image'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { cn } from '@/lib/utils'

type SlideImage = {
  src: string
  alt: string
  objectPosition?: string
  quality?: number
  priority?: boolean
}

type BeforeAfterSliderProps = {
  before: SlideImage
  after: SlideImage
  title?: string
  className?: string
  aspectClassName?: string
}

const SLIDER_SIZES = IMAGE_SIZES.galleryGrid
const DRAG_THRESHOLD = 10

function getSliderPreloadWidth(): number {
  if (typeof window === 'undefined') return 768
  return window.innerWidth <= 768 ? 640 : 1280
}

function preloadSliderImages(beforeSrc: string, afterSrc: string) {
  const width = getSliderPreloadWidth()
  const urls = [
    getVariantUrl(beforeSrc, 'avif', width),
    getVariantUrl(afterSrc, 'avif', width),
  ]
  urls.forEach((url) => {
    const img = new window.Image()
    img.src = url
  })
}

function SliderPicture({
  src,
  alt,
  className,
  objectPosition,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  objectPosition?: string
  priority?: boolean
}) {
  const dimensions = getImageDimensions(src)
  const style: React.CSSProperties = {
    objectFit: 'cover',
    ...(objectPosition ? { objectPosition } : {}),
  }

  return (
    <picture className="absolute inset-0 block h-full w-full [transform:translateZ(0)]">
      <source srcSet={buildSrcset(src, 'avif')} sizes={SLIDER_SIZES} type="image/avif" />
      <source srcSet={buildSrcset(src, 'webp')} sizes={SLIDER_SIZES} type="image/webp" />
      <img
        src={getVariantUrl(src, 'avif', 640)}
        srcSet={buildSrcset(src, 'webp')}
        sizes={SLIDER_SIZES}
        alt={alt}
        width={dimensions?.width}
        height={dimensions?.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]', className)}
        style={style}
      />
    </picture>
  )
}

export default function BeforeAfterSlider({
  before,
  after,
  title,
  className,
  aspectClassName = 'aspect-[4/3]',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const beforeLayerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const positionRef = useRef(50)
  const rafRef = useRef<number | null>(null)
  const pointerStart = useRef<{ x: number; y: number; id: number } | null>(null)
  const dragIntent = useRef<'none' | 'horizontal' | 'vertical'>('none')

  const applyPosition = useCallback((pct: number) => {
    positionRef.current = pct
    const beforeLayer = beforeLayerRef.current
    const handle = handleRef.current
    if (beforeLayer) {
      beforeLayer.style.clipPath = `inset(0 ${100 - pct}% 0 0)`
    }
    if (handle) {
      handle.style.left = `${pct}%`
    }
  }, [])

  const updatePosition = useCallback(
    (clientX: number) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const pct = (x / rect.width) * 100

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(() => {
        applyPosition(pct)
        rafRef.current = null
      })
    },
    [applyPosition],
  )

  useEffect(() => {
    applyPosition(50)

    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          preloadSliderImages(before.src, after.src)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' },
    )

    observer.observe(container)
    return () => {
      observer.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [before.src, after.src, applyPosition])

  const beginDrag = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true
      containerRef.current?.setPointerCapture(e.pointerId)
      containerRef.current?.classList.add('ba-slider-active')
      updatePosition(e.clientX)
    },
    [updatePosition],
  )

  const resetPointerState = useCallback(() => {
    pointerStart.current = null
    dragIntent.current = 'none'
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      beginDrag(e)
      return
    }

    pointerStart.current = { x: e.clientX, y: e.clientY, id: e.pointerId }
    dragIntent.current = 'none'
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      updatePosition(e.clientX)
      return
    }

    const start = pointerStart.current
    if (!start || start.id !== e.pointerId) return

    const dx = e.clientX - start.x
    const dy = e.clientY - start.y

    if (dragIntent.current === 'none') {
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return

      if (Math.abs(dy) > Math.abs(dx)) {
        dragIntent.current = 'vertical'
        resetPointerState()
        return
      }

      dragIntent.current = 'horizontal'
      beginDrag(e)
    }
  }

  const endDrag = (e: React.PointerEvent) => {
    resetPointerState()

    if (!isDragging.current) return
    isDragging.current = false
    containerRef.current?.releasePointerCapture(e.pointerId)
    containerRef.current?.classList.remove('ba-slider-active')
  }

  return (
    <div className={className}>
      {title && (
        <h3 className="mb-3 font-display text-xl font-semibold text-brand-dark">{title}</h3>
      )}
      <div
        ref={containerRef}
        className={cn(
          'ba-slider relative cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-xl [contain:layout_paint]',
          aspectClassName,
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <SliderPicture
          src={after.src}
          alt={after.alt}
          objectPosition={after.objectPosition}
          priority={after.priority}
        />

        <div
          ref={beforeLayerRef}
          className="ba-slider-before absolute inset-0 [transform:translateZ(0)]"
          style={{ clipPath: 'inset(0 50% 0 0)' }}
        >
          <SliderPicture
            src={before.src}
            alt={before.alt}
            className="saturate-[0.75]"
            objectPosition={before.objectPosition}
            priority={before.priority}
          />
        </div>

        <div
          ref={handleRef}
          className="ba-slider-handle absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)] [transform:translateZ(0)]"
          style={{ left: '50%' }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-gold shadow-lg">
            <span className="text-white text-xs font-bold" aria-hidden>⟷</span>
          </div>
        </div>

        <span className="absolute left-3 top-3 z-20 rounded bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          Before
        </span>
        <span className="absolute right-3 top-3 z-20 rounded bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          After
        </span>
      </div>
    </div>
  )
}
