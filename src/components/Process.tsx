import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { processSteps } from '../data/content'
import { SectionHeader } from './ui/SectionHeader'
import { fadeUp, viewportOnce } from '../lib/motion'

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null)
  // Progress as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 65%', 'end 60%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="process" className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(46,92,255,0.22), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionHeader
          tone="light"
          eyebrow="Our process"
          title="A disciplined path from idea to impact"
          intro="No science projects. Every engagement moves through the same five stages, each with a clear decision point before we invest further."
        />

        <div ref={trackRef} className="relative mt-16 md:mt-20">
          {/* Vertical rail */}
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px bg-white/12 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />
          {/* Filled progress rail */}
          <motion.div
            className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-brand-500 via-brand-400 to-teal-400 md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: lineScale }}
            aria-hidden
          />

          <ol className="space-y-10 md:space-y-0">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <li
                  key={step.index}
                  className="relative md:grid md:min-h-[132px] md:grid-cols-2 md:items-center md:gap-16"
                >
                  {/* Node dot */}
                  <span
                    className="absolute left-[19px] top-1.5 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center md:left-1/2"
                    aria-hidden
                  >
                    <span className="absolute h-3.5 w-3.5 rounded-full bg-brand-500/25" />
                    <span className="h-2 w-2 rounded-full bg-brand-400 ring-4 ring-ink-950" />
                  </span>

                  {/* Content card, alternating sides on desktop */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    className={`pl-11 md:pl-0 ${
                      isLeft
                        ? 'md:col-start-1 md:pr-4 md:text-right'
                        : 'md:col-start-2 md:pl-4'
                    }`}
                  >
                    <div
                      className={`flex items-baseline gap-3 ${
                        isLeft ? 'md:justify-end' : ''
                      }`}
                    >
                      <span className="font-mono text-sm text-teal-400">{step.index}</span>
                      <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="mt-3 max-w-md text-white/55 md:inline-block">
                      {step.description}
                    </p>
                    <p
                      className={`mt-3 font-mono text-xs text-white/35 ${
                        isLeft ? 'md:text-right' : ''
                      }`}
                    >
                      {step.detail}
                    </p>
                  </motion.div>

                  {/* spacer to keep grid rhythm */}
                  <div className="hidden md:block" />
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
