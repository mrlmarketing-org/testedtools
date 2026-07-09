import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Radio, ShieldCheck, LineChart, TriangleAlert } from 'lucide-react'
import { SiGmail, SiHubspot } from 'react-icons/si'
import { EASE } from '../../lib/motion'

type Note = { title: string; sub: string; time: string; chip: ReactNode }

// iOS-style app-icon chips.
function Tile({ bg, color, children }: { bg: string; color?: string; children: ReactNode }) {
  return (
    <span
      className="grid h-7 w-7 flex-none place-items-center rounded-[8px]"
      style={{ background: bg, color }}
    >
      {children}
    </span>
  )
}

// Results streamed by the pipeline — cycled into the feed newest-first.
const POOL: Note[] = [
  {
    title: '1,000 events found',
    sub: 'Ingest · autopilot',
    time: 'now',
    chip: (
      <Tile bg="linear-gradient(135deg,#2E5CFF,#1F45E6)" color="#fff">
        <Radio size={16} strokeWidth={2} />
      </Tile>
    ),
  },
  {
    title: 'System online',
    sub: '99.9% uptime · monitored',
    time: 'now',
    chip: (
      <Tile bg="linear-gradient(135deg,#14B8A6,#0D9488)" color="#fff">
        <ShieldCheck size={16} strokeWidth={2} />
      </Tile>
    ),
  },
  {
    title: 'Routed to team',
    sub: 'Notify · via Gmail',
    time: '1m',
    chip: (
      <Tile bg="#fff" color="#EA4335">
        <SiGmail size={16} />
      </Tile>
    ),
  },
  {
    title: '42 records synced',
    sub: 'HubSpot CRM',
    time: '2m',
    chip: (
      <Tile bg="#fff" color="#FF7A59">
        <SiHubspot size={17} />
      </Tile>
    ),
  },
  {
    title: 'Report ready',
    sub: 'This week · +18%',
    time: '5m',
    chip: (
      <Tile bg="linear-gradient(135deg,#5C82FF,#2E5CFF)" color="#fff">
        <LineChart size={16} strokeWidth={2} />
      </Tile>
    ),
  },
  {
    title: 'Anomaly flagged',
    sub: 'Escalated for review',
    time: '6m',
    chip: (
      <Tile bg="linear-gradient(135deg,#F59E0B,#D97706)" color="#fff">
        <TriangleAlert size={15} strokeWidth={2} />
      </Tile>
    ),
  },
]

const MAX_VISIBLE = 4

function NoteCard({ note }: { note: Note }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -22, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-2 py-2 backdrop-blur-sm"
    >
      {note.chip}
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[11px] font-semibold text-white">{note.title}</span>
        <span className="block truncate text-[9px] text-white/50">{note.sub}</span>
      </span>
      <span className="flex-none font-mono text-[9px] text-white/35">{note.time}</span>
    </motion.div>
  )
}

export default function PhoneFeed({ reduce }: { reduce: boolean }) {
  const [items, setItems] = useState(() =>
    POOL.slice(0, 3).map((n, i) => ({ ...n, key: i })),
  )
  const counter = useRef(POOL.length)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setItems((prev) => {
        const src = POOL[counter.current % POOL.length]
        const next = { ...src, time: 'now', key: counter.current + 100 }
        counter.current += 1
        // re-stamp the previous newest so times feel like they age
        return [next, ...prev].slice(0, MAX_VISIBLE)
      })
    }, 2600)
    return () => clearInterval(id)
  }, [reduce])

  const shown = reduce ? POOL.slice(0, MAX_VISIBLE).map((n, i) => ({ ...n, key: i })) : items

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-ink-900 to-ink-950 px-3 pt-2.5">
      {/* Status bar */}
      <div className="flex items-center justify-between px-1 font-mono text-[9px] text-white/55">
        <span>5G</span>
        <span className="tracking-widest">● ● ●</span>
      </div>

      {/* Lock-screen header */}
      <div className="mt-4 mb-3 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
          operatorstudio.ai
        </p>
        <p className="mt-1 font-display text-[2.4rem] font-semibold leading-none text-white/90">
          9:41
        </p>
      </div>

      {/* Notification stack */}
      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {shown.map((n) => (
            <NoteCard key={n.key} note={n} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
