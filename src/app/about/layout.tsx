import { JsonLd } from "@/components/json-ld";
import { profile } from "@/data/about";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heinesch.com";

export const metadata: Metadata = {
    title: "About",
    description:
        "About Gilles Heinesch — aviation enthusiast, web developer, co-founder. Luxembourg. Luxair, Pilotflows, FrëschKëscht, WeConnect.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "About | Gilles Heinesch",
        description:
            "About Gilles Heinesch — aviation enthusiast, web developer, co-founder. Luxembourg. Luxair, Pilotflows, FrëschKëscht, WeConnect.",
        url: "/about",
    },
    twitter: {
        card: "summary_large_image",
    },
};

/** Person schema for About page — improves search rich results */
const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.tagline,
    description: profile.bio,
    image: `${BASE_URL}/images/gillesheinesch.png`,
    sameAs: [profile.linkedin],
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd data={personSchema} />
            {children}
        </>
    );
}
