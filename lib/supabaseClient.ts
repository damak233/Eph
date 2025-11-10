// /lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Diagnosztika: NE logoljunk teljes kulcsot, csak hosszát
console.log(
  'SUPA_ENV',
  { urlOk: !!url, anonLen: anon ? anon.length : 0 }
)

if (!url) {
  throw new Error('Supabase URL missing (NEXT_PUBLIC_SUPABASE_URL)')
}
if (!anon) {
  throw new Error('Supabase anon key missing (NEXT_PUBLIC_SUPABASE_ANON_KEY)')
}

export const supabase = createClient(url, anon)
