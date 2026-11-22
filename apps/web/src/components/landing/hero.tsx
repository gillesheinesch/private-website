"use client";

import { TypingHero } from "@/components/landing/typing-hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Code2, FileText, User } from "lucide-react";
import Link from "next/link";

const LINKS = [
    { href: "/projects", label: "Projects", icon: Code2 },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/about", label: "About", icon: User },
];

/** Landing hero — photo, name, code tagline, intro and primary links */
export function Hero() {
    return (
        <section className="relative flex min-h-[55vh] flex-col items-center justify-center px-4 py-8 sm:min-h-[70vh] sm:px-6 sm:py-16 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex max-w-2xl flex-col items-center text-center"
            >
                <TypingHero />
                <p className="mt-4 max-w-md text-center font-sans text-sm text-zinc-400 sm:mt-6 sm:text-base">
                    I fly the Boeing 737 for Luxair and build software for pilots and flight crews. Explore my
                    projects, read the blog, or say hi.
                </p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-4"
                >
                    {LINKS.map((link, i) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.08 }}
                        >
                            <Link
                                href={link.href}
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "lg" }),
                                    "gap-2 border-cyan-500/40 px-4 text-cyan-400 transition-colors hover:bg-cyan-500/10 hover:border-cyan-500/60 sm:px-8",
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
