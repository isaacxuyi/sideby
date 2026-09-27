/**
 * Normalizes a username the same way the mobile app's
 * ProfileService.normalizeHandle does, and the same way the
 * `handle_new_user` Postgres trigger does server-side: lowercase, spaces
 * become underscores, anything that isn't a-z/0-9/underscore is stripped,
 * and the result is prefixed with "@". Keeping this identical across
 * mobile, web, and the DB trigger means a username reserved on the
 * website is stored in exactly the shape the app expects later.
 */
export function normalizeUsername(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const withoutPrefix = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
  const normalized = withoutPrefix
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

  return normalized ? `@${normalized}` : "";
}

export const MIN_USERNAME_LENGTH = 3;
