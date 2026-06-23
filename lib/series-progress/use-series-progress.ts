import { useSyncExternalStore } from "react";
import { SERIES_PROGRESS_KEY } from "@/lib/series-progress/storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SERIES_PROGRESS_KEY);
}

function getServerSnapshot() {
  return null;
}

/** SSR-safe read of the raw kwis-series-progress localStorage value; re-renders after hydration once the real value is known. */
export function useSeriesProgressSnapshot(seriesSlug: string) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (raw === null) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed[seriesSlug] ?? { readEssays: [], lastRead: null, updatedAt: "" };
  } catch {
    return null;
  }
}
