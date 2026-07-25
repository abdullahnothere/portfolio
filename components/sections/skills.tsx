import { Section } from "@/components/ui/section";
import { skillGroups } from "@/content/skills";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Toolkit">
      <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">What I actually reach for</h2>
      <p className="lede mb-9">
        Grouped by the kind of problem, not by how well I think I know it. No progress bars: a
        percentage next to a language name has never told anyone anything true.
      </p>

      <dl>
        {skillGroups.map((group) => (
          <div key={group.title} className="grid grid-cols-1 gap-7 border-t border-hair py-6 md:grid-cols-[220px_1fr]">
            <div>
              <dt className="text-[1rem] font-display font-extrabold">{group.title}</dt>
              <p className="mt-1 text-[0.86rem] text-dim">{group.note}</p>
            </div>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="cursor-default rounded-lg border border-hair px-3 py-1.5 text-[0.85rem] text-muted transition-colors hover:border-mint hover:bg-mint-soft hover:text-mint"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
