import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getResend, FROM, LEADS_TO, isEmail, esc } from './_email'

// POST /api/contact — receives the "Work with us" intake form and emails the lead.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email is not configured on the server.' })
  }

  const { business, industry, email, problem } = (req.body ?? {}) as Record<string, unknown>

  // Validate — keep messages generic so we don't leak which field failed to bots.
  if (
    typeof business !== 'string' || !business.trim() ||
    typeof industry !== 'string' || !industry.trim() ||
    !isEmail(email) ||
    typeof problem !== 'string' || !problem.trim()
  ) {
    return res.status(400).json({ error: 'Please fill in all fields with a valid email.' })
  }

  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: LEADS_TO,
      replyTo: email, // hitting "reply" in your inbox replies to the prospect
      subject: `New lead: ${business.trim()} — ${industry.trim()}`,
      html: `
        <h2>New work-with-us request</h2>
        <p><strong>Business:</strong> ${esc(business.trim())}</p>
        <p><strong>Industry:</strong> ${esc(industry.trim())}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Problem:</strong></p>
        <p style="white-space:pre-wrap">${esc(problem.trim())}</p>
      `,
    })

    if (error) {
      console.error('Resend error (contact):', error)
      return res.status(502).json({ error: 'Could not send your request. Please try again.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Unexpected error (contact):', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
