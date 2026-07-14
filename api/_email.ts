// Shared Resend client + env config for the serverless functions.
// The API key lives ONLY on the server (Vercel env var) — never shipped to the browser.
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

// From address. Until you verify a domain in Resend, this MUST be
// `onboarding@resend.dev` (Resend's shared sender). Once operatorstudio.ai is
// verified, set CONTACT_FROM to e.g. "OperatorStudio <hello@operatorstudio.ai>".
export const FROM = process.env.CONTACT_FROM || 'OperatorStudio <onboarding@resend.dev>'

// Where intake leads are delivered.
export const LEADS_TO = process.env.CONTACT_TO || 'eventsarbitrage@gmail.com'

export const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || ''

// Minimal, dependency-free email check — good enough to reject obvious junk.
export const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

// Escape user input before dropping it into an HTML email body.
export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string),
  )
