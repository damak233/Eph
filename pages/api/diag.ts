// /pages/api/diag.ts
import type { NextApiRequest, NextApiResponse } from 'next';

function decodeRefFromAnon(jwt?: string) {
  try {
    if (!jwt) return null;
    const [, payload] = jwt.split('.');
    if (!payload) return null;
    const json = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
    return json?.ref ?? null;
  } catch {
    return null;
  }
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const urlRef = url.split('https://')[1]?.split('.')[0] || null;
  const tokenRef = decodeRefFromAnon(anon);

  res.status(200).json({
    ok: Boolean(url && anon),
    url,
    urlRef,
    anon_key_length: anon.length,
    tokenRef,
    refsMatch: urlRef && tokenRef ? urlRef === tokenRef : null,
    note:
      'Ha refsMatch = false, akkor az URL és az anon key két külön Supabase projekthez tartozik.',
  });
}
