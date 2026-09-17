import type { ReactNode } from 'react'
import { ESTIMATE_ID } from '@/lib/cta'
import { cn } from '@/lib/utils'

export default function QuoteFormCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div id={ESTIMATE_ID} tabIndex={-1} className={cn('form-card', className)}>
      {children}
    </div>
  )
}
