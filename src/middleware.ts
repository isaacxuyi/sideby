import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  const isAdminHost = host.startsWith("admin.");
  const passthrough =
    pathname.startsWith("/login") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/admin");

  let response: NextResponse;

  if (isAdminHost && !passthrough) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/review";
    response = NextResponse.rewrite(url);
  } else {
    response = NextResponse.next({ request });
  }

  try {
    const session = await updateSession(request);
    session.cookies.getAll().forEach((c) => response.cookies.set(c));
  } catch (err) {
    console.error("middleware updateSession failed:", err);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};