import type { APIRoute } from "astro";
import { garages } from "../data/garages";
import { garagesMarkdown, md } from "../lib/markdown";
export const GET: APIRoute = () => md(garagesMarkdown(garages));
