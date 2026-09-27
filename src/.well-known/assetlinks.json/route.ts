import { NextResponse } from "next/server";

/**
 * Android App Links verification file.
 * Must be served at exactly https://sideby.org/.well-known/assetlinks.json
 * with a 200 status and no redirect (Google's verifier does not reliably
 * follow redirects) — see the apex/www domain-redirect note in the PR
 * description before relying on this in production.
 *
 * TODO before this does anything useful:
 *  1. Replace `package_name` with the app's real applicationId (the
 *     sideby.org-based id from the Android rename — check
 *     android/app/build.gradle's `applicationId`).
 *  2. Replace the SHA256 fingerprint(s) below. Get them with:
 *       - Debug:   keytool -list -v -keystore ~/.android/debug.keystore \
 *                    -alias androiddebugkey -storepass android -keypass android
 *       - Release (if using Play App Signing, use the fingerprint from
 *         Play Console → Setup → App integrity → App signing key
 *         certificate, NOT your local upload key):
 *                  keytool -list -v -keystore <your-release.keystore> -alias <alias>
 *     Include every fingerprint you need (debug + release) as separate
 *     array entries — one shared file covers all of them.
 */
const ASSET_LINKS = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "org.sideby.app", // TODO: confirm this matches applicationId exactly
      sha256_cert_fingerprints: [
        // TODO: replace with real fingerprints, e.g.
        // "14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5",
        "REPLACE_WITH_DEBUG_SHA256_FINGERPRINT",
        "REPLACE_WITH_RELEASE_SHA256_FINGERPRINT",
      ],
    },
  },
];

export function GET() {
  return NextResponse.json(ASSET_LINKS, {
    headers: { "Content-Type": "application/json" },
  });
}
