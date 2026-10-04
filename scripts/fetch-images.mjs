// Downloads the photos listed in scripts/image-picks.json from Wikimedia Commons
// into src/assets/photos/ and writes src/data/credits.json (attribution for /credits/).
// Usage: node scripts/fetch-images.mjs [--force]
import { readFile, writeFile, mkdir, access } from "node:fs/promises";

const UA = "trails-site-build/1.0 (contact@lotustrails.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const OUT = "src/assets/photos";
const force = process.argv.includes("--force");
const picks = JSON.parse(await readFile("scripts/image-picks.json", "utf8"));
await mkdir(OUT, { recursive: true });

const exists = (f) => access(f).then(() => true, () => false);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const credits = {};
for (const [slot, pick] of Object.entries(picks)) {
  const file = `${OUT}/${slot}.jpg`;
  credits[slot] = { title: pick.title.replace(/^File:/, ""), artist: pick.artist, license: pick.license, page: pick.page };
  if (!force && (await exists(file))) continue;
  const p = new URLSearchParams({ action: "query", format: "json", titles: pick.title, prop: "imageinfo", iiprop: "url", iiurlwidth: "1920" });
  const info = await (await fetch(`${API}?${p}`, { headers: { "User-Agent": UA } })).json();
  const url = Object.values(info.query.pages)[0].imageinfo[0].thumburl;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${slot}: ${res.status} ${url}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  console.log("fetched", slot);
  await sleep(400);
}
await writeFile("src/data/credits.json", JSON.stringify(credits, null, 1) + "\n");
