import type { APIRoute } from "astro";
import { models } from "../../data/models";
import { modelMarkdown, md } from "../../lib/markdown";
import type { Model } from "../../data/types";

export const getStaticPaths = () => models.map((model) => ({ params: { slug: model.slug }, props: { model } }));
export const GET: APIRoute = ({ props }) => md(modelMarkdown(props.model as Model));
