import type { Metadata } from "next";
import PlaygroundShell from "@/components/PlaygroundShell";
import {
  DM_Sans,
  IBM_Plex_Sans,
  Inter,
  JetBrains_Mono,
  Manrope,
  Outfit,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Sora,
  Space_Grotesk
} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-plex" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: {
    default: "Animation Playground | Design Tokens & Motion Reference",
    template: "%s | Animation Playground"
  },
  description: "A comprehensive design system playground featuring animated UI effects, motion demos, data visualizations, and copy-paste code snippets for frontend developers.",
  keywords: ["animation", "motion", "framer-motion", "design tokens", "UI effects", "frontend", "react", "data visualization"],
  authors: [{ name: "Animation Playground" }],
  openGraph: {
    title: "Animation Playground | Design Tokens & Motion Reference",
    description: "A comprehensive design system playground featuring animated UI effects, motion demos, and copy-paste code snippets.",
    type: "website",
    locale: "en_US",
    siteName: "Animation Playground"
  },
  twitter: {
    card: "summary_large_image",
    title: "Animation Playground",
    description: "A comprehensive design system playground featuring animated UI effects and motion demos."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" data-brand="studio" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} ${space.variable} ${sora.variable} ${jakarta.variable} ${dmSans.variable} ${outfit.variable} ${plex.variable} ${playfair.variable} ${jetbrains.variable}`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <PlaygroundShell>{children}</PlaygroundShell>
      </body>
    </html>
  );
}
