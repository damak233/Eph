import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WALLET_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, wallet } = (req.body ?? {}) as { email?: string; wallet?: string }

  const ip = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '')
    .split(',')[0]
    .trim()
  const ua = String(req.headers['user-agent'] || '')

  if (!EMAIL_RE.test(String(email || ''))) {
    return res.status(400).json({ error: 'Invalid email' })
  }
  if (wallet && !WALLET_RE.test(String(wallet))) {
    return res.status(400).json({ error: 'Invalid Solana address' })
  }

  const since = new Date(Date.now() - 5 * 60 * 1000).toISOString()
  const { data: recent } = await supabase
    .from('whitelist')
    .select('id')
    .eq('ip', ip)
    .gte('created_at', since)

  if ((recent?.length ?? 0) > 3) {
    return res.status(429).json({ error: 'Too many attempts, try again later' })
  }

  const { data, error } = await supabase
    .from('whitelist')
    .insert([{ email: String(email).toLowerCase(), wallet: wallet || null, ip, ua, source: 'site' }])
    .select('status')
    .single()

  if (error) {
    if ((error as any).code === '23505') {
      return res.status(409).json({ error: 'This email is already registered' })
    }
    console.error(error)
    return res.status(500).json({ error: 'Database error' })
  }

  return res.status(200).json({ ok: true, status: data?.status })
}
