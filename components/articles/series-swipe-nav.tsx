"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SWIPE_THRESHOLD = 60;

export function SeriesSwipeNav({
  previousSlug,
  nextSlug,
}: {
  previousSlug: string | null;
  nextSlug: string | null;
}) {
  const router = useRouter();

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    function handleTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    function handleTouchEnd(e: TouchEvent) {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;

      const isHorizontalSwipe =
        Math.abs(deltaX) >= SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY) * 1.5;
      if (!isHorizontalSwipe) return;

      if (deltaX < 0 && nextSlug) {
        router.push(`/essays/${nextSlug}`);
      } else if (deltaX > 0 && previousSlug) {
        router.push(`/essays/${previousSlug}`);
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [previousSlug, nextSlug, router]);

  return null;
}
