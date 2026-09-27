"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked, the address is still on screen */
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const body = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) return setState("sent");
      if (res.status === 503) {
        // No mail provider configured, so hand the message to the visitor's email app.
        const subject = encodeURIComponent(`Portfolio message from ${body.name || body.email}`);
        const text = encodeURIComponent(`${body.message}\n\n${body.name ?? ""}\n${body.email ?? ""}`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${text}`;
        return setState("mailto");
      }
      setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <Section id="contact" eyebrow="Contact">
      <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
        <div>
          <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">Say hello</h2>
          <p className="lede mb-7">
            Happy to talk about graduate roles, security engineering, freelance work, or anything in
            the notes above. I reply within a day or two.
          </p>

          <dl className="mb-8">
            <Row label="Email">
              <button type="button" onClick={copy} className="inline-flex items-center gap-2 text-mint">
                {site.email}
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span className="sr-only">{copied ? "Copied" : "Copy email address"}</span>
              </button>
            </Row>
            <Row label="LinkedIn"><a className="text-mint" href={site.linkedin}>/in/{site.linkedin.split("/in/")[1]?.replace(/\/$/, "")}</a></Row>
            <Row label="GitHub"><a className="text-mint" href={`https://github.com/${site.github}`}>@{site.github}</a></Row>
            <Row label="Location"><span className="text-muted">{site.location} · open to relocating</span></Row>
          </dl>

        </div>

        <form onSubmit={submit} noValidate>
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <Field label="Name" name="name" placeholder="Your name" required />
          <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
          <label className="mb-3.5 block">
            <span className="mb-1.5 block text-[0.8rem] text-muted">Message</span>
            <textarea
              name="message"
              rows={6}
              required
              placeholder="What's this about?"
              className="w-full rounded-[10px] border border-hair bg-surface px-3.5 py-3 text-[0.92rem] outline-none transition-shadow placeholder:text-dim focus:border-mint focus:shadow-[0_0_0_3px_hsl(var(--mint)/0.12)]"
            />
          </label>

          <Button type="submit" variant="primary" disabled={state === "sending" || state === "sent"}>
            {state === "sent" ? "Message sent" : state === "sending" ? "Sending…" : "Send message"}
          </Button>

          <p aria-live="polite" className="mt-3 text-[0.85rem] text-muted">
            {state === "sent" ? "Thanks, I'll reply to the address you gave." : null}
            {state === "mailto" ? (
              <>Your email app should have opened with the message ready to send. If it didn&apos;t, email <a className="text-mint" href={`mailto:${site.email}`}>{site.email}</a>.</>
            ) : null}
            {state === "error" ? (
              <>Couldn&apos;t send that. Email <a className="text-mint" href={`mailto:${site.email}`}>{site.email}</a> directly and it will reach me.</>
            ) : null}
          </p>
        </form>
      </div>
    </Section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-hair py-3.5">
      <dt className="text-[0.9rem]">{label}</dt>
      <dd className="text-[0.9rem]">{children}</dd>
    </div>
  );
}

function Field({ label, name, ...props }: { label: string; name: string } & React.ComponentProps<"input">) {
  return (
    <label className="mb-3.5 block">
      <span className="mb-1.5 block text-[0.8rem] text-muted">{label}</span>
      <input
        name={name}
        className="w-full rounded-[10px] border border-hair bg-surface px-3.5 py-3 text-[0.92rem] outline-none transition-shadow placeholder:text-dim focus:border-mint focus:shadow-[0_0_0_3px_hsl(var(--mint)/0.12)]"
        {...props}
      />
    </label>
  );
}
