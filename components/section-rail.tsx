"use client";

import { useActiveSection } from "@/lib/use-active-section";
import { sectionIds } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Signature navigation: a hairline trace down the left edge. Each node is a
 * section; the active one extends and takes the accent. Hidden below lg,
 * where the sticky nav does the same job.
 */
export function SectionRail() {
  const active = useActiveSection(sectionIds);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col xl:flex"
    >
      <span aria-hidden className="absolute bottom-2 left-1 top-2 w-px bg-hair" />
      {sectionIds.map((id) => {
        const on = active === id;
        return (
          <a
            key={id}
            href={`/#${id}`}
            aria-current={on ? "true" : undefined}
            className="group relative flex h-[34px] items-center gap-2.5"
          >
            <span
              aria-hidden
              className={cn(
                "h-px bg-hair transition-all duration-300",
                on ? "w-6 bg-mint" : "w-[9px] group-hover:w-6 group-hover:bg-mint",
              )}
            />
            <span
              className={cn(
                "font-mono text-[0.62rem] uppercase tracking-[0.12em] transition-colors duration-300",
                on ? "text-mint" : "text-transparent group-hover:text-mint",
              )}
            >
              {id}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
