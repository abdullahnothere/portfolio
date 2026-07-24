"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Download, Eye } from "lucide-react";
import { resumeVariants } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Résumé picker. Renders as a button that opens a small popover with both
 * variants listed equally — no default, no pre-selection. Each row offers
 * View (opens /resume?variant=x) and Download (direct PDF link).
 *
 * Used in three places: nav, hero, and the /resume page itself. Keep this as
 * the single source of the option list so all three never drift apart.
 */
export function ResumeDropdown({
  variant = "outline",
  size = "md",
  label = "Résumé",
  className,
}: {
  variant?: "outline" | "primary" | "ghost";
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <Button
        type="button"
        variant={variant}
        size={size}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </Button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-[calc(100%+8px)] z-50 w-[280px] overflow-hidden rounded-xl border border-hair bg-surface shadow-deep"
        >
          <p className="border-b border-hair px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-dim">
            Choose a version
          </p>
          {resumeVariants.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-2 border-b border-hair px-4 py-3 last:border-0">
              <span className="text-[0.9rem] text-ink">{r.label}</span>
              <div className="flex items-center gap-1">
                <Link
                  href={`/resume?variant=${r.id}`}
                  onClick={() => setOpen(false)}
                  aria-label={`View ${r.label} résumé`}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-mint-soft hover:text-mint"
                >
                  <Eye size={15} />
                </Link>
                <a
                  href={r.pdfPath}
                  download
                  aria-label={`Download ${r.label} résumé PDF`}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-mint-soft hover:text-mint"
                >
                  <Download size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
