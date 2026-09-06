import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sideby.org"),
  title: {
    default: "sideby — Side by Better Together",
    template: "%s — sideby",
  },
  description:
    "Side by better together. Split the price tag without compromising on what matters most.",
  keywords: ["split expenses", "cost splitting", "group hangouts", "activity coordination", "sideby"],
  openGraph: {
    title: "sideby — Side by Better Together",
    description:
      "Side by better together. Split the price tag without compromising on what matters most.",
    url: "https://www.sideby.org",
    siteName: "sideby",
    images: [{ url: "/icon-512.png", width: 512, height: 512 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "sideby — Side by Better Together",
    description:
      "Side by better together. Split the price tag without compromising on what matters most.",
    images: ["/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`} style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
