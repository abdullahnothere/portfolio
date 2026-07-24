import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectArt } from "@/components/ui/project-art";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <Section id="projects" eyebrow="Selected work">
      <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">Eight case studies</h2>
      <p className="lede mb-9">
        MSc work and commercial engineering, each written up as a problem, a decision, and what I
        would do differently. Most were assessed reports rather than repositories — the writeup is
        the point.
      </p>

      <ul className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.06}>
            <li className="h-full list-none">
              <Link
                href={`/projects/${project.slug}`}
                className="card card-link group flex h-full flex-col overflow-hidden !p-0"
              >
                <div className="h-[132px] border-b border-hair bg-raised">
                  <ProjectArt seed={i} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-[1.1rem]">{project.title}</h3>
                    <ArrowUpRight size={16} className="shrink-0 text-dim transition-colors group-hover:text-mint" />
                  </div>
                  <p className="mb-3.5 flex-1 text-[0.9rem] text-muted">{project.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
