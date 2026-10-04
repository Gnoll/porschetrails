// Generates an illustration with OpenAI gpt-image-2.5-flare.
// Usage: OPENAI_API_KEY=... node scripts/generate-image.mjs <out.png> "<prompt>" [size] [quality]
import { writeFile } from "node:fs/promises";

const [out, prompt, size = "1536x1024", quality = "medium"] = process.argv.slice(2);
const res = await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ model: "gpt-image-2.5-flare", prompt, size, quality }),
});
if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
const json = await res.json();
await writeFile(out, Buffer.from(json.data[0].b64_json, "base64"));
console.log(out, JSON.stringify(json.usage ?? {}));
