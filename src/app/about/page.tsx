"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ExternalLink, Plane, Code2 } from "lucide-react";
import { profile, experience, skills, interests } from "@/data/about";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 flex flex-col gap-8 md:flex-row md:items-start"
      >
        <div className="shrink-0">
          <Image
            src="/images/gillesheinesch.png"
            alt={profile.name}
            width={220}
            height={220}
            className="rounded-2xl border border-zinc-800 object-cover shadow-xl"
          />
        </div>
        <div className="flex-1">
          <h1 className="font-mono text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-cyan-400">{profile.tagline}</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
            <MapPin className="h-4 w-4" />
            {profile.location}
          </div>
          <p className="mt-6 max-w-2xl leading-relaxed text-zinc-400">
            {profile.bio}
          </p>
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
        className="mb-16"
      >
        <h2 className="mb-6 font-mono text-xl font-semibold tracking-tight text-zinc-100">
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${job.role}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition-colors hover:border-cyan-500/20"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="text-sm font-medium text-cyan-500/90">
                    {job.role}
                  </span>
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
                    <span className="ml-2 font-mono font-semibold text-zinc-100">
                      {job.company}
                    </span>
                  )}
                </div>
                {job.period && (
                  <span className="text-sm text-zinc-500">{job.period}</span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {job.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills & Interests */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 md:grid-cols-2"
      >
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-cyan-500" />
            <h3 className="font-mono font-semibold text-zinc-100">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-sm text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Plane className="h-5 w-5 text-cyan-500" />
            <h3 className="font-mono font-semibold text-zinc-100">Interests</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 px-3 py-1.5 text-sm text-cyan-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
