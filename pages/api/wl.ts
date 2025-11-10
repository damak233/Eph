// /pages/api/wl.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSupabase } from '../../lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  try {
    const supabase = getSupabase()
    const { wallet } = req.body

    if (!wallet) {
      return res.status(400).json({ ok: false, error: 'Missing wallet address' })
    }

    const { data, error } = await supabase
      .from('whitelist')
      .insert([{ wallet }])
      .select()

    if (error) {
      return res.status(400).json({ ok: false, error: error.message })
    }

    return res.status(200).json({ ok: true, data })
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err?.message ?? 'Unknown error' })
  }
}
