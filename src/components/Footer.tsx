import Link from "next/link";
import { Plane } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-950 py-6">
      <div className="container mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500">
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-mono font-medium text-zinc-400 transition-colors hover:text-cyan-400"
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
