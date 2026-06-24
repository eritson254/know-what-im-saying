import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isPopupDisabledForPath, popupConfig } from "@/config/popup";
import { recordShown, wasDismissedRecently, wasShownThisSession } from "@/lib/popup/storage";

/** Whether the popup should render on this page, based on path, trigger, and storage state. */
export function usePopupTrigger(): boolean {
  const pathname = usePathname();
  const [shouldShow, setShouldShow] = useState(false);
  const [trackedPathname, setTrackedPathname] = useState(pathname);

  if (pathname !== trackedPathname) {
    setTrackedPathname(pathname);
    setShouldShow(false);
  }

  useEffect(() => {
    if (isPopupDisabledForPath(pathname)) return;
    if (wasDismissedRecently() || wasShownThisSession()) return;

    function trigger() {
      recordShown();
      setShouldShow(true);
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    }

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolledPercent = (window.scrollY / scrollable) * 100;
      if (scrolledPercent >= popupConfig.scrollDepthPercent) {
        trigger();
      }
    }

    const timeoutId = setTimeout(trigger, popupConfig.delayMs);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return shouldShow;
}
