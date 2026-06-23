import { getCollection, getCollectionEntry } from "@/lib/content/fs";
import { seriesFrontmatterSchema } from "@/lib/content/schema";
import { getAllEssays } from "@/lib/content/essays";

const COLLECTION = "series";

export function getAllSeries() {
  return getCollection(COLLECTION, seriesFrontmatterSchema);
}

export function getSeriesBySlug(slug: string) {
  return getCollectionEntry(COLLECTION, slug, seriesFrontmatterSchema);
}

/** Published essay installments belonging to a series, ordered by installment number. */
export function getSeriesInstallments(seriesSlug: string) {
  return getAllEssays()
    .filter((essay) => essay.frontmatter.series?.slug === seriesSlug)
    .sort(
      (a, b) =>
        (a.frontmatter.series?.installment ?? 0) -
        (b.frontmatter.series?.installment ?? 0),
    );
}
