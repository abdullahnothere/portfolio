import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects, getProject } from "@/content/projects";
import { CodePanel } from "@/components/ui/code-panel";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `${site.url}/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <article className="wrap py-14 pb-24">
      <Link href="/#projects" className="mb-7 inline-flex items-center gap-2 text-[0.88rem] text-mint">
        <ArrowLeft size={15} /> All projects
      </Link>

      <p className="mb-3.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mint">
        {project.kind} case study · {project.year}
      </p>
      <h1 className="mb-4 max-w-[18ch] text-[clamp(2rem,4vw,3rem)]">{project.title}</h1>
      <p className="max-w-[64ch] text-muted">{project.summary}</p>

      {project.snippet ? (
        <CodePanel
          className="mt-9 max-w-[760px]"
          filename={project.snippet.filename}
          variant="diff"
          lines={project.snippet.lines}
          footer={project.metrics}
        />
      ) : null}

      <div className="mt-11 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_280px]">
        <div className="space-y-1">
          <Block title="Problem"><p>{project.problem}</p></Block>
          <Block title="Context"><p>{project.context}</p></Block>
          <Block title="Solution"><p>{project.solution}</p></Block>
          <Block title="Technical decisions">
            <ul className="list-disc space-y-2 pl-5">
              {project.decisions.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </Block>
          <Block title="Challenges"><p>{project.challenges}</p></Block>
          <Block title="What I'd do differently"><p>{project.lessons}</p></Block>
        </div>

        <aside className="card sticky top-24 rounded-xl">
          <Meta title="Technologies">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </Meta>

          {project.metrics ? (
            <Meta title="At a glance">
              <dl className="space-y-1.5 text-[0.85rem]">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex justify-between gap-3">
                    <dt className="text-muted">{m.label}</dt>
                    <dd className="font-mono text-[0.78rem] text-mint">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Meta>
          ) : null}

          {project.repo || project.demo ? (
            <Meta title="Links">
              <div className="grid gap-2">
                {project.repo ? (
                  <ButtonLink href={project.repo} size="sm" external>
                    <Github size={14} /> Repository
                  </ButtonLink>
                ) : null}
                {project.demo ? (
                  <ButtonLink href={project.demo} size="sm" external>
                    <ExternalLink size={14} /> Live demo
                  </ButtonLink>
                ) : null}
              </div>
            </Meta>
          ) : null}
        </aside>
      </div>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="max-w-prose">
      <h2 className="mb-2 mt-8 text-[1.05rem] text-mint">{title}</h2>
      <div className="text-[0.96rem] text-muted">{children}</div>
    </section>
  );
}

function Meta({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <h3 className="mb-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-dim">{title}</h3>
      {children}
    </div>
  );
}
