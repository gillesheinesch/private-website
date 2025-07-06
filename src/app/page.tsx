import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const skills = ["TypeScript", "React", "Next.js", "Node.js", "Docker", "MongoDB", "AWS", "Git", "CI/CD", "REST APIs"];

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="container px-4 py-20 mx-auto max-w-6xl">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Gilles Heinesch</h1>
                        <p className="text-xl md:text-2xl text-muted-foreground">
                            Full-Stack Developer & Software Engineer
                        </p>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        I create modern, scalable web applications with a focus on performance, user experience, and
                        clean code. Passionate about aviation and technology.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                        <Link href="/projects">
                            <Button size="lg">
                                View My Work
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="outline" size="lg">
                                About Me
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="container px-4 py-16 mx-auto max-w-6xl">
                <div className="text-center space-y-8">
                    <h2 className="text-3xl font-bold">Technologies & Skills</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill) => (
                            <span key={skill} className="px-4 py-2 bg-muted rounded-full text-sm font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="container px-4 py-16 mx-auto max-w-6xl">
                <div className="text-center space-y-8">
                    <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
                    <p className="text-lg text-muted-foreground">
                        Feel free to reach out if you&apos;d like to discuss technology, aviation, or just connect
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link href="mailto:gilles@heinesch.com">
                            <Button variant="outline" size="lg">
                                <Mail className="mr-2 h-4 w-4" />
                                Email Me
                            </Button>
                        </Link>
                        <Link href="https://linkedin.com/in/gilles-heinesch" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg">
                                <Linkedin className="mr-2 h-4 w-4" />
                                LinkedIn
                            </Button>
                        </Link>
                        <Link href="https://github.com/gillesheinesch" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
