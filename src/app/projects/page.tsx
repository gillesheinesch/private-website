import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Projects",
  description:
    "Projects by Gilles Heinesch — FrëschKëscht, WeConnect, Dahindo, RosterX and more.",
};

const projects = [
  {
    title: "FrëschKëscht S.à r.l.",
    description:
      "FrëschKëscht creates curated gift boxes filled with high-quality, 100% Luxembourgish products, offering eco-friendly, locally sourced treats perfect for any occasion.",
    labels: ["Odoo", "Business", "E-commerce"],
    position: "Co-Founder",
    website: "https://www.freschkescht.lu",
    github: "",
  },
  {
    title: "WeConnect S.à r.l.",
    description:
      "WeConnect is a platform that connects students seeking affordable housing with local hosts who have spare rooms, fostering meaningful intergenerational cohabitation and social support.",
    labels: ["Wordpress", "Business"],
    position: "Co-Founder",
    website: "https://www.weconnect.lu",
    github: "",
  },
  {
    title: "Dahindo a.s.b.l.",
    description:
      "Dahindo is a nonprofit organization dedicated to fighting hunger and improving access to education for underprivileged communities in Indonesia.",
    labels: ["Wordpress", "Non-profit"],
    position: "Co-Founder",
    website: "https://www.dahindo.com",
    github: "",
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

export default function ProjectsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12">
        <h1 className="font-mono text-3xl font-bold tracking-tight md:text-4xl">
          Projects
        </h1>
        <p className="mt-2 text-cockpit-600 dark:text-cockpit-400">
          Flight logs — things I&apos;ve built or co-founded.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="flex h-full flex-col transition-shadow hover:shadow-md dark:border-cockpit-800"
          >
              <CardContent className="flex flex-1 flex-col p-6">
                <span className="text-xs font-medium uppercase tracking-wider text-cockpit-500 dark:text-cockpit-400">
                  {project.position}
                </span>
                <h2 className="mt-1 font-mono text-xl font-semibold text-cockpit-900 dark:text-cockpit-100">
                  {project.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-cockpit-600 dark:text-cockpit-400">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.labels.map((label) => (
                    <Badge key={label} variant="secondary">
                      {label}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Website
                      </Button>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="inline-flex items-center gap-1"
                      >
                        <Github className="h-3.5 w-3.5" />
                        GitHub
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
