"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

/**
 * Calendly is only loaded once the section is near the viewport. A third-party
 * scheduling widget should not cost anything on first paint.
 */
export function Meeting() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLoad(true); io.disconnect(); } },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!load) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(l);
    return () => { s.remove(); l.remove(); };
  }, [load]);

  return (
    <Section id="meeting" eyebrow="Book a meeting">
      <h2 className="mb-3 text-[clamp(1.9rem,3.6vw,2.7rem)]">Fifteen minutes, no agenda needed</h2>
      <p className="lede mb-7">
        Pick a slot and it lands in both calendars. Useful for a first screen, or if you would rather ask
        questions than read.
      </p>

      <div ref={ref} className="rounded-xl border border-hair bg-surface">
        {load ? (
          <div className="calendly-inline-widget min-h-[660px]" data-url={`${site.calendly}?hide_gdpr_banner=1`} />
        ) : (
          <div className="grid min-h-[240px] place-items-center p-11 text-center">
            <div>
              <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-dim">
                Scheduling
              </p>
              <p className="lede mx-auto mb-5">Loading the calendar…</p>
              <ButtonLink href={site.calendly} variant="primary" external>
                Open scheduling in a new tab
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
