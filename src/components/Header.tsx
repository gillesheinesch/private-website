"use client";

import { Plane, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const NAV = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cockpit-200 bg-white/80 backdrop-blur dark:border-cockpit-800 dark:bg-cockpit-950/80">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-lg font-bold tracking-wider text-sky-600 dark:text-sky-400"
        >
          <Plane className="h-5 w-5" />
          GH
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button variant="ghost" size="sm">
                {item.name}
              </Button>
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 px-0"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t border-cockpit-200 bg-white dark:border-cockpit-800 dark:bg-cockpit-950 md:hidden">
          <nav className="container mx-auto flex flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-4 py-2 text-sm hover:bg-cockpit-100 dark:hover:bg-cockpit-800"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
