"use client";

import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

// Calendly script is loaded once in app/layout.tsx.
export function Meeting() {
  return (
    <Section id="meeting" eyebrow="Book a meeting">
      <h2 className="mb-3 text-[clamp(1.9rem,3.6vw,2.7rem)]">A short call, no agenda needed</h2>
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
