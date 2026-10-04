import type { APIRoute } from "astro";
import { trails } from "../../data/trails";
import { trailMarkdown, md } from "../../lib/markdown";
import type { Trail } from "../../data/types";

export const getStaticPaths = () => trails.map((trail) => ({ params: { slug: trail.slug }, props: { trail } }));
export const GET: APIRoute = ({ props }) => md(trailMarkdown(props.trail as Trail));
