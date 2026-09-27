import { NextResponse } from "next/server";

/**
 * iOS Universal Links association file.
 * Must be served at exactly https://sideby.org/.well-known/apple-app-site-association
 * (no file extension — this route intentionally has none), with a 200
 * status, valid JSON, and NO redirect. Apple's CDN fetches this once when
 * the app installs and does not reliably follow redirects — see the
 * apex/www domain-redirect note before relying on this in production.
 *
 * TODO before this does anything useful:
 *   Replace "TEAMID.BUNDLEID" with your real value, e.g. "ABCDE12345.org.sideby.app"
 *     - Team ID: Apple Developer account → Membership details
 *     - Bundle ID: the app's real iOS bundle identifier in Xcode
 *       (NOT firebase_options.dart's iosBundleId, which is still the
 *       placeholder "com.example.sideBy" as of this app's Firebase config)
 *   Also add "applinks:sideby.org" to the app's Associated Domains
 *   capability in Xcode (Signing & Capabilities) — this file alone doesn't
 *   do anything without that entitlement on the app side.
 */
const AASA = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "TEAMID.BUNDLEID", // TODO: replace, e.g. "ABCDE12345.org.sideby.app"
        paths: ["/split/*", "/u/*"],
      },
    ],
  },
};

export function GET() {
  return NextResponse.json(AASA, {
    headers: { "Content-Type": "application/json" },
  });
}
