'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none' | 'scale'

const hiddenOffset: Record<Direction, string> = {
  up: 'translate-y-7',
  down: '-translate-y-5',
  left: '-translate-x-8',
  right: 'translate-x-8',
  none: '',
  scale: 'scale-[0.92]',
}

type FadeInProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: Direction
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  as = 'div',
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={cn(
        'transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform]',
        visible
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : cn('opacity-0', hiddenOffset[direction]),
        className,
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  )
}
