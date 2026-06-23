import { getCollection, getCollectionEntry } from "@/lib/content/fs";
import { noteFrontmatterSchema } from "@/lib/content/schema";

const COLLECTION = "notes";

export function getAllNotes() {
  return getCollection(COLLECTION, noteFrontmatterSchema)
    .filter((entry) => entry.frontmatter.status === "published")
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function getNoteBySlug(slug: string) {
  return getCollectionEntry(COLLECTION, slug, noteFrontmatterSchema);
}
