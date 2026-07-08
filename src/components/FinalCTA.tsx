import { motion } from 'framer-motion'
import Button from './ui/Button'
import { Eyebrow } from './ui/SectionHeader'
import { fadeUp, viewportOnce } from '../lib/motion'
import { BOOKING_URL } from '../lib/config'

export default function FinalCTA() {
  return (
    <section id="contact" className="bg-paper py-16 md:py-24">
      <div className="container-x">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-8 py-16 text-center md:px-16 md:py-24"
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-50" aria-hidden />
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 opacity-60 blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(46,92,255,0.28), rgba(20,184,166,0.12) 45%, transparent 72%)',
            }}
            aria-hidden
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <Eyebrow tone="light">Let&rsquo;s get started</Eyebrow>
            <h2 className="mt-6 font-display text-display-lg font-semibold text-white">
              Let&rsquo;s build your AI roadmap.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              A 30-minute strategy call to pressure-test where AI can move a real number in your
              business — and where it can&rsquo;t. No pitch, no obligation.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={BOOKING_URL} variant="primary" withArrow>
                Book a Strategy Call
              </Button>
              <Button href="#work" variant="light">
                See Our Work
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
