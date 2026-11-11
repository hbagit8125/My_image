import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./globals.css";
import { profile } from "@/data/content";

export const metadata: Metadata = {
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
    images: ["/images/hashir-about.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050812",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
