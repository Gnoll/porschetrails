import type { Region, Trail } from "./types";
import { europe } from "./trails-europe";
import { world } from "./trails-world";

export const trails: Trail[] = [...europe, ...world];

export const regions: { name: Region; slug: string; blurb: string }[] = [
  { name: "Europe", slug: "europe", blurb: "Alpine passes, rally stages, the Nürburgring and the roads around Stuttgart where the cars are built." },
  { name: "North America", slug: "north-america", blurb: "Appalachian ridges, Pacific cliffs and high passes in the Rockies." },
  { name: "Asia & Middle East", slug: "asia-middle-east", blurb: "Japanese toll roads, Thai mountain loops and a perfect desert climb." },
  { name: "Oceania", slug: "oceania", blurb: "Targa country: Tasmania, the Victorian Alps and New Zealand's Southern Alps." },
  { name: "Africa", slug: "africa", blurb: "Cape Peninsula cliffs and the mountain passes of the Winelands." },
  { name: "South America", slug: "south-america", blurb: "The stacked hairpins of southern Brazil's Serra Geral." },
];

export const trailBySlug = (slug: string) => trails.find((t) => t.slug === slug);
export const regionSlug = (name: Region) => regions.find((r) => r.name === name)!.slug;

/** Nearest other trails by great-circle distance, for "nearby" links. */
export function nearestTrails(trail: Trail, count = 3): Trail[] {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dist = (a: Trail, b: Trail) => {
    const h =
      Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
      Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.sqrt(h));
  };
  return trails
    .filter((t) => t.slug !== trail.slug)
    .sort((a, b) => dist(trail, a) - dist(trail, b))
    .slice(0, count);
}

export const kmToMiles = (km: number) => km * 0.621371;
export const mToFeet = (m: number) => m * 3.28084;
