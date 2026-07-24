import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { BackToTop } from "@/components/back-to-top";
import { site } from "@/content/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: ["software engineer", "cyber security", "detection engineering", "graduate engineer", "UK", "Warwick"],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: site.domain,
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.role}`, description: site.description },
  alternates: { canonical: site.url, types: { "application/rss+xml": `${site.url}/rss.xml` } },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F6F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1A1F" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Coventry", addressCountry: "GB" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Warwick" },
  knowsAbout: ["Software engineering", "Cyber security", "Cloud infrastructure", "Detection engineering"],
  sameAs: [`https://github.com/${site.github}`, site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/*
          Theme initialisation script. Runs before React hydrates so:
          1. No flash of wrong theme on reload.
          2. The toggle works even if React never hydrates.
          next-themes does similar work, but we can't depend on it loading.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark')}catch(e){}})()`,
          }}
        />
        {/* Calendly's own stylesheet — small enough not to matter, loaded once. */}
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-16 rounded-lg border border-mint bg-surface px-4 py-2 text-sm font-medium text-mint opacity-0 transition-all focus:translate-y-0 focus:opacity-100"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <CommandPalette />
          <BackToTop />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/*
          afterInteractive: fetched right after the page becomes interactive,
          in the background, without blocking hydration or first paint. The
          page has nine sections above Meeting, so by the time anyone scrolls
          there this has almost always already finished loading — no visible
          delay, and nothing loaded on first paint that could slow it down.
        */}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
