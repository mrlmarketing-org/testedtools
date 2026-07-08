import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { industries } from '../data/content'
import { EASE } from '../lib/motion'

interface Props {
  open: boolean
  onClose: () => void
}

const fieldClass =
  'w-full rounded-xl border border-ink-900/[0.12] bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/35 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15'

export default function WorkWithUsDialog({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false)

  // Reset to the form each time the dialog opens; lock scroll + wire Escape.
  useEffect(() => {
    if (!open) return
    setSubmitted(false)
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: wire to a form endpoint / email service (e.g. Resend) — nothing is sent yet.
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wwu-title"
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-ink-900/[0.08] bg-paper shadow-[0_40px_100px_-20px_rgba(6,11,20,0.4)]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-900/50 transition-colors hover:bg-ink-900/[0.06] hover:text-ink-900"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center px-8 py-14 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-600">
                  <CheckCircle2 size={28} strokeWidth={2} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold text-ink-900">
                  Request sent
                </h2>
                <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-900/60">
                  Thanks — we&rsquo;ll come back with what we&rsquo;d choose, implement, and
                  (depending on scope) build for your use case. No vendor pitches.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-700"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="px-7 py-8 sm:px-9">
                <span className="eyebrow text-brand-600">Work with us</span>
                <h2 id="wwu-title" className="mt-4 font-display text-2xl font-semibold text-ink-900">
                  Let&rsquo;s choose and implement the right AI for you.
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-900/60">
                  Tell us about your business and where you&rsquo;re stuck. We&rsquo;ll come back
                  with what we&rsquo;d choose, implement, and — depending on scope — build for your
                  specific use case. No vendor pitches.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div>
                    <label htmlFor="wwu-name" className="mb-1.5 block text-sm font-medium text-ink-900">
                      Business name
                    </label>
                    <input
                      id="wwu-name"
                      name="business"
                      type="text"
                      required
                      autoFocus
                      placeholder="Acme Property Group"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="wwu-industry"
                      className="mb-1.5 block text-sm font-medium text-ink-900"
                    >
                      Industry
                    </label>
                    <select id="wwu-industry" name="industry" required defaultValue="" className={fieldClass}>
                      <option value="" disabled>
                        Select your industry…
                      </option>
                      {industries.map((ind) => (
                        <option key={ind.id} value={ind.name}>
                          {ind.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="wwu-email" className="mb-1.5 block text-sm font-medium text-ink-900">
                      Work email
                    </label>
                    <input
                      id="wwu-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="wwu-problem" className="mb-1.5 block text-sm font-medium text-ink-900">
                      What are you trying to solve?
                    </label>
                    <textarea
                      id="wwu-problem"
                      name="problem"
                      required
                      rows={4}
                      placeholder="The issues you're facing, or where you think AI could help your business…"
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(46,92,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
                  >
                    Send request
                  </button>
                  <p className="text-center text-xs text-ink-900/45">
                    We&rsquo;ll only use this to scope the right approach and follow up — no spam.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
