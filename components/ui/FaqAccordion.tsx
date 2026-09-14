import { cn } from '@/lib/utils'

type FaqItem = {
  q: string
  a: string
}

type FaqAccordionProps = {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="mt-10 space-y-3">
      {items.map((faq, index) => (
        <details
          key={faq.q}
          className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_-18px_rgba(13,13,13,0.2)] ring-1 ring-black/[0.05] open:shadow-[0_16px_40px_-24px_rgba(13,13,13,0.28)] open:ring-brand-gold/20"
          {...(index === 0 ? { open: true } : {})}
        >
          <summary className={cn(
            'flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left font-semibold text-brand-dark',
            'marker:content-none [&::-webkit-details-marker]:hidden',
          )}>
            {faq.q}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-gold transition-transform duration-300 ease-premium group-open:rotate-180">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </summary>
          <p className="px-6 pb-6 text-sm leading-relaxed text-brand-body">{faq.a}</p>
        </details>
      ))}
    </div>
  )
}
