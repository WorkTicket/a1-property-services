'use client'

import { useContext, useRef, type MutableRefObject } from 'react'
import { createContext } from 'react'
import { cn } from '@/lib/utils'

const StaggerIndexContext = createContext<MutableRefObject<number> | null>(null)

type StaggerContainerProps = {
  children: React.ReactNode
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
  const indexCounter = useRef(0)
  indexCounter.current = 0
  const Tag = as

  return (
    <StaggerIndexContext.Provider value={indexCounter}>
      <Tag
        className={className}
        style={{ '--stagger-delay': `${delay}s` } as React.CSSProperties}
      >
        {children}
      </Tag>
    </StaggerIndexContext.Provider>
  )
}

type StaggerItemProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li'
}

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const indexCounter = useContext(StaggerIndexContext)
  const index = indexCounter ? indexCounter.current++ : 0
  const Tag = as

  return (
    <Tag
      className={cn('animate-stagger-fade-in', className)}
      style={{
        animationDelay: `calc(var(--stagger-delay, 0s) + ${0.08 + index * 0.1}s)`,
      }}
    >
      {children}
    </Tag>
  )
}
