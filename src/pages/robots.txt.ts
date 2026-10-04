import type { APIRoute } from "astro";
import { brand } from "../brand";

// Everything is open to every crawler. Only URLs with query strings are excluded,
// because this is a static site and any ?query is a duplicate of the clean URL.
// Content-Signal (contentsignals.org) states that search indexing, use as AI answer input
// and AI training are all permitted.
export const GET: APIRoute = () =>
  new Response(
    [
      "User-agent: *",
      "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
      "Allow: /",
      "Disallow: /*?",
      "",
      `Sitemap: ${brand.url}/sitemap-index.xml`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
