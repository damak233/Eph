// /pages/api/wl.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

type ReqBody = { email?: string; wallet?: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  try {
    const { email, wallet } = (req.body || {}) as ReqBody

    if (!email || !wallet) {
      return res.status(400).json({ ok: false, error: 'Missing email or wallet' })
    }

    // minimális formátumellenőrzés
    const w = String(wallet).trim()
    if (w.length < 32 || w.length > 44) {
      return res.status(400).json({ ok: false, error: 'Invalid wallet format' })
    }

    // beszúrás RLS-sel (role: anon)
    const { data, error } = await supabase
      .from('whitelist')
      .insert([{ email, wallet: w }])
      .select('id,status,created_at')
      .single()

    if (error) {
      // Részletes log a Vercelben
      console.error('WL_INSERT_ERR', { code: error.code, message: error.message, details: error.details })
      return res.status(500).json({ ok: false, error: error.message || 'Insert failed' })
    }

    return res.status(200).json({ ok: true, data })
  } catch (e: any) {
    console.error('WL_API_FATAL', { message: e?.message })
    // Ha itt “Invalid API key” jön, azt így is JSON-ként kapja meg a frontend
    return res.status(500).json({ ok: false, error: e?.message || 'Unexpected error' })
  }
}
