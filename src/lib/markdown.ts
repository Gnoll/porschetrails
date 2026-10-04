// Plain-markdown renderings of the data-driven pages, used by the .md endpoints and llms-full.txt.
import { brand } from "../brand";
import { kmToMiles, mToFeet } from "../data/trails";
import type { EventItem, Model, Trail, Community, Track, TrackDayProvider, Garage } from "../data/types";

const n = (x: number) => Math.round(x).toLocaleString("en");

export function trailMarkdown(t: Trail): string {
  return [
    `# ${t.name}`,
    `${t.aka}. ${t.country} (${t.region}).`,
    `Source: ${brand.url}/trails/${t.slug}/`,
    "",
    `- Length: ${t.lengthKm} km (${n(kmToMiles(t.lengthKm))} miles)`,
    ...(t.summitM ? [`- High point: ${n(t.summitM)} m (${n(mToFeet(t.summitM))} ft)`] : []),
    `- Driving time: ${t.driveTime}`,
    `- Season: ${t.season}`,
    `- Toll: ${t.toll}`,
    `- Coordinates: ${t.lat}, ${t.lng}`,
    `- Character: ${t.tags.join(", ")}`,
    "",
    t.intro,
    "",
    "## The drive",
    ...t.drive.flatMap((p) => [p, ""]),
    `## In your ${brand.marque}`,
    t.marque,
    "",
    "## Watch out for",
    ...t.watch.map((w) => `- ${w}`),
    ...(t.links.length ? ["", "## Official information", ...t.links.map((l) => `- [${l.label}](${l.url})`)] : []),
    "",
  ].join("\n");
}

export function modelMarkdown(m: Model): string {
  return [
    `# ${m.name} (${m.years})`,
    `${m.type}.`,
    `Source: ${brand.url}/models/${m.slug}/`,
    "",
    `- Engine: ${m.engine}`,
    `- Power: ${m.power}`,
    `- Weight: ${m.weight}`,
    "",
    ...m.body.flatMap((p) => [p, ""]),
    "## Variants",
    ...m.variants.map((v) => `- **${v.name}** (${v.years}): ${v.note}`),
    "",
    "## On a road trip",
    m.roadTrip,
    "",
    "## What to check",
    ...m.watch.map((w) => `- ${w}`),
    "",
  ].join("\n");
}

export function eventsMarkdown(events: EventItem[]): string {
  return [
    `# Targa rallies, race series and events for ${brand.marque} owners`,
    `Source: ${brand.url}/events/`,
    "",
    ...events.flatMap((e) => [`## ${e.name}`, `${e.kind}. ${e.where}. ${e.when}.`, "", e.summary, "", `For ${brand.marque} owners: ${e.marque}`, "", `${e.urlLabel ?? "Official site"}: ${e.url}`, ""]),
  ].join("\n");
}

export function communitiesMarkdown(list: Community[]): string {
  return [
    `# ${brand.marque} clubs, forums and specialists`,
    `Source: ${brand.url}/communities/`,
    "",
    ...list.map((c) => `- [${c.name}](${c.url}) (${c.kind}, ${c.where}): ${c.note}`),
    "",
  ].join("\n");
}

export function tracksMarkdown(tracks: Track[], providers: TrackDayProvider[]): string {
  return [
    "# Race tracks and track day organisers",
    `Source: ${brand.url}/tracks/`,
    "",
    "## Circuits",
    ...tracks.map((t) => `- [${t.name}](${t.url}) (${t.city}, ${t.country}; ${t.lengthKm} km; ${t.lat}, ${t.lng}): ${t.note}`),
    "",
    "## Track day organisers",
    ...providers.map((p) => `- [${p.name}](${p.url}) (${p.where}${p.marqueOnly ? `; ${brand.marque} only` : ""}): ${p.note}`),
    "",
  ].join("\n");
}

export function garagesMarkdown(garages: Garage[]): string {
  const section = (kind: Garage["kind"], title: string) => [
    `## ${title}`,
    ...garages.filter((g) => g.kind === kind).map((g) => `- [${g.name}](${g.url}) (${g.city}, ${g.country}; ${g.lat}, ${g.lng}): ${g.note}`),
    "",
  ];
  return [
    `# ${brand.marque} dealers and independent specialists`,
    `Source: ${brand.url}/garages/`,
    "",
    ...section("Official dealer", `Official ${brand.marque} dealers`),
    ...section("Independent specialist", "Independent specialists"),
  ].join("\n");
}

export const md = (body: string) => new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
