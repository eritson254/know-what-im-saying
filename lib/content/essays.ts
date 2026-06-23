import { getCollection, getCollectionEntry } from "@/lib/content/fs";
import { essayFrontmatterSchema, type EssayFrontmatter } from "@/lib/content/schema";

const COLLECTION = "essays";

function isPublished<T extends { status: string }>(entry: { frontmatter: T }) {
  return entry.frontmatter.status === "published";
}

function byDateDesc<T extends { date: string }>(
  a: { frontmatter: T },
  b: { frontmatter: T },
) {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
}

export function getAllEssays() {
  return getCollection(COLLECTION, essayFrontmatterSchema)
    .filter(isPublished)
    .sort(byDateDesc);
}

export function getEssayBySlug(slug: string) {
  return getCollectionEntry(COLLECTION, slug, essayFrontmatterSchema);
}

export function getFeaturedEssay() {
  const essays = getAllEssays();
  return essays.find((essay) => essay.frontmatter.featured) ?? essays[0] ?? null;
}

export function getEssaysByTopic(topicSlug: string) {
  return getAllEssays().filter(
    (essay) =>
      essay.frontmatter.topic === topicSlug ||
      essay.frontmatter.topics.includes(topicSlug),
  );
}

export function getRelatedEssays(
  essay: { slug: string; frontmatter: EssayFrontmatter },
  limit = 3,
) {
  return getAllEssays()
    .filter((candidate) => candidate.slug !== essay.slug)
    .filter(
      (candidate) =>
        candidate.frontmatter.topic === essay.frontmatter.topic ||
        candidate.frontmatter.topics.some((topic) =>
          essay.frontmatter.topics.includes(topic),
        ),
    )
    .slice(0, limit);
}
