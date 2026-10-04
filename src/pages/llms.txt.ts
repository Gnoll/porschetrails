import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { brand } from "../brand";
import { trails, regions } from "../data/trails";
import { models } from "../data/models";

// llms.txt (https://llmstxt.org): a plain index of the site with links to markdown versions of every page.
export const GET: APIRoute = async () => {
  const guides = (await getCollection("guides")).sort((a, b) => a.data.order - b.data.order);
  const posts = (await getCollection("blog")).sort((a, b) => +b.data.date - +a.data.date);
  const u = (p: string) => `${brand.url}${p}`;
  const out = [
    `# ${brand.name}`,
    "",
    `> ${brand.description}`,
    "",
    `${brand.disclaimer} Content may be quoted and summarised with a link back. The full text of the site in one file is at ${u("/llms-full.txt")}.`,
    "",
    ...regions.flatMap((r) => [
      `## Trails: ${r.name}`,
      "",
      ...trails.filter((t) => t.region === r.name).map((t) => `- [${t.name}](${u(`/trails/${t.slug}.md`)}): ${t.country}. ${t.summary}`),
      "",
    ]),
    "## Models",
    "",
    ...models.map((m) => `- [${m.name} (${m.years})](${u(`/models/${m.slug}.md`)}): ${m.summary}`),
    "",
    "## Guides",
    "",
    ...guides.map((g) => `- [${g.data.title}](${u(`/guides/${g.id}.md`)}): ${g.data.description}`),
    "",
    "## Events, tracks, garages and communities",
    "",
    `- [Targa rallies, race series and gatherings](${u("/events.md")}): tarmac rallies, one-make series, hill climbs and owner events.`,
    `- [Race tracks and track day organisers](${u("/tracks.md")}): circuits with public track days, with coordinates.`,
    `- [Dealers and independent specialists](${u("/garages.md")}): where to buy, service and repair, with coordinates.`,
    `- [Clubs, forums and specialists](${u("/communities.md")}): owner communities worldwide.`,
    `- [World map](${u("/map/")}): every road, track, event, dealer and specialist as pins with filters.`,
    "",
    "## Blog",
    "",
    ...posts.map((p) => `- [${p.data.title}](${u(`/blog/${p.id}.md`)}): ${p.data.description}`),
    "",
    "## Optional",
    "",
    `- [Photo credits](${u("/credits/")}): attribution and licences for photographs.`,
    `- [RSS feed](${u("/rss.xml")})`,
    `- [Sitemap](${u("/sitemap-index.xml")})`,
    "",
  ];
  return new Response(out.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
