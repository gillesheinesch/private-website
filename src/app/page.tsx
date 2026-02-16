"use client";

import { motion } from "framer-motion";
import { Plane, Code2, FileText, User } from "lucide-react";
import Link from "next/link";
import { TypingHero } from "@/components/landing/typing-hero";
import { ContrailBg } from "@/components/landing/contrail-bg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LINKS = [
  { href: "/projects", label: "Projects", icon: Code2 },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/about", label: "About", icon: User },
];

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <ContrailBg />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
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
          <p className="mt-6 max-w-md font-sans text-base text-zinc-400">
            I build things for the web and love everything that flies. Explore
            my projects, read the blog, or say hi.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
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

      {/* Terminal-style teaser */}
      <section className="relative px-4 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-4xl"
        >
          <Card className="overflow-hidden border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-red-500/80" />
              <span className="h-2 w-2 rounded-full bg-amber-500/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-zinc-500">
                flight-log --recent
              </span>
            </div>
            <CardContent className="p-4 font-mono text-sm">
              <div className="space-y-1 text-zinc-400">
                <p>
                  <span className="text-cyan-400">$</span> cat projects.txt
                </p>
                <p>
                  <span className="text-emerald-400">Pilotflows</span> · Aviation
                  management platform
                </p>
                <p>
                  <span className="text-emerald-400">FrëschKëscht</span> ·
                  Luxembourgish gift boxes
                </p>
                <p>
                  <span className="text-emerald-400">RosterX</span> · Flight crew
                  calendar parser
                </p>
                <p>
                  <span className="text-cyan-400">$</span>{" "}
                  <span className="animate-pulse">_</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
