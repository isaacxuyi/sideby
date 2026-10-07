import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // admin.sideby.org → serve the review queue
  if (host.startsWith("admin.")) {
    // Allow login, auth callback, and Next internals through untouched
    const passthrough =
      pathname.startsWith("/login") ||
      pathname.startsWith("/auth") ||
      pathname.startsWith("/admin");

    if (!passthrough) {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/" ? "/admin/review" : "/admin/review";
      const rewritten = NextResponse.rewrite(url);
      // keep the refreshed Supabase cookies on the rewritten response
      const session = await updateSession(request);
      session.cookies.getAll().forEach((c) => rewritten.cookies.set(c));
      return rewritten;
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    // Skip static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};