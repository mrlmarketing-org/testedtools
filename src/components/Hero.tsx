import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from './ui/Button'
import DeviceShowcase from './showcase/DeviceShowcase'
import WorkWithUsDialog from './WorkWithUsDialog'
import { EASE } from '../lib/motion'
import { BOOKING_URL } from '../lib/config'

export default function Hero() {
  const [messageOpen, setMessageOpen] = useState(false)

  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-28 md:pt-36">
      {/* Ambient cinematic background — very subtle, no fake dashboards */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full opacity-[0.5] blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(46,92,255,0.16), rgba(20,184,166,0.08) 45%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper"
        aria-hidden
      />

      <div className="container-x relative">
        <div className="grid items-center gap-x-10 gap-y-14 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
          {/* Copy column */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-ink-900/[0.08] bg-white/70 py-1.5 pl-2 pr-4 backdrop-blur-sm"
            >
              <span className="flex h-6 items-center rounded-full bg-teal-400/15 px-2 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-teal-600">
                New
              </span>
              <span className="text-sm text-ink-900/70">
                AI implementation, measured in business outcomes
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.05 }}
              className="font-display text-display-xl font-semibold text-ink-900"
            >
              Deploy AI that actually{' '}
              <span className="relative whitespace-nowrap text-brand-600">
                improves
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    d="M2 8 C 60 2, 240 2, 298 8"
                    stroke="#14B8A6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
                  />
                </svg>
              </span>{' '}
              your business.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-900/60 sm:text-xl"
            >
              We help companies choose, implement, and build AI systems that create measurable
              business value — not just demos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href={BOOKING_URL} variant="primary" withArrow>
                Book a Strategy Call
              </Button>
              <Button onClick={() => setMessageOpen(true)} variant="secondary">
                Leave us a message
              </Button>
            </motion.div>
          </div>

          {/* Device showcase column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="relative"
          >
            <DeviceShowcase />
          </motion.div>
        </div>
      </div>

      <WorkWithUsDialog open={messageOpen} onClose={() => setMessageOpen(false)} />
    </section>
  )
}
