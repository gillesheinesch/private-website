"use client";

import { profile } from "@/data/about";
import { motion } from "framer-motion";
import Image from "next/image";

/** Main headline uses the site body font (Geist Sans), not the terminal block below. */
const DISPLAY_NAME = profile.name;

/** Fake “shell” lines — monospace only here to keep the aviation × code vibe. */
const CODE_LINES = ["const flight = code.takeoff();", "// First Officer B737 · Software for pilots"];

/** Stagger after the title so the hero reads name first, then the playful code snippet. */
const CODE_LINE_BASE_DELAY_S = 0.25;
const CODE_LINE_STAGGER_S = 0.25;

export function TypingHero() {
    return (
        <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-cyan-500/40 ring-offset-4 ring-offset-zinc-950 sm:h-24 sm:w-24"
            >
                <Image
                    src="/images/gillesheinesch.png"
                    alt={profile.name}
                    fill
                    sizes="96px"
                    priority
                    className="object-cover object-[35%_30%]"
                />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="inline-flex flex-wrap items-center justify-center gap-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-5xl"
            >
                <span>{DISPLAY_NAME}</span>
                <motion.span
                    aria-hidden
                    className="inline-block h-[0.9em] w-0.5 translate-y-px bg-cyan-500 sm:h-[0.85em]"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
            </motion.h1>

            <div className="font-mono text-sm leading-relaxed text-zinc-200 sm:text-lg md:text-xl">
                {CODE_LINES.map((line, i) => (
                    <motion.div
                        key={line}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: CODE_LINE_BASE_DELAY_S + i * CODE_LINE_STAGGER_S,
                            duration: 0.5,
                        }}
                        className="flex items-center justify-center gap-2"
                    >
                        <span className="text-cyan-500">&gt;</span>
                        <span>{line}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
