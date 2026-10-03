import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="no-print border-t border-hair py-11 text-[0.86rem] text-dim">
      <div className="wrap flex flex-wrap items-center justify-between gap-5">
        <span className="text-muted">
          {site.fullName} · {site.location}
        </span>
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <a className="text-mint" href={`https://github.com/${site.github}`}>GitHub</a>
          <a className="text-mint" href={site.linkedin}>LinkedIn</a>
          <a className="text-mint" href="/rss.xml">RSS</a>
        </div>
      </div>
    </footer>
  );
}
