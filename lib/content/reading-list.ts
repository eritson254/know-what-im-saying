import { getCollection } from "@/lib/content/fs";
import { readingListFrontmatterSchema } from "@/lib/content/schema";

const COLLECTION = "reading-list";

function byDateAddedDesc<T extends { dateAdded: string }>(
  a: { frontmatter: T },
  b: { frontmatter: T },
) {
  return (
    new Date(b.frontmatter.dateAdded).getTime() -
    new Date(a.frontmatter.dateAdded).getTime()
  );
}

export function getAllReadingListItems() {
  return getCollection(COLLECTION, readingListFrontmatterSchema).sort(byDateAddedDesc);
}
