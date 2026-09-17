'use client'

import { useSearchParams } from 'next/navigation'
import QuoteForm from '@/components/ui/QuoteForm'

export default function ContactQuoteForm() {
  const params = useSearchParams()
  const service = params.get('service') ?? ''
  const city = params.get('city') ?? ''

  return (
    <QuoteForm
      key={`${service}:${city}`}
      variant="light"
      formLocation="Contact Page"
      compact
      defaultService={service}
      defaultCity={city}
      lockService={false}
    />
  )
}
