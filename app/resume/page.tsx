import type { Metadata } from "next";
import { Download, Printer } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { experience } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import { site } from "@/content/site";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé for ${site.name}, ${site.role}.`,
  alternates: { canonical: `${site.url}/resume` },
};

export default function ResumePage() {
  return (
    <div className="wrap py-14 pb-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mint">Résumé</p>
          <h1 className="text-[clamp(2rem,4vw,2.8rem)]">One page, kept current</h1>
        </div>
        <div className="no-print flex flex-wrap gap-2.5">
          <ButtonLink href={site.resumePath} variant="primary" download>
            <Download size={15} /> Download PDF
          </ButtonLink>
          <PrintButton>
            <Printer size={15} /> Print
          </PrintButton>
        </div>
      </div>

      {/*
        An HTML résumé rather than an embedded PDF viewer: it is readable on a
        phone, selectable, indexable, and prints cleanly. The PDF is still one
        click away for anyone who needs to attach it to an ATS.
      */}
      <article className="mx-auto max-w-[780px] rounded-xl border border-hair bg-surface p-9 shadow-lift max-sm:p-6">
        <header>
          <h2 className="text-[1.6rem]">{site.name}</h2>
          <p className="text-[0.92rem] text-muted">{site.role} · {site.location}</p>
          <p className="mt-1 font-mono text-[0.76rem] text-dim">
            {site.email} · github.com/{site.github}
          </p>
        </header>

        <Rule />
        <SectionTitle>Profile</SectionTitle>
        <p className="text-[0.92rem] text-muted">
          Software engineer with two years of commercial backend experience, currently completing an MSc
          in Cyber Security Engineering. Comfortable owning a service end to end: designing it, shipping
          it, and being on the rota when it misbehaves.
        </p>

        <Rule />
        <SectionTitle>Experience &amp; education</SectionTitle>
        {experience.map((role) => (
          <div key={role.title} className="mb-5 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h4 className="text-[0.98rem]">{role.title}</h4>
              <span className="font-mono text-[0.72rem] text-mint">{role.period}</span>
            </div>
            <p className="text-[0.86rem] text-dim">{role.org}</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[0.89rem] text-muted">
              {role.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        ))}

        <Rule />
        <SectionTitle>Skills</SectionTitle>
        <dl className="space-y-2 text-[0.89rem]">
          {skillGroups.map((g) => (
            <div key={g.title} className="sm:flex sm:gap-4">
              <dt className="min-w-[170px] font-medium">{g.title}</dt>
              <dd className="text-muted">{g.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </article>
    </div>
  );
}

const Rule = () => <hr className="my-5 border-hair" />;
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-2.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-mint">
    {children}
  </h3>
);
