import { profile } from "@/data/about";
import Image from "next/image";
import Link from "next/link";

/** "Written by" box at the end of a blog post */
export function AuthorCard() {
    return (
        <aside
            aria-label="About the author"
            className="mt-10 flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5"
        >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-cyan-500/40">
                <Image
                    src="/images/gillesheinesch.png"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover object-[35%_30%]"
                />
            </div>
            <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Written by</p>
                <Link
                    href="/about"
                    className="font-mono font-semibold text-zinc-100 transition-colors hover:text-cyan-400"
                >
                    {profile.name}
                </Link>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                    {profile.tagline}. Flying the Boeing 737 for Luxair and building software for pilots and flight
                    crews.
                </p>
            </div>
        </aside>
    );
}
