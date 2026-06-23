"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useThemePreference } from "@/lib/theme/use-theme-preference";
import type { ThemePreference } from "@/lib/theme/constants";

const OPTIONS: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
  { value: "system", label: "Match system theme", icon: Monitor },
];

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, selectTheme } = useThemePreference();

  return (
    <div
      role="group"
      aria-label="Theme"
      className={`flex items-center gap-1 rounded-full border border-border-card p-1 ${className}`}
    >
      {OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => selectTheme(option.value)}
            aria-label={option.label}
            aria-pressed={isActive}
            title={option.label}
            className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-3 hover:text-accent-text"
            }`}
          >
            <Icon size={13} strokeWidth={1.8} />
          </button>
        );
      })}
    </div>
  );
}
