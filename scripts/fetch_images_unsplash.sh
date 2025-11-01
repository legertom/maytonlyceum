#!/usr/bin/env bash
set -euo pipefail

# Downloads realistic school-related photos from Unsplash Source (no API key) and
# overwrites the site's JPGs. Results are random per run; re-run to rotate.
# License: Unsplash License (attribution appreciated). Avoids scraping/keys.

root_dir="$(cd "$(dirname "$0")/.." && pwd)"

download() {
  local url="$1"; shift
  local out="$1"; shift
  mkdir -p "$(dirname "$out")"
  echo "→ $out"
  curl -L -s "$url" -o "$out"
}

# Wide images
download "https://source.unsplash.com/1792x1024/?school,hallway,students" "$root_dir/assets/images/district/hero.jpg"

# News images
download "https://source.unsplash.com/1280x800/?classroom,teacher,students" "$root_dir/assets/images/district/classroom.jpg"
download "https://source.unsplash.com/1280x800/?school,library,students" "$root_dir/assets/images/district/library.jpg"
download "https://source.unsplash.com/1280x800/?high-school,gym,basketball" "$root_dir/assets/images/district/sports.jpg"

# School exteriors
download "https://source.unsplash.com/1280x800/?elementary,school,building,daytime" "$root_dir/assets/images/schools/elementary.jpg"
download "https://source.unsplash.com/1280x800/?middle,school,building,daytime" "$root_dir/assets/images/schools/junior-high.jpg"
download "https://source.unsplash.com/1280x800/?high,school,campus,building,daytime" "$root_dir/assets/images/schools/high-school.jpg"

echo "Done. Review images and re-run to shuffle if needed."
