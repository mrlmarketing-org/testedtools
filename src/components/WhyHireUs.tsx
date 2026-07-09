import { motion } from 'framer-motion'
import { reasons } from '../data/content'
import { SectionHeader } from './ui/SectionHeader'
import { stagger, item, viewportOnce } from '../lib/motion'

export default function WhyHireUs() {
  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Why companies hire us"
          title="AI experts who drive outcomes, not decks"
          intro="Plenty of firms will hand you a strategy deck. We're AI experts who stay to build it, integrate it, and make sure it moves a number that matters."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {reasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                variants={item}
                className="group relative overflow-hidden rounded-3xl border border-ink-900/[0.08] bg-gradient-to-br from-white to-paper-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover md:p-10"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-ink-900 text-teal-400">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-xs text-ink-900/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-ink-900">{reason.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-ink-900/55">
                  {reason.description}
                </p>
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/[0.05] blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0"
                  aria-hidden
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
