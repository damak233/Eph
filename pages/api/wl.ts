// /pages/api/wl.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'  // fontos: relatív elérési út!

type ReqBody = {
  email?: string
  wallet?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  try {
    const { email, wallet } = (req.body || {}) as ReqBody

    if (!email || !wallet) {
      return res.status(400).json({ ok: false, error: 'Missing email or wallet' })
    }

    // formátum ellenőrzés – basic Solana cím validáció
    const w = String(wallet).trim()
    if (w.length < 32 || w.length > 44) {
      return res.status(400).json({ ok: false, error: 'Invalid wallet format' })
    }

    // beszúrás Supabase-be
    const { data, error } = await supabase
      .from('whitelist')
      .insert([{ email, wallet: w }])
      .select('id, email, wallet, created_at')
      .single()

    if (error) {
      console.error('WL_INSERT_ERR', error)
      return res.status(500).json({ ok: false, error: error.message || 'Database insert failed' })
    }

    return res.status(200).json({ ok: true, data })
  } catch (err: any) {
    console.error('WL_API_FATAL', err)
    return res.status(500).json({ ok: false, error: err?.message || 'Unexpected error' })
  }
}
