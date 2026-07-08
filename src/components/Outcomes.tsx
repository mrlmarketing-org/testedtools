import { motion } from 'framer-motion'
import { outcomes } from '../data/content'
import { SectionHeader } from './ui/SectionHeader'
import { stagger, item, viewportOnce } from '../lib/motion'

export default function Outcomes() {
  return (
    <section id="outcomes" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Outcomes"
          title="Outcomes we build toward"
          intro="What thoughtful AI implementation is meant to move. These are the targets we design against — and replace with your measured results as work ships."
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink-900/[0.08] bg-ink-900/[0.07] sm:grid-cols-2 lg:grid-cols-4"
        >
          {outcomes.map((o) => (
            <motion.li key={o.label} variants={item} className="flex flex-col bg-paper p-8">
              <span className="font-display text-4xl font-semibold text-ink-900 md:text-5xl">
                {o.value}
              </span>
              <span className="mt-4 text-base font-semibold text-ink-900">{o.label}</span>
              <span className="mt-2 text-sm leading-relaxed text-ink-900/55">{o.detail}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
