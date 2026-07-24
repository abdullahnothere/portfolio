export type Role = {
  org: string;
  title: string;
  period: string;
  current?: boolean;
  summary: string;
  points: string[];
};

export const experience: Role[] = [
  {
    org: "University of Warwick",
    title: "MSc Cyber Security Engineering",
    period: "2025 — Sept 2026",
    current: true,
    summary:
      "Proactive Cyber Defence, Ethical Hacking, Cloud Security, Network Security, Digital Forensics, Applied Cryptography, Compliance Risk and Governance.",
    points: [
      "Dissertation: measuring detection latency for early ransomware detection across endpoint, identity and network telemetry",
      "Coursework spanning detection engineering, penetration testing, container security, OT risk assessment and digital forensics",
    ],
  },
  {
    org: "GoSaaS Labs — Renesas, Fluke and Tektronix accounts",
    title: "Software Engineer",
    period: "Jul 2023 — Aug 2025",
    summary: "Enterprise platforms serving three global clients.",
    points: [
      "Investigated and resolved production incidents across enterprise platforms serving three global clients, working from application behaviour, system logs and error output under time pressure",
      "Led a security overhaul on a document archiving platform, building the control into the existing developer workflow rather than bolting it on afterwards",
      "Built role-based access control and secure search from scratch, so users only reached data they were cleared for",
      "Deployed and managed services on AWS with Docker and Kubernetes across CI/CD pipelines",
      "Built and maintained backend services and REST APIs in Node.js, React, PostgreSQL and MongoDB; improved application performance by around 30% by refactoring legacy aggregation pipelines",
      "Mentored two junior developers through onboarding and kept team documentation current",
    ],
  },
  {
    org: "FAST — National University of Computer and Emerging Sciences",
    title: "Database Lab Instructor",
    period: "Jan 2024 — Jul 2025",
    summary: "Taught database systems alongside full-time engineering work.",
    points: [
      "Taught database systems to over 100 students and was the person they came to when something broke, adapting the explanation to whoever was asking",
    ],
  },
  {
    org: "Infinikorn",
    title: "Associate Software Engineer",
    period: "Oct 2022 — Dec 2022",
    summary: "Promoted from intern within two months.",
    points: ["Built and maintained web applications using Ruby on Rails, PostgreSQL and Docker"],
  },
  {
    org: "FAST — National University of Computer and Emerging Sciences",
    title: "BSc Computer Science",
    period: "2019 — Aug 2023",
    summary: "",
    points: [],
  },
];

export const certifications = [
  "CompTIA Security+ — scheduled 2026",
  "Oracle Cloud Infrastructure 2023 AI Certified Foundations Associate",
  "AWS Cloud Practitioner Essentials (AWS Skill Builder)",
];
