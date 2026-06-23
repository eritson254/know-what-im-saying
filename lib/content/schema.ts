import { z } from "zod";

const statusSchema = z.enum(["draft", "published"]);

const seriesRefSchema = z.object({
  slug: z.string(),
  title: z.string(),
  installment: z.number().int().positive(),
  totalPlanned: z.number().int().positive(),
});

const productCTASchema = z.object({
  enabled: z.boolean().default(false),
  productSlug: z.string().nullable().default(null),
});

const baseFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(),
  updated: z.string().nullable().default(null),
  topic: z.string(),
  status: statusSchema,
  canonicalUrl: z.string().nullable().default(null),
});

export const essayFrontmatterSchema = baseFrontmatterSchema.extend({
  type: z.literal("essay"),
  topics: z.array(z.string()).default([]),
  series: seriesRefSchema.nullable().default(null),
  featured: z.boolean().default(false),
  readingTimeOverride: z.number().int().positive().nullable().default(null),
  heroImage: z.string().nullable().default(null),
  heroAlt: z.string().nullable().default(null),
  showNewsletterCTA: z.boolean().default(true),
  showWhatsAppCTA: z.boolean().default(true),
  showStorySubmissionCTA: z.boolean().default(false),
  productCTA: productCTASchema.default({ enabled: false, productSlug: null }),
});

export const noteFrontmatterSchema = baseFrontmatterSchema.extend({
  type: z.literal("note"),
  topics: z.array(z.string()).default([]),
});

export const seriesFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  theme: z.string(),
  coverImage: z.string().nullable().default(null),
  coverAlt: z.string().nullable().default(null),
  status: z.enum(["ongoing", "complete"]),
  totalPlanned: z.number().int().positive(),
  topics: z.array(z.string()).default([]),
  relatedSeries: z.array(z.string()).default([]),
  plannedInstallments: z
    .array(z.object({ installment: z.number().int().positive(), title: z.string() }))
    .default([]),
});

export const productFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  type: z.enum(["ebook", "workbook", "guide", "plan"]),
  price: z.string().nullable().default(null),
  status: z.enum(["coming-soon", "available"]),
  coverImage: z.string().nullable().default(null),
  externalCheckoutUrl: z.string().nullable().default(null),
});

export const pageFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  updated: z.string().nullable().default(null),
});

export type EssayFrontmatter = z.infer<typeof essayFrontmatterSchema>;
export type NoteFrontmatter = z.infer<typeof noteFrontmatterSchema>;
export type SeriesFrontmatter = z.infer<typeof seriesFrontmatterSchema>;
export type ProductFrontmatter = z.infer<typeof productFrontmatterSchema>;
export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>;
