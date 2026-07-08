import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { stack, type TechItem } from '../data/content'
import { Eyebrow } from './ui/SectionHeader'
import { stagger, item as itemVariant, viewportOnce } from '../lib/motion'

const GOLDEN_ANGLE = 2.399963 // ~137.5° — evenly spirals chips around the tube
const BASE_RADIUS = 210 // px from the tunnel axis, at full (desktop) size

// Fixed angular slot + parametric depth along the path, per chip.
function layout(i: number, total: number) {
  const angle = i * GOLDEN_ANGLE
  const radius = BASE_RADIUS * (0.72 + ((i * 7) % 5) / 12) // slight wobble
  const depth = 0.06 + (i / (total - 1)) * 0.86 // 0.06 → 0.92 along the tube
  return { angle, radius, depth }
}

function TechChip({
  data,
  i,
  total,
  scale,
  progress,
}: {
  data: TechItem
  i: number
  total: number
  scale: number
  progress: MotionValue<number>
}) {
  const { angle, radius, depth } = layout(i, total)
  const x = Math.cos(angle) * radius * scale
  const y = Math.sin(angle) * radius * scale

  // Fly from deep in the tunnel (far, small) toward and past the camera.
  const z = useTransform(progress, [depth - 0.62, depth + 0.06], [-1320, 340])
  const opacity = useTransform(
    progress,
    [depth - 0.62, depth - 0.44, depth - 0.03, depth + 0.05],
    [0, 1, 1, 0],
  )

  const Icon = data.icon
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ x, y, z, opacity, willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2.5 shadow-float backdrop-blur-sm">
        <Icon className="h-4 w-4 flex-none text-teal-400" strokeWidth={1.75} aria-hidden />
        <span className="text-sm font-medium text-white/90">{data.name}</span>
      </div>
    </motion.div>
  )
}

// Accessible, motion-free fallback: a simple chip cloud.
function StaticStack() {
  return (
    <section id="stack" className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" aria-hidden />
      <div className="container-x relative">
        <div className="flex max-w-2xl flex-col gap-5">
          <Eyebrow tone="light">Capabilities</Eyebrow>
          <h2 className="font-display text-display-md font-semibold text-white">
            The stack we build on
          </h2>
          <p className="text-lg leading-relaxed text-white/60">
            The models, data, and infrastructure we assemble into systems that ship.
          </p>
        </div>
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 flex flex-wrap gap-3"
        >
          {stack.map((tech) => {
            const Icon = tech.icon
            return (
              <motion.li
                key={tech.name}
                variants={itemVariant}
                className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5"
              >
                <Icon className="h-4 w-4 text-teal-400" strokeWidth={1.75} aria-hidden />
                <span className="text-sm font-medium text-white/90">{tech.name}</span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () =>
      setScale(window.innerWidth < 640 ? 0.6 : window.innerWidth < 1024 ? 0.82 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Intro heading recedes as you dive into the tunnel; hint tracks the journey.
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const headingY = useTransform(scrollYProgress, [0, 0.12], [0, -30])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06, 0.9, 1], [0, 0.9, 0.9, 0])

  if (reduce) return <StaticStack />

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative bg-ink-950 text-white"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Atmosphere */}
        <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" aria-hidden />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(46,92,255,0.22), transparent 68%)' }}
          aria-hidden
        />

        {/* 3D tunnel stage */}
        <div className="absolute inset-0" style={{ perspective: '820px' }} aria-hidden>
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {/* Ambient rings warping toward the viewer */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="tunnel-ring"
                style={{
                  animationDelay: `-${(i * (7 / 8)).toFixed(3)}s`,
                  borderColor: i % 2 === 0 ? 'rgba(94,234,212,0.16)' : 'rgba(92,130,255,0.16)',
                }}
              />
            ))}
            {/* Skill chips flying down the tube */}
            {stack.map((data, i) => (
              <TechChip
                key={data.name}
                data={data}
                i={i}
                total={stack.length}
                scale={scale}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Edge vignette — fades the tunnel mouth into the section background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, transparent 42%, rgba(6,11,20,0.55) 78%, #060B14 100%)',
          }}
          aria-hidden
        />

        {/* Intro heading */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 pt-24 md:pt-28"
          style={{ opacity: headingOpacity, y: headingY }}
        >
          <div className="container-x flex flex-col items-center gap-4 text-center">
            <Eyebrow tone="light">Capabilities</Eyebrow>
            <h2 className="max-w-2xl font-display text-display-md font-semibold text-white">
              The stack we build on
            </h2>
            <p className="max-w-md text-white/55">
              The models, data, and infrastructure we assemble into systems that ship.
            </p>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
          style={{ opacity: hintOpacity }}
        >
          <span className="eyebrow flex items-center gap-2 text-white/40">
            <span className="h-1 w-1 rounded-full bg-teal-400" aria-hidden /> Scroll to travel the stack
          </span>
        </motion.div>
      </div>
    </section>
  )
}
