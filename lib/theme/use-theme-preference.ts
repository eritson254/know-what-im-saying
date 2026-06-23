"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY, type ThemePreference } from "@/lib/theme/constants";
import { useLocalStorageValue } from "@/lib/utils/use-local-storage-value";

function resolveSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemeToDocument(preference: ThemePreference) {
  const resolved = preference === "system" ? resolveSystemTheme() : preference;
  if (resolved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

function parseThemePreference(value: string | null): ThemePreference {
  return value === "light" || value === "dark" || value === "system"
    ? value
    : "system";
}

export function useThemePreference() {
  const stored = useLocalStorageValue(THEME_STORAGE_KEY);
  const [override, setOverride] = useState<ThemePreference | null>(null);
  const theme = override ?? parseThemePreference(stored);

  useEffect(() => {
    applyThemeToDocument(theme);
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyThemeToDocument("system");
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  function selectTheme(next: ThemePreference) {
    setOverride(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  return { theme, selectTheme };
}
