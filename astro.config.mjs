import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { brand } from "./src/brand.ts";
import markdownPages from "./scripts/markdown-pages.mjs";

export default defineConfig({
  site: brand.url,
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "always" },
  compressHTML: true,
  integrations: [sitemap(), markdownPages()],
  image: { responsiveStyles: false },
});
