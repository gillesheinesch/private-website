/** Single source of truth for projects — used by Projects page and landing terminal */

export interface Project {
  title: string;
  tagline: string;
  description: string;
  labels: string[];
  position: string;
  website: string;
  github: string;
}

export const projects: Project[] = [
  {
    title: "Pilotflows",
    tagline: "Aviation management platform",
    description:
      "Complete aviation management platform for pilots, skydivers, flight schools, and aviation organizations. EASA & FAA compliant logbooks, aircraft management, and dropzone operations — one connected platform. Launched 2026.",
    labels: ["Next.js", "React", "Aviation"],
    position: "Co-Founder",
    website: "https://pilotflows.com",
    github: "",
  },
  {
    title: "FrëschKëscht S.à r.l.",
    tagline: "Luxembourgish gift boxes",
    description:
      "FrëschKëscht creates curated gift boxes filled with high-quality, 100% Luxembourgish products, offering eco-friendly, locally sourced treats perfect for any occasion.",
    labels: ["Odoo", "Business", "E-commerce"],
    position: "Co-Founder",
    website: "https://www.freschkescht.lu",
    github: "",
  },
  {
    title: "WeConnect S.à r.l.",
    tagline: "Student housing platform",
    description:
      "WeConnect is a platform that connects students seeking affordable housing with local hosts who have spare rooms, fostering meaningful intergenerational cohabitation and social support.",
    labels: ["Wordpress", "Business"],
    position: "Co-Founder",
    website: "https://www.weconnect.lu",
    github: "",
  },
  {
    title: "Dahindo a.s.b.l.",
    tagline: "Fighting hunger, education access",
    description:
      "Dahindo is a nonprofit organization dedicated to fighting hunger and improving access to education for underprivileged communities in Indonesia.",
    labels: ["Wordpress", "Non-profit"],
    position: "Co-Founder",
    website: "https://www.dahindo.com",
    github: "",
  },
  {
    title: "RosterX Web Application",
    tagline: "Flight crew calendar parser",
    description:
      "RosterX parses flight crew schedules into .ics files, allowing users to import their rosters into their preferred calendar application.",
    labels: ["React", "Tailwind CSS", "Node.js"],
    position: "Developer",
    website: "https://icalweb.heinesch.com/",
    github: "",
  },
];
