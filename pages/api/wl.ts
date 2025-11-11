// /pages/api/wl.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseServer } from '../../lib/supabaseServer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method Not Allowed' })

  const { email, wallet, source } = req.body ?? {}
  if (!email || !wallet) return res.status(400).json({ ok: false, error: 'Missing email or wallet' })

  const { data, error } = await supabaseServer
    .from('whitelist')
    .insert({ email, wallet, source: source ?? 'api' })
    .select('*')
    .single()

  if (error) return res.status(400).json({ ok: false, error: error.message })
  return res.status(200).json({ ok: true, entry: data })
}
