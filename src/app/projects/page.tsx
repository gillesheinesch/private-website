"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

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
                <p className="mt-2 text-zinc-400">Flight logs — things I&apos;ve built or co-founded.</p>
            </motion.header>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                    >
                        <Card className="group flex h-full flex-col border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">
                            <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
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
                                        <a href={project.website} target="_blank" rel="noopener noreferrer">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="inline-flex items-center gap-1 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                                            >
                                                <ExternalLink className="h-3.5 w-3.5" />
                                                Website
                                            </Button>
                                        </a>
                                    )}
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="inline-flex items-center gap-1 border-zinc-600 text-zinc-400 hover:bg-zinc-800"
                                            >
                                                <Github className="h-3.5 w-3.5" />
                                                GitHub
                                            </Button>
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
