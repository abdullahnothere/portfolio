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
    period: "2025 to Sept 2026",
    current: true,
    summary:
      "Proactive Cyber Defence, Ethical Hacking, Cloud Security, Network Security, Digital Forensics, Applied Cryptography, Compliance Risk and Governance.",
    points: [
      "Dissertation: built a four host adversary emulation lab reproducing an eleven stage Ransomware-as-a-Service attack chain mapped to MITRE ATT&CK, then ran a twenty-one run controlled experiment across four initial access vectors and two endpoint protection states to measure what a Wazuh SIEM detects and what it misses",
      "Authored twenty custom Wazuh correlation rules spanning single event, burst and cross-stage logic; traced rules that were silently failing to fire to a rule chaining and precedence defect, repaired it, and validated the fix with a controlled before and after retest",
      "Quantified endpoint protection as a controlled variable: Microsoft Defender alerted on 3 of 11 attack stages in 3 to 22 milliseconds, roughly a thousand times faster than SIEM ingestion, but fully prevented only 1 of 11, which became the evidence base for the defence in depth recommendations",
      "Automated the experiment pipeline in Python: run orchestration, SHA-256 evidence manifesting, NDJSON structured logging with schema provenance, and results aggregation from raw logs into an evaluation table",
      "Coursework spanning detection engineering, penetration testing, container security, OT risk assessment and digital forensics",
    ],
  },
  {
    org: "GoSaaS Labs (Renesas, Fluke and Tektronix accounts)",
    title: "Software Engineer",
    period: "Jul 2023 to Aug 2025",
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
    org: "FAST National University of Computer and Emerging Sciences",
    title: "Database Lab Instructor",
    period: "Jan 2024 to Jul 2025",
    summary: "Taught database systems alongside full-time engineering work.",
    points: [
      "Taught database systems to over 100 students and was the person they came to when something broke, adapting the explanation to whoever was asking",
    ],
  },
  {
    org: "Infinikorn",
    title: "Associate Software Engineer",
    period: "Oct 2022 to Dec 2022",
    summary: "Promoted from intern within two months.",
    points: ["Built and maintained web applications using Ruby on Rails, PostgreSQL and Docker"],
  },
  {
    org: "FAST National University of Computer and Emerging Sciences",
    title: "BSc Computer Science",
    period: "2019 to Aug 2023",
    summary: "",
    points: [],
  },
];

export const certifications = [
  "CompTIA Security+ (scheduled 2026)",
  "Oracle Cloud Infrastructure 2023 AI Certified Foundations Associate",
  "AWS Cloud Practitioner Essentials (AWS Skill Builder)",
];
