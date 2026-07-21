import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id, eyebrow, children, className, first,
}: { id: string; eyebrow?: string; children: ReactNode; className?: string; first?: boolean }) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-[104px] max-md:py-[72px]", !first && "border-t border-hair", className)}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {children}
    </section>
  );
}
