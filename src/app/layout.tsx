import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Gilles Heinesch",
    description: "Full-stack developer and software engineer specializing in modern web technologies",
    keywords: ["Gilles Heinesch", "Developer", "Software Engineer", "Full-stack", "Web Development"],
    authors: [{ name: "Gilles Heinesch" }],
    creator: "Gilles Heinesch",
    metadataBase: new URL("https://gilles-heinesch.com"),
    openGraph: {
        title: "Gilles Heinesch - Developer & Software Engineer",
        description: "Full-stack developer and software engineer specializing in modern web technologies",
        url: "https://gilles-heinesch.com",
        siteName: "Gilles Heinesch",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gilles Heinesch - Developer & Software Engineer",
        description: "Full-stack developer and software engineer specializing in modern web technologies",
        creator: "@gilles_heinesch",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <div className="relative flex min-h-screen flex-col bg-background">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
