import type { APIRoute } from "astro";
import { communities } from "../data/communities";
import { communitiesMarkdown, md } from "../lib/markdown";
export const GET: APIRoute = () => md(communitiesMarkdown(communities));
