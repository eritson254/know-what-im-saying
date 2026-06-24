import { getCollection, getCollectionEntry } from "@/lib/content/fs";
import { productFrontmatterSchema } from "@/lib/content/schema";
import { getAllEssays } from "@/lib/content/essays";

const COLLECTION = "products";

export function getAllProducts() {
  return getCollection(COLLECTION, productFrontmatterSchema);
}

export function getProductBySlug(slug: string) {
  return getCollectionEntry(COLLECTION, slug, productFrontmatterSchema);
}

export function getEssaysForProduct(productSlug: string, limit = 3) {
  return getAllEssays()
    .filter(
      (essay) =>
        essay.frontmatter.productCTA.enabled &&
        essay.frontmatter.productCTA.productSlug === productSlug,
    )
    .slice(0, limit);
}
