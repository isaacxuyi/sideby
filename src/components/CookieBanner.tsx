"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./CookieBanner.module.css";

const STORAGE_KEY = "sideby_cookie_consent";

export type CookieConsent = "all" | "essential";

/**
 * Read the saved choice from anywhere on the client.
 * Gate any future analytics / marketing scripts on this:
 *   if (getCookieConsent() === "all") { loadAnalytics(); }
 */
export function getCookieConsent(): CookieConsent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "all" || value === "essential" ? value : null;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) setVisible(true);

    // Lets the footer "Cookie settings" link reopen the banner.
    const reopen = () => setVisible(true);
    window.addEventListener("sideby:open-cookie-banner", reopen);
    return () => window.removeEventListener("sideby:open-cookie-banner", reopen);
  }, []);

  function choose(choice: CookieConsent) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage blocked (private mode etc.) — just hide for this session.
    }
    window.dispatchEvent(new CustomEvent("sideby:cookie-consent", { detail: choice }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <p className={styles.text}>
        We use essential cookies to keep you signed in and the site working. With
        your OK, we may also use optional cookies to understand how the site is
        used. Read our <Link href="/privacy">Privacy Policy</Link> for details.
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondary}
          onClick={() => choose("essential")}
        >
          Essential only
        </button>
        <button
          type="button"
          className={styles.primary}
          onClick={() => choose("all")}
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
