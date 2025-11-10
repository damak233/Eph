// /pages/api/diag-env.ts
import type { NextApiRequest, NextApiResponse } from 'next'

function decodeJwtPayload(jwt: string) {
  try {
    const [, payload] = jwt.split('.')
    const json = Buffer.from(payload, 'base64').toString('utf8')
    return JSON.parse(json)
  } catch {
    return null
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const hostRef = url.replace('https://', '').split('.')[0] || null
  const payload = anon ? decodeJwtPayload(anon) : null
  const tokenRef = payload?.ref ?? payload?.project_id ?? null

  res.status(200).json({
    ok: Boolean(url && anon),
    stage: 'env-check',
    url,
    url_ref: hostRef,
    anon_key_length: anon.length,
    token_ref: tokenRef,
    refs_match: hostRef && tokenRef ? hostRef === tokenRef : null,
    tip: 'Ha refs_match === false, akkor az URL és az ANON kulcs nem ugyanahhoz a projekthez tartozik.',
  })
}
