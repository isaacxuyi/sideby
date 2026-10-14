import type { Metadata } from "next";

// Reachable by direct link (Play Store / app), but kept out of search
// results, the footer and the sitemap.
export const metadata: Metadata = {
  title: "Delete your account",
  robots: { index: false, follow: false },
};

export default function DeleteAccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
