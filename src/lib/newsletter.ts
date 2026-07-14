import { useState } from 'react'

// How long after load the newsletter popup appears. The user asked for
// "a few minutes"; tune here (30–60s converts better if you want more signups).
export const POPUP_DELAY_MS = 90_000 // 1.5 min

// Once someone dismisses or subscribes we remember it and don't nag again
// until this window passes (classic "regular site" behaviour).
const RESHOW_AFTER_MS = 30 * 24 * 60 * 60 * 1000 // 30 days
const SEEN_KEY = 'os_newsletter_seen'

// True if the visitor has recently dismissed/subscribed — suppresses the popup.
export function hasSeenNewsletter(): boolean {
  try {
    const raw = localStorage.getItem(SEEN_KEY)
    if (!raw) return false
    const ts = Number(raw)
    if (!Number.isFinite(ts)) return true
    return Date.now() - ts < RESHOW_AFTER_MS
  } catch {
    return false // storage blocked (e.g. private mode) — fail open, still show
  }
}

// Record that the visitor has seen it (dismissed OR subscribed, anywhere).
export function markNewsletterSeen(): void {
  try {
    localStorage.setItem(SEEN_KEY, String(Date.now()))
  } catch {
    /* ignore */
  }
}

export type SubscribeStatus = 'idle' | 'loading' | 'done'

// Shared newsletter-subscribe logic used by both the footer form and the popup.
export function useSubscribe() {
  const [status, setStatus] = useState<SubscribeStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  async function subscribe(email: FormDataEntryValue | null): Promise<boolean> {
    setError(null)
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(body?.error || 'Could not subscribe. Please try again.')
      }
      setStatus('done')
      markNewsletterSeen() // subscribing counts as "seen" everywhere
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('idle')
      return false
    }
  }

  return { status, error, subscribe }
}
