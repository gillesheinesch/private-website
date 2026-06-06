import Link from "next/link";

/** Site-wide footer: copyright and a subtle link back to the home page. */
export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="mt-auto border-t border-zinc-800 bg-zinc-950 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="container mx-auto max-w-6xl px-4 py-4 text-center text-sm sm:px-6 lg:px-8">
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
            </div>
        </footer>
    );
}
