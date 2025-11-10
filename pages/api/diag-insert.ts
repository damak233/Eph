import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Egyedi, érvényes adatok, hogy ne ütközzön az egyediség ellenőrzéssel
  const email = `diag+${Date.now()}@example.com`
  const wallet = '1'.repeat(42) + String((Date.now() % 8) + 1) // 43-44 hossz, csak Base58 engedett karakterek

  const { data, error } = await supabase
    .from('whitelist')
    .insert({ email, wallet, status: 'pending', source: 'diag' })
    .select()

  if (error) {
    return res.status(200).json({
      ok: false,
      message: error.message,
      details: (error as any).details ?? null,
    })
  }

  return res.status(200).json({ ok: true, row: data?.[0] })
}
