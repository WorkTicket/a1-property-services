import { getCompanyStats, type CompanyStat } from '@/lib/company-stats'
import StatsMarqueeRuntime from '@/components/sections/StatsMarqueeRuntime'

function MarqueeSet({ stats, clone }: { stats: CompanyStat[]; clone?: boolean }) {
  return (
    <ul className="stats-marquee-set" aria-hidden={clone ? true : undefined}>
      {stats.map((stat) => (
        <li key={`${stat.value}-${stat.label}`} className="stats-marquee-item">
          <span className="stats-marquee-value">{stat.value}</span>
          <span className="stats-marquee-label">{stat.label}</span>
        </li>
      ))}
    </ul>
  )
}

export default function StatsBar() {
  const stats = getCompanyStats()

  return (
    <section id="stats-marquee" className="stats-marquee" aria-label="Company highlights">
      <div className="stats-marquee-edge stats-marquee-edge-left" aria-hidden />
      <div className="stats-marquee-edge stats-marquee-edge-right" aria-hidden />
      <div className="stats-marquee-viewport">
        <div className="stats-marquee-track">
          <MarqueeSet stats={stats} />
          <MarqueeSet stats={stats} clone />
        </div>
      </div>
      <StatsMarqueeRuntime />
    </section>
  )
}
