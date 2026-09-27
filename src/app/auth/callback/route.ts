import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Where Supabase's "Confirm signup" email link redirects to. The email
 * template's confirmation URL appends `?code=...`, which is exchanged
 * here for a real session so the person lands on /welcome already
 * signed in.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/welcome";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/join?error=confirmation_failed`);
}
