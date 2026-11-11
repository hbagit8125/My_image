import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import CommandPalette from "@/components/CommandPalette";
import { themeInitScript } from "@/components/ThemeToggle";
import { profile } from "@/data/content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: `${profile.name} is a ${profile.role} at ${profile.company}. ${profile.tagline}`,
  authors: [{ name: profile.name }],
  keywords: [
    "Hashir Bin Anwer",
    "Machine Learning Engineer",
    "LLM fine-tuning",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name}, ${profile.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    images: ["/og.png"],
  },
};

// Structured data so search engines understand who the site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: "Tigmaminds Pvt. Ltd." },
  url: siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin, profile.github],
  alumniOf: [
    "Indian Institute of Technology Madras",
    "Sree Chitra Thirunal College of Engineering",
  ],
};

export const viewport: Viewport = {
  themeColor: "#050812",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script may set data-theme before React loads.
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full">
        {children}
        <CommandPalette />
        {/* Visitor counts. Shows data once Analytics is enabled for the project in Vercel. */}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
