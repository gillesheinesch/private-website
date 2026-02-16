import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased`}
      >
        <div className="content">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
