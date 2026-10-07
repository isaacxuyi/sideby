"use client";

import { createClient } from "@/lib/supabase/client";

/**
 * Data layer for the admin review queue — a port of
 * admin_review_queue_service.dart. Same queries, same RPCs. RLS and the
 * resolve_* RPCs are the real backstop; the page gate is just UX.
 *
 * Row -> item mapping mirrors models.dart. The only remaining assumption is
 * the profiles(id, name) lookup (ProfileService wasn't available), marked VERIFY.
 */

export const SLA_MS = 24 * 3600_000;
export const SLA_AT_RISK_MS = 18 * 3600_000;

export type TargetType = "forum_post" | "forum_comment" | "split" | string;

export interface FlaggedItem {
  targetType: "forum_post" | "forum_comment";
  targetId: string;
  moderationStatus: "flagged" | "hidden";
  authorName: string;
  title: string;
  preview: string;
  categories: string[];
  checkedAt: string | null;
}

export interface ReportItem {
  id: string;
  targetType: TargetType;
  targetId: string;
  reason: string;
  details: string | null;
  createdAt: string;
  reporterId: string;
  reportedUserId: string;
  targetPreview: string;
  targetAuthorName: string;
}

export interface AppealItem {
  id: string;
  targetType: TargetType;
  targetId: string;
  appellantId: string;
  message: string;
  createdAt: string;
  contentSnapshot: string;
  categories: string[];
  severity: string | null;
  issuedBy: string | null;
}

export interface SlaStats {
  openTotal: number;
  atRisk: number;
  breached: number;
  slaHitRate7d: number | null;
  medianHours7d: number | null;
  p90Hours7d: number | null;
  openFlags: number;
  openReports: number;
  openAppeals: number;
}

type Row = Record<string, any>;

function fail(e: { message: string } | null): never {
  throw new Error(e?.message ?? "Something went wrong.");
}

const arr = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);

export async function fetchFlaggedContent(): Promise<FlaggedItem[]> {
  const sb = createClient();
  const q = (table: string) =>
    sb
      .from(table)
      .select()
      .in("moderation_status", ["flagged", "hidden"])
      .is("moderation_reviewed_at", null)
      .order("moderation_checked_at", { ascending: true });

  const [posts, comments] = await Promise.all([q("forum_posts"), q("forum_comments")]);
  if (posts.error) fail(posts.error);
  if (comments.error) fail(comments.error);

  const items: FlaggedItem[] = [
    ...(posts.data as Row[]).map((r): FlaggedItem => ({
      targetType: "forum_post",
      targetId: String(r.id),
      moderationStatus: r.moderation_status,
      authorName: r.author_name ?? "Neighbor",
      title: r.title ?? "",
      preview: r.body ?? "",
      categories: arr(r.moderation_categories),
      checkedAt: r.moderation_checked_at ?? null,
    })),
    ...(comments.data as Row[]).map((r): FlaggedItem => ({
      targetType: "forum_comment",
      targetId: String(r.id),
      moderationStatus: r.moderation_status,
      authorName: r.author_name ?? "Neighbor",
      title: "",
      preview: r.content ?? "",
      categories: arr(r.moderation_categories),
      checkedAt: r.moderation_checked_at ?? null,
    })),
  ];

  // Oldest first; nulls last (same as the Dart sort).
  items.sort((a, b) => {
    if (!a.checkedAt && !b.checkedAt) return 0;
    if (!a.checkedAt) return 1;
    if (!b.checkedAt) return -1;
    return a.checkedAt.localeCompare(b.checkedAt);
  });
  return items;
}

export async function fetchOpenReports(): Promise<ReportItem[]> {
  const sb = createClient();
  const { data, error } = await sb
    .from("content_reports")
    .select()
    .eq("status", "open")
    .order("created_at", { ascending: true });
  if (error) fail(error);

  const rows = data as Row[];
  const ids = (type: string) => [
    ...new Set(rows.filter((r) => r.target_type === type).map((r) => String(r.target_id))),
  ];
  const postIds = ids("forum_post");
  const commentIds = ids("forum_comment");

  const posts: Record<string, Row> = {};
  const comments: Record<string, Row> = {};

  if (postIds.length) {
    const res = await sb.from("forum_posts").select("id, title, body, author_name").in("id", postIds);
    if (res.error) fail(res.error);
    for (const r of res.data as Row[]) posts[String(r.id)] = r;
  }
  if (commentIds.length) {
    const res = await sb.from("forum_comments").select("id, content, author_name").in("id", commentIds);
    if (res.error) fail(res.error);
    for (const r of res.data as Row[]) comments[String(r.id)] = r;
  }

  return rows.map((r): ReportItem => {
    const targetId = String(r.target_id);
    let targetPreview = "";
    let targetAuthorName = "";
    if (r.target_type === "forum_post" && posts[targetId]) {
      const p = posts[targetId];
      targetPreview = p.title ? `${p.title} — ${p.body ?? ""}` : p.body ?? "";
      targetAuthorName = p.author_name ?? "";
    } else if (r.target_type === "forum_comment" && comments[targetId]) {
      targetPreview = comments[targetId].content ?? "";
      targetAuthorName = comments[targetId].author_name ?? "";
    }
    return {
      id: String(r.id),
      targetType: r.target_type,
      targetId,
      reason: r.reason ?? "Something else",
      details: r.details ?? null,
      createdAt: r.created_at,
      reporterId: r.reporter_id ?? "",
      reportedUserId: r.reported_user_id ?? "",
      targetPreview,
      targetAuthorName,
    };
  });
}

export async function fetchOpenAppeals(): Promise<AppealItem[]> {
  const sb = createClient();
  const { data, error } = await sb
    .from("moderation_appeals")
    .select("*, moderation_strikes(content_snapshot, categories, severity, issued_by)")
    .eq("status", "open")
    .order("created_at", { ascending: true });
  if (error) fail(error);

  return (data as Row[]).map((r): AppealItem => {
    const s: Row = r.moderation_strikes ?? {};
    return {
      id: String(r.id),
      targetType: r.target_type ?? "",
      targetId: String(r.target_id ?? ""),
      appellantId: r.appellant_id ?? "",
      message: r.message ?? "",
      createdAt: r.created_at,
      contentSnapshot: s.content_snapshot ?? "",
      categories: arr(s.categories),
      severity: s.severity ?? "standard",
      issuedBy: s.issued_by ?? null,
    };
  });
}

/** id -> display name. VERIFY: assumes profiles(id, name). */
export async function fetchProfileNames(ids: Iterable<string>): Promise<Record<string, string>> {
  const list = [...new Set([...ids].filter(Boolean))];
  if (!list.length) return {};
  const { data, error } = await createClient().from("profiles").select("id, name").in("id", list);
  if (error) return {}; // names are cosmetic; don't fail the whole tab
  return Object.fromEntries((data as Row[]).map((p) => [String(p.id), p.name ?? ""]));
}

export async function fetchSlaStats(): Promise<SlaStats> {
  const { data, error } = await createClient().rpc("admin_moderation_sla_stats");
  if (error) fail(error);
  const m = data as Row;
  const n = (k: string) => Number(m[k] ?? 0);
  const f = (k: string) => (m[k] == null ? null : Number(m[k]));
  return {
    openTotal: n("open_total"),
    openFlags: n("open_flags"),
    openReports: n("open_reports"),
    openAppeals: n("open_appeals"),
    atRisk: n("at_risk"),
    breached: n("breached"),
    // share of last-7-day resolutions inside 24h; null when nothing resolved
    slaHitRate7d: n("resolved_7d") === 0 ? null : n("within_sla_7d") / n("resolved_7d"),
    medianHours7d: f("median_hours_7d"),
    p90Hours7d: f("p90_hours_7d"),
  };
}

async function rpc(name: string, params: Record<string, unknown>) {
  const { error } = await createClient().rpc(name, params);
  if (error) fail(error);
}

export const resolveModerationFlag = (targetType: string, targetId: string, action: "dismiss" | "uphold") =>
  rpc("resolve_moderation_flag", { p_target_type: targetType, p_target_id: targetId, p_action: action });

export const resolveReport = (reportId: string, action: "dismiss" | "uphold") =>
  rpc("resolve_content_report", { p_report_id: reportId, p_action: action });

export const resolveAppeal = (appealId: string, action: "grant" | "deny", note?: string) =>
  rpc("resolve_moderation_appeal", {
    p_appeal_id: appealId,
    p_action: action,
    p_note: note && note.trim() ? note.trim() : null,
  });

export const liftModerationFreeze = (userId: string) =>
  rpc("admin_lift_moderation_freeze", { p_user_id: userId });
