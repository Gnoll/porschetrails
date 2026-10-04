// Adds a Wikimedia Commons photo to scripts/image-picks.json, then run `npm run images`.
// Usage: node scripts/add-image.mjs <slot> "File:Exact title.jpg"
import { readFile, writeFile } from "node:fs/promises";

const UA = "trails-site-build/1.0 (contact@lotustrails.com)";
const [slot, title] = process.argv.slice(2);
if (!slot || !title) throw new Error('usage: add-image.mjs <slot> "File:Title.jpg"');
const p = new URLSearchParams({ action: "query", format: "json", titles: title, prop: "imageinfo", iiprop: "url|size|extmetadata" });
const res = await fetch(`https://commons.wikimedia.org/w/api.php?${p}`, { headers: { "User-Agent": UA } });
const ii = Object.values((await res.json()).query.pages)[0].imageinfo?.[0];
if (!ii) throw new Error(`not found: ${title}`);
const m = ii.extmetadata;
const strip = (s = "") => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const license = m.LicenseShortName?.value ?? "";
if (!/^(CC0|CC BY|Public domain)/i.test(license)) throw new Error(`licence not reusable: ${license}`);
const picks = JSON.parse(await readFile("scripts/image-picks.json", "utf8"));
picks[slot] = { title, license, artist: strip(m.Artist?.value), page: ii.descriptionurl, width: ii.width, height: ii.height };
await writeFile("scripts/image-picks.json", JSON.stringify(picks, null, 1) + "\n");
console.log(slot, "|", license, "|", picks[slot].artist);
