import { notes } from "@/content/notes";
import { site } from "@/content/site";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const items = notes
    .map(
      (n) => `    <item>
      <title>${escape(n.title)}</title>
      <link>${site.url}/notes/${n.slug}</link>
      <guid>${site.url}/notes/${n.slug}</guid>
      <pubDate>${new Date(n.iso).toUTCString()}</pubDate>
      <category>${escape(n.topic)}</category>
      <description>${escape(n.summary)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(site.name)} · Engineering notes</title>
    <link>${site.url}</link>
    <description>Notes on container security, detection engineering, and secure software delivery.</description>
    <language>en-GB</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "s-maxage=3600, stale-while-revalidate" },
  });
}
