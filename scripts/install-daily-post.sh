#!/bin/sh
# Installs (or reinstalls) a launchd job that runs scripts/daily-post.sh once a day.
# Usage: scripts/install-daily-post.sh [hour] [minute]     (local time, default 07:00)
# Remove with: launchctl bootout gui/$(id -u)/com.<site>.daily-post && rm ~/Library/LaunchAgents/com.<site>.daily-post.plist
set -e
cd "$(dirname "$0")/.."
site="$(basename "$(pwd)")"
label="com.$site.daily-post"
plist="$HOME/Library/LaunchAgents/$label.plist"
hour="${1:-7}"; minute="${2:-0}"
cat > "$plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$label</string>
  <key>ProgramArguments</key><array><string>$(pwd)/scripts/daily-post.sh</string></array>
  <key>StartCalendarInterval</key><dict><key>Hour</key><integer>$hour</integer><key>Minute</key><integer>$minute</integer></dict>
  <key>StandardOutPath</key><string>$HOME/Library/Logs/$site-daily-post.log</string>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/$site-daily-post.log</string>
</dict>
</plist>
PLIST
launchctl bootout "gui/$(id -u)/$label" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$plist"
echo "Installed $label: runs daily at $(printf '%02d:%02d' "$hour" "$minute"), log at ~/Library/Logs/$site-daily-post.log"
