import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '@/lib/supabaseClient';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const url  = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const info = {
      ok: true,
      stage: 'env',
      url,
      url_ref: url.split('https://')[1]?.split('.')[0] ?? null,
      anon_key_length: anon.length,
    };

    // próba select (csak 1 sor), hogy a kulcs tényleg él-e
    const supabase = getSupabase();
    const { error } = await supabase.from('whitelist').select('*').limit(1);
    if (error) return res.status(401).json({ ok: false, stage: 'supabase-select', message: error.message });

    return res.status(200).json(info);
  } catch (e: any) {
    return res.status(500).json({ ok: false, stage: 'catch', message: e?.message ?? 'server' });
  }
}
