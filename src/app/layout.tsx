import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

// // Assuming Header and Footer use MUI, commenting them out for now
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Gilles Heinesch",
    description: "Personal website of Gilles Heinesch",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            {" "}
            {/* Added suppressHydrationWarning for potential theme issues */}
            <body className={`${inter.className} min-h-screen flex flex-col`}>
                {" "}
                {/* Basic Tailwind setup */}
                {/* <Header /> */}
                {/* Placeholder - Header to be refactored */}
                <main className="flex-grow container mx-auto px-4 py-8">
                    {" "}
                    {/* Basic container */}
                    {children}
                </main>
                {/* <Footer /> */}
                {/* Placeholder - Footer to be refactored */}
            </body>
        </html>
    );
}
