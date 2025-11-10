// /pages/api/diag.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error, status } = await supabase
      .from('whitelist')
      .select('id')
      .limit(1)

    if (error) {
      return res.status(200).json({
        ok: false,
        stage: 'supabase-select',
        message: error.message,
        details: error.details ?? null,
        hint: (error as any).hint ?? null,
        code: (error as any).code ?? null,
        status,
      })
    }

    return res.status(200).json({ ok: true, count: data?.length ?? 0 })
  } catch (e: any) {
    return res.status(200).json({ ok: false, stage: 'catch', message: e?.message || String(e) })
  }
}
