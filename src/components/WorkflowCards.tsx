import { motion, useReducedMotion } from 'framer-motion'
import { Inbox, Sparkles, GitBranch, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { EASE } from '../lib/motion'

interface Node {
  icon: LucideIcon
  label: string
  status: string
  accent: 'blue' | 'teal' | 'slate'
  // position within the 100x100 relative field
  x: number
  y: number
  float: number // px of drift
  delay: number
}

const nodes: Node[] = [
  { icon: Inbox, label: 'Inbound request', status: 'Received', accent: 'slate', x: 4, y: 8, float: 10, delay: 0 },
  { icon: Sparkles, label: 'Classify intent', status: 'AI · 0.4s', accent: 'blue', x: 46, y: 30, float: 14, delay: 0.6 },
  { icon: GitBranch, label: 'Route to team', status: 'Facilities', accent: 'slate', x: 8, y: 54, float: 12, delay: 1.2 },
  { icon: CheckCircle2, label: 'Auto-resolved', status: 'Closed', accent: 'teal', x: 50, y: 74, float: 9, delay: 0.3 },
]

const accentMap = {
  blue: 'text-brand-500 bg-brand-50',
  teal: 'text-teal-600 bg-teal-400/12',
  slate: 'text-ink-700 bg-paper-100',
}

function Card({ node, reduce }: { node: Node; reduce: boolean }) {
  const Icon = node.icon
  return (
    <motion.div
      className="absolute w-[210px]"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={
        reduce
          ? { opacity: 1, y: 0, scale: 1 }
          : {
              opacity: 1,
              y: [0, -node.float, 0],
              scale: 1,
            }
      }
      transition={
        reduce
          ? { duration: 0.6, ease: EASE }
          : {
              opacity: { duration: 0.7, ease: EASE, delay: node.delay },
              scale: { duration: 0.7, ease: EASE, delay: node.delay },
              y: {
                duration: 6 + node.float / 4,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: node.delay,
              },
            }
      }
    >
      <div className="rounded-2xl border border-ink-900/[0.07] bg-white/90 p-4 shadow-float backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl ${accentMap[node.accent]}`}
          >
            <Icon size={17} strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900">{node.label}</p>
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-900/40">
              {node.status}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function WorkflowCards() {
  const reduce = useReducedMotion() ?? false

  return (
    <div className="relative h-[420px] w-full select-none sm:h-[460px] lg:h-[520px]" aria-hidden>
      {/* connecting hairlines drawn behind the cards */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M14 14 C 40 14, 40 34, 56 36"
          stroke="url(#flowGrad)"
          strokeWidth="0.35"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
        />
        <motion.path
          d="M56 40 C 30 46, 24 52, 18 60"
          stroke="url(#flowGrad)"
          strokeWidth="0.35"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
        />
        <motion.path
          d="M20 64 C 46 70, 46 76, 58 80"
          stroke="url(#flowGrad)"
          strokeWidth="0.35"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.4 }}
        />
        <defs>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2E5CFF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#14B8A6" stopOpacity="0.55" />
          </linearGradient>
        </defs>
      </svg>

      {nodes.map((node) => (
        <Card key={node.label} node={node} reduce={reduce} />
      ))}
    </div>
  )
}
