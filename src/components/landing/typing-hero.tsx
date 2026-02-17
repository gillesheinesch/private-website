"use client";

import { motion } from "framer-motion";

const LINES = [
  "const flight = code.takeoff();",
  "// Aviation enthusiast · Web developer",
  "→ Gilles Heinesch",
];

export function TypingHero() {
  return (
    <div className="font-mono text-base leading-relaxed text-zinc-200 sm:text-lg md:text-xl">
      {LINES.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.4, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="text-cyan-500">&gt;</span>
          <span>{line}</span>
          {i === LINES.length - 1 && (
            <motion.span
              className="inline-block h-4 w-0.5 bg-cyan-500"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
