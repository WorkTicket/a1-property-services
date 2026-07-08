'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { buildSrcset, getImageDimensions, getVariantUrl } from '@/lib/responsive-image'

type HeroVideoBackgroundProps = {
  posterSrc: string
  mp4Src: string
  webmSrc: string
  alt: string
  className?: string
}

export default function HeroVideoBackground({
  posterSrc,
  mp4Src,
  webmSrc,
  alt,
  className,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [preferStatic, setPreferStatic] = useState(false)

  const dimensions = getImageDimensions(posterSrc)
  const avifSrcset = buildSrcset(posterSrc, 'avif')
  const posterUrl = getVariantUrl(posterSrc, 'jpeg', 1920)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPreferStatic(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (preferStatic) return
    const video = videoRef.current
    if (!video) return

    const play = () => {
      void video.play().catch(() => {
        // Autoplay blocked: poster image remains visible underneath.
      })
    }

    if (video.readyState >= 2) {
      play()
    } else {
      video.addEventListener('loadeddata', play, { once: true })
      return () => video.removeEventListener('loadeddata', play)
    }
  }, [preferStatic, mp4Src, webmSrc])

  if (preferStatic) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={getVariantUrl(posterSrc, 'avif', 1536)}
        srcSet={avifSrcset}
        sizes={IMAGE_SIZES.hero}
        alt={alt}
        width={dimensions?.width ?? 1920}
        height={dimensions?.height ?? 1080}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        className={cn('absolute inset-0 h-full w-full object-cover', className)}
      />
    )
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Poster stays visible until video frames are ready */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getVariantUrl(posterSrc, 'avif', 1536)}
        srcSet={avifSrcset}
        sizes={IMAGE_SIZES.hero}
        alt={alt}
        width={dimensions?.width ?? 1920}
        height={dimensions?.height ?? 1080}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterUrl}
        aria-hidden="true"
        className="absolute inset-0 z-[1] h-full w-full object-cover"
      >
        <source src={mp4Src} type="video/mp4" />
        <source src={webmSrc} type="video/webm" />
      </video>
    </div>
  )
}
