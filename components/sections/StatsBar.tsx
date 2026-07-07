'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Stat = {
  value: string
  label: string
}

type StatsBarProps = {
  stats: Stat[]
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

function useInView() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

function CountUp({ target, suffix = '', decimals = 0, active }: {
  target: number
  suffix?: string
  decimals?: number
  active: boolean
}) {
  const [display, setDisplay] = useState(decimals > 0 ? '0.0' : '0')

  useEffect(() => {
    if (!active) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(decimals > 0 ? target.toFixed(decimals) : String(Math.round(target)))
      return
    }

    let frame = 0
    const start = performance.now()
    const duration = 1400

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const current = target * easeOutCubic(progress)
      setDisplay(decimals > 0 ? current.toFixed(decimals) : String(Math.round(current)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, decimals])

  return (
    <>
      {display}
      {suffix}
    </>
  )
}

function NumericStat({ stat, active }: { stat: Stat; active: boolean }) {
  const match = stat.value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return <p className="stats-value">{stat.value}</p>

  const [, rawNumber, suffix] = match
  const decimals = rawNumber.includes('.') ? rawNumber.split('.')[1].length : 0

  return (
    <>
      <p className="stats-value">
        <CountUp
          target={parseFloat(rawNumber)}
          suffix={suffix}
          decimals={decimals}
          active={active}
        />
      </p>
      <p className="stats-label">{stat.label}</p>
    </>
  )
}

function LicensedStat({ stat, active }: { stat: Stat; active: boolean }) {
  return (
    <div
      className={cn(
        'transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        active ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
      )}
    >
      <p className="stats-value">{stat.value}</p>
      <p className="stats-label">{stat.label}</p>
    </div>
  )
}

export default function StatsBar({ stats }: StatsBarProps) {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="stats-bar">
      <div className="section-inner">
        <div className="grid grid-cols-2 divide-x divide-y divide-black/[0.08] md:grid-cols-4 md:divide-y-0">
          {stats.map((stat) => {
            const isNumeric = /^\d/.test(stat.value)

            return (
              <div key={stat.label} className="px-4 py-8 text-center sm:px-6 md:py-6">
                {isNumeric ? (
                  <NumericStat stat={stat} active={inView} />
                ) : (
                  <LicensedStat stat={stat} active={inView} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
