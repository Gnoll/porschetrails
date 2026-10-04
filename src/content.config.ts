import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    date: z.coerce.date(),
    /** Image slot name from src/assets (for example "trail-stelvio-pass"). */
    image: z.string(),
    imageAlt: z.string(),
    category: z.enum(["News", "Road spotlight", "Tech", "History", "Events"]),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    summary: z.string(),
    order: z.number(),
    image: z.string(),
    imageAlt: z.string(),
    updated: z.coerce.date(),
  }),
});

export const collections = { blog, guides };
