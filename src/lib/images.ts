import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import credits from "../data/credits.json";

const files = import.meta.glob<{ default: ImageMetadata }>("/src/assets/{photos,generated}/*.{jpg,png}", { eager: true });

const bySlot = new Map<string, { src: ImageMetadata; generated: boolean }>();
for (const [path, mod] of Object.entries(files)) {
  const slot = path.split("/").pop()!.replace(/\.(jpg|png)$/, "");
  bySlot.set(slot, { src: mod.default, generated: path.includes("/generated/") });
}

export interface Credit {
  title: string;
  artist: string;
  license: string;
  page: string;
}

export function photo(slot: string) {
  const hit = bySlot.get(slot);
  if (!hit) throw new Error(`No image for slot "${slot}"`);
  const credit = (credits as Record<string, Credit>)[slot];
  return { ...hit, credit };
}

export const hasPhoto = (slot: string) => bySlot.has(slot);

/** 1200x630 JPEG for Open Graph / Twitter cards. */
export async function ogImage(slot: string) {
  const img = await getImage({ src: photo(slot).src, width: 1200, height: 630, fit: "cover", format: "jpg", quality: 78 });
  return img.src;
}
