import type { APIRoute } from "astro";
import { tracks } from "../data/tracks";
import { providers } from "../data/trackday-providers";
import { tracksMarkdown, md } from "../lib/markdown";
export const GET: APIRoute = () => md(tracksMarkdown(tracks, providers));
