import { Briefcase, Calendar, Code, Heart, MapPin, Plane, User } from "lucide-react";
import Image from "next/image";

export default function About() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">About Me</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Passionate developer and aviation enthusiast dedicated to creating innovative solutions and
                    exploring new technologies.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-12 lg:grid-cols-3">
                {/* Profile Image and Basic Info */}
                <div className="lg:col-span-1">
                    <div className="text-center">
                        <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-border">
                            <Image
                                src="/gillesheinesch.jpg"
                                alt="Gilles Heinesch"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Gilles Heinesch</h2>
                        <p className="text-lg text-muted-foreground mb-6">Full-Stack Developer & Software Engineer</p>

                        {/* Quick Facts */}
                        <div className="space-y-3 text-left">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">Luxembourg</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Briefcase className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">Luxair S.A.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">Not available for projects</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Introduction */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <User className="h-5 w-5" />
                            <h3 className="text-xl font-semibold">Introduction</h3>
                        </div>
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                I&apos;m a passionate full-stack developer with a love for creating elegant, efficient
                                solutions to complex problems. My journey in technology began with a curiosity about how
                                things work, which has evolved into a career dedicated to building exceptional web
                                applications and software systems.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                When I&apos;m not coding, you&apos;ll find me exploring the world of aviation, running
                                through Luxembourg&apos;s beautiful landscapes, or diving into the latest tech
                                innovations. I believe in continuous learning and am always excited to take on new
                                challenges.
                            </p>
                        </div>
                    </section>

                    {/* Professional Background */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Code className="h-5 w-5" />
                            <h3 className="text-xl font-semibold">Professional Focus</h3>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="p-4 rounded-lg bg-muted/50">
                                <h4 className="font-medium mb-2">Frontend Development</h4>
                                <p className="text-sm text-muted-foreground">
                                    React, Next.js, TypeScript, Tailwind CSS, and modern UI frameworks
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50">
                                <h4 className="font-medium mb-2">Backend Development</h4>
                                <p className="text-sm text-muted-foreground">
                                    Node.js, Python, databases, APIs, and cloud infrastructure
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50">
                                <h4 className="font-medium mb-2">DevOps & Tools</h4>
                                <p className="text-sm text-muted-foreground">
                                    Docker, CI/CD, Git, cloud platforms, and automation
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50">
                                <h4 className="font-medium mb-2">Aviation Industry</h4>
                                <p className="text-sm text-muted-foreground">
                                    Working at Luxair S.A., bringing tech solutions to aviation
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Interests & Hobbies */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="h-5 w-5" />
                            <h3 className="text-xl font-semibold">Interests & Hobbies</h3>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="text-center p-4">
                                <Plane className="h-8 w-8 mx-auto mb-2 text-primary" />
                                <h4 className="font-medium mb-1">Aviation</h4>
                                <p className="text-xs text-muted-foreground">
                                    Professional interest and personal passion
                                </p>
                            </div>
                            <div className="text-center p-4">
                                <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
                                <h4 className="font-medium mb-1">Programming</h4>
                                <p className="text-xs text-muted-foreground">Always learning new technologies</p>
                            </div>
                            <div className="text-center p-4">
                                <svg
                                    className="h-8 w-8 mx-auto mb-2 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                <h4 className="font-medium mb-1">Running</h4>
                                <p className="text-xs text-muted-foreground">Staying active and exploring nature</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
                <div className="p-8 rounded-lg bg-muted/30 border">
                    <h3 className="text-xl font-semibold mb-2">Let&apos;s Connect</h3>
                    <p className="text-muted-foreground mb-4">
                        I&apos;m always interested in discussing technology, aviation, or just having a conversation
                        about shared interests.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:gilles@heinesch.com"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            Get in Touch
                        </a>
                        <a
                            href="/projects"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors"
                        >
                            View My Work
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
