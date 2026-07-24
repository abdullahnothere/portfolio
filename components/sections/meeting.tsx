"use client";

import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

/**
 * Calendly's script loads once, site-wide, via <CalendlyScript> in
 * app/layout.tsx — with next/script strategy="afterInteractive", so it
 * fetches in the background right after hydration, in parallel with the rest
 * of the page. By the time someone scrolls nine sections down to reach this
 * one, the script has almost always already run.
 *
 * The widget div is rendered unconditionally rather than gated behind an
 * IntersectionObserver + a second loading state. Calendly's script scans the
 * DOM for `.calendly-inline-widget` on load and initialises whatever it
 * finds — the div doesn't need to appear *after* the script, only before it
 * runs, which SSR already guarantees.
 */
export function Meeting() {
  return (
    <Section id="meeting" eyebrow="Book a meeting">
      <h2 className="mb-3 text-[clamp(1.9rem,3.6vw,2.7rem)]">Fifteen minutes, no agenda needed</h2>
      <p className="lede mb-7">
        Pick a slot and it lands in both calendars. Useful for a first screen, a quick technical
        question, or a freelance engagement worth talking through.
      </p>

      <div className="overflow-hidden rounded-xl border border-hair bg-surface">
        <div
          className="calendly-inline-widget min-h-[660px]"
          data-url={`${site.calendly}?hide_gdpr_banner=1`}
        />
      </div>
    </Section>
  );
}
