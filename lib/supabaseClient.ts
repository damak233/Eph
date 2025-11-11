// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// ⛳️ Kötelezően legyenek ezek az ENV-ek Vercelben is:
// NEXT_PUBLIC_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Mindkét néven exportálom, hogy akár régi import is működjön
export const supabase = client
export const supabaseClient = client
export default client
