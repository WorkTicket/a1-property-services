'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { ChevronsLeftRight, Maximize2 } from 'lucide-react'
import { buildSrcset, getBlurPlaceholder, getImageDimensions, getVariantUrl } from '@/lib/responsive-image'
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
  sizes?: string
  fallbackWidth?: number
  featured?: boolean
  hint?: string
  onActivate?: () => void
}

const DRAG_THRESHOLD = 10
const SLIDER_FALLBACK_WIDTH = 768
const SLIDER_PRIORITY_WIDTH = 1280
const SLIDER_FEATURED_WIDTH = 1024

function SliderPicture({
  src,
  alt,
  className,
  objectPosition,
  priority = false,
  sizes = IMAGE_SIZES.galleryGrid,
  fallbackWidth,
}: {
  src: string
  alt: string
  className?: string
  objectPosition?: string
  priority?: boolean
  sizes?: string
  fallbackWidth?: number
}) {
  const dimensions = getImageDimensions(src)
  const width = fallbackWidth ?? (priority ? SLIDER_PRIORITY_WIDTH : SLIDER_FALLBACK_WIDTH)
  const blurPlaceholder = getBlurPlaceholder(src)
  const style: React.CSSProperties = {
    objectFit: 'cover',
    ...(objectPosition ? { objectPosition } : {}),
  }
  const pictureStyle: React.CSSProperties | undefined = blurPlaceholder
    ? {
        backgroundImage: `url("${blurPlaceholder}")`,
        backgroundSize: 'cover',
        backgroundPosition: objectPosition || 'center',
      }
    : undefined

  return (
    <picture
      className="absolute inset-0 block h-full w-full bg-neutral-200 [transform:translateZ(0)]"
      style={pictureStyle}
    >
      <source srcSet={buildSrcset(src, 'avif')} sizes={sizes} type="image/avif" />
      <source srcSet={buildSrcset(src, 'webp')} sizes={sizes} type="image/webp" />
      <img
        src={getVariantUrl(src, 'webp', width)}
        srcSet={buildSrcset(src, 'webp')}
        sizes={sizes}
        alt={alt}
        width={dimensions?.width}
        height={dimensions?.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority="auto"
        draggable={false}
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
  sizes,
  fallbackWidth,
  featured = false,
  hint,
  onActivate,
}: BeforeAfterSliderProps) {
  const resolvedSizes = sizes ?? (featured ? IMAGE_SIZES.galleryFeatured : IMAGE_SIZES.galleryGrid)
  const resolvedFallback =
    fallbackWidth ?? (featured ? SLIDER_FEATURED_WIDTH : undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const beforeLayerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const positionRef = useRef(50)
  const rafRef = useRef<number | null>(null)
  const pointerStart = useRef<{ x: number; y: number; id: number } | null>(null)
  const dragIntent = useRef<'none' | 'horizontal' | 'vertical'>('none')
  const hasMoved = useRef(false)
  const suppressActivate = useRef(false)
  const [hintVisible, setHintVisible] = useState(Boolean(hint))

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
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [applyPosition])

  const beginDrag = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true
      setHintVisible(false)
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
    if (e.pointerType === 'mouse' && e.button !== 0) return

    hasMoved.current = false
    suppressActivate.current = false
    pointerStart.current = { x: e.clientX, y: e.clientY, id: e.pointerId }
    dragIntent.current = 'none'
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const start = pointerStart.current
    if (start && start.id === e.pointerId && !hasMoved.current) {
      const dx = e.clientX - start.x
      const dy = e.clientY - start.y
      if (Math.abs(dx) >= DRAG_THRESHOLD || Math.abs(dy) >= DRAG_THRESHOLD) {
        hasMoved.current = true
      }
    }

    if (isDragging.current) {
      updatePosition(e.clientX)
      return
    }

    if (!start || start.id !== e.pointerId) return

    const dx = e.clientX - start.x
    const dy = e.clientY - start.y

    if (dragIntent.current === 'none') {
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return

      if (Math.abs(dy) > Math.abs(dx)) {
        dragIntent.current = 'vertical'
        suppressActivate.current = true
        resetPointerState()
        return
      }

      dragIntent.current = 'horizontal'
      beginDrag(e)
    }
  }

  const endDrag = (e: React.PointerEvent) => {
    const wasTap =
      e.type !== 'pointercancel' &&
      !suppressActivate.current &&
      !hasMoved.current &&
      !isDragging.current &&
      Boolean(pointerStart.current)

    resetPointerState()

    if (isDragging.current) {
      isDragging.current = false
      containerRef.current?.classList.remove('ba-slider-active')
    }

    if (containerRef.current?.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId)
    }

    if (wasTap) {
      setHintVisible(false)
      updatePosition(e.clientX)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && onActivate) {
      e.preventDefault()
      onActivate()
      return
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      setHintVisible(false)
      const next = positionRef.current + (e.key === 'ArrowRight' ? 5 : -5)
      applyPosition(Math.max(0, Math.min(100, next)))
    }
  }

  return (
    <div className={className}>
      {title && (
        <h3 className="mb-3 font-display text-xl font-semibold text-brand-dark">{title}</h3>
      )}
      <div className={cn('relative overflow-hidden rounded-xl [contain:layout_paint]', aspectClassName)}>
        <div
          ref={containerRef}
          role="slider"
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          tabIndex={0}
          className="ba-slider absolute inset-0 cursor-ew-resize touch-pan-y select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={handleKeyDown}
        >
          <SliderPicture
            src={after.src}
            alt={after.alt}
            objectPosition={after.objectPosition}
            priority={after.priority}
            sizes={resolvedSizes}
            fallbackWidth={resolvedFallback}
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
              sizes={resolvedSizes}
              fallbackWidth={resolvedFallback}
            />
          </div>

          <div
            ref={handleRef}
            className={cn(
              'ba-slider-handle absolute inset-y-0 z-10 [transform:translate3d(-50%,0,0)]',
              featured ? 'w-24 sm:w-16' : 'w-24 sm:w-14',
            )}
            style={{ left: '50%' }}
          >
            <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_10px_rgba(0,0,0,0.45)]" />
            <div
              className={cn(
                'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-gold shadow-lg',
                featured ? 'h-16 w-16 sm:h-14 sm:w-14' : 'h-14 w-14 sm:h-10 sm:w-10',
              )}
            >
              <ChevronsLeftRight
                className={cn('text-white', featured ? 'h-7 w-7 sm:h-6 sm:w-6' : 'h-6 w-6 sm:h-4 sm:w-4')}
                aria-hidden
              />
            </div>
          </div>

          <span
            className={cn(
              'pointer-events-none absolute bottom-3 left-3 z-20 rounded-md bg-black/60 font-semibold uppercase tracking-wide text-white backdrop-blur-[2px]',
              featured ? 'px-3 py-1.5 text-[11px]' : 'px-2.5 py-1 text-[10px]',
            )}
          >
            Before
          </span>
          <span
            className={cn(
              'pointer-events-none absolute bottom-3 right-3 z-20 rounded-md bg-black/60 font-semibold uppercase tracking-wide text-white backdrop-blur-[2px]',
              featured ? 'px-3 py-1.5 text-[11px]' : 'px-2.5 py-1 text-[10px]',
            )}
          >
            After
          </span>

          {hint && hintVisible ? (
            <span
              className={cn(
                'pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm',
                onActivate ? 'top-16 sm:top-14' : 'top-16 sm:top-3',
              )}
            >
              {hint}
            </span>
          ) : null}
        </div>

        {onActivate ? (
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              onActivate()
            }}
            className="absolute z-30 inline-flex min-h-11 min-w-11 items-center gap-1.5 rounded-full bg-black/65 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-black/80"
            style={{
              top: 'max(0.75rem, env(safe-area-inset-top, 0px))',
              right: 'max(0.75rem, env(safe-area-inset-right, 0px))',
            }}
            aria-label="Preview project"
          >
            <Maximize2 className="h-4 w-4" aria-hidden />
            Preview
          </button>
        ) : null}
      </div>
    </div>
  )
}
