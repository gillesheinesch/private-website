import { Building, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "Tegi S.à r.l.-S.",
        description:
            "Tegi is a technology solutions company specializing in modern web applications, system monitoring, and digital infrastructure for businesses.",
        tags: ["Technology", "Business", "Web Development", "Infrastructure"],
        category: "Business",
        role: "Co-Founder",
        year: "2025",
        status: "Active",
        website: "https://www.tegi.lu",
        github: "",
        image: "/projects/tegi.jpg",
        featured: true,
    },
    {
        title: "Dahindo a.s.b.l.",
        description:
            "Dahindo is a nonprofit organization dedicated to fighting hunger and improving access to education for underprivileged communities in Indonesia.",
        tags: ["WordPress", "Non-profit", "Education", "Social Impact"],
        category: "Non-profit",
        role: "Co-Founder",
        year: "2021",
        status: "Active",
        website: "https://www.dahindo.com",
        github: "",
        image: "/projects/dahindo.jpg",
        featured: true,
    },
    {
        title: "FrëschKëscht S.à r.l.",
        description:
            "FrëschKëscht created curated gift boxes filled with high-quality, 100% Luxembourgish products, offering eco-friendly, locally sourced treats perfect for any occasion.",
        tags: ["Odoo", "Business", "E-commerce", "Sustainability"],
        category: "Business",
        role: "Co-Founder",
        year: "2023-2025",
        status: "Completed",
        website: "https://www.freschkescht.lu",
        github: "",
        image: "/projects/freschkescht.jpg",
        featured: true,
    },
    {
        title: "WeConnect S.à r.l.",
        description:
            "WeConnect was a platform that connected students seeking affordable housing with local hosts who had spare rooms, fostering meaningful intergenerational cohabitation and social support.",
        tags: ["WordPress", "Business", "Housing", "Community"],
        category: "Business",
        role: "Co-Founder",
        year: "2022-2025",
        status: "Completed",
        website: "https://www.weconnect.lu",
        github: "",
        image: "/projects/weconnect.jpg",
        featured: true,
    },
    {
        title: "RosterX Web Application",
        description:
            "RosterX parses flight crew schedules into .ics files, allowing users to import their rosters into their preferred calendar application.",
        labels: ["React", "Tailwind CSS", "Node.js"],
        position: "Developer",
        website: "",
        github: "",
    },
];

export default function Projects() {
    return (
        <div className="container mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    A collection of my work spanning business ventures and social impact initiatives.
                </p>
            </div>

            {/* Projects */}
            <section className="mb-16">
                <div className="flex items-center gap-2 mb-8">
                    <Building className="h-6 w-6" />
                    <h2 className="text-2xl font-semibold">Projects</h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
                        >
                            {/* Project Image Placeholder */}
                            <div className="aspect-video bg-muted relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary/70">
                                        {project.title
                                            .split(" ")
                                            .map((word) => word[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </span>
                                </div>
                                {project.status === "Active" && (
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                                            Active
                                        </span>
                                    </div>
                                )}
                                {project.status === "Completed" && (
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                                            Completed
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="mb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-muted-foreground uppercase tracking-wide">
                                            {project.role}
                                        </span>
                                        <span className="text-sm text-muted-foreground">{project.year}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                </div>

                                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 3 && (
                                        <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                                            +{project.tags.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    {project.website && (
                                        <Link
                                            href={project.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            Website
                                        </Link>
                                    )}
                                    {project.github && (
                                        <Link
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                                        >
                                            <Github className="h-3 w-3" />
                                            GitHub
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
