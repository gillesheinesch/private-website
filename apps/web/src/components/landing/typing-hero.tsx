"use client";

import { motion } from "framer-motion";

/** Main headline uses the site body font (Geist Sans), not the terminal block below. */
const DISPLAY_NAME = "Gilles Heinesch";

/** Fake “shell” lines — monospace only here to keep the aviation × code vibe. */
const CODE_LINES = ["const flight = code.takeoff();", "// Aviation enthusiast · Web developer"];

/** Stagger after the title so the hero reads name first, then the playful code snippet. */
const CODE_LINE_BASE_DELAY_S = 0.35;
const CODE_LINE_STAGGER_S = 0.4;

export function TypingHero() {
    return (
        <div className="flex flex-col items-center gap-4 text-center">
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

            <div className="font-mono text-base leading-relaxed text-zinc-200 sm:text-lg md:text-xl">
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
                        {/* Blinking caret stays on the name; terminal lines end without a second cursor */}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
