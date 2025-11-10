// /pages/api/diag-raw.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const rest = url ? `${url}/rest/v1` : ''

  if (!url || !anon) {
    return res.status(500).json({ ok: false, stage: 'raw', message: 'Missing env vars' })
  }

  try {
    const r = await fetch(`${rest}/whitelist?select=count`, {
      headers: {
        apikey: anon,
        Authorization: `Bearer ${anon}`,
        Accept: 'application/json',
        Prefer: 'count=exact',
      },
    })

    const text = await r.text()
    let body: any = null
    try { body = JSON.parse(text) } catch { body = text }

    return res.status(200).json({
      ok: r.ok,
      stage: 'raw',
      status: r.status,
      statusText: r.statusText,
      body,
    })
  } catch (e: any) {
    return res.status(500).json({ ok: false, stage: 'raw', error: String(e?.message || e) })
  }
}
