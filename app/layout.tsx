import type { Metadata } from "next";
import { Newsreader, Inter, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/layout/footer";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { PopupController } from "@/components/popup/popup-controller";
import { ThemeScript } from "@/components/theme/theme-script";
import { siteConfig } from "@/config/site";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Know What I'm Saying?",
  description: "Thoughtful writing for people trying to make sense of modern life.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans pb-[calc(54px+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-[2px] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <ThemeScript />
        <div id="main-content" className="contents">
          {children}
        </div>
        <Footer />
        <MobileTabBar />
        <PopupController />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
