import { ButtonLink } from "@/components/ui/button";
import { CodePanel } from "@/components/ui/code-panel";
import { ResumeDropdown } from "@/components/resume-dropdown";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

export function Hero() {
  const hardening = getProject("container-security-hardening")!;

  return (
    <section id="home" className="grid scroll-mt-24 grid-cols-1 items-center gap-14 py-24 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-hair px-3.5 py-1.5 text-[0.8rem] text-muted">
          <span aria-hidden className="h-[7px] w-[7px] animate-pulse-ring rounded-full bg-mint" />
          {site.availability}
        </p>

        <h1 className="max-w-[14ch] text-[clamp(2.6rem,5.4vw,4.3rem)]">
          Building software I can <span className="text-mint">defend</span> as well as ship.
        </h1>

        <p className="my-7 max-w-[52ch] text-muted">
          I&apos;m Abdullah, finishing an MSc in Cyber Security Engineering at the University of
          Warwick, after two years as a software engineer building backend services and APIs at
          GoSaaS Labs. Now split between detection engineering, container security and forensics,
          approached as systems problems because that is where I came from.
        </p>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/#projects" variant="primary">View projects</ButtonLink>
          <ResumeDropdown label="Download résumé" />
          <ButtonLink href="/#meeting">Book a meeting</ButtonLink>
        </div>
      </div>

      {/*
        The thesis of the page: an artifact, not a portrait.
        Deliberately NOT wrapped in <Reveal>. Above-the-fold content must never
        depend on JavaScript to become visible — if hydration fails, a
        scroll-reveal wrapper leaves this permanently at opacity 0.
      */}
      <CodePanel
        filename="Dockerfile: container hardening"
        variant="diff"
        lines={hardening.snippet!.lines}
        footer={hardening.metrics}
      />
    </section>
  );
}
