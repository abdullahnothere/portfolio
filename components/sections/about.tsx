import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/content/experience";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <Section id="about" eyebrow="About">
      <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
        <div>
          <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">I like systems I can reason about.</h2>
          <div className="space-y-4">
            <p className="lede">
              I spent two years as a software engineer on enterprise platforms before moving into
              security, and that order matters. Most security problems I meet turn out to be systems
              problems wearing a different hat: a permissive default, a boundary nobody drew, a log
              that says nothing useful at the moment you need it to.
            </p>
            <p className="lede">
              At GoSaaS Labs I worked across three global client accounts, built role-based access
              control and secure search from scratch, and sat with production incidents where the only
              information available was application behaviour and error output. That is where the
              interest came from. Tracing an incident back to the decision that allowed it is habit-forming.
            </p>
            <p className="lede">
              Now the work is detection engineering, container hardening, penetration testing and
              forensics. I taught database systems to over a hundred students alongside the engineering
              job. Explaining something badly is the fastest way to find out you do not understand it.
            </p>
          </div>
        </div>

        <Timeline />
      </div>
    </Section>
  );
}

export function Timeline({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="relative pl-7">
      <span aria-hidden className="absolute bottom-1.5 left-1 top-1.5 w-px bg-hair" />
      {experience.map((role, i) => (
        <Reveal key={role.title} delay={i * 0.05}>
          <li className="relative pb-9">
            <span
              aria-hidden
              className={cn(
                "absolute -left-7 top-[7px] h-[9px] w-[9px] rounded-full border border-mint",
                role.current ? "bg-mint shadow-[0_0_0_4px_hsl(var(--mint)/0.18)]" : "bg-ground",
              )}
            />
            <p className="mb-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mint">
              {role.period}
            </p>
            <h3 className="text-[1.05rem]">{role.title}</h3>
            <p className="text-[0.92rem] text-dim">{role.org}</p>
            <ul className="mt-2.5 list-disc space-y-1 pl-5 text-[0.93rem] text-muted">
              {(detailed ? role.points : role.points.slice(0, 2)).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
