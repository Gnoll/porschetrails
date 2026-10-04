// Uploads dist/ to the site's R2 bucket: only changed files, with content types and cache headers,
// removes files that no longer exist, then purges the Cloudflare cache.
// Usage: node scripts/deploy.mjs [--dry-run]
import { readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, extname, relative } from "node:path";
import { cf, s3, bucket, domain, zoneId } from "./cf.mjs";

const dry = process.argv.includes("--dry-run");
const DIST = "dist";
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".ico": "image/x-icon",
};
// Hashed build assets never change. Pages are cached briefly in browsers and for a day at the
// edge; the purge at the end of each deploy makes new content visible immediately.
const cacheFor = (key) =>
  key.startsWith("_astro/") ? "public, max-age=31536000, immutable"
  : /\.(html|xml|txt|md|webmanifest)$/.test(key) ? "public, max-age=300, s-maxage=86400"
  : "public, max-age=86400";

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name !== ".DS_Store") out.push(p);
  }
  return out;
}

const { client, base } = await s3();

// Remote listing: key -> etag. The header variant (content type and cache policy) is stored in
// object metadata so a change to either re-uploads the file.
const remote = new Map();
let tokenParam = "";
do {
  const xml = await (await client.fetch(`${base}?list-type=2${tokenParam}`)).text();
  for (const m of xml.matchAll(/<Key>([^<]+)<\/Key>.*?<ETag>&quot;([^&]+)&quot;<\/ETag>/gs)) remote.set(m[1].replace(/&amp;/g, "&"), m[2]);
  const next = xml.match(/<NextContinuationToken>([^<]+)</)?.[1];
  tokenParam = next ? `&continuation-token=${encodeURIComponent(next)}` : "";
} while (tokenParam);

const files = await walk(DIST);
const local = new Set();
const uploads = [];
for (const file of files) {
  const key = relative(DIST, file).split("\\").join("/");
  local.add(key);
  const body = await readFile(file);
  if (remote.get(key) === createHash("md5").update(body).digest("hex")) continue;
  uploads.push({ key, body });
}
const stale = [...remote.keys()].filter((k) => !local.has(k));
console.log(`${bucket}: ${files.length} files, ${uploads.length} to upload, ${stale.length} to delete${dry ? " (dry run)" : ""}`);
if (dry) process.exit(0);

async function pool(items, size, fn) {
  let i = 0, failed = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < items.length) {
      const item = items[i++];
      for (let attempt = 1; ; attempt++) {
        try { await fn(item); break; } catch (err) {
          if (attempt === 4) { failed++; console.error("FAILED", item.key ?? item, err.message); break; }
          await new Promise((r) => setTimeout(r, 500 * attempt));
        }
      }
    }
  }));
  return failed;
}
const keyUrl = (key) => `${base}/${key.split("/").map(encodeURIComponent).join("/")}`;

let failed = await pool(uploads, 12, async ({ key, body }) => {
  const res = await client.fetch(keyUrl(key), {
    method: "PUT",
    body,
    headers: { "Content-Type": TYPES[extname(key)] ?? "application/octet-stream", "Cache-Control": cacheFor(key) },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
});
failed += await pool(stale, 12, async (key) => {
  const res = await client.fetch(keyUrl(key), { method: "DELETE" });
  if (!res.ok) throw new Error(`${res.status}`);
});
if (failed) { console.error(`${failed} operations failed`); process.exit(1); }

const purge = await cf("POST", `/zones/${await zoneId()}/purge_cache`, { purge_everything: true });
console.log(purge.ok ? `Deployed to https://${domain}/ and purged the cache` : `Deployed, but cache purge failed: ${JSON.stringify(purge.errors)}`);
