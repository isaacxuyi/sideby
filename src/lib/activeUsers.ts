/**
 * Total "active users" shown on the site = every row in public.profiles.
 *
 * Calls the read-only Postgres function `get_active_user_count()` through
 * Supabase's REST endpoint using the public anon key. The result is cached
 * for 60 seconds so page traffic doesn't hit the database on every view.
 * Returns null if anything fails, so the UI can simply hide the counter.
 */
export async function getActiveUserCount(): Promise<number | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const res = await fetch(`${url}/rest/v1/rpc/get_active_user_count`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: "{}",
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const count = await res.json();
    return typeof count === "number" ? count : null;
  } catch {
    return null;
  }
}