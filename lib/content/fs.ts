import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ZodType } from "zod";
import { calculateReadingTime } from "@/lib/content/reading-time";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ContentEntry<Frontmatter> = {
  slug: string;
  frontmatter: Frontmatter;
  body: string;
  readingTime: number;
};

function readMdxFilenames(collection: string): string[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

/** Parses and validates every .mdx file in a content collection against a zod schema. */
export function getCollection<Frontmatter>(
  collection: string,
  schema: ZodType<Frontmatter>,
): ContentEntry<Frontmatter>[] {
  return readMdxFilenames(collection).map((filename) => {
    const fullPath = path.join(CONTENT_ROOT, collection, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);
    const frontmatter = schema.parse(data);
    const readingTimeOverride = (data as { readingTimeOverride?: number })
      .readingTimeOverride;

    return {
      slug: path.basename(filename, ".mdx"),
      frontmatter,
      body: content,
      readingTime: readingTimeOverride ?? calculateReadingTime(content),
    };
  });
}

export function getCollectionEntry<Frontmatter>(
  collection: string,
  slug: string,
  schema: ZodType<Frontmatter>,
): ContentEntry<Frontmatter> | null {
  const fullPath = path.join(CONTENT_ROOT, collection, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = schema.parse(data);
  const readingTimeOverride = (data as { readingTimeOverride?: number })
    .readingTimeOverride;

  return {
    slug,
    frontmatter,
    body: content,
    readingTime: readingTimeOverride ?? calculateReadingTime(content),
  };
}
