// /pages/api/sbcheck.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const result: any = {
    url,
    key_len: key.length,
    key_start: key.slice(0, 10),
    key_end: key.slice(-10),
    rest_status: null,
    rest_body: null,
  };

  try {
    const r = await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: { apikey: key },
    });
    result.rest_status = r.status;
    try {
      result.rest_body = await r.json();
    } catch {
      result.rest_body = await r.text();
    }
  } catch (e: any) {
    result.rest_status = 'FETCH_ERROR';
    result.rest_body = e.message;
  }

  res.status(200).json(result);
}
