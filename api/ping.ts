import type { VercelRequest, VercelResponse } from '@vercel/node'

// Diagnostic: import resend + the shared module at runtime, inside try/catch,
// and report exactly what fails (this is what the crashing subscribe function
// does at module load, but here the error is captured instead of crashing).
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const steps: Record<string, string> = {}

  try {
    const mod: any = await import('resend')
    steps.importResend = 'ok: exports=' + Object.keys(mod).join(',')
    try {
      const r = new mod.Resend(process.env.RESEND_API_KEY)
      steps.construct = r ? 'ok' : 'null'
    } catch (e: any) {
      steps.construct = 'ERR: ' + (e?.message || String(e))
    }
  } catch (e: any) {
    steps.importResend =
      'ERR: ' + (e?.message || String(e)) + ' || ' + (e?.stack?.split('\n').slice(0, 3).join(' | ') || '')
  }

  try {
    const em: any = await import('./_email')
    steps.importEmail = 'ok: exports=' + Object.keys(em).join(',')
  } catch (e: any) {
    steps.importEmail = 'ERR: ' + (e?.message || String(e))
  }

  res.status(200).json({ marker: 'ping-v2', steps })
}
