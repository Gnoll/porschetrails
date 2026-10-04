#!/bin/sh
# Runs the daily blog post agent for this site: writes one post, builds, deploys, commits and pushes.
# Scheduled by launchd (see scripts/install-daily-post.sh). Output goes to ~/Library/Logs/<site>-daily-post.log.
export PATH="$HOME/.local/bin:$HOME/.bun/bin:$HOME/.local/share/nvm/v23.7.0/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
cd "$(dirname "$0")/.." || exit 1
echo "=== $(date '+%F %T') daily post run in $(pwd)"
exec claude -p "$(cat scripts/daily-post.md)" \
  --permission-mode acceptEdits \
  --allowedTools "Read,Write,Edit,Glob,Grep,WebSearch,WebFetch,Bash(date:*),Bash(ls:*),Bash(node scripts/:*),Bash(bunx astro build:*),Bash(git add:*),Bash(git commit:*),Bash(git push:*),Bash(git status:*)" < /dev/null
