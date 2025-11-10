// /pages/api/diag.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSupabase } from '../../lib/supabaseClient'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = getSupabase()

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const check = {
      ok: true,
      stage: 'env-check',
      url,
      url_ref: url?.split('//')[1]?.split('.')[0],
      anon_key_length: anon?.length,
      token_ref: anon?.split('.')[1]?.substring(0, 10),
      refs_match: url?.includes(url_ref || '') ? true : null,
      tip: 'Ha refs_match === false, akkor az URL és az ANON kulcs nem ugyanahhoz a projekthez tartozik.'
    }

    // Próbáljunk lekérdezni a whitelist táblából
    const { data, error } = await supabase.from('whitelist').select('*').limit(1)

    if (error) {
      return res.status(200).json({
        ok: false,
        stage: 'supabase-select',
        message: error.message,
        details: error.details ?? null
      })
    }

    return res.status(200).json({
      ok: true,
      stage: 'done',
      rows: data?.length ?? 0
    })
  } catch (err: any) {
    return res.status(200).json({
      ok: false,
      stage: 'exception',
      message: err?.message ?? String(err),
      details: null
    })
  }
}
