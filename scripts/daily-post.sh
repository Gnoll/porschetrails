#!/bin/sh
# Runs the daily blog post agent for this site. Schedule it once a day (see README).
cd "$(dirname "$0")/.." || exit 1
exec claude -p "$(cat scripts/daily-post.md)" \
  --permission-mode acceptEdits \
  --allowedTools "Read,Write,Edit,Glob,Grep,WebSearch,WebFetch,Bash(date:*),Bash(ls:*),Bash(node scripts/:*),Bash(bunx astro build:*)"
