#!/usr/bin/env python3
import os
import sys
import json
import base64
import pathlib
import shutil
import tempfile
import urllib.request

API_KEY = os.environ.get("OPENAI_API_KEY")
if not API_KEY:
    sys.stderr.write("OPENAI_API_KEY not set. Export it before running.\n")
    sys.exit(2)

ENDPOINT = "https://api.openai.com/v1/images/generations"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

# Map target site images (jpg) to prompts
TARGETS = {
    "assets/images/district/hero.jpg": "Wide photo, candid students walking through a well-lit public high school hallway between classes, natural light, diverse students, no logos, documentary style, photojournalism, 35mm, realistic, depth of field",
    "assets/images/district/classroom.jpg": "Teacher at whiteboard engaging a classroom of middle school students, modern classroom, diverse group, natural window light, realistic documentary photo, not staged",
    "assets/images/district/library.jpg": "School library interior with students reading and studying at tables, warm lighting, shelves of books, realistic documentary style",
    "assets/images/district/sports.jpg": "High school gym during basketball practice, motion blur of player dribbling, spectators in bleachers, realistic lighting, documentary photo",
    "assets/images/schools/elementary.jpg": "Elementary school exterior during daytime, welcoming entrance, trees and playground visible, realistic suburban public school, no brand logos",
    "assets/images/schools/junior-high.jpg": "Middle school exterior daytime, brick building with signage that is generic, students entering, realistic documentary photo",
    "assets/images/schools/high-school.jpg": "Public high school campus exterior with flagpole and landscaping, daylight, realistic documentary style",
}

# Use a widely-supported size to avoid 400s from unsupported dimensions
SIZE_DEFAULT = "1024x1024"


def request_image(prompt: str, size: str) -> bytes:
    payload = json.dumps({
        "model": "gpt-image-1",
        "prompt": prompt,
        "size": size,
        "n": 1
    }).encode("utf-8")
    req = urllib.request.Request(ENDPOINT, data=payload, headers=HEADERS, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"HTTP {e.code}: {body}")
    b64 = data["data"][0]["b64_json"]
    return base64.b64decode(b64)


def ensure_parent(path: pathlib.Path):
    path.parent.mkdir(parents=True, exist_ok=True)


def save_as_jpg(png_bytes: bytes, dest_jpg: pathlib.Path):
    # Try to convert with sips if available (macOS)
    sips = shutil.which("sips")
    if sips:
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
            tmp.write(png_bytes)
            tmp_path = tmp.name
        try:
            ensure_parent(dest_jpg)
            os.system(f'"{sips}" -s format jpeg "{tmp_path}" --out "{dest_jpg}" >/dev/null 2>&1')
            if dest_jpg.exists() and dest_jpg.stat().st_size > 0:
                return True
        finally:
            try: os.unlink(tmp_path)
            except Exception: pass
    return False


def main():
    root = pathlib.Path(__file__).resolve().parents[1]
    for rel, prompt in TARGETS.items():
        out_path = root / rel
        try:
            # Always use default supported size; if it fails, report full error
            png_bytes = request_image(prompt, SIZE_DEFAULT)
            # Try to write as jpg; if conversion fails, save PNG next to it
            if save_as_jpg(png_bytes, out_path):
                print(f"Saved JPG: {rel}")
            else:
                png_path = out_path.with_suffix('.png')
                ensure_parent(png_path)
                png_path.write_bytes(png_bytes)
                print(f"Saved PNG (conversion unavailable): {png_path.relative_to(root)}")
        except Exception as e:
            print(f"WARN: generation failed for {rel}: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
