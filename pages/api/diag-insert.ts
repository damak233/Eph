import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'   // <= EZ KELL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from('whitelist')
      .insert([{ email: 'diag@example.com', wallet: 'Diag' }])
      .select()
      .single()

    if (error) {
      return res.status(200).json({ ok: false, stage: 'supabase-insert', message: error.message, details: error })
    }

    return res.status(200).json({ ok: true, stage: 'supabase-insert', data })
  } catch (e: any) {
    return res.status(200).json({ ok: false, stage: 'catch', message: e?.message || String(e) })
  }
}
