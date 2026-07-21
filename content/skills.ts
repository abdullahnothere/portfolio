export type SkillGroup = { title: string; note: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Software engineering",
    note: "Where most of my commercial time has gone.",
    items: ["TypeScript", "JavaScript", "React", "Node.js", "Python", "SQL", "PostgreSQL", "REST"],
  },
  {
    title: "Cloud & infrastructure",
    note: "Enough to run what I build, and to reason about its blast radius.",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    title: "Cyber security",
    note: "Split between detection engineering and application security.",
    items: ["Splunk", "Wazuh", "Burp Suite", "Wireshark", "MITRE ATT&CK", "Sigma", "Kali Linux", "Nmap"],
  },
  {
    title: "Networking",
    note: "From the MSc, and from breaking my own lab repeatedly.",
    items: ["TCP/IP", "DNS", "OSPF", "Firewalls", "ACLs", "VLANs"],
  },
];
