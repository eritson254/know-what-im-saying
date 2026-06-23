import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot() {
  return null;
}

/** SSR-safe read of a single localStorage key; re-renders once after hydration with the real value. */
export function useLocalStorageValue(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => (typeof window === "undefined" ? null : localStorage.getItem(key)),
    getServerSnapshot,
  );
}
