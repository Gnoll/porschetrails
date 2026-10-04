// Astro integration: after the build, make sure every HTML page has a markdown twin, so agents
// that ask for `Accept: text/markdown` can be served one (see the rewrite rules in
// scripts/cloudflare-setup.mjs). /trails/stelvio-pass/index.html -> /trails/stelvio-pass.md,
// /index.html -> /index.md. Pages that already have a hand-written .md endpoint are left alone.
import { readdir, readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name === "index.html") out.push(p);
  }
  return out;
}

export default function markdownPages() {
  return {
    name: "markdown-pages",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const turndown = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
        turndown.remove(["script", "style", "picture", "img", "form", "noscript", "nav"]);
        let made = 0;
        for (const file of await htmlFiles(root)) {
          const target = file === join(root, "index.html") ? join(root, "index.md") : file.replace(/\/index\.html$/, ".md");
          if (await access(target).then(() => true, () => false)) continue;
          const html = await readFile(file, "utf8");
          const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1];
          if (!main) continue;
          const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
          const body = turndown.turndown(main).replace(/\n{3,}/g, "\n\n").trim();
          await writeFile(target, `${body}\n\nSource: ${canonical}\n`);
          made++;
        }
        logger.info(`wrote ${made} markdown twins`);
      },
    },
  };
}
