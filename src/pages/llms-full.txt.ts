import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { brand } from "../brand";
import { trails } from "../data/trails";
import { models } from "../data/models";
import { events } from "../data/events";
import { communities } from "../data/communities";
import { tracks } from "../data/tracks";
import { providers } from "../data/trackday-providers";
import { garages } from "../data/garages";
import { trailMarkdown, modelMarkdown, eventsMarkdown, communitiesMarkdown, tracksMarkdown, garagesMarkdown } from "../lib/markdown";

export const GET: APIRoute = async () => {
  const guides = (await getCollection("guides")).sort((a, b) => a.data.order - b.data.order);
  const posts = (await getCollection("blog")).sort((a, b) => +b.data.date - +a.data.date);
  const entry = (kind: string, e: (typeof guides)[number] | (typeof posts)[number]) =>
    `# ${e.data.title}\n\nSource: ${brand.url}/${kind}/${e.id}/\n\n${e.body}\n`;
  const parts = [
    `# ${brand.name}: full text\n\n> ${brand.description}\n`,
    ...trails.map(trailMarkdown),
    ...models.map(modelMarkdown),
    eventsMarkdown(events),
    tracksMarkdown(tracks, providers),
    garagesMarkdown(garages),
    communitiesMarkdown(communities),
    ...guides.map((g) => entry("guides", g)),
    ...posts.map((p) => entry("blog", p)),
  ];
  return new Response(parts.join("\n---\n\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
