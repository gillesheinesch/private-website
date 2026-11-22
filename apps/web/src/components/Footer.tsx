import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { profile } from "@/data/about";
import Link from "next/link";

const SOCIAL = [
    { label: "LinkedIn", href: profile.linkedin, icon: LinkedInIcon },
    { label: "GitHub", href: profile.github, icon: GitHubIcon },
];

/** Site-wide footer: copyright, home link and social profiles. */
export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="mt-auto border-t border-zinc-800 bg-zinc-950 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-sm sm:flex-row sm:px-6 lg:px-8">
                <p className="text-zinc-500">
                    <span>&copy; {year}</span>
                    <span className="mx-2 text-zinc-600" aria-hidden>
                        ·
                    </span>
                    <Link
                        href="/"
                        className="min-h-[44px] inline-flex items-center justify-center font-medium text-zinc-400 underline-offset-4 transition-colors hover:text-cyan-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-sm px-1 sm:min-h-0"
                    >
                        Gilles Heinesch
                    </Link>
                </p>
                <ul className="flex items-center gap-1" aria-label="Social profiles">
                    {SOCIAL.map(({ label, href, icon: Icon }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
