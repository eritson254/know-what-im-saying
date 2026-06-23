import { getCollectionEntry } from "@/lib/content/fs";
import { pageFrontmatterSchema } from "@/lib/content/schema";

const COLLECTION = "pages";

export function getPageBySlug(slug: string) {
  return getCollectionEntry(COLLECTION, slug, pageFrontmatterSchema);
}
