import type { Metadata } from "next";

/** Home page SEO — canonical URL for root */
export const metadata: Metadata = {
    alternates: { canonical: "/" },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
