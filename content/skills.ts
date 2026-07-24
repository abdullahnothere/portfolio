export type SkillGroup = { title: string; note: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Detection and monitoring",
    note: "Writing detection logic, then tuning it so people still read the alerts.",
    items: [
      "Splunk (SPL)", "Wazuh", "Sysmon", "Microsoft Defender", "Windows Event Logs",
      "Alert triage", "Log correlation", "Threat hunting", "MITRE ATT&CK", "MITRE D3FEND",
    ],
  },
  {
    title: "Cloud and container security",
    note: "Enough to run what I build, and to reason about its blast radius.",
    items: [
      "AWS", "Docker", "Kubernetes", "Trivy", "Grype", "Dockle", "Hadolint",
      "Docker Bench Security", "CIS Benchmarks", "NIST SP 800-190", "OWASP Top 10",
    ],
  },
  {
    title: "Offensive security",
    note: "Testing a boundary from the outside, because a diagram is a claim, not evidence.",
    items: [
      "Nmap", "Metasploit", "Burp Suite", "sqlmap", "Gobuster", "ffuf",
      "Kali Linux", "PTES", "OWASP Testing Guide", "CVSS",
    ],
  },
  {
    title: "Digital forensics",
    note: "Correlating artefacts rather than trusting any single source.",
    items: [
      "Autopsy", "FTK Imager", "Registry Explorer", "JumpList Explorer",
      "ShellBag Explorer", "Timeline reconstruction", "Evidence handling",
    ],
  },
  {
    title: "Risk and governance",
    note: "Framework selection is most of the work and gets the least attention.",
    items: [
      "Threat modelling", "Risk registers", "IEC 62443", "ISO 27001", "ISO 27005",
      "NIST CSF", "ISO 21434", "UK NIS Regulations", "GDPR",
    ],
  },
  {
    title: "Networking and identity",
    note: "From the MSc, and from breaking my own lab repeatedly.",
    items: [
      "TCP/IP", "DNS", "DHCP", "VPN", "SMB", "OSPF", "VLANs", "ACLs",
      "Firewalls", "Network segmentation", "RBAC", "AAA and TACACS+",
    ],
  },
  {
    title: "Engineering",
    note: "Two years of it commercially, which is why security problems look like systems problems.",
    items: [
      "Python", "Bash", "TypeScript", "JavaScript", "SQL", "Node.js", "React",
      "PostgreSQL", "MongoDB", "REST APIs", "Git", "CI/CD", "Linux",
    ],
  },
];
