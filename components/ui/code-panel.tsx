import { cn } from "@/lib/utils";
import type { CodeLine } from "@/content/projects";

type Props = {
  filename: string;
  /** "diff" tints added lines mint and strikes removed ones. "file" and "terminal" are plain. */
  variant?: "diff" | "file" | "terminal";
  lines?: CodeLine[];
  text?: string;
  footer?: { label: string; value: string }[];
  className?: string;
};

/**
 * The site's signature element. Used sparingly — hero, one case study artifact,
 * an incident log, and article code blocks — so it stays a signal rather than wallpaper.
 */
export function CodePanel({ filename, variant = "file", lines, text, footer, className }: Props) {
  const rows: CodeLine[] = lines ?? (text ?? "").split("\n").map((t) => ({ text: t }));

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-hair bg-surface shadow-lift",
        className,
      )}
    >
      <figcaption className="flex items-center gap-2.5 border-b border-hair px-4 py-3">
        <span
          aria-hidden
          className={cn(
            "h-[7px] w-[7px] rounded-full",
            variant === "terminal" ? "bg-dim" : "bg-mint",
          )}
        />
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-dim">
          {filename}
        </span>
      </figcaption>

      <pre className="overflow-x-auto py-4 font-mono text-[0.76rem] leading-[1.95]">
        <code>
          {rows.map((line, i) => (
            <span
              key={i}
              className={cn(
                "block whitespace-pre px-4",
                line.kind === "add" && "border-l-2 border-mint bg-mint-soft pl-[14px] text-mint",
                line.kind === "remove" && "text-dim/70 line-through decoration-dim/60",
              )}
            >
              {line.text || " "}
            </span>
          ))}
        </code>
      </pre>

      {footer?.length ? (
        <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-hair px-4 py-3 font-mono text-[0.68rem] text-dim">
          {footer.map((f) => (
            <span key={f.label}>
              {f.label} <b className="font-medium text-mint">{f.value}</b>
            </span>
          ))}
        </div>
      ) : null}
    </figure>
  );
}
