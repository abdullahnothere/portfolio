export const site = {
  name: "Abdullah",
  domain: "abdullah.dev",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abdullah.dev",
  role: "Software & Cyber Security Engineer",
  tagline: "Building software I can defend as well as ship.",
  description:
    "Software engineer and MSc Cyber Security student at the University of Warwick. Backend engineering, cloud, detection engineering, and secure software delivery.",
  email: "abdullah.has126@gmail.com",
  location: "Coventry, UK",
  availability: "Open to graduate roles — UK & EU, from Sept 2026",
  github: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "abdullah",
  linkedin: "https://www.linkedin.com/in/abdullahhassan01",
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/abdullah/15min",
  resumePath: "/Abdullah_Hassan_Resume_Amazon_AppSec.docx",
} as const;

export const navItems = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Research", href: "/#research" },
  { label: "Notes", href: "/#notes" },
  { label: "GitHub", href: "/#github" },
  { label: "Résumé", href: "/resume" },
  { label: "Contact", href: "/#contact" },
] as const;

export const sectionIds = [
  "home", "about", "skills", "projects", "experience",
  "research", "notes", "github", "contact", "meeting",
] as const;
