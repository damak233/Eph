import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    // minimális lekérdezés a whitelist táblára — csak count kell
    const { error, count } = await supabase
      .from('whitelist')
      .select('*', { count: 'exact', head: true })

    if (error) {
      return res.status(200).json({
        ok: false,
        stage: 'supabase-select',
        code: (error as any).code,
        message: error.message,
        details: (error as any).details ?? null,
      })
    }

    return res.status(200).json({
      ok: true,
      message: 'Supabase key működik.',
      count,
      urlStartsWith: (process.env.NEXT_PUBLIC_SUPABASE_URL || '').slice(0, 40),
      keyStartsWith: (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').slice(0, 16) + '…',
    })
  } catch (e: any) {
    return res.status(200).json({
      ok: false,
      stage: 'fatal',
      message: e?.message || String(e),
    })
  }
}
