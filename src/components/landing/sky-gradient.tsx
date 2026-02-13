"use client";

/** Sky gradient overlay for aviation theme */
export function SkyGradient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-100/50 via-transparent to-transparent dark:from-sky-950/30"
      aria-hidden
    />
  );
}
