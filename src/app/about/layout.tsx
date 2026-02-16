import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Gilles Heinesch — aviation enthusiast, web developer, co-founder. Luxembourg. Luxair, Pilotflows, FrëschKëscht, WeConnect.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
