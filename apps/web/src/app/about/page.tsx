"use client";

import { experience, experienceGroups, profile } from "@/data/about";
import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Job = (typeof experience)[number];

/** Full card for current flying and venture roles */
function ExperienceCard({ job, index }: { job: Job; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(index, 4) * 0.04 }}
            className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition-colors hover:border-cyan-500/20 sm:p-5"
        >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                    <span className="text-sm font-medium text-cyan-500/90">{job.role}</span>
                    {job.url ? (
                        <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 font-mono font-semibold text-zinc-100 hover:text-cyan-400"
                        >
                            {job.company}
                        </a>
                    ) : (
                        <span className="ml-2 font-mono font-semibold text-zinc-100">{job.company}</span>
                    )}
                </div>
                <div className="flex flex-col gap-0.5 text-sm text-zinc-500 sm:items-end">
                    {job.period && <span>{job.period}</span>}
                    {job.employment && <span className="text-xs">{job.employment}</span>}
                </div>
            </div>
            {(job.location || job.description) && (
                <div className="mt-2 space-y-1">
                    {job.location && <p className="text-xs text-zinc-500">{job.location}</p>}
                    {job.description && <p className="text-sm leading-relaxed text-zinc-400">{job.description}</p>}
                </div>
            )}
        </motion.div>
    );
}

export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start"
            >
                <div className="shrink-0 mx-auto md:mx-0">
                    <Image
                        src="/images/gillesheinesch.png"
                        alt={profile.name}
                        width={220}
                        height={220}
                        className="rounded-2xl border border-zinc-800 object-cover shadow-xl w-40 h-40 sm:w-52 sm:h-52 md:w-[220px] md:h-[220px]"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="font-mono text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl md:text-4xl">
                        {profile.name}
                    </h1>
                    <p className="mt-2 text-lg text-cyan-400">{profile.tagline}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
                        <MapPin className="h-4 w-4" />
                        {profile.location}
                    </div>
                    <p className="mt-6 max-w-2xl leading-relaxed text-zinc-400">{profile.bio}</p>
                    <Link
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                    >
                        View LinkedIn <ExternalLink className="h-4 w-4" />
                    </Link>
                </div>
            </motion.section>

            {/* Experience */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-4"
            >
                <h2 className="mb-6 font-mono text-xl font-semibold tracking-tight text-zinc-100">Experience</h2>
                <div className="space-y-10">
                    {experienceGroups.map((group) => {
                        const jobs = experience.filter((job) => job.group === group.id);
                        if (jobs.length === 0) return null;
                        const compact = group.id === "earlier";
                        return (
                            <div key={group.id}>
                                <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-cyan-500/80">
                                    {group.label}
                                </h3>
                                {compact ? (
                                    <ul className="divide-y divide-zinc-800/80 rounded-xl border border-zinc-800/60">
                                        {jobs.map((job) => (
                                            <li
                                                key={`${job.company}-${job.role}`}
                                                className="flex flex-col gap-0.5 px-4 py-3 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:px-5"
                                            >
                                                <span className="text-zinc-400">
                                                    {job.role}{" "}
                                                    <span className="text-zinc-500">· {job.company}</span>
                                                </span>
                                                <span className="text-xs text-zinc-600">{job.period}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="space-y-4">
                                        {jobs.map((job, i) => (
                                            <ExperienceCard key={`${job.company}-${job.role}`} job={job} index={i} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </motion.section>
        </div>
    );
}
