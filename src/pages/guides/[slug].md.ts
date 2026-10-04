import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { brand } from "../../brand";
import { md } from "../../lib/markdown";

export async function getStaticPaths() {
  return (await getCollection("guides")).map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}
export const GET: APIRoute = ({ props }) => {
  const { entry } = props;
  return md(`# ${entry.data.title}\n\n${entry.data.description}\n\nSource: ${brand.url}/guides/${entry.id}/\n\n${entry.body}\n`);
};
