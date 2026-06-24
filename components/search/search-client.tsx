"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Pill } from "@/components/ui/pill";
import { SearchResultCard } from "@/components/search/search-result-card";
import type {
  PagefindApi,
  PagefindResultData,
} from "@/components/search/pagefind-types";

const suggestedSearches = [
  "Unrequited love",
  "Betrayal",
  "Friendship",
  "Boundaries",
  "Technology",
  "Ambition",
  "Loneliness",
  "Dating",
];

type Status = "loading-engine" | "ready" | "unavailable";

export function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pagefindRef = useRef<PagefindApi | null>(null);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [results, setResults] = useState<PagefindResultData[] | null>(null);
  const [status, setStatus] = useState<Status>("loading-engine");

  function updateQuery(value: string) {
    setQuery(value);
    setResults(null);
  }

  useEffect(() => {
    let cancelled = false;

    async function loadPagefind() {
      try {
        const pagefind = (await import(
          /* webpackIgnore: true */
          /* turbopackIgnore: true */
          `${window.location.origin}/pagefind/pagefind.js`
        )) as PagefindApi;
        await pagefind.init();
        if (cancelled) return;
        pagefindRef.current = pagefind;
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("unavailable");
      }
    }

    loadPagefind();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status !== "ready" || !pagefindRef.current) return;

    const trimmed = query.trim();
    const params = new URLSearchParams(searchParams);
    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }
    router.replace(`/search${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });

    if (!trimmed) return;

    let cancelled = false;
    pagefindRef.current
      .debouncedSearch(trimmed, {}, 300)
      .then(async (response) => {
        if (cancelled || !response) return;
        const data = await Promise.all(response.results.map((r) => r.data()));
        if (!cancelled) setResults(data);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, status]);

  return (
    <section className="mx-auto w-full max-w-[760px] px-6 pb-20 md:px-16">
      <div className="mb-8 flex items-center gap-3 rounded-[3px] border border-border-strong bg-surface px-5 py-4">
        <Search size={20} strokeWidth={1.6} className="flex-none text-muted-3" />
        <input
          type="text"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder="Search essays, series, notes, and topics"
          className="w-full bg-transparent text-[17px] text-ink placeholder:text-muted-3"
          autoFocus
        />
      </div>

      {status === "unavailable" && (
        <p className="text-center text-[15px] text-muted-2">
          Search isn&rsquo;t available right now. Try again shortly.
        </p>
      )}

      {status === "ready" && !query.trim() && (
        <div className="flex flex-wrap gap-2">
          {suggestedSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => updateQuery(term)}
              className="cursor-pointer border-none bg-transparent p-0"
            >
              <Pill variant="outline">{term}</Pill>
            </button>
          ))}
        </div>
      )}

      {status === "ready" && query.trim() && results === null && (
        <p className="text-center text-[15px] text-muted-2">Searching…</p>
      )}

      {status === "ready" && query.trim() && results !== null && (
        <div>
          {results.length === 0 ? (
            <p className="border-t border-border py-12 text-center text-muted-2">
              No results for &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : (
            results.map((result, index) => (
              <SearchResultCard key={`${result.url}-${index}`} result={result} />
            ))
          )}
        </div>
      )}
    </section>
  );
}
