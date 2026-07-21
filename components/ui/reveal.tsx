"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal that works even if React hydration fails.
 *
 * Previous version used Framer Motion's `initial` + `whileInView`, which bakes
 * `style="opacity:0"` into the server-rendered HTML. If the client JS never
 * hydrates (error, slow connection, extension), the content stays invisible.
 *
 * This version:
 *  1. Renders content visible by default (no inline opacity:0).
 *  2. Adds a `.reveal-pending` class via `useEffect` — so on the server, and
 *     before hydration, the element is fully visible.
 *  3. A vanilla IntersectionObserver swaps `.reveal-pending` → `.reveal-in`.
 *  4. CSS handles the animation. `prefers-reduced-motion` disables it.
 *
 * If JS never runs, the content is visible. If it runs, you get the animation.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only add the pending class client-side, so SSR content is always visible.
    el.classList.add("reveal-pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-pending");
          el.classList.add("reveal-in");
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "-60px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal-base", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
