// /pages/api/diag-insert.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSupabase } from '../../lib/supabaseClient'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = getSupabase()

    // próba insert a `whitelist` táblába
    const { data, error } = await supabase
      .from('whitelist')
      .insert([{ email: 'diag@example.com', wallet: 'diag' }])
      .select()
      .single()

    if (error) {
      return res
        .status(200)
        .json({ ok: false, stage: 'supabase-insert', message: error.message, details: error.details ?? null })
    }

    return res.status(200).json({ ok: true, stage: 'done', id: data?.id ?? null })
  } catch (err: any) {
    return res
      .status(200)
      .json({ ok: false, stage: 'exception', message: err?.message ?? String(err), details: null })
  }
}
