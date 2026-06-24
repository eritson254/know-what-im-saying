import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllEssays } from "@/lib/content/essays";
import { getAllNotes } from "@/lib/content/notes";
import { getAllSeries } from "@/lib/content/series";
import { getAllProducts } from "@/lib/content/products";
import { topics } from "@/lib/content/topics";

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/essays", priority: 0.8, changeFrequency: "weekly" },
  { path: "/series", priority: 0.8, changeFrequency: "weekly" },
  { path: "/notes", priority: 0.8, changeFrequency: "weekly" },
  { path: "/topics", priority: 0.8, changeFrequency: "weekly" },
  { path: "/search", priority: 0.6, changeFrequency: "monthly" },
  { path: "/reading-list", priority: 0.6, changeFrequency: "monthly" },
  { path: "/start-here", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/community", priority: 0.6, changeFrequency: "monthly" },
  { path: "/share-your-story", priority: 0.6, changeFrequency: "monthly" },
  { path: "/newsletter", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/editorial-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/disclosures", priority: 0.3, changeFrequency: "yearly" },
];

function toAbsolute(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: toAbsolute(route.path),
    priority: route.priority,
    changeFrequency: route.changeFrequency,
  }));

  const essayEntries: MetadataRoute.Sitemap = getAllEssays().map((essay) => ({
    url: toAbsolute(`/essays/${essay.slug}`),
    lastModified: essay.frontmatter.updated ?? essay.frontmatter.date,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const seriesEntries: MetadataRoute.Sitemap = getAllSeries().map((series) => ({
    url: toAbsolute(`/series/${series.slug}`),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const noteEntries: MetadataRoute.Sitemap = getAllNotes().map((note) => ({
    url: toAbsolute(`/notes/${note.slug}`),
    lastModified: note.frontmatter.updated ?? note.frontmatter.date,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const topicEntries: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: toAbsolute(`/topics/${topic.slug}`),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const productEntries: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: toAbsolute(`/resources/${product.slug}`),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  return [
    ...staticEntries,
    ...essayEntries,
    ...seriesEntries,
    ...noteEntries,
    ...topicEntries,
    ...productEntries,
  ];
}
