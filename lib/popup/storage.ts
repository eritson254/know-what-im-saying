import { popupConfig } from "@/config/popup";

const DISMISSED_AT_KEY = "kwis-popup-dismissed-at";
const SHOWN_THIS_SESSION_KEY = "kwis-popup-shown";

export function wasDismissedRecently(): boolean {
  try {
    const raw = localStorage.getItem(DISMISSED_AT_KEY);
    if (!raw) return false;
    const dismissedAt = new Date(raw).getTime();
    if (Number.isNaN(dismissedAt)) return false;
    const elapsedDays = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    return elapsedDays < popupConfig.dismissDays;
  } catch {
    return false;
  }
}

export function recordDismissal() {
  try {
    localStorage.setItem(DISMISSED_AT_KEY, new Date().toISOString());
  } catch {
    // ignore
  }
}

export function wasShownThisSession(): boolean {
  try {
    return sessionStorage.getItem(SHOWN_THIS_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export function recordShown() {
  try {
    sessionStorage.setItem(SHOWN_THIS_SESSION_KEY, "true");
  } catch {
    // ignore
  }
}
