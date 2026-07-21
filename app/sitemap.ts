import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { notes } from "@/content/notes";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...notes.map((n) => ({
      url: `${site.url}/notes/${n.slug}`,
      lastModified: new Date(n.iso),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
