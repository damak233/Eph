// /pages/api/diag.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

type Diag = {
  ok: boolean
  stage: 'env' | 'supabase-select' | 'raw'
  url: string | null
  keyKind: 'jwt-legacy' | 'sb-publishable' | 'unknown'
  status?: number
  statusText?: string
  body?: any
  tip?: string
  note?: string
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Diag>
) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? null

  if (!url || !key) {
    return res.status(200).json({
      ok: false,
      stage: 'env',
      url,
      keyKind: 'unknown',
      tip: 'Hiányzik a NEXT_PUBLIC_SUPABASE_URL vagy a NEXT_PUBLIC_SUPABASE_ANON_KEY a Vercel környezeti változók között.',
      note:
        'Project Settings → Environment Variables: mindkettő legyen beállítva Production/Preview/Development-ra, majd Redeploy.',
    })
  }

  const keyKind = key.startsWith('sb_')
    ? 'sb-publishable'
    : key.split('.').length === 3
    ? 'jwt-legacy'
    : 'unknown'

  // Valódi próbahívás: ha 401, akkor tényleg rossz a key vagy az URL.
  try {
    const client = createClient(url, key)
    // egy publikus, RLS-sel védett tábla (pl. whitelist) próbálkozás READ-del
    const { error } = await client.from('whitelist').select('*').limit(1)

    if (error) {
      // a supabase-js errorból HTTP státuszt nem mindig kapunk vissza,
      // ezért leküldünk egy nyers REST hívást is headerrel, hogy legyen biztos kód.
      const r = await fetch(`${url}/rest/v1/whitelist?select=id&limit=1`, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: 'count=exact',
        },
      })

      if (!r.ok) {
        const body = await r.json().catch(() => null)
        return res.status(200).json({
          ok: false,
          stage: 'raw',
          url,
          keyKind,
          status: r.status,
          statusText: r.statusText,
          body,
          tip:
            r.status === 401
              ? 'Unauthorized (401): Dupla-ellenőrzés: biztosan ehhez a projekthez tartozik az URL és a kulcs?'
              : 'A REST hívás sem sikerült. Ellenőrizd az URL-t és a kulcsot.',
          note:
            "Ha új (sb_publishable_...) kulcsot használsz, az jó — csak az URL-nek is ugyanahhoz a projekthez kell tartoznia.",
        })
      }

      // REST szerint oké, akkor a js-kliens hibája volt nem halálos
      return res.status(200).json({
        ok: true,
        stage: 'raw',
        url,
        keyKind,
        status: 200,
        statusText: 'OK',
        body: null,
        tip: 'A REST próbahívás sikerült, az URL+KEY páros jó.',
        note:
          'Ha a frontend mégsem működik, akkor RLS/policy vagy API route kód gond lesz, nem a kulcs.',
      })
    }

    // supabase-js select is oké
    return res.status(200).json({
      ok: true,
      stage: 'supabase-select',
      url,
      keyKind,
      tip: 'Minden rendben az URL+KEY párossal.',
      note:
        'Ha a WL űrlap még hibázik, akkor az API route (/api/wl) vagy a táblapolicy lehet a ludas.',
    })
  } catch (e: any) {
    return res.status(200).json({
      ok: false,
      stage: 'supabase-select',
      url,
      keyKind,
      tip: 'Váratlan hiba a próbahívás közben.',
      note: String(e?.message ?? e),
    })
  }
}
