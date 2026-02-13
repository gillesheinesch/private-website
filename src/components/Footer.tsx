import Link from "next/link";
import { Plane } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-cockpit-200 bg-cockpit-50 py-6 dark:border-cockpit-800 dark:bg-cockpit-950">
      <div className="container mx-auto max-w-6xl px-4 text-center text-sm text-cockpit-600 dark:text-cockpit-400">
        <Link href="/" className="inline-flex items-center gap-1 font-mono">
          <Plane className="h-4 w-4" />
          Gilles Heinesch
        </Link>
        <span className="mx-2">·</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
