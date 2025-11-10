import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method Not Allowed' });

  try {
    const { email, wallet } = (req.body ?? {}) as { email?: string; wallet?: string };
    if (!email || !wallet) return res.status(400).json({ ok: false, error: 'Missing fields' });

    const supabase = getSupabase();
    const { error } = await supabase.from('whitelist').insert({ email, wallet });
    if (error) return res.status(400).json({ ok: false, error: error.message });

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? 'server' });
  }
}
