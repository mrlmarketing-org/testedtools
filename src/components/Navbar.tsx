import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { EASE } from '../lib/motion'
import { BOOKING_URL } from '../lib/config'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
]

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 text-ink-900">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect width="32" height="32" rx="7" fill="#0A1424" />
        <path
          d="M8 16.5l4.8 4.8L23.5 10.5"
          stroke="#2E5CFF"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24.5" cy="8" r="1.8" fill="#2DD4BF" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight">
        testedtools<span className="text-brand-600">.ai</span>
      </span>
    </a>
  )
}

// Dark CTA pill, à la the reference's "Join for free".
function CtaPill({ className = '' }: { className?: string }) {
  return (
    <a
      href={BOOKING_URL}
      className={`inline-flex items-center justify-center rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-ink-700 ${className}`}
    >
      Book a call
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x relative pt-3 md:pt-4">
        {/* Floating frosted capsule */}
        <nav
          className={`flex h-14 items-center justify-between gap-4 rounded-full border border-ink-900/[0.07] pl-5 pr-2 backdrop-blur-xl transition-all duration-500 ease-smooth ${
            scrolled
              ? 'bg-white/80 shadow-[0_12px_36px_-10px_rgba(10,20,36,0.24)]'
              : 'bg-white/70 shadow-[0_10px_30px_-12px_rgba(10,20,36,0.18)]'
          }`}
        >
          <Logo />

          {/* Center links */}
          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-900/65 transition-colors hover:text-ink-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right action */}
          <div className="hidden md:flex">
            <CtaPill />
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu — matching floating panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute inset-x-0 top-full z-40 mt-2 origin-top rounded-3xl border border-ink-900/[0.08] bg-white/90 p-3 shadow-[0_20px_50px_-16px_rgba(10,20,36,0.28)] backdrop-blur-xl md:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <div className="flex flex-col">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-ink-900/80 transition-colors hover:bg-paper-100 hover:text-ink-900"
                  >
                    {link.label}
                  </a>
                ))}
                <CtaPill className="mt-2 w-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
