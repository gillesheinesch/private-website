"use client";

import { motion } from "framer-motion";

const LINES = [
  "const flight = code.takeoff();",
  "// Aviation enthusiast · Web developer",
  "→ Gilles Heinesch",
];

/** Typing-style hero lines with cursor blink */
export function TypingHero() {
  return (
    <div className="font-mono text-lg leading-relaxed md:text-xl">
      {LINES.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.4, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="text-sky-500 dark:text-sky-400">{">"}</span>
          <span className="text-cockpit-800 dark:text-cockpit-200">{line}</span>
          {i === LINES.length - 1 && (
            <motion.span
              className="inline-block h-4 w-0.5 bg-sky-500"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
