import type {Metadata} from "next";
import type {ReactNode} from "react";
import localFont from "next/font/local";

import "./globals.css";
import {defaultLocale} from "@/i18n/config";
import {siteConfig} from "@/config/site";

const inter = localFont({
  src: "./fonts/inter-var.woff2",
  display: "swap",
  variable: "--font-inter",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"]
});

export const metadata: Metadata = {metadataBase: new URL(siteConfig.canonicalSiteUrl)};

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <html lang={defaultLocale} className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
