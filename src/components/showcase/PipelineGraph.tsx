import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Sparkles, GitBranch } from 'lucide-react'
import { SiClaude, SiPostgresql, SiSnowflake, SiHubspot, SiGmail } from 'react-icons/si'
import { EASE, viewportOnce } from '../../lib/motion'

/**
 * Generic "AI ops" agent pipeline, rendered on a dark laptop screen.
 * All-SVG (viewBox) so nodes + connectors scale together. Connector lines
 * draw out in sequence (pathLength), then a bright pulse loops along them like
 * live data. Nodes use foreignObject so they can be styled with normal
 * HTML/Tailwind and show real product logos.
 */

// Real brand logo on a white chip (matches the "tools of the trade" look).
function Logo({ icon, color }: { icon: ReactNode; color: string }) {
  return (
    <span
      className="grid h-7 w-7 flex-none place-items-center overflow-hidden rounded-md bg-white"
      style={{ color }}
    >
      {icon}
    </span>
  )
}

type NodeProps = {
  x: number
  y: number
  w: number
  h: number
  chip: ReactNode
  title: string
  sub?: string
  delay: number
  reduce: boolean
}

function Node({ x, y, w, h, chip, title, sub, delay, reduce }: NodeProps) {
  return (
    <foreignObject x={x} y={y} width={w} height={h}>
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.4, delay, ease: EASE }}
        className="flex h-full w-full items-center gap-2 rounded-xl border border-ink-700 bg-ink-900 px-2.5 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)]"
      >
        {chip}
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[11px] font-semibold text-white/90">{title}</span>
          {sub && (
            <span className="block truncate font-mono text-[9px] uppercase tracking-wider text-white/40">
              {sub}
            </span>
          )}
        </span>
      </motion.div>
    </foreignObject>
  )
}

// Tinted (non-brand) chip for the generic pipeline stages.
function StageChip({ icon, tone }: { icon: ReactNode; tone: 'blue' | 'teal' | 'slate' }) {
  const map = {
    blue: 'bg-brand-500/15 text-brand-400',
    teal: 'bg-teal-400/15 text-teal-300',
    slate: 'bg-white/[0.06] text-white/70',
  }
  return (
    <span className={`grid h-7 w-7 flex-none place-items-center rounded-md ${map[tone]}`}>
      {icon}
    </span>
  )
}

// Solid connector: faint base + accent draw-in + looping data pulse.
function Flow({
  d,
  drawDelay,
  pulseDelay,
  reduce,
}: {
  d: string
  drawDelay: number
  pulseDelay: number
  reduce: boolean
}) {
  return (
    <g fill="none">
      <path d={d} stroke="#16294A" strokeWidth={1.6} />
      <motion.path
        d={d}
        stroke="#2E5CFF"
        strokeWidth={1.8}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: drawDelay, ease: EASE }}
      />
      {!reduce && (
        <motion.path
          d={d}
          stroke="#5EEAD4"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeDasharray="7 240"
          initial={{ strokeDashoffset: 247 }}
          animate={{ strokeDashoffset: [247, 0] }}
          transition={{
            duration: 1.5,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: 1.1,
            delay: pulseDelay,
          }}
        />
      )}
    </g>
  )
}

// Dashed sub-connector (model / memory / data) — just fades in.
function SubLink({ d, delay, reduce }: { d: string; delay: number; reduce: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#1E3A66"
      strokeWidth={1.3}
      strokeDasharray="3 5"
      initial={reduce ? false : { opacity: 0 }}
      whileInView={reduce ? undefined : { opacity: 0.9 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay }}
    />
  )
}

export default function PipelineGraph({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-full flex-col bg-ink-950">
      {/* Screen header (kept clear of the overlapping phone on the left) */}
      <div className="flex items-center justify-end gap-3 px-4 pt-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
          Agent runtime
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 px-2 py-0.5 font-mono text-[9px] font-medium text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 [animation:pulse_2s_ease-in-out_infinite]" />
          Running
        </span>
      </div>

      <svg viewBox="0 0 720 380" preserveAspectRatio="xMidYMid meet" className="block w-full flex-1">
        <defs>
          <pattern id="wf-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.1" fill="#0F1D33" />
          </pattern>
        </defs>
        <rect width="720" height="380" fill="url(#wf-dots)" />

        {/* Dashed sub-links from AI Agent down to its tools */}
        <SubLink d="M328 192 C316 240 308 268 308 300" delay={0.55} reduce={reduce} />
        <SubLink d="M328 192 C360 244 430 264 430 300" delay={0.6} reduce={reduce} />
        <SubLink d="M328 192 C400 240 552 264 552 300" delay={0.65} reduce={reduce} />

        {/* Main flow */}
        <Flow d="M404 156 C440 156 445 155 474 155" drawDelay={0.3} pulseDelay={1.8} reduce={reduce} />
        <Flow d="M592 146 C628 146 648 122 648 110" drawDelay={0.7} pulseDelay={2.3} reduce={reduce} />
        <Flow d="M592 164 C628 164 648 190 648 210" drawDelay={0.7} pulseDelay={2.3} reduce={reduce} />

        {/* Main pipeline stages (generic) — start at the agent, right of the phone */}
        <Node
          x={252}
          y={120}
          w={152}
          h={72}
          chip={<StageChip tone="blue" icon={<Sparkles size={16} strokeWidth={2} />} />}
          title="AI Agent"
          sub="Classify · Decide"
          delay={0.2}
          reduce={reduce}
        />
        <Node
          x={474}
          y={129}
          w={118}
          h={52}
          chip={<StageChip tone="slate" icon={<GitBranch size={15} strokeWidth={2} />} />}
          title="Decision"
          sub="Confidence"
          delay={0.6}
          reduce={reduce}
        />

        {/* Act endpoints (real logos) */}
        <Node
          x={588}
          y={60}
          w={120}
          h={50}
          chip={<Logo icon={<SiGmail size={15} />} color="#EA4335" />}
          title="Notify"
          sub="Email"
          delay={1.0}
          reduce={reduce}
        />
        <Node
          x={588}
          y={210}
          w={120}
          h={50}
          chip={<Logo icon={<SiHubspot size={16} />} color="#FF7A59" />}
          title="Sync"
          sub="HubSpot"
          delay={1.0}
          reduce={reduce}
        />

        {/* Agent tools (real logos) */}
        <Node
          x={252}
          y={300}
          w={112}
          h={44}
          chip={<Logo icon={<SiClaude size={16} />} color="#D97757" />}
          title="Claude"
          sub="Model"
          delay={0.55}
          reduce={reduce}
        />
        <Node
          x={374}
          y={300}
          w={112}
          h={44}
          chip={<Logo icon={<SiPostgresql size={15} />} color="#4169E1" />}
          title="Memory"
          sub="pgvector"
          delay={0.6}
          reduce={reduce}
        />
        <Node
          x={496}
          y={300}
          w={112}
          h={44}
          chip={<Logo icon={<SiSnowflake size={15} />} color="#29B5E8" />}
          title="Context"
          sub="Warehouse"
          delay={0.65}
          reduce={reduce}
        />
      </svg>
    </div>
  )
}
