"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

// TODO: replace with the real store listing URLs once published.
// Until then these buttons still render but won't go anywhere useful —
// swap them in as soon as the listings exist.
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=org.sideby.app"; // TODO: confirm applicationId
const APP_STORE_URL = "https://apps.apple.com/app/idXXXXXXXXXX"; // TODO: real App Store id once listed

/**
 * This page is only ever reached when the OS did NOT hand the tap
 * straight to the app — either the app isn't installed, App/Universal
 * Links aren't verified yet, or (very commonly) the link was opened
 * inside WhatsApp's or Instagram's in-app browser, which iOS/Android
 * deliberately don't treat as a trusted context for automatic app
 * hand-off. So on top of the visible buttons, this makes one best-effort
 * attempt at a custom URL scheme in case the app ever registers one —
 * it's a no-op today since nothing owns `sideby://` yet, but it's cheap
 * insurance for later and never blocks the visible fallback UI.
 */
export function OpenInApp({ splitId }: { splitId: string }) {
  const [platform, setPlatform] = useState<"ios" | "android" | "other">("other");

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) setPlatform("android");
    else if (/iphone|ipad|ipod/i.test(ua)) setPlatform("ios");

    // Best-effort custom-scheme attempt (see doc comment above).
    const timer = setTimeout(() => {
      window.location.href = `sideby://split/${splitId}`;
    }, 50);
    return () => clearTimeout(timer);
  }, [splitId]);

  const storeUrl = platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
  const joinUrl =
    platform === "android"
      ? `intent://sideby.org/split/${encodeURIComponent(splitId)}#Intent;scheme=https;package=org.sideby;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`
      : `https://sideby.org/split/${encodeURIComponent(splitId)}`;

  return (
    <div className={styles.actions}>
      <a className={styles.primaryButton} href={storeUrl}>
        {platform === "ios" ? "Get sideby on the App Store" : "Get sideby on Google Play"}
      </a>
      <a className={styles.joinButton} href={joinUrl}>
        Join my split
      </a>
      {platform === "other" && (
        <div className={styles.storeRow}>
          <a href={APP_STORE_URL} className={styles.secondaryLink}>App Store</a>
          <a href={PLAY_STORE_URL} className={styles.secondaryLink}>Google Play</a>
        </div>
      )}
    </div>
  );
}
