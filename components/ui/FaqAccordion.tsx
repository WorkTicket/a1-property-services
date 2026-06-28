'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type FaqItem = {
  q: string
  a: string
}

type FaqAccordionProps = {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <dl className="mt-12 space-y-4">
      {items.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={faq.q}
            className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <dt>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-brand-dark">{faq.q}</span>
                <span
                  className={cn(
                    'shrink-0 text-brand-gold transition-transform duration-300 ease-premium',
                    isOpen && 'rotate-180',
                  )}
                >
                  <ChevronDown size={20} />
                </span>
              </button>
            </dt>
            <dd
              className={cn(
                'grid transition-all duration-350 ease-premium',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-brand-body">
                  {faq.a}
                </p>
              </div>
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
