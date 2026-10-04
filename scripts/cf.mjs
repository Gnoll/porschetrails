// Shared Cloudflare helpers for setup and deploy. Reads CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN from .env.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { AwsClient } from "aws4fetch";

for (const line of readFileSync(".env", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
export const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;
if (!account || !token) throw new Error("Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in .env");

// The site's domain doubles as the bucket name without the TLD: lotustrails.com -> bucket "lotustrails".
const brandSrc = readFileSync("src/brand.ts", "utf8");
export const domain = brandSrc.match(/url:\s*"https:\/\/([^"]+)"/)[1];
export const bucket = domain.split(".")[0];

const API = "https://api.cloudflare.com/client/v4";
export async function cf(method, path, body) {
  const res = await fetch(API + path, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({ success: false, errors: [{ message: `HTTP ${res.status}` }] }));
  return { ok: json.success, result: json.result, errors: json.errors ?? [] };
}

export async function zoneId() {
  const { result } = await cf("GET", `/zones?name=${domain}`);
  if (!result?.length) throw new Error(`Zone ${domain} not found in this account`);
  return result[0].id;
}

/** R2's S3 API accepts an API token as credentials: key id = token id, secret = sha256(token). */
export async function s3() {
  const { result } = await cf("GET", `/accounts/${account}/tokens/verify`);
  const client = new AwsClient({
    accessKeyId: result.id,
    secretAccessKey: createHash("sha256").update(token).digest("hex"),
    service: "s3",
    region: "auto",
  });
  return { client, base: `https://${account}.r2.cloudflarestorage.com/${bucket}` };
}
