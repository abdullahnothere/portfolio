"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, sectionIds, site } from "@/content/site";
import { useActiveSection } from "@/lib/use-active-section";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandHint } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { ButtonLink } from "@/components/ui/button";
import { ResumeDropdown } from "@/components/resume-dropdown";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  return (
    <header className="no-print sticky top-0 z-[60] border-b border-hair bg-ground/80 backdrop-blur-lg">
      <div className="wrap flex items-center gap-5 py-3">
        <Link href="/" className="flex items-center gap-2.5 font-display text-[1.05rem] font-extrabold tracking-tight">
          <span aria-hidden className="h-[7px] w-[7px] animate-pulse-ring rounded-full bg-mint" />
          {site.domain}
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden flex-wrap items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            if (item.label === "Résumé") {
              return <ResumeDropdown key={item.href} variant="ghost" size="sm" />;
            }
            const id = item.href.replace("/#", "");
            const on = item.href.startsWith("/#") && active === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "rounded-lg px-[11px] py-[7px] text-[0.86rem] transition-colors",
                  on ? "text-mint" : "text-muted hover:bg-mint-soft hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ButtonLink href="/#meeting" variant="primary" size="sm" className="max-sm:hidden">
            Book a meeting
          </ButtonLink>
          <CommandHint />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="grid h-[34px] w-[34px] place-items-center rounded-[9px] border border-hair text-muted lg:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav aria-label="Mobile" className="border-t border-hair bg-surface px-7 py-3 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.label === "Résumé" ? "/resume" : item.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-[0.95rem] text-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}

      <ScrollProgress />
    </header>
  );
}
