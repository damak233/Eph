// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// FONTOS: ezek az env változók legyenek beállítva Vercelben!
// NEXT_PUBLIC_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// MINDKÉT néven exportáljuk, hogy bárhonnan működjön
export { supabase }
export const supabaseClient = supabase
export default supabase
