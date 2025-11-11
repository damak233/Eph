import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase.from('whitelist').select('id').limit(1)
  if (error) {
    return res.status(500).json({ ok: false, stage: 'health', error: error.message })
  }
  return res.status(200).json({ ok: true, stage: 'health', rows: data?.length ?? 0 })
}
