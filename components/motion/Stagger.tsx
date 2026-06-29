'use client'

import { createContext, useContext, useEffect, useRef, useState, type MutableRefObject } from 'react'
import { cn } from '@/lib/utils'

const StaggerVisibleContext = createContext(false)
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
  const ref = useRef<HTMLElement>(null)
  const indexCounter = useRef(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  indexCounter.current = 0
  const Tag = as

  return (
    <StaggerVisibleContext.Provider value={visible}>
      <StaggerIndexContext.Provider value={indexCounter}>
        <Tag
          ref={ref as never}
          className={className}
          style={{ '--stagger-delay': `${delay}s` } as React.CSSProperties}
        >
          {children}
        </Tag>
      </StaggerIndexContext.Provider>
    </StaggerVisibleContext.Provider>
  )
}

type StaggerItemProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li'
}

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const visible = useContext(StaggerVisibleContext)
  const indexCounter = useContext(StaggerIndexContext)
  const index = indexCounter ? indexCounter.current++ : 0
  const Tag = as

  return (
    <Tag
      className={cn(
        'transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0',
        className,
      )}
      style={{
        transitionDelay: visible
          ? `calc(var(--stagger-delay, 0s) + ${0.08 + index * 0.1}s)`
          : '0s',
      }}
    >
      {children}
    </Tag>
  )
}
