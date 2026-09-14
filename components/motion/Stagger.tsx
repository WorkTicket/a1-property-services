import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn, ANIMATION_DURATION, STAGGER_BASE_DELAY, STAGGER_STEP } from '@/lib/utils'

type StaggerContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol'
  delay?: number
}

export function StaggerContainer({
  children,
  className,
  as = 'div',
  delay = 0,
}: StaggerContainerProps) {
  const Tag = as as ElementType
  const items = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child
    return cloneElement(child as ReactElement<{ index?: number }>, { index })
  })

  return (
    <Tag
      className={className}
      style={{ '--stagger-delay': `${delay}s` } as CSSProperties}
    >
      {items}
    </Tag>
  )
}

type StaggerItemProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'li'
  index?: number
}

export function StaggerItem({
  children,
  className,
  as = 'div',
  index = 0,
}: StaggerItemProps) {
  const Tag = as as ElementType

  return (
    <Tag
      className={cn('motion-fade-up', className)}
      style={{
        animationDuration: `${ANIMATION_DURATION}ms`,
        animationDelay: `calc(var(--stagger-delay, 0s) + ${STAGGER_BASE_DELAY + index * STAGGER_STEP}s)`,
      }}
    >
      {children}
    </Tag>
  )
}
