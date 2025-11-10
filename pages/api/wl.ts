import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // FONTOS: ez a service role kulcs
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { email, wallet } = req.body

    if (!email)
      return res.status(400).json({ error: 'Email is required' })

    // Solana-cím formátumellenőrzés
    if (wallet && !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(wallet))
      return res.status(400).json({ error: 'Invalid Solana address' })

    // Metaadatok (IP, user agent)
    const ip =
      req.headers['x-forwarded-for']?.toString().split(',')[0] ||
      req.socket.remoteAddress ||
      null
    const ua = req.headers['user-agent'] || null

    // ✅ csak beszúrunk, NINCS .select() (különben az RLS megfogja)
    const { error } = await supabase
      .from('whitelist')
      .insert([
        {
          email: String(email).toLowerCase(),
          wallet: wallet || null,
          ip,
          ua,
          source: 'site',
          status: 'pending', // trigger úgyis frissíti ha WL hely még van
        },
      ])

    if (error) {
      console.error('Supabase insert error:', error)
      return res.status(500).json({ error: 'Database error' })
    }

    // ✅ siker
    return res.status(200).json({ ok: true })
  } catch (err: any) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Unexpected server error' })
  }
}
