'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { markLeadSubmitted, trackFormSubmit, trackQuoteFormView } from '@/lib/analytics'
import { contactFormEndpoint, thankYouPath } from '@/lib/contact'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { allServices } from '@/lib/services'
import Button from '@/components/ui/Button'

const quoteSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  phone: z.string().trim().min(1, 'Phone is required'),
  city: z.string().trim().min(1, 'City is required'),
  email: z.string().trim().toLowerCase(),
  service: z.string().trim().min(1, 'Select a service'),
  details: z.string().trim(),
  _honey: z.string().max(0),
})

type QuoteFormData = z.infer<typeof quoteSchema>

type QuoteFormProps = {
  variant?: 'light' | 'dark'
  /** Where this form is embedded — used for GA4 form_location. */
  formLocation?: string
  /** Prefill Service Needed (service slug). */
  defaultService?: string
  /** Prefill City (defaults to empty unless provided). */
  defaultCity?: string
  /** Hide the service dropdown when a defaultService is set. */
  lockService?: boolean
  /**
   * Short path for landing pages: name + phone required;
   * city/service hidden when defaulted; email/details behind a toggle.
   */
  compact?: boolean
}

const serviceOptions = allServices
  .filter((s) => s.slug !== 'preservation-restoration')
  .sort((a, b) => a.name.localeCompare(b.name))

export default function QuoteForm({
  variant = 'light',
  formLocation = 'Unknown',
  defaultService = '',
  defaultCity = '',
  lockService = Boolean(defaultService),
  compact = false,
}: QuoteFormProps) {
  const isDark = variant === 'dark'
  const [serverError, setServerError] = useState('')
  const [showMore, setShowMore] = useState(!compact)
  const hideCity = compact && Boolean(defaultCity)
  const lockedServiceLabel =
    serviceOptions.find((s) => s.slug === defaultService)?.name ??
    (defaultService === 'other' ? 'Other' : null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      phone: '',
      city: defaultCity || (compact ? 'Cedar Falls' : ''),
      email: '',
      service: defaultService,
      details: '',
      _honey: '',
    },
  })

  useEffect(() => {
    trackQuoteFormView(formLocation)
  }, [formLocation])

  const onSubmit = async (data: QuoteFormData) => {
    setServerError('')

    try {
      const response = await fetch(contactFormEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        throw new Error(
          typeof result?.message === 'string'
            ? result.message
            : 'Unable to send your request right now.',
        )
      }

      // Flag for /thank-you generate_lead (reliable conversion). Also send
      // form_submit with callback so the beacon isn't killed by the redirect.
      markLeadSubmitted(formLocation)
      trackFormSubmit('Quote Request', formLocation, {
        event_callback: () => {
          window.location.href = thankYouPath
        },
      })
    } catch (error) {
      setServerError(
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
  const mutedClass = isDark ? 'text-white/50' : 'text-brand-subtle'
  const errorClass = 'text-xs text-red-500 mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input
        type="text"
        {...register('_honey')}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {compact && lockService && lockedServiceLabel ? (
        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-brand-body'}`}>
          Requesting a quote for{' '}
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-brand-dark'}`}>
            {lockedServiceLabel}
          </span>
          {defaultCity ? <> in {defaultCity}</> : null}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
            Full Name <span className="text-brand-gold">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            className={inputClass}
            disabled={isSubmitting}
            {...register('name')}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
            Phone <span className="text-brand-gold">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(319) 555-1234"
            autoComplete="tel"
            className={inputClass}
            disabled={isSubmitting}
            {...register('phone')}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      {hideCity ? <input type="hidden" {...register('city')} /> : null}
      {lockService && defaultService ? <input type="hidden" {...register('service')} /> : null}

      {compact && !lockService ? (
        <div>
          <label
            htmlFor="service"
            className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}
          >
            Service Needed <span className="text-brand-gold">*</span>
          </label>
          <select
            id="service"
            className={inputClass}
            disabled={isSubmitting}
            {...register('service')}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
          {errors.service && <p className={errorClass}>{errors.service.message}</p>}
        </div>
      ) : null}

      {!compact ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
                City <span className="text-brand-gold">*</span>
              </label>
              <input
                id="city"
                type="text"
                placeholder="Cedar Falls"
                autoComplete="address-level2"
                className={inputClass}
                disabled={isSubmitting}
                {...register('city')}
              />
              {errors.city && <p className={errorClass}>{errors.city.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                className={inputClass}
                disabled={isSubmitting}
                {...register('email')}
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>
          </div>

          {lockService && defaultService ? (
            <div>
              <p className={`mb-1.5 text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
                Service Needed
              </p>
              <p
                className={`rounded-md border px-4 py-3 text-sm ${
                  isDark
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-black/10 bg-neutral-50 text-brand-dark'
                }`}
              >
                {lockedServiceLabel ?? defaultService}
              </p>
            </div>
          ) : (
            <div>
              <label
                htmlFor="service-full"
                className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}
              >
                Service Needed <span className="text-brand-gold">*</span>
              </label>
              <select
                id="service-full"
                className={inputClass}
                disabled={isSubmitting}
                {...register('service')}
              >
                <option value="">Select a service</option>
                {serviceOptions.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
              {errors.service && <p className={errorClass}>{errors.service.message}</p>}
            </div>
          )}

          <div>
            <label
              htmlFor="details"
              className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}
            >
              Project Details <span className={mutedClass}>(optional)</span>
            </label>
            <textarea
              id="details"
              rows={3}
              placeholder="Briefly describe your project..."
              className={`${inputClass} min-h-[96px]`}
              disabled={isSubmitting}
              {...register('details')}
            />
          </div>
        </>
      ) : (
        <>
          {!showMore ? (
            <button
              type="button"
              className={`text-sm font-semibold underline-offset-2 hover:underline ${
                isDark ? 'text-white/80' : 'text-brand-green-800'
              }`}
              onClick={() => setShowMore(true)}
            >
              Add email or project details (optional)
            </button>
          ) : (
            <div className="space-y-4">
              {!hideCity ? (
                <div>
                  <label
                    htmlFor="city"
                    className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}
                  >
                    City <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Cedar Falls"
                    autoComplete="address-level2"
                    className={inputClass}
                    disabled={isSubmitting}
                    {...register('city')}
                  />
                  {errors.city && <p className={errorClass}>{errors.city.message}</p>}
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="email"
                  className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}
                >
                  Email Address <span className={mutedClass}>(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  className={inputClass}
                  disabled={isSubmitting}
                  {...register('email')}
                />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>

              <div>
                <label
                  htmlFor="details"
                  className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${labelClass}`}
                >
                  Project Details <span className={mutedClass}>(optional)</span>
                </label>
                <textarea
                  id="details"
                  rows={3}
                  placeholder="Briefly describe your project..."
                  className={`${inputClass} min-h-[96px]`}
                  disabled={isSubmitting}
                  {...register('details')}
                />
              </div>
            </div>
          )}
        </>
      )}

      {serverError ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {serverError}{' '}
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
