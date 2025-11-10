// /pages/api/wl.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

type ReqBody = { email?: string; wallet?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const { email, wallet } = (req.body ?? {}) as ReqBody;

    if (!email && !wallet) {
      return res.status(400).json({ ok: false, error: 'Missing email or wallet' });
    }

    const { data, error } = await supabase
      .from('whitelist')
      .insert({ email, wallet })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ ok: false, stage: 'supabase-insert', error: error.message });
    }

    return res.status(200).json({ ok: true, data });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? 'Server error' });
  }
}
