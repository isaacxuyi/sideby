"use client";

export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("sideby:open-cookie-banner"))}
    >
      Cookies
    </button>
  );
}
