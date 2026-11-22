"use client";

import { GitHubIcon } from "@/components/brand-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function ProjectsPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <motion.header
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8 sm:mb-12"
            >
                <h1 className="font-mono text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl md:text-4xl">
                    Projects
                </h1>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-400">
                    Things I&apos;ve built or co-founded.
                </p>
            </motion.header>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i, 4) * 0.04, duration: 0.35 }}
                    >
                        <Card className="group flex h-full flex-col border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">
                            <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                                {project.image && (
                                    // Fixed 16:10 slot — screenshots/photos fill it, dimmed until hover so bright images
                                    // don't overpower the dark page; app icons sit centred on a dark tile instead.
                                    <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-inset ring-zinc-700/50">
                                        {project.imageKind === "icon" ? (
                                            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_70%)]">
                                                <Image
                                                    src={project.image}
                                                    alt={`${project.title} app icon`}
                                                    width={112}
                                                    height={112}
                                                    className="h-24 w-24 rounded-2xl shadow-xl shadow-black/50 sm:h-28 sm:w-28"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <Image
                                                    src={project.image}
                                                    alt={`${project.title} product preview`}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, 448px"
                                                    className="object-cover object-top opacity-80 saturate-[0.85] transition duration-300 group-hover:opacity-100 group-hover:saturate-100"
                                                    priority={i === 0}
                                                />
                                                <div
                                                    aria-hidden
                                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent"
                                                />
                                            </>
                                        )}
                                    </div>
                                )}
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-xs font-medium uppercase tracking-wider text-cyan-500/80">
                                        {project.position}
                                    </span>
                                    {project.period && <span className="text-xs text-zinc-500">{project.period}</span>}
                                </div>
                                <h2 className="mt-1 font-mono text-xl font-semibold text-zinc-100">{project.title}</h2>
                                <p className="mt-2 flex-1 text-sm text-zinc-400">{project.description}</p>
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {project.labels.map((label) => (
                                        <Badge
                                            key={label}
                                            variant="secondary"
                                            className="border-zinc-700 bg-zinc-800/50 text-zinc-300"
                                        >
                                            {label}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="mt-4 flex gap-2">
                                    {project.website && (
                                        <a
                                            href={project.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                buttonVariants({ variant: "outline", size: "sm" }),
                                                "gap-1 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300",
                                            )}
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            Website
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                buttonVariants({ variant: "outline", size: "sm" }),
                                                "gap-1 border-zinc-600 text-zinc-400 hover:bg-zinc-800",
                                            )}
                                        >
                                            <GitHubIcon className="h-3.5 w-3.5" />
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
