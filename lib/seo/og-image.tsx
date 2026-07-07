import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const COLORS = {
  paper: "#f4f1e8",
  inkStrong: "#1f211c",
  muted2: "#6b6d62",
  muted4: "#9a9c8e",
  accent: "#2c4636",
  accentText: "#2c4636",
  accentForeground: "#edefe3",
  pillSoft: "#e3e7d8",
  placeholderA: "#ece8db",
  placeholderB: "#f2efe4",
};

async function fetchWithTimeout(url: string, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family,
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const cssResponse = await fetchWithTimeout(url);
    if (!cssResponse.ok) return null;
    const css = await cssResponse.text();
    const match = css.match(
      /src: url\(([^)]+)\) format\('(opentype|truetype)'\)/,
    );

    if (match) {
      const response = await fetchWithTimeout(match[1]);
      if (response.ok) return await response.arrayBuffer();
    }

    return null;
  } catch {
    // Google Fonts unreachable or timed out during build; fall back to
    // the ImageResponse default font rather than failing the whole build.
    return null;
  }
}

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 500 };

async function loadFonts(text: string): Promise<OgFont[]> {
  const [newsreader, spaceMono] = await Promise.all([
    loadGoogleFont("Newsreader", 500, text),
    loadGoogleFont("Space Mono", 400, "knowwhatimsaying.com"),
  ]);

  const fonts: OgFont[] = [];
  if (newsreader) fonts.push({ name: "Newsreader", data: newsreader, weight: 500 });
  if (spaceMono) fonts.push({ name: "Space Mono", data: spaceMono, weight: 400 });
  return fonts;
}

function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg
        width={26}
        height={26}
        viewBox="0 0 24 24"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={1.6}
      >
        <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
        <path d="M16 8 2 22" />
        <path d="M17.5 15H9" />
      </svg>
      <span
        style={{
          fontFamily: "Newsreader",
          fontSize: 28,
          color: COLORS.inkStrong,
        }}
      >
        Know What I&rsquo;m Saying?
      </span>
    </div>
  );
}

export async function renderSiteOgImage() {
  const fonts = await loadFonts(`Know What I'm Saying?${siteConfig.tagline}`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          backgroundColor: COLORS.paper,
        }}
      >
        <Wordmark />
        <span
          style={{
            fontFamily: "Newsreader",
            fontSize: 30,
            fontStyle: "italic",
            color: COLORS.muted2,
            maxWidth: 760,
            textAlign: "center",
          }}
        >
          {siteConfig.tagline}
        </span>
      </div>
    ),
    { ...ogImageSize, fonts },
  );
}

export async function renderContentOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  const fonts = await loadFonts(`${eyebrow}${title}`);
  const titleFontSize = title.length > 50 ? 52 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: COLORS.paper,
          backgroundImage: `repeating-linear-gradient(135deg, ${COLORS.placeholderA} 0 22px, ${COLORS.placeholderB} 22px 44px)`,
        }}
      >
        <Wordmark />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            backgroundColor: COLORS.paper,
            padding: "40px 48px",
            borderRadius: 6,
            maxWidth: 980,
          }}
        >
          <span
            style={{
              fontFamily: "Space Mono",
              fontSize: 16,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: COLORS.accentText,
              backgroundColor: COLORS.pillSoft,
              padding: "8px 18px",
              borderRadius: 100,
              alignSelf: "flex-start",
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              fontFamily: "Newsreader",
              fontSize: titleFontSize,
              lineHeight: 1.1,
              color: COLORS.inkStrong,
            }}
          >
            {title}
          </span>
        </div>
        <span
          style={{
            fontFamily: "Space Mono",
            fontSize: 14,
            letterSpacing: 1,
            color: COLORS.muted4,
            textTransform: "uppercase",
          }}
        >
          knowwhatimsaying.com
        </span>
      </div>
    ),
    { ...ogImageSize, fonts },
  );
}
