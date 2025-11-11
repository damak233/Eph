import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseServer } from '../../lib/supabaseServer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  try {
    const { email, wallet } = req.body

    if (!email || !wallet) {
      return res.status(400).json({ ok: false, error: 'Missing fields' })
    }

    const { error } = await supabaseServer
      .from('whitelist')
      .insert([{ email, wallet }])

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    return res.status(200).json({ ok: true, message: 'Added to whitelist' })
  } catch (err: any) {
    console.error('API error:', err)
    return res.status(500).json({ ok: false, error: err.message || 'Unknown error' })
  }
}
