import { type FormEvent } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useSubscribe } from '../lib/newsletter'

// Compact newsletter signup — posts to /api/subscribe (Resend Audience).
export default function NewsletterForm() {
  const { status, error, subscribe } = useSubscribe()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    subscribe(new FormData(e.currentTarget).get('email'))
  }

  return (
    <div className="max-w-sm">
      <h4 className="eyebrow text-ink-900/40">Newsletter</h4>
      <p className="mt-4 text-sm leading-relaxed text-ink-900/55">
        Occasional notes on what we&rsquo;re implementing and what actually moves the needle. No spam.
      </p>

      {status === 'done' ? (
        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-teal-600">
          <CheckCircle2 size={16} strokeWidth={2.2} />
          You&rsquo;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center gap-2">
            <input
              name="email"
              type="email"
              required
              aria-label="Email address"
              placeholder="you@company.com"
              disabled={status === 'loading'}
              className="w-full rounded-full border border-ink-900/[0.12] bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/35 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-label="Subscribe"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brand-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <ArrowRight size={18} />
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  )
}
