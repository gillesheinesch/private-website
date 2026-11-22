import { CockpitGrid } from "@/components/landing/cockpit-grid";
import { ContrailBg } from "@/components/landing/contrail-bg";
import { FlightLogTerminal } from "@/components/landing/flight-log-terminal";
import { Hero } from "@/components/landing/hero";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
    const [latest] = getAllPosts();
    const latestPost = latest ? { slug: latest.slug, title: latest.title, date: latest.date } : null;

    return (
        <div className="landing-noise relative min-h-[calc(100vh-8rem)] overflow-hidden">
            <CockpitGrid />
            <ContrailBg />

            <Hero />

            {/* Terminal — synced from profile, projects and blog data */}
            <section className="relative px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
                <FlightLogTerminal latestPost={latestPost} />
            </section>
        </div>
    );
}
