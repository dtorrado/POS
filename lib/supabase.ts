import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    'Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY environment variables.'
  );
}

// Server-side only. Never import this into a client component — the
// service role key bypasses Row Level Security entirely, which is fine
// here because it's only ever used inside API routes (server runtime),
// never sent to the browser.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});
