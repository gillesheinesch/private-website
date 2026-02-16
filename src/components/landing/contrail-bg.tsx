"use client";

import { motion } from "framer-motion";

export function ContrailBg() {
  const trails = [
    { x: "10%", delay: 0, dur: 4 },
    { x: "40%", delay: 1.5, dur: 5 },
    { x: "70%", delay: 0.8, dur: 4.5 },
    { x: "85%", delay: 2, dur: 6 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {trails.map((t, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          style={{ left: t.x, width: "30%" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: [0, 0.4, 0.15],
            y: [0, 100, 200],
          }}
          transition={{
            duration: t.dur,
            delay: t.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  );
}
