#!/bin/sh
# Copies the shared theme (layout, components, pages, styles, lib, build scripts) from this
# project to a sibling site. Brand config, data, content and images are never touched.
# Usage: scripts/sync-theme.sh ../porschetrails
set -e
dest="${1:?usage: scripts/sync-theme.sh <sibling project dir>}"
cd "$(dirname "$0")/.."
for d in src/layouts src/components src/styles src/pages src/lib; do
  rsync -a --delete "$d/" "$dest/$d/"
done
rsync -a src/content.config.ts "$dest/src/"
rsync -a src/data/types.ts "$dest/src/data/"
rsync -a astro.config.mjs tsconfig.json .gitignore "$dest/"
rsync -a scripts/cf.mjs scripts/deploy.mjs scripts/cloudflare-setup.mjs scripts/fetch-images.mjs scripts/add-image.mjs scripts/generate-image.mjs scripts/daily-post.md scripts/daily-post.sh scripts/sync-theme.sh scripts/markdown-pages.mjs "$dest/scripts/"
echo "Synced theme to $dest"
