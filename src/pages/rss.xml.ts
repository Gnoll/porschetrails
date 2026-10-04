import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { brand } from "../brand";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).sort((a, b) => +b.data.date - +a.data.date);
  return rss({
    title: `${brand.name} blog`,
    description: brand.description,
    site: brand.url,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/blog/${p.id}/`, categories: [p.data.category] })),
  });
};
