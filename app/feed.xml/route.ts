import { siteConfig } from "@/config/site";
import { getAllEssays } from "@/lib/content/essays";
import { getAllNotes } from "@/lib/content/notes";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsolute(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function GET() {
  const items = [
    ...getAllEssays().map((essay) => ({
      title: essay.frontmatter.title,
      description: essay.frontmatter.description,
      date: essay.frontmatter.date,
      link: toAbsolute(`/essays/${essay.slug}`),
    })),
    ...getAllNotes().map((note) => ({
      title: note.frontmatter.title,
      description: note.frontmatter.description,
      date: note.frontmatter.date,
      link: toAbsolute(`/notes/${note.slug}`),
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const itemsXml = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <description>${escapeXml(siteConfig.tagline)}</description>
    <link>${siteConfig.url}</link>
    <language>en-us</language>${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
