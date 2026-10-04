import type { APIRoute } from "astro";
import { events } from "../data/events";
import { eventsMarkdown, md } from "../lib/markdown";
export const GET: APIRoute = () => md(eventsMarkdown(events));
