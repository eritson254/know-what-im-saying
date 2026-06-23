import type { Metadata } from "next";
import { Newsreader, Inter, Space_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { ThemeScript } from "@/components/theme/theme-script";
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
  title: "Know What I'm Saying?",
  description: "Thoughtful writing for people trying to make sense of modern life.",
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
        <ThemeScript />
        {children}
        <Footer />
        <MobileTabBar />
      </body>
    </html>
  );
}
