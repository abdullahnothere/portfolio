import Link from "next/link";
import { Section } from "@/components/ui/section";
import { notes, readingTime } from "@/content/notes";

export function Notes() {
  return (
    <Section id="notes" eyebrow="Engineering notes">
      <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">Things I worked out and wrote down</h2>
      <p className="lede mb-6">Not a blog. Notes I would want to find again in six months.</p>

      <ul>
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.slug}`}
              className="group flex flex-col gap-2 border-b border-hair py-5 transition-all duration-200 hover:pl-2 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <div className="flex-1">
                <h3 className="text-[1.05rem] transition-colors group-hover:text-mint">{note.title}</h3>
                <p className="mt-1 max-w-[68ch] text-[0.9rem] text-muted">{note.summary}</p>
              </div>
              <p className="whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-wider text-dim">
                {note.date} · {readingTime(note)} min
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
