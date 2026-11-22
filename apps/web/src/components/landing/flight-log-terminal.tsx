"use client";

import { Card, CardContent } from "@/components/ui/card";
import { experience, profile } from "@/data/about";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export interface LatestPost {
    slug: string;
    title: string;
    date: string;
}

/** Current flying job = first experience entry whose role starts with "First Officer"/"Captain" */
const currentFlying = experience.find((e) => /^(First Officer|Captain)/.test(e.role) && e.period.includes("Present"));

interface Block {
    command: string;
    output: ReactNode[];
}

function buildBlocks(latestPost: LatestPost | null): Block[] {
    const blocks: Block[] = [];

    if (currentFlying) {
        blocks.push({
            command: "whoami",
            output: [
                <>
                    <span className="text-emerald-400">{currentFlying.role}</span> · {currentFlying.company}
                </>,
            ],
        });
    }

    blocks.push({
        command: "cat base.txt",
        output: [
            <>
                <span className="text-emerald-400">{profile.homeBase}</span> · {profile.location}
            </>,
        ],
    });

    blocks.push({
        command: "ls projects/",
        output: projects.map((project) => (
            <>
                <span className="text-emerald-400">{project.title}</span> · {project.tagline}
            </>
        )),
    });

    if (latestPost) {
        blocks.push({
            command: "tail -1 blog.log",
            output: [
                <>
                    <span className="text-zinc-500">{latestPost.date}</span>{" "}
                    <Link
                        href={`/blog/${latestPost.slug}`}
                        className="text-emerald-400 underline-offset-4 hover:text-emerald-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
                    >
                        {latestPost.title}
                    </Link>
                </>,
            ],
        });
    }

    return blocks;
}

/** Terminal-style flight log — synced from profile, projects and latest blog post */
export function FlightLogTerminal({ latestPost = null }: { latestPost?: LatestPost | null }) {
    const blocks = buildBlocks(latestPost);
    let line = 0;
    const nextDelay = () => line++ * 0.05;

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
                        <span className="ml-2 font-mono text-xs text-zinc-500">flight-log --recent</span>
                    </div>
                    <Link
                        href="/projects"
                        className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1 text-xs font-medium text-cyan-500/80 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset rounded sm:min-h-0 sm:min-w-0"
                    >
                        View projects <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
                <CardContent className="p-3 font-mono text-xs sm:p-4 sm:text-sm">
                    <div className="space-y-3">
                        {blocks.map((block) => (
                            <div key={block.command} className="space-y-1">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: nextDelay() }}
                                >
                                    <span className="text-cyan-400">$</span> {block.command}
                                </motion.p>
                                {block.output.map((out, i) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: nextDelay() }}
                                        className="text-zinc-400"
                                    >
                                        {out}
                                    </motion.p>
                                ))}
                            </div>
                        ))}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: nextDelay() + 0.2 }}
                        >
                            <span className="text-cyan-400">$</span> <span className="animate-pulse">_</span>
                        </motion.p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
