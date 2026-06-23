export const SERIES_PROGRESS_KEY = "kwis-series-progress";
export const LAST_READ_KEY = "kwis-last-read";

type SeriesProgressEntry = {
  readEssays: string[];
  lastRead: string | null;
  updatedAt: string;
};

type SeriesProgressMap = Record<string, SeriesProgressEntry>;

function readMap(): SeriesProgressMap {
  try {
    const raw = localStorage.getItem(SERIES_PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function writeMap(map: SeriesProgressMap) {
  localStorage.setItem(SERIES_PROGRESS_KEY, JSON.stringify(map));
}

export function getSeriesProgress(seriesSlug: string): SeriesProgressEntry {
  const map = readMap();
  return map[seriesSlug] ?? { readEssays: [], lastRead: null, updatedAt: "" };
}

/** Records that an essay was opened (sets "reading now" state) without marking it read yet. */
export function recordOpened(seriesSlug: string, essaySlug: string) {
  const map = readMap();
  const existing = map[seriesSlug] ?? { readEssays: [], lastRead: null, updatedAt: "" };
  map[seriesSlug] = {
    ...existing,
    lastRead: essaySlug,
    updatedAt: new Date().toISOString(),
  };
  writeMap(map);
  localStorage.setItem(LAST_READ_KEY, essaySlug);
}

/** Marks an essay as read once the scroll/time threshold is met. */
export function markRead(seriesSlug: string, essaySlug: string) {
  const map = readMap();
  const existing = map[seriesSlug] ?? { readEssays: [], lastRead: null, updatedAt: "" };
  const readEssays = existing.readEssays.includes(essaySlug)
    ? existing.readEssays
    : [...existing.readEssays, essaySlug];

  map[seriesSlug] = {
    readEssays,
    lastRead: essaySlug,
    updatedAt: new Date().toISOString(),
  };
  writeMap(map);
}
