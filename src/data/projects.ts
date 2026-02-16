/** Single source of truth for projects — used by Projects page and landing terminal */

export interface Project {
  title: string;
  tagline: string;
  description: string;
  labels: string[];
  position: string;
  period: string;
  website: string;
  github: string;
}

export const projects: Project[] = [
  {
    title: "Pilotflows",
    tagline: "Aviation management platform",
    description:
      "Complete aviation management platform for pilots, skydivers, flight schools, and aviation organizations. EASA & FAA compliant logbooks, aircraft management, and dropzone operations — one connected platform.",
    labels: ["Next.js", "React", "Aviation"],
    position: "Co-Founder",
    period: "Jan 2025 — Present",
    website: "https://pilotflows.com",
    github: "",
  },
  {
    title: "FrëschKëscht S.à r.l.",
    tagline: "Luxembourgish gift boxes",
    description:
      "Founded from a school project (Kontest 2020 winner). Curated gift boxes with 100% Luxembourgish products — from produce to Christmas boxes for companies and private customers.",
    labels: ["Odoo", "Business", "E-commerce"],
    position: "Co-Founder",
    period: "Oct 2019 — Jan 2025",
    website: "https://www.freschkescht.lu",
    github: "",
  },
  {
    title: "WeConnect S.à r.l.",
    tagline: "Student housing platform",
    description:
      "Platform connecting students seeking affordable housing with local hosts who have spare rooms, fostering meaningful intergenerational cohabitation and social support.",
    labels: ["Wordpress", "Business"],
    position: "Co-Founder",
    period: "Sep 2022 — Jan 2025",
    website: "https://www.weconnect.lu",
    github: "",
  },
  {
    title: "Dahindo a.s.b.l.",
    tagline: "Fighting hunger, education access",
    description:
      "Nonprofit fighting hunger and improving education access for underprivileged communities in Indonesia. Fundraising, team building.",
    labels: ["Wordpress", "Non-profit"],
    position: "Co-Founder",
    period: "Oct 2022 — Present",
    website: "https://www.dahindo.com",
    github: "",
  },
  {
    title: "RosterX Web Application",
    tagline: "Flight crew calendar parser",
    description:
      "Parses flight crew schedules into .ics files, allowing users to import their rosters into their preferred calendar application.",
    labels: ["React", "Tailwind CSS", "Node.js"],
    position: "Developer",
    period: "",
    website: "https://icalweb.heinesch.com/",
    github: "",
  },
];
