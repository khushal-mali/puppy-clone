import os
import re
import json
import urllib.parse
import requests

BASE_URL = "https://puppy.instabizweb.com"

# Create directories
os.makedirs("public/images", exist_ok=True)
os.makedirs("public/fonts", exist_ok=True)
os.makedirs("public/videos", exist_ok=True)
os.makedirs("public/icons", exist_ok=True)
os.makedirs("public/animations", exist_ok=True)

manifest = []

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})

def download_file(url, target_path, asset_type, page_found="all"):
    full_url = urllib.parse.urljoin(BASE_URL, url)
    entry = {
        "original_url": full_url,
        "asset_type": asset_type,
        "page": page_found,
        "suggested_path": target_path,
        "downloaded": False,
        "size_bytes": 0,
        "error": None
    }
    
    try:
        r = session.get(full_url, timeout=20)
        if r.status_code == 200:
            with open(target_path, "wb") as f:
                f.write(r.content)
            entry["downloaded"] = True
            entry["size_bytes"] = len(r.content)
            print(f"Downloaded [{asset_type}] -> {target_path} ({len(r.content)} B)")
        else:
            entry["error"] = f"HTTP {r.status_code}"
            print(f"Failed [{asset_type}] {full_url}: HTTP {r.status_code}")
    except Exception as e:
        entry["error"] = str(e)
        print(f"Error downloading {full_url}: {e}")
        
    manifest.append(entry)
    return entry["downloaded"]

print("1. Downloading Fonts...")
font_files = [
    "a5a3076f5a3c2968-s.09mqwf_zjnrdf.woff2",
    "23f1a98b08006014-s.0s5mkn35-hrc5.woff2",
    "54fc36028e2bb174-s.p.20jfceqj9zyw9.woff2",
    "400bf8aa837fcb7e-s.19g-lkcx7iw64.woff2",
    "f7aa21714c1c53f8-s.p.0-95eo-012xnf.woff2",
    "83f4c5b0d12dd83f-s.1sbuusr--l6lr.woff2",
    "c4e0c79cd61216ab-s.3h4i5b54oao78.woff2",
    "b1d8f8d5e7daa648-s.0_9e2i2tt-1n2.woff2",
    "9954f6cfbebf77eb-s.3seyq4viabdpn.woff2",
    "c25c3c50e24471d2-s.p.1-0ft7iz2f4p6.woff2"
]
for ff in font_files:
    download_file(f"/_next/static/media/{ff}", f"public/fonts/{ff}", "font", "global")

print("\n2. Downloading Icons & Cursors...")
download_file("/cursor/paw.svg", "public/icons/cursor-paw.svg", "icon", "global")
download_file("/cursor/paw-press.svg", "public/icons/cursor-paw-press.svg", "icon", "global")
download_file("/brand/logo.png", "public/images/logo.png", "logo", "global")
download_file("/favicon.ico", "public/icons/favicon.ico", "icon", "global")

print("\n3. Downloading Videos...")
download_file(
    "/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4",
    "public/videos/hero-puppy.mp4",
    "video",
    "/"
)

print("\n4. Downloading Images from Discovery...")
with open("research/discovery_data.json", "r", encoding="utf-8") as f:
    disc_data = json.load(f)

# Extract original unique images and page associations
image_page_map = {}
for route, rdata in disc_data["routes"].items():
    for img_url in rdata.get("images", []):
        parsed = urllib.parse.urlparse(img_url)
        orig = img_url
        if "_next/image" in parsed.path:
            qs = urllib.parse.parse_qs(parsed.query)
            if qs.get("url"):
                orig = urllib.parse.urljoin("https://puppy.instabizweb.com", qs.get("url")[0])
        if orig not in image_page_map:
            image_page_map[orig] = set()
        image_page_map[orig].add(route)

print(f"Total unique images to download: {len(image_page_map)}")
img_idx = 0
for orig_url, pages in image_page_map.items():
    parsed = urllib.parse.urlparse(orig_url)
    basename = os.path.basename(parsed.path)
    if not basename or "." not in basename:
        basename = f"img_{img_idx}.jpg"
    else:
        # Sanitize filename
        basename = re.sub(r'[^a-zA-Z0-9_.-]', '_', basename)
    
    target_path = f"public/images/{basename}"
    page_str = ", ".join(sorted(pages)[:3])
    download_file(orig_url, target_path, "image", page_str)
    img_idx += 1

print(f"\nTotal assets recorded in manifest: {len(manifest)}")
downloaded_count = sum(1 for m in manifest if m["downloaded"])
print(f"Successfully downloaded: {downloaded_count} / {len(manifest)}")

with open("research/asset_manifest.json", "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

print("Saved research/asset_manifest.json")
