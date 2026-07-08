import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/motion'
import PipelineGraph from './PipelineGraph'
import PhoneFeed from './PhoneFeed'

/**
 * Hero visual: a laptop running the agent pipeline, with a phone overlapping
 * the lower-left showing the results stream in as notifications. Both float
 * gently; motion is disabled under prefers-reduced-motion.
 */
export default function DeviceShowcase() {
  const reduce = useReducedMotion() ?? false

  return (
    <div className="relative mx-auto w-full max-w-[600px] select-none pb-8 pt-4" aria-hidden>
      {/* Laptop */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        className="relative z-10 mx-auto max-w-[560px]"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={reduce ? undefined : { duration: 7, ease: 'easeInOut', repeat: Infinity }}
        >
          {/* Lid + screen */}
          <div className="rounded-xl border border-ink-800 bg-ink-950 p-2.5 shadow-[0_40px_80px_-32px_rgba(6,11,20,0.55)]">
            <div className="mx-auto mb-1.5 h-1 w-1 rounded-full bg-white/20" />
            <div className="aspect-[16/10] overflow-hidden rounded-lg ring-1 ring-white/5">
              <PipelineGraph reduce={reduce} />
            </div>
          </div>
          {/* Base / hinge */}
          <div className="relative left-1/2 h-3 w-[114%] -translate-x-1/2 rounded-b-2xl border-x border-b border-ink-800 bg-gradient-to-b from-ink-700 to-ink-900">
            <div className="mx-auto h-1.5 w-24 rounded-b-lg bg-ink-950/80" />
          </div>
        </motion.div>
      </motion.div>

      {/* Phone, overlapping the laptop's lower-left */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: -12, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
        className="absolute -bottom-4 -left-3 z-20 w-[150px] sm:w-[164px] xl:w-[178px]"
        style={{ rotate: -5 }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={reduce ? undefined : { duration: 6, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
        >
          <div className="rounded-[2rem] border border-ink-700 bg-ink-950 p-1.5 shadow-float">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[1.6rem]">
              {/* Notch */}
              <div className="absolute left-1/2 top-1.5 z-10 h-3.5 w-12 -translate-x-1/2 rounded-full bg-ink-950" />
              <PhoneFeed reduce={reduce} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
