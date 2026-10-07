"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  SLA_AT_RISK_MS,
  SLA_MS,
  fetchFlaggedContent,
  fetchOpenAppeals,
  fetchOpenReports,
  fetchProfileNames,
  fetchSlaStats,
  resolveAppeal,
  resolveModerationFlag,
  resolveReport,
  type AppealItem,
  type FlaggedItem,
  type ReportItem,
  type SlaStats,
} from "@/lib/admin/review";
import styles from "./review.module.css";

type Tab = "flagged" | "reports" | "appeals";

const label = (t: string) =>
  ({ forum_post: "Post", forum_comment: "Comment", split: "Split" })[t] ?? t;

function timeAgo(iso: string | null) {
  if (!iso) return "";
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m ago`;
  if (m < 1440) return `${Math.floor(m / 60)}h ago`;
  if (m < 10080) return `${Math.floor(m / 1440)}d ago`;
  return new Date(iso).toLocaleDateString();
}

function Badge({ tone, children }: { tone: "indigo" | "red" | "orange" | "grey"; children: ReactNode }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}

/** Grey while comfortable, orange "due in" from 18h, red "overdue" past 24h. */
function AgeChip({ at }: { at: string | null }) {
  if (!at) return null;
  const age = Date.now() - new Date(at).getTime();
  if (age >= SLA_MS) {
    const h = Math.floor((age - SLA_MS) / 3600_000);
    return <Badge tone="red">{h >= 1 ? `Overdue ${h}h` : "Overdue"}</Badge>;
  }
  if (age >= SLA_AT_RISK_MS) {
    const left = SLA_MS - age;
    const h = Math.floor(left / 3600_000);
    return <Badge tone="orange">{h >= 1 ? `Due in ${h}h` : `Due in ${Math.floor(left / 60000)}m`}</Badge>;
  }
  return <span className={styles.muted}>{timeAgo(at)}</span>;
}

const hours = (h: number | null) =>
  h == null ? "—" : h < 1 ? `${Math.round(h * 60)}m` : `${h.toFixed(h < 10 ? 1 : 0)}h`;

function SlaStrip({ stats, error, onRetry }: { stats: SlaStats | null; error: boolean; onRetry: () => void }) {
  if (error)
    return (
      <button type="button" className={styles.link} onClick={onRetry}>
        Couldn&apos;t load SLA stats — click to retry
      </button>
    );
  if (!stats)
    return (
      <div className={styles.slaStrip} aria-busy="true">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={`${styles.skeleton} ${styles.skelStat}`} />
        ))}
      </div>
    );
  const hit = stats.slaHitRate7d;
  const cell = (v: string, l: string, color?: string) => (
    <div className={styles.stat}>
      <b style={{ color }}>{v}</b>
      <span>{l}</span>
    </div>
  );
  return (
    <div className={styles.slaStrip}>
      {cell(String(stats.openTotal), "Open")}
      {cell(String(stats.atRisk), "At risk", stats.atRisk > 0 ? "#f59e0b" : undefined)}
      {cell(String(stats.breached), "Over 24h", stats.breached > 0 ? "#ef4444" : undefined)}
      {cell(hit == null ? "—" : `${Math.round(hit * 100)}%`, "In SLA (7d)", hit == null || hit >= 0.95 ? "#10b981" : "#f59e0b")}
      {cell(hours(stats.medianHours7d), "Median (7d)")}
    </div>
  );
}

/** Loads a list, exposes retry + local removal so resolved cards vanish instantly. */
function useList<T>(load: () => Promise<T[]>) {
  const [items, setItems] = useState<T[] | null>(null);
  const [error, setError] = useState(false);
  const reload = useCallback(() => {
    setError(false);
    setItems(null);
    load().then(setItems, () => setError(true));
  }, [load]);
  useEffect(reload, [reload]);
  return { items, error, reload, remove: (pred: (x: T) => boolean) => setItems((l) => l && l.filter((x) => !pred(x))) };
}

/** Runs a resolve action, toasts the outcome, returns success. */
async function run(fn: () => Promise<void>, ok: string, toast: (m: string) => void) {
  try {
    await fn();
    toast(ok);
    return true;
  } catch (e) {
    toast(e instanceof Error ? e.message : "Something went wrong.");
    return false;
  }
}

function ListState<T>({
  list,
  empty,
  errorText,
  children,
}: {
  list: ReturnType<typeof useList<T>>;
  empty: string;
  errorText: string;
  children: (items: T[]) => ReactNode;
}) {
  if (list.error)
    return (
      <div className={styles.state} role="alert">
        <span className={`${styles.stateIcon} ${styles.stateIconErr}`} aria-hidden="true">!</span>
        <p>{errorText}</p>
        <button type="button" className={`${styles.btn} ${styles.neutral}`} onClick={list.reload}>
          Retry
        </button>
      </div>
    );
  if (!list.items)
    return (
      <div className={styles.list} aria-busy="true" aria-label="Loading">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${styles.skeleton} ${styles.skelCard}`} />
        ))}
      </div>
    );
  if (!list.items.length)
    return (
      <div className={styles.state}>
        <span className={styles.stateIcon} aria-hidden="true">✓</span>
        <p>{empty}</p>
      </div>
    );
  return <div className={styles.list}>{children(list.items)}</div>;
}

type Props = { toast: (m: string) => void; onChanged: () => void };

function FlaggedTab({ toast, onChanged }: Props) {
  const list = useList(fetchFlaggedContent);
  const act = async (i: FlaggedItem, action: "dismiss" | "uphold") => {
    const noun = i.targetType === "forum_post" ? "post" : "comment";
    const msg =
      action === "uphold"
        ? `Uphold this flag? The ${noun} is hidden, ${i.authorName} gets a strike and is notified. Repeat violations may suspend the account.`
        : i.moderationStatus === "hidden"
          ? `Dismiss this flag? The ${noun} is restored, any strike is revoked, and the author is told.`
          : `Dismiss this flag? The ${noun} stays visible and is marked reviewed.`;
    if (!confirm(msg)) return;
    if (await run(() => resolveModerationFlag(i.targetType, i.targetId, action), action === "uphold" ? "Upheld" : "Dismissed", toast)) {
      list.remove((x) => x.targetType === i.targetType && x.targetId === i.targetId);
      onChanged();
    }
  };
  return (
    <ListState list={list} empty="Nothing waiting on review. Every flagged post and comment has been handled." errorText="Couldn't load flagged content.">
      {(items) =>
        items.map((i) => (
          <article key={i.targetType + i.targetId} className={styles.card}>
            <div className={styles.row}>
              <Badge tone="indigo">{label(i.targetType)}</Badge>
              <Badge tone={i.moderationStatus === "hidden" ? "red" : "orange"}>
                {i.moderationStatus === "hidden" ? "Hidden" : "Flagged"}
              </Badge>
              <span className={styles.spacer} />
              <AgeChip at={i.checkedAt} />
            </div>
            <p className={styles.author}>{i.authorName}</p>
            {i.title && <p className={styles.title}>{i.title}</p>}
            <p className={styles.body}>{i.preview}</p>
            {i.categories.length > 0 && (
              <div className={styles.row}>{i.categories.map((c) => <Badge key={c} tone="grey">{c}</Badge>)}</div>
            )}
            <div className={styles.actions}>
              <button type="button" className={`${styles.btn} ${styles.green}`} onClick={() => act(i, "dismiss")}>Dismiss</button>
              <button type="button" className={`${styles.btn} ${styles.redBtn}`} onClick={() => act(i, "uphold")}>Uphold</button>
            </div>
          </article>
        ))
      }
    </ListState>
  );
}

function ReportsTab({ toast, onChanged }: Props) {
  const list = useList(fetchOpenReports);
  const [names, setNames] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!list.items) return;
    fetchProfileNames(list.items.flatMap((r) => [r.reporterId, r.reportedUserId])).then(setNames);
  }, [list.items]);

  const act = async (r: ReportItem, action: "dismiss" | "uphold") => {
    const t = label(r.targetType).toLowerCase();
    const who = names[r.reportedUserId] || r.targetAuthorName || "the author";
    const msg =
      action === "dismiss"
        ? "Dismiss this report? No action is taken on the reported content, and the reporter is told."
        : (r.targetType === "split"
            ? "Splits have no automatic hide yet — the strike is issued but the split stays up. "
            : `This hides the reported ${t} from everyone but ${who}. `) +
          `${who} gets a strike, and every open report on this ${t} is closed with its reporter notified.`;
    if (!confirm(msg)) return;
    if (await run(() => resolveReport(r.id, action), action === "uphold" ? "Upheld" : "Dismissed", toast)) {
      // uphold closes every open report on the same target server-side
      list.remove((x) =>
        action === "uphold" ? x.targetType === r.targetType && x.targetId === r.targetId : x.id === r.id,
      );
      onChanged();
    }
  };
  return (
    <ListState list={list} empty="No open reports. Everything filed so far has been handled." errorText="Couldn't load reports.">
      {(items) =>
        items.map((r) => (
          <article key={r.id} className={styles.card}>
            <div className={styles.row}>
              <Badge tone="indigo">{label(r.targetType)}</Badge>
              <span className={styles.spacer} />
              <AgeChip at={r.createdAt} />
            </div>
            <p className={styles.author}>{r.reason}</p>
            {r.details?.trim() && <p className={styles.body}>{r.details}</p>}
            {r.targetPreview && <blockquote className={styles.quote}>{r.targetPreview}</blockquote>}
            <p className={styles.byline}>
              <strong>{names[r.reportedUserId] || r.targetAuthorName || "Unknown"}</strong> reported by{" "}
              <strong>{names[r.reporterId] || "Unknown"}</strong>
            </p>
            <div className={styles.actions}>
              <button type="button" className={`${styles.btn} ${styles.green}`} onClick={() => act(r, "dismiss")}>Dismiss</button>
              <button type="button" className={`${styles.btn} ${styles.redBtn}`} onClick={() => act(r, "uphold")}>Uphold</button>
            </div>
          </article>
        ))
      }
    </ListState>
  );
}

function AppealModal({ item, grant, onClose, onSubmit }: { item: AppealItem; grant: boolean; onClose: () => void; onSubmit: (note: string) => void }) {
  const [note, setNote] = useState("");
  const noun = item.targetType === "forum_comment" ? "comment" : item.targetType === "split" ? "split" : "post";
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3>{grant ? "Grant this appeal" : "Deny this appeal"}</h3>
        <p className={styles.muted}>
          {grant
            ? `Restores the ${noun}, removes the strike, refunds the trust hit, and may lift a suspension.`
            : `The ${noun} stays removed and the strike stays.`}
        </p>
        {!grant && (
          <textarea
            className={styles.textarea}
            maxLength={300}
            rows={3}
            placeholder="Optional note to the author"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        )}
        <div className={styles.actions}>
          <button type="button" className={`${styles.btn} ${styles.neutral}`} onClick={onClose}>Cancel</button>
          <button type="button" className={`${styles.btn} ${grant ? styles.green : styles.redBtn}`} onClick={() => onSubmit(note)}>
            {grant ? "Grant appeal" : "Deny appeal"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AppealsTab({ toast, onChanged }: Props) {
  const list = useList(fetchOpenAppeals);
  const [names, setNames] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<{ item: AppealItem; grant: boolean } | null>(null);
  useEffect(() => {
    if (!list.items) return;
    fetchProfileNames(list.items.flatMap((a) => [a.appellantId, a.issuedBy ?? ""])).then(setNames);
  }, [list.items]);

  const submit = async (note: string) => {
    if (!modal) return;
    const { item, grant } = modal;
    setModal(null);
    if (await run(() => resolveAppeal(item.id, grant ? "grant" : "deny", grant ? undefined : note), grant ? "Appeal granted." : "Appeal denied.", toast)) {
      list.remove((x) => x.id === item.id);
      onChanged();
    }
  };
  return (
    <>
      <ListState list={list} empty="No open appeals." errorText="Couldn't load appeals.">
        {(items) =>
          items.map((a) => (
            <article key={a.id} className={styles.card}>
              <div className={styles.row}>
                <Badge tone="indigo">{label(a.targetType)}</Badge>
                {a.severity === "severe" && <Badge tone="red">Severe</Badge>}
                <span className={styles.spacer} />
                <AgeChip at={a.createdAt} />
              </div>
              <p className={styles.author}>{names[a.appellantId] || "Someone"} says:</p>
              <p className={styles.body}>{a.message}</p>
              {a.contentSnapshot && (
                <>
                  <p className={styles.label}>Removed content</p>
                  <blockquote className={styles.quote}>{a.contentSnapshot}</blockquote>
                </>
              )}
              {a.categories.length > 0 && (
                <div className={styles.row}>{a.categories.map((c) => <Badge key={c} tone="grey">{c}</Badge>)}</div>
              )}
              {a.issuedBy && names[a.issuedBy] && <p className={styles.byline}>Original decision by <strong>{names[a.issuedBy]}</strong></p>}
              <div className={styles.actions}>
                <button type="button" className={`${styles.btn} ${styles.redBtn}`} onClick={() => setModal({ item: a, grant: false })}>Deny</button>
                <button type="button" className={`${styles.btn} ${styles.green}`} onClick={() => setModal({ item: a, grant: true })}>Grant</button>
              </div>
            </article>
          ))
        }
      </ListState>
      {modal && <AppealModal {...modal} onClose={() => setModal(null)} onSubmit={submit} />}
    </>
  );
}

export default function ReviewQueue() {
  const [tab, setTab] = useState<Tab>("flagged");
  const [stats, setStats] = useState<SlaStats | null>(null);
  const [statsError, setStatsError] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const refreshStats = useCallback(() => {
    setStatsError(false);
    fetchSlaStats().then(setStats, () => setStatsError(true));
  }, []);
  useEffect(refreshStats, [refreshStats]);

  const toast = (m: string) => {
    setToastMsg(m);
    setTimeout(() => setToastMsg(null), 4000);
  };
  const props = { toast, onChanged: refreshStats };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Admin</span>
        <h1>Review queue</h1>
        <p className={styles.lead}>
          Flagged content, user reports and appeals. Everything open is measured against a 24-hour response target.
        </p>
      </header>
      <SlaStrip stats={stats} error={statsError} onRetry={refreshStats} />
      <nav className={styles.tabs} role="tablist" aria-label="Queue">
        {(["flagged", "reports", "appeals"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={tab === t ? styles.tabOn : ""}
            onClick={() => setTab(t)}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </nav>
      {tab === "flagged" && <FlaggedTab {...props} />}
      {tab === "reports" && <ReportsTab {...props} />}
      {tab === "appeals" && <AppealsTab {...props} />}
      {toastMsg && (
        <div className={styles.toast} role="status">
          {toastMsg}
        </div>
      )}
    </main>
  );
}