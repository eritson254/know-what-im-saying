export const popupConfig = {
  disabledPaths: [
    "/notes",
    "/share-your-story",
    "/newsletter",
    "/privacy",
    "/terms",
    "/disclosures",
    "/editorial-policy",
    "/search",
  ],
  delayMs: 50_000,
  scrollDepthPercent: 60,
  dismissDays: 10,
};

export function isPopupDisabledForPath(pathname: string) {
  return popupConfig.disabledPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
