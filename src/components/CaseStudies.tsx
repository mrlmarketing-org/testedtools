import { motion } from 'framer-motion'
import { caseStudies } from '../data/content'
import { SectionHeader } from './ui/SectionHeader'
import { fadeUp, viewportOnce } from '../lib/motion'

const stepLabels = [
  { key: 'problem', label: 'Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'outcome', label: 'Outcome' },
] as const

export default function CaseStudies() {
  return (
    <section id="work" className="relative bg-paper-50 py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Case studies"
          title="Representative engagements"
          intro="Illustrative scenarios in the industries we serve — the problem, what we'd build, and the kind of number it moves. We'll swap in named client stories as they publish."
        />

        <div className="mt-14 space-y-6">
          {caseStudies.map((study, i) => (
            <motion.article
              key={study.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ delay: i * 0.05 }}
              className="group overflow-hidden rounded-3xl border border-ink-900/[0.08] bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="grid lg:grid-cols-[1.6fr_1fr]">
                {/* Narrative */}
                <div className="border-b border-ink-900/[0.07] p-8 md:p-10 lg:border-b-0 lg:border-r">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow rounded-full bg-brand-50 px-3 py-1 text-brand-600">
                      {study.industry}
                    </span>
                    <span className="eyebrow rounded-full border border-ink-900/[0.12] px-3 py-1 text-ink-900/45">
                      Illustrative
                    </span>
                  </div>
                  <h3 className="mt-5 max-w-xl text-2xl font-semibold leading-snug text-ink-900 md:text-[1.7rem]">
                    {study.title}
                  </h3>

                  <dl className="mt-8 space-y-6">
                    {stepLabels.map(({ key, label }) => (
                      <div key={key} className="grid gap-1.5 sm:grid-cols-[110px_1fr] sm:gap-6">
                        <dt className="font-mono text-xs uppercase tracking-wider text-ink-900/40">
                          {label}
                        </dt>
                        <dd className="text-[0.95rem] leading-relaxed text-ink-900/65">
                          {study[key]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Impact panel */}
                <div className="flex flex-col justify-center gap-8 bg-ink-950 p-8 text-white md:p-10">
                  <span className="eyebrow text-teal-400">Illustrative impact</span>
                  <div className="space-y-8">
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="font-display text-4xl font-semibold text-white md:text-5xl">
                          {metric.value}
                        </div>
                        <div className="mt-1.5 text-sm text-white/50">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-ink-900/40">
          Illustrative scenarios based on typical engagements — not real client results.
        </p>
      </div>
    </section>
  )
}
