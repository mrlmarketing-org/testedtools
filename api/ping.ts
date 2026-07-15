import type { VercelRequest, VercelResponse } from '@vercel/node'

// Diagnostic endpoint. No external imports, so it cannot fail at module load —
// if this responds 200 the latest deploy is live. Reports only whether the
// email env vars are PRESENT (booleans, never their values).
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    ok: true,
    marker: 'ping-v1',
    env: {
      RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
      RESEND_AUDIENCE_ID: Boolean(process.env.RESEND_AUDIENCE_ID),
      CONTACT_FROM: Boolean(process.env.CONTACT_FROM),
      CONTACT_TO: Boolean(process.env.CONTACT_TO),
    },
  })
}
