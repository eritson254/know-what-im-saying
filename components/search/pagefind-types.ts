export type PagefindMeta = {
  title?: string;
  type?: "Essay" | "Note" | "Series" | "Topic";
  topic?: string;
  date?: string;
  readingTime?: string;
  series?: string;
};

export type PagefindResultData = {
  url: string;
  excerpt: string;
  meta: PagefindMeta;
};

export type PagefindSearchResult = {
  id: string;
  data: () => Promise<PagefindResultData>;
};

export type PagefindSearchResponse = {
  results: PagefindSearchResult[];
};

export type PagefindApi = {
  init: () => Promise<void>;
  debouncedSearch: (
    term: string,
    options?: Record<string, unknown>,
    debounceTimeoutMs?: number,
  ) => Promise<PagefindSearchResponse | null>;
};
