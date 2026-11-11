"use client";

import { useEffect, useState } from "react";
import styles from "./ActiveUsersBadge.module.css";

/**
 * Glass pill showing the total number of users (every row in
 * public.profiles) as "active users". Reads the read-only Postgres function
 * `get_active_user_count()` via Supabase's REST endpoint with the public
 * anon key, then counts up to the number. Renders nothing if the fetch fails.
 */
export default function ActiveUsersBadge({
  className = "",
}: {
  className?: string;
}) {
  const [target, setTarget] = useState<number | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    fetch(`${url}/rest/v1/rpc/get_active_user_count`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((count) => {
        if (!cancelled && typeof count === "number") setTarget(count);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  // Count-up animation (skipped for reduced-motion users).
  useEffect(() => {
    if (target === null) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || target < 2) {
      setShown(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  if (target === null) return null;

  return (
    <div className={`${styles.badge} ${className}`} aria-live="polite">
      <span className={styles.dot} aria-hidden />
      <span className={styles.count}>{shown.toLocaleString("en-US")}</span>
      <span className={styles.label}>active users</span>
    </div>
  );
}