import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Privileged, server-only Supabase client using the secret key (bypasses
 * Row Level Security entirely). NEVER import this into a Client Component
 * or expose SUPABASE_SECRET_KEY to the browser — it's deliberately not
 * prefixed with NEXT_PUBLIC_.
 *
 * Used only for OTP generation/verification: those checks must not be
 * readable via the public anon-key client, or anyone could query the table
 * directly and read a valid code without ever receiving the SMS.
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SECRET_KEY) return null;
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY,
    { auth: { persistSession: false } }
  );
}
