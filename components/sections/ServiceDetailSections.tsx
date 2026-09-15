import { Check } from 'lucide-react'
import { getProcessStepIcon } from '@/lib/process-step-icon'
import type {
  ComparisonSectionMeta,
  Equipment,
  Material,
  ProblemSolution,
  ServiceProcessStep,
} from '@/lib/services'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import { cn } from '@/lib/utils'

type ServiceDetailSectionsProps = {
  serviceName: string
  problems: ProblemSolution[]
  processSteps: ServiceProcessStep[]
  benefits: string[]
  equipment: Equipment[]
  materials: Material[]
  comparisonMeta: ComparisonSectionMeta
  locationPhrase?: string
}

export default function ServiceDetailSections({
  serviceName,
  problems,
  processSteps,
  benefits,
  equipment,
  materials,
  comparisonMeta,
  locationPhrase = 'Cedar Falls and Waterloo',
}: ServiceDetailSectionsProps) {
  return (
    <>
      {problems.length > 0 && (
        <section id="problems" className="section bg-brand-stone">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">Common Problems We Solve</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              Every property is different, but these are the most common challenges we help {locationPhrase} homeowners overcome.
            </p>
            <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {problems.map((item) => (
                <StaggerItem key={item.problem}>
                  <div className="card h-full p-6">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-brand-green-100 p-2">
                        <Check size={16} className="text-brand-green-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brand-dark/60">The Problem</p>
                        <p className="mt-1 font-bold text-brand-dark">{item.problem}</p>
                        <p className="mt-3 text-sm leading-relaxed text-brand-body">
                          <span className="font-semibold text-brand-green-700">Solution: </span>
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </section>
      )}

      {processSteps.length > 0 && (
        <section id="process" className="section bg-white">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">Our {serviceName} Process</h2>
            <p className="mt-4 text-brand-body">We follow a proven process to deliver consistent results on every project.</p>
            <ol className="relative mt-10 space-y-8 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:bg-brand-gold/20">
              {processSteps.map((step) => {
                const StepIcon = getProcessStepIcon(step.title)
                return (
                  <li key={step.title} className="relative flex gap-5">
                    <span
                      className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold text-white shadow-[0_8px_18px_-8px_rgba(158,27,36,0.8)]"
                      aria-hidden="true"
                    >
                      <StepIcon size={18} strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark">{step.title}</h3>
                      <p className="mt-1 leading-relaxed text-brand-body">{step.description}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </FadeIn>
        </section>
      )}

      {benefits.length > 0 && (
        <section id="what-you-get" className="section bg-brand-stone">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">What You Get with {serviceName}</h2>
            <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <StaggerItem key={benefit}>
                  <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-700 text-xs font-bold text-white" aria-hidden="true">
                      <Check size={14} />
                    </span>
                    <span className="text-brand-body">{benefit}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </section>
      )}

      {equipment.length > 0 && (
        <section id="equipment" className="section bg-white">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">Equipment We Use</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              We use quality equipment to get every job done right.
            </p>
            <div className="mt-10 space-y-10">
              {equipment.map((item) => (
                <div key={item.name} className="rounded-xl border border-black/5 bg-brand-stone p-6 md:p-8">
                  <h3 className="text-xl font-bold text-brand-dark">{item.name}</h3>
                  <ul className="mt-4 space-y-3">
                    {item.items.map((line) => (
                      <li key={line} className="flex gap-2 text-sm text-brand-body">
                        <Check size={14} className="mt-0.5 shrink-0 text-brand-green-700" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {materials.length > 0 && (
        <section id="materials" className={cn('section', equipment.length > 0 ? 'bg-brand-stone' : 'bg-white')}>
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">{comparisonMeta.heading}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              {comparisonMeta.intro}
            </p>
            <div className="mt-10 space-y-10">
              {materials.map((material) => (
                <div
                  key={material.name}
                  className={cn(
                    'rounded-xl border p-6 md:p-8',
                    material.recommended
                      ? 'border-brand-gold/50 bg-white ring-2 ring-brand-gold/25 shadow-[0_4px_24px_rgba(158,27,36,0.08)]'
                      : equipment.length > 0
                        ? 'border-black/5 bg-white'
                        : 'border-black/5 bg-brand-stone',
                  )}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-brand-dark">{material.name}</h3>
                    {material.recommended ? (
                      <span className="inline-flex items-center rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold">
                        Recommended
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-green-700">Pros</p>
                      <ul className="space-y-2">
                        {material.pros.map((pro) => (
                          <li key={pro} className="flex gap-2 text-sm text-brand-body">
                            <Check size={14} className="mt-0.5 shrink-0 text-brand-green-700" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-body/60">Cons</p>
                      <ul className="space-y-2">
                        {material.cons.map((con) => (
                          <li key={con} className="flex gap-2 text-sm text-brand-body">
                            <span className="mt-0.5 shrink-0 text-brand-gold">&#x2715;</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-green-700">Maintenance</p>
                      <p className="mt-1 text-sm leading-relaxed text-brand-body">{material.maintenance}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-green-700">Durability</p>
                      <p className="mt-1 text-sm leading-relaxed text-brand-body">{material.durability}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      )}
    </>
  )
}
