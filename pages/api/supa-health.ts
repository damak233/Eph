// /pages/api/supa-health.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseServer } from '../../lib/supabaseServer'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabaseServer.from('whitelist').select('id').limit(1)
  return res.status(error ? 500 : 200).json({ ok: !error, error: error?.message, sample: data })
}
