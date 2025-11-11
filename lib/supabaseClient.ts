// lib/supabaseServer.ts
import { createClient } from '@supabase/supabase-js'

// Ez a service_role kulccsal működik, csak szerver oldalon használd!
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseServer = createClient(url, serviceRole, {
  auth: { persistSession: false }
})
