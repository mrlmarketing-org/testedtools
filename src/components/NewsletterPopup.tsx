import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2, ArrowRight } from 'lucide-react'
import { EASE } from '../lib/motion'
import {
  POPUP_DELAY_MS,
  hasSeenNewsletter,
  markNewsletterSeen,
  useSubscribe,
} from '../lib/newsletter'

// Timed newsletter popup — appears once, a while after load, then remembers
// dismissal/subscription so it doesn't nag on return visits.
export default function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const { status, error, subscribe } = useSubscribe()

  // Schedule the appearance, unless the visitor has already seen it.
  useEffect(() => {
    if (hasSeenNewsletter()) return
    let cancelled = false

    const fire = () => {
      if (cancelled) return
      // Don't stack on top of another open modal (e.g. "Work with us");
      // that modal locks body scroll — wait and retry if so.
      if (document.body.style.overflow === 'hidden') {
        window.setTimeout(fire, 20_000)
        return
      }
      setOpen(true)
    }

    const t = window.setTimeout(fire, POPUP_DELAY_MS)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [])

  // Lock scroll + wire Escape while open.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function close() {
    markNewsletterSeen() // dismissing counts as "seen" — don't reshow soon
    setOpen(false)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    subscribe(new FormData(e.currentTarget).get('email'))
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="nl-popup-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-ink-900/[0.08] bg-paper shadow-[0_40px_100px_-20px_rgba(6,11,20,0.4)]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-900/50 transition-colors hover:bg-ink-900/[0.06] hover:text-ink-900"
            >
              <X size={18} />
            </button>

            {status === 'done' ? (
              <div className="flex flex-col items-center px-8 py-14 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-600">
                  <CheckCircle2 size={28} strokeWidth={2} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold text-ink-900">
                  You&rsquo;re on the list
                </h2>
                <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-900/60">
                  Occasional notes on what we&rsquo;re implementing — nothing else.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-8 rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-700"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="px-7 py-9 sm:px-9">
                <span className="eyebrow text-brand-600">Newsletter</span>
                <h2
                  id="nl-popup-title"
                  className="mt-4 font-display text-2xl font-semibold text-ink-900"
                >
                  Notes from the people doing the work.
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-900/60">
                  Occasional field notes on what we&rsquo;re implementing and what actually moves
                  the needle. No spam, no vendor pitches — unsubscribe anytime.
                </p>

                <form onSubmit={handleSubmit} className="mt-7">
                  <div className="flex items-center gap-2">
                    <input
                      name="email"
                      type="email"
                      required
                      autoFocus
                      aria-label="Email address"
                      placeholder="you@company.com"
                      disabled={status === 'loading'}
                      className="w-full rounded-full border border-ink-900/[0.12] bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-900/35 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15 disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      aria-label="Subscribe"
                      className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  {error && (
                    <p role="alert" className="mt-2 text-sm text-red-600">
                      {error}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={close}
                    className="mt-4 w-full text-center text-xs text-ink-900/45 transition-colors hover:text-ink-900/70"
                  >
                    No thanks
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
