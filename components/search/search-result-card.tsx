import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import type { PagefindResultData } from "@/components/search/pagefind-types";

function cleanResultPath(url: string) {
  return url.replace(/\/index\.html$/, "/").replace(/\.html$/, "") || "/";
}

export function SearchResultCard({ result }: { result: PagefindResultData }) {
  const { meta } = result;
  const href = cleanResultPath(result.url);

  return (
    <Link
      href={href}
      className="block border-t border-border py-7 no-underline hover:opacity-[.78]"
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {meta.type && <Pill>{meta.type}</Pill>}
        {meta.topic && <Pill variant="outline">{meta.topic}</Pill>}
        {meta.series && <Pill variant="outline">Series · {meta.series}</Pill>}
      </div>
      <h3 className="mb-[6px] font-serif text-[22px] leading-[1.15] font-medium text-ink-strong">
        {meta.title ?? "Untitled"}
      </h3>
      <p
        className="mb-2 max-w-[64ch] text-[15px] leading-[1.55] text-muted-2 [&_mark]:bg-pill-soft [&_mark]:text-accent-text"
        dangerouslySetInnerHTML={{ __html: result.excerpt }}
      />
      {(meta.date || meta.readingTime) && (
        <div className="font-mono text-[11px] tracking-[.06em] text-muted-3 uppercase">
          {meta.date}
          {meta.date && meta.readingTime && " · "}
          {meta.readingTime && `${meta.readingTime} min read`}
        </div>
      )}
    </Link>
  );
}
