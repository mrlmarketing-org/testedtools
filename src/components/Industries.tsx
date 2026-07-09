import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { industries } from '../data/content'
import { SectionHeader } from './ui/SectionHeader'
import { stagger, item, viewportOnce } from '../lib/motion'

export default function Industries() {
  return (
    <section id="industries" className="relative bg-paper-50 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Industries"
            title="Built for operators in complex industries"
            intro="We go deep in sectors where operational detail matters — the places where generic AI tools break and thoughtful implementation wins."
          />
        </div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <motion.li key={industry.id} variants={item}>
                <a
                  href={`/industries/${industry.slug}.html`}
                  className="group relative flex h-full flex-col rounded-2xl border border-ink-900/[0.08] bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-ink-900/[0.14] hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900 text-white">
                      <Icon size={19} strokeWidth={1.75} />
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-ink-900/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500"
                    />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-ink-900">{industry.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/55">{industry.blurb}</p>
                </a>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
