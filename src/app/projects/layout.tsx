import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Projects by Gilles Heinesch — Pilotflows, FrëschKëscht, WeConnect, RosterX and more.",
    alternates: { canonical: "/projects" },
    openGraph: {
        title: "Projects | Gilles Heinesch",
        description: "Projects by Gilles Heinesch — Pilotflows, FrëschKëscht, WeConnect, RosterX and more.",
        url: "/projects",
    },
    twitter: {
        card: "summary_large_image",
    },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
