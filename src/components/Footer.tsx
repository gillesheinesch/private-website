import { Plane } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-zinc-800 bg-zinc-950 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="container mx-auto max-w-6xl px-4 py-4 text-center text-sm text-zinc-500 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="inline-flex min-h-[44px] items-center justify-center gap-1 font-mono font-medium text-zinc-400 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-md px-2 sm:min-h-0"
                >
                    <Plane className="h-4 w-4" />
                    Gilles Heinesch
                </Link>
                <span className="mx-2">·</span>
                <span>&copy; {new Date().getFullYear()}</span>
            </div>
        </footer>
    );
}
