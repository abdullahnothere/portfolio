import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { notes, getNote, readingTime, type Block } from "@/content/notes";
import { CodePanel } from "@/components/ui/code-panel";
import { site } from "@/content/site";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const note = getNote(params.slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `${site.url}/notes/${note.slug}` },
    openGraph: { title: note.title, description: note.summary, type: "article", publishedTime: note.iso },
  };
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const note = getNote(params.slug);
  if (!note) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: note.title,
    description: note.summary,
    datePublished: note.iso,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article className="wrap py-14 pb-24">
      <Link href="/#notes" className="mb-7 inline-flex items-center gap-2 text-[0.88rem] text-mint">
        <ArrowLeft size={15} /> All notes
      </Link>

      <p className="mb-3.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mint">
        {note.topic} · {note.date} · {readingTime(note)} min read
      </p>
      <h1 className="mb-4 max-w-[20ch] text-[clamp(2rem,4vw,3rem)]">{note.title}</h1>
      <p className="max-w-[64ch] text-muted">{note.summary}</p>

      <div className="mt-9 max-w-prose">
        {note.body.map((block, i) => <Rendered key={i} block={block} />)}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </article>
  );
}

function Rendered({ block }: { block: Block }) {
  switch (block.type) {
    case "h":
      return <h2 className="mb-2.5 mt-9 text-[1.15rem]">{block.text}</h2>;
    case "p":
      return <p className="mb-4 text-muted">{block.text}</p>;
    case "list":
      return (
        <ul className="mb-4 list-disc space-y-1.5 pl-5 text-muted">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-6 border-l-2 border-mint pl-5 font-display text-[1.1rem] italic text-ink">
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <CodePanel
          className="my-6"
          filename={block.filename ?? block.language ?? "code"}
          variant={block.filename === "terminal" ? "terminal" : "file"}
          text={block.text}
        />
      );
  }
}
