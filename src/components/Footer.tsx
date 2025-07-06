"use client";
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <footer className="w-full border-t bg-background">
            <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:py-8">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <p className="text-sm text-muted-foreground">
                        &copy; {currentYear} Gilles Heinesch. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground">Built with Next.js, TypeScript, and Tailwind CSS.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    <Link
                        href="https://github.com/gillesheinesch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub Profile"
                    >
                        <Github className="h-5 w-5" />
                    </Link>

                    <Link
                        href="https://linkedin.com/in/gilles-heinesch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin className="h-5 w-5" />
                    </Link>

                    <Link
                        href="mailto:gilles@heinesch.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Email Contact"
                    >
                        <Mail className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
