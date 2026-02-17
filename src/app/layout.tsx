import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Gilles Heinesch | Aviation × Web Developer",
    template: "%s | Gilles Heinesch",
  },
  description:
    "Personal website of Gilles Heinesch — aviation enthusiast and web developer. Projects, blog, and more.",
  keywords: ["Gilles Heinesch", "web developer", "aviation", "Luxembourg"],
  authors: [{ name: "Gilles Heinesch" }],
  openGraph: {
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#18181b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased overflow-x-hidden`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cyan-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Skip to content
        </a>
        <div className="content">
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
