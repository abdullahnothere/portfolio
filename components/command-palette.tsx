"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/content/projects";
import { notes } from "@/content/notes";
import { navItems, resumeVariants } from "@/content/site";
import { cn } from "@/lib/utils";

type Item = { label: string; href: string; group: string };

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(
    () => [
      ...navItems
        .filter((n) => n.label !== "Résumé")
        .map((n) => ({ label: n.label, href: n.href, group: "Go to" })),
      ...projects.map((p) => ({ label: p.title, href: `/projects/${p.slug}`, group: "Project" })),
      ...notes.map((n) => ({ label: n.title, href: `/notes/${n.slug}`, group: "Note" })),
      ...resumeVariants.map((r) => ({
        label: `Résumé — ${r.label}`,
        href: `/resume?variant=${r.id}`,
        group: "Résumé",
      })),
      { label: "Book a meeting", href: "/#meeting", group: "Action" },
    ],
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => (i.label + " " + i.group).toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setCursor(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 20);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      className="no-print fixed inset-0 z-[90] flex justify-center bg-[hsl(194_38%_5%_/_0.55)] pt-[14vh] backdrop-blur-sm"
    >
      <div className="h-max w-[min(520px,92vw)] overflow-hidden rounded-2xl border border-hair bg-surface shadow-deep">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
            if (e.key === "Enter" && results[cursor]) go(results[cursor].href);
          }}
          placeholder="Search sections, projects and notes…"
          className="w-full border-b border-hair bg-transparent px-[18px] py-4 text-base outline-none placeholder:text-dim"
        />
        <ul className="max-h-[320px] overflow-auto p-1.5">
          {results.length === 0 ? (
            <li className="px-3 py-2.5 text-sm text-dim">
              No match. Try “splunk”, “rbac”, or “résumé”.
            </li>
          ) : (
            results.map((item, i) => (
              <li key={item.href + item.label}>
                <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(item.href)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[9px] px-3 py-2.5 text-left text-[0.92rem] transition-colors",
                    i === cursor ? "bg-mint-soft text-mint" : "text-ink",
                  )}
                >
                  {item.label}
                  <span className="font-mono text-[0.66rem] uppercase tracking-wider text-dim">{item.group}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

/** The trigger shown in the nav bar. */
export function CommandHint() {
  const fire = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
  };
  return (
    <button
      type="button"
      onClick={fire}
      aria-label="Open command palette"
      className="hidden rounded-[7px] border border-hair px-2 py-1 font-mono text-[0.68rem] text-dim transition-colors hover:border-mint hover:text-mint md:block"
    >
      ⌘K
    </button>
  );
}
