"use client";

import { useEffect, useRef } from "react";
import { recordOpened, markRead } from "@/lib/series-progress/storage";

const SCROLL_THRESHOLD = 0.5;
const TIME_THRESHOLD_MS = 30000;

export function SeriesProgressTracker({
  seriesSlug,
  essaySlug,
}: {
  seriesSlug: string;
  essaySlug: string;
}) {
  const hasMarkedRead = useRef(false);

  useEffect(() => {
    recordOpened(seriesSlug, essaySlug);

    function finishIfNeeded() {
      if (hasMarkedRead.current) return;
      hasMarkedRead.current = true;
      markRead(seriesSlug, essaySlug);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    }

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 1;
      if (ratio >= SCROLL_THRESHOLD) finishIfNeeded();
    }

    const timer = setTimeout(finishIfNeeded, TIME_THRESHOLD_MS);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [seriesSlug, essaySlug]);

  return null;
}
