"use client";

import { motion } from "framer-motion";
import { Plane, Code2, FileText, User } from "lucide-react";
import Link from "next/link";
import { TypingHero } from "@/components/landing/typing-hero";
import { ContrailBg } from "@/components/landing/contrail-bg";
import { FlightLogTerminal } from "@/components/landing/flight-log-terminal";
import { CockpitGrid } from "@/components/landing/cockpit-grid";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "/projects", label: "Projects", icon: Code2 },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/about", label: "About", icon: User },
];

export default function Home() {
  return (
    <div className="landing-noise relative min-h-[calc(100vh-8rem)] overflow-hidden">
      <CockpitGrid />
      <ContrailBg />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-1.5 text-sm text-cyan-400"
          >
            <Plane className="h-4 w-4" />
            Aviation × Code
          </motion.div>
          <TypingHero />
          <p className="mt-4 max-w-md text-center font-sans text-sm text-zinc-400 sm:mt-6 sm:text-base">
            I build things for the web and love everything that flies. Explore
            my projects, read the blog, or say hi.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8 sm:gap-4"
          >
            {LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <Link href={link.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-cyan-500/40 text-cyan-400 transition-colors hover:bg-cyan-500/10 hover:border-cyan-500/60"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Terminal — auto-synced from projects data */}
      <section className="relative px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <FlightLogTerminal />
      </section>
    </div>
  );
}
