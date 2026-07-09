'use client'

import { type FormEvent, useState } from 'react'
import { trackFormSubmit } from '@/lib/analytics'
import { contactFormEndpoint, thankYouPath } from '@/lib/contact'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import Button from '@/components/ui/Button'

type QuoteFormProps = {
  variant?: 'light' | 'dark'
}

export default function QuoteForm({ variant = 'light' }: QuoteFormProps) {
  const isDark = variant === 'dark'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(contactFormEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        throw new Error(
          typeof result?.message === 'string'
            ? result.message
            : 'Unable to send your request right now.',
        )
      }

      trackFormSubmit('Quote Request')
      window.location.href = thankYouPath
    } catch (error) {
      setIsSubmitting(false)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send your request right now. Please call us directly.',
      )
    }
  }

  const inputClass = isDark
    ? 'w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 transition-all duration-200 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30'
    : 'w-full rounded-md border border-black/10 bg-neutral-50 px-4 py-3 text-sm text-brand-dark placeholder-brand-subtle/80 transition-all duration-200 focus:border-brand-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/20'

  const labelClass = isDark ? 'text-white/80' : 'text-brand-dark'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_subject" value="New Quote Request - A1 Property Services" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={`${siteConfig.url}${thankYouPath}`} />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
            Full Name <span className="text-brand-gold">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="phone" className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
            Phone <span className="text-brand-gold">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(319) 555-1234"
            className={inputClass}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
          City <span className="text-brand-gold">*</span>
        </label>
        <input
          id="city"
          name="city"
          type="text"
          required
          placeholder="Cedar Falls"
          className={inputClass}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="email" className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          className={inputClass}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="service" className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
          Service Needed <span className="text-brand-gold">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          className={inputClass}
          disabled={isSubmitting}
        >
          <option value="">Select a service</option>
          <option value="retaining-walls">Retaining Walls</option>
          <option value="paver-patios">Paver Patios</option>
          <option value="landscape-installation">Landscape Installation</option>
          <option value="lawn-care">Lawn Care & Mowing</option>
          <option value="tree-service">Tree Service</option>
          <option value="water-features">Water Features & Ponds</option>
          <option value="hydroseeding">Hydroseeding</option>
          <option value="snow-removal">Snow Removal</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="details" className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
          Project Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Briefly describe your project..."
          className={`${inputClass} min-h-[120px]`}
          disabled={isSubmitting}
        />
      </div>

      {errorMessage ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMessage}{' '}
          <a href={`tel:${siteConfig.phone}`} className="font-semibold underline">
            Call {siteConfig.phoneDisplay}
          </a>{' '}
          instead.
        </p>
      ) : null}

      <Button type="submit" fullWidth className="justify-center py-4 text-sm" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : CTA_COPY.quote}
      </Button>

      <p className={`text-center text-xs ${isDark ? 'text-white/60' : 'text-brand-subtle'}`}>
        No spam. We&rsquo;ll respond within 1 business day.
      </p>
    </form>
  )
}
