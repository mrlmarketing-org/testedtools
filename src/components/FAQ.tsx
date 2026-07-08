import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data/content'
import { SectionHeader } from './ui/SectionHeader'
import { EASE } from '../lib/motion'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions we hear most"
            intro="Straight answers before we ever get on a call. If yours is not here, ask us directly."
          />

          <div className="divide-y divide-ink-900/[0.08] border-y border-ink-900/[0.08]">
            {faqs.map((faq, i) => {
              const isOpen = open === i
              return (
                <div key={faq.question}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-medium text-ink-900">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border transition-colors ${
                        isOpen
                          ? 'border-brand-500 bg-brand-500 text-white'
                          : 'border-ink-900/15 text-ink-900/60'
                      }`}
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-7 leading-relaxed text-ink-900/60">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
