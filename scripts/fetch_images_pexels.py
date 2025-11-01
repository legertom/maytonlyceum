#!/usr/bin/env python3
import os
import sys
import json
import pathlib
import urllib.request

import urllib.parse

API_KEY = os.environ.get("PEXELS_API_KEY")
if not API_KEY:
    sys.stderr.write("PEXELS_API_KEY not set. Export it before running.\n")
    sys.exit(2)

HEADERS = {"Authorization": API_KEY}
SEARCH_URL = "https://api.pexels.com/v1/search"

def ensure_dir(path: pathlib.Path):
    path.parent.mkdir(parents=True, exist_ok=True)

def pick_url(photo: dict) -> str:
    # Prefer large2x then large
    src = photo.get("src", {})
    return src.get("large2x") or src.get("large") or src.get("original")

def search_and_download(query: str, dest_path: pathlib.Path, orientation="landscape"):
    params = urllib.parse.urlencode({
        "query": query,
        "per_page": 15,
        "orientation": orientation,
        "size": "large",
        "locale": "en-US",
    })
    req = urllib.request.Request(f"{SEARCH_URL}?{params}", headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    photos = data.get("photos", [])
    if not photos:
        raise RuntimeError(f"No results for query: {query}")
    # Pick the first that likely looks like a school (simple heuristic)
    chosen = None
    for p in photos:
        alt = (p.get("alt") or "").lower()
        if any(k in alt for k in ["school", "classroom", "library", "campus", "students", "gym", "hallway"]):
            chosen = p
            break
    if not chosen:
        chosen = photos[0]
    url = pick_url(chosen)
    if not url:
        raise RuntimeError("No downloadable URL in photo result")
    ensure_dir(dest_path)
    # Download the image
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as img_resp:
        content = img_resp.read()
    dest_path.write_bytes(content)
    print(f"Saved: {dest_path} ← {url}")

# Mapping of site images to realistic school-related queries
TARGETS = {
    "assets/images/district/hero.jpg": "students walking in school hallway daytime, natural light, candid, real school",
    "assets/images/district/classroom.jpg": "teacher instructing students in classroom, diverse students, natural light",
    "assets/images/district/library.jpg": "school library with students reading and studying",
    "assets/images/district/sports.jpg": "high school gym basketball game practice, motion, natural light",
    "assets/images/schools/elementary.jpg": "elementary school building exterior daytime",
    "assets/images/schools/junior-high.jpg": "middle school building exterior daytime",
    "assets/images/schools/high-school.jpg": "high school campus exterior daytime",
}

def main():
    root = pathlib.Path(__file__).resolve().parents[1]
    for rel, q in TARGETS.items():
        dest = (root / rel)
        try:
            search_and_download(q, dest)
        except Exception as e:
            print(f"WARN: failed {rel}: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
