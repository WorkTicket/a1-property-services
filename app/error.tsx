'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-bold text-brand-dark">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-brand-body">
        We encountered an unexpected error. Please try again or contact us if the
        problem persists.
      </p>
      <Button onClick={reset} className="mt-8">
        Try Again
      </Button>
    </div>
  )
}
