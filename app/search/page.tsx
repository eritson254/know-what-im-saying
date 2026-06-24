import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { SearchClient } from "@/components/search/search-client";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Search",
  description: "Search essays, series, notes, and topics.",
  pathname: "/search",
});

export default function SearchPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="Search"
        title="Search"
        subtitle="Search essays, series, notes, and topics."
      />
      <Suspense>
        <SearchClient />
      </Suspense>
    </main>
  );
}
