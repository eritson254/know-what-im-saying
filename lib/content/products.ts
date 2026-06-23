import { getCollection, getCollectionEntry } from "@/lib/content/fs";
import { productFrontmatterSchema } from "@/lib/content/schema";

const COLLECTION = "products";

export function getAllProducts() {
  return getCollection(COLLECTION, productFrontmatterSchema);
}

export function getProductBySlug(slug: string) {
  return getCollectionEntry(COLLECTION, slug, productFrontmatterSchema);
}
