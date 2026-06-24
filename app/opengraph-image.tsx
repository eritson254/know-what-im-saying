import { ogImageSize, ogImageContentType, renderSiteOgImage } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderSiteOgImage();
}
