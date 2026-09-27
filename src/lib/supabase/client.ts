"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use inside Client Components (forms, availability
 * checks, etc.). Create a fresh one per call site rather than sharing a
 * module-level singleton — that's the pattern @supabase/ssr expects.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
