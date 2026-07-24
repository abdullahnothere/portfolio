export const site = {
  name: "Abdullah Hassan",
  fullName: "Syed Abdullah Hassan",
  domain: "abdullah.dev",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abdullah.dev",
  role: "Software & Cyber Security Engineer",
  tagline: "Building software I can defend as well as ship.",
  description:
    "Cyber security engineer with a software engineering background. MSc Cyber Security Engineering at the University of Warwick, after two years building enterprise platforms at GoSaaS Labs. Detection engineering, cloud and container security, penetration testing and digital forensics.",
  email: "abdullah.has126@gmail.com",
  phone: "+44 7880 993646",
  location: "Coventry, UK",
  availability: "Open to graduate roles — UK & EU, from Sept 2026",
  // TODO: replace with your real GitHub username — this drives the GitHub section.
  github: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "abdullah",
  linkedin: "https://www.linkedin.com/in/abdullahhassan01",
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/abdullah-has126/30min",
} as const;

export type ResumeVariant = {
  id: "software" | "security";
  label: string;
  pdfPath: string;
};

/**
 * Two résumé variants, shown as equal options — no default. A recruiter
 * picks the one that matches the role they're screening for.
 */
export const resumeVariants: ResumeVariant[] = [
  { id: "software", label: "Software Engineering", pdfPath: "/resume-software-engineering.pdf" },
  { id: "security", label: "Cyber Security", pdfPath: "/resume-cyber-security.pdf" },
];

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
