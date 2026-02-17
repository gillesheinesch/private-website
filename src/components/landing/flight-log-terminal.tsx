"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/projects";

/** Terminal-style project teaser — auto-synced from projects data */
export function FlightLogTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-4xl px-0 sm:px-4"
    >
      <Card className="group overflow-hidden border-zinc-800 bg-zinc-900/80 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3 py-2.5 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-amber-500/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-zinc-500">
              flight-log --recent
            </span>
          </div>
          <Link
            href="/projects"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1 text-xs font-medium text-cyan-500/80 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset rounded sm:min-h-0 sm:min-w-0"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <CardContent className="p-3 font-mono text-xs sm:p-4 sm:text-sm">
          <div className="space-y-1">
            <p>
              <span className="text-cyan-400">$</span> cat projects.txt
            </p>
            {projects.map((project, i) => (
              <motion.p
                key={project.title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-zinc-400"
              >
                <span className="text-emerald-400">{project.title}</span> ·{" "}
                {project.tagline}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: projects.length * 0.08 + 0.2 }}
            >
              <span className="text-cyan-400">$</span>{" "}
              <span className="animate-pulse">_</span>
            </motion.p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
