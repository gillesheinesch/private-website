"use client";

/** Subtle aviation-inspired grid — runway/nav style */
export function CockpitGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(34 211 238) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(34 211 238) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
