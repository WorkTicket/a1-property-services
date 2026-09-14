import type { CSSProperties, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none' | 'scale'

const directionClass: Record<Direction, string> = {
  up: 'motion-fade-up',
  down: 'motion-fade-down',
  left: 'motion-fade-left',
  right: 'motion-fade-right',
  none: 'motion-fade',
  scale: 'motion-fade-scale',
}

type FadeInProps = {
  children: ReactNode
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
  const Tag = as as ElementType
  const style: CSSProperties | undefined = delay
    ? { animationDelay: `${delay}s` }
    : undefined

  return (
    <Tag className={cn(directionClass[direction], className)} style={style}>
      {children}
    </Tag>
  )
}
