import type { VercelRequest, VercelResponse } from '@vercel/node'
import { resend, AUDIENCE_ID, isEmail } from './_email'

// POST /api/subscribe — adds an email to the Resend newsletter Audience.
// Create an Audience in the Resend dashboard, then set RESEND_AUDIENCE_ID.
// Send issues later via Resend → Broadcasts (no code needed).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY || !AUDIENCE_ID) {
    return res.status(500).json({ error: 'Newsletter is not configured on the server.' })
  }

  const { email } = (req.body ?? {}) as Record<string, unknown>
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  try {
    const { error } = await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    })

    // Resend returns an error for a duplicate contact — treat that as success
    // so re-subscribing looks fine to the visitor.
    if (error && !/already exists/i.test(error.message ?? '')) {
      console.error('Resend error (subscribe):', error)
      return res.status(502).json({ error: 'Could not subscribe. Please try again.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Unexpected error (subscribe):', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
