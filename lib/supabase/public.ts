import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cookie-free Supabase client for public, unauthenticated reads (storefront
 * pages, generateStaticParams). The cookie-aware client in server.ts calls
 * next/headers' cookies() — that forces any route touching it into dynamic
 * rendering, and generateStaticParams can't call cookies() at all (it runs
 * at build time, before any request/cookies exist). This client only ever
 * uses the public anon/publishable key, so it's exactly as safe at build
 * time as it is in the browser — and it's what actually lets the category
 * pages be statically generated the way they were designed to be.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
