import os
import re
import json
import urllib.parse
import requests
from bs4 import BeautifulSoup
from PIL import Image

BASE_URL = "https://puppy.instabizweb.com"

# Ensure target directories
for d in ["public/images", "public/fonts", "public/videos", "public/icons", "public/animations", "research"]:
    os.makedirs(d, exist_ok=True)

# 1. Load all routes discovered in Phase 1
with open("research/discovery_data.json", "r", encoding="utf-8") as f:
    disc_data = json.load(f)

routes = list(disc_data["routes"].keys())
print(f"Loaded {len(routes)} routes for comprehensive asset inspection.")

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})

raw_assets_found = {} # url -> {"type": ..., "pages": set(), "element": ...}

def register_asset(url, asset_type, page, element_desc):
    if not url or url.startswith("data:") or url.startswith("javascript:") or url.startswith("#"):
        return
    full_url = urllib.parse.urljoin(BASE_URL, url)
    
    # If it's a Next.js image proxy /_next/image?url=..., extract the true original asset URL
    parsed = urllib.parse.urlparse(full_url)
    if "_next/image" in parsed.path:
        qs = urllib.parse.parse_qs(parsed.query)
        if "url" in qs and qs["url"]:
            orig_path = qs["url"][0]
            full_url = urllib.parse.urljoin(BASE_URL, orig_path)
            
    if full_url not in raw_assets_found:
        raw_assets_found[full_url] = {
            "type": asset_type,
            "pages": set(),
            "element": element_desc
        }
    raw_assets_found[full_url]["pages"].add(page)

# 2. Inspect every page
print("\n--- Inspecting all routes for img, picture, srcset, videos, and CSS backgrounds ---")
for r in routes:
    if r == "/cdn-cgi/l/email-protection" or r == "/delivery-collection":
        continue
    page_url = urllib.parse.urljoin(BASE_URL, r)
    try:
        resp = session.get(page_url, timeout=15)
        if resp.status_code != 200:
            continue
        html = resp.text
        soup = BeautifulSoup(html, "html.parser")
        
        # img tags (src & srcset)
        for img in soup.find_all("img"):
            src = img.get("src")
            if src:
                register_asset(src, "image", r, "img.src")
            srcset = img.get("srcset")
            if srcset:
                for part in srcset.split(","):
                    u = part.strip().split(" ")[0]
                    if u:
                        register_asset(u, "image", r, "img.srcset")
                        
        # picture and source tags
        for pic in soup.find_all("picture"):
            for src_tag in pic.find_all("source"):
                ssrc = src_tag.get("srcset") or src_tag.get("src")
                if ssrc:
                    for part in ssrc.split(","):
                        u = part.strip().split(" ")[0]
                        if u:
                            register_asset(u, "image", r, "picture.source")
                            
        # video and video source tags
        for vid in soup.find_all("video"):
            vsrc = vid.get("src")
            if vsrc:
                register_asset(vsrc, "video", r, "video.src")
            for vsource in vid.find_all("source"):
                s = vsource.get("src")
                if s:
                    register_asset(s, "video", r, "video.source")
                    
        # inline style background-image
        for el in soup.find_all(style=True):
            style = el["style"]
            bg_matches = re.findall(r'url\([\'"]?([^\'")]+)[\'"]?\)', style)
            for bg in bg_matches:
                register_asset(bg, "image", r, "inline.background-image")
                
        # link tags for icons and fonts
        for link in soup.find_all("link"):
            rel = link.get("rel", [])
            href = link.get("href")
            if href:
                if "icon" in rel:
                    register_asset(href, "icon", r, "link.icon")
                elif "preload" in rel and link.get("as") == "font":
                    register_asset(href, "font", r, "link.font")
                    
    except Exception as e:
        print(f"Error inspecting {r}: {e}")

# 3. Add fonts and cursors from CSS files
for css_file in ["research/css/style_0.css", "research/css/style_1.css"]:
    if os.path.exists(css_file):
        with open(css_file, "r", encoding="utf-8") as f:
            css_text = f.read()
        # Find fonts
        for font_match in re.findall(r'url\((../media/[^\)]+\.woff2)\)', css_text):
            font_url = urllib.parse.urljoin("https://puppy.instabizweb.com/_next/static/chunks/", font_match)
            register_asset(font_url, "font", "css", "css.@font-face")
        # Find cursors
        for cur in re.findall(r'url\((/cursor/[^\)]+)\)', css_text):
            register_asset(cur, "icon", "css", "css.cursor")

# Add known brand logo and favicon
register_asset("/brand/logo.png", "logo", "global", "brand.logo")
register_asset("/favicon.ico", "icon", "global", "favicon")

print(f"\nTotal distinct canonical assets registered: {len(raw_assets_found)}")

# 4. Download and organize assets
inventory = []
downloaded_count = 0
failed_count = 0

print("\n--- Downloading and verifying assets ---")

for orig_url, info in raw_assets_found.items():
    atype = info["type"]
    pages = sorted(list(info["pages"]))
    page_str = ", ".join(pages[:3]) if pages else "global"
    
    parsed = urllib.parse.urlparse(orig_url)
    basename = os.path.basename(parsed.path)
    
    if atype == "font":
        target_dir = "public/fonts"
        if not basename.endswith(".woff2"):
            basename += ".woff2"
    elif atype == "video":
        target_dir = "public/videos"
        basename = "hero-puppy.mp4"
    elif atype in ["icon", "logo"]:
        target_dir = "public/icons" if atype == "icon" else "public/images"
        if not basename:
            basename = "logo.png"
    else: # image
        target_dir = "public/images"
        if not basename or "." not in basename:
            basename = f"img_{len(inventory)}.jpg"
        else:
            basename = re.sub(r'[^a-zA-Z0-9_.-]', '_', basename)
            
    local_path = os.path.join(target_dir, basename)
    
    item = {
        "original_url": orig_url,
        "local_filename": basename,
        "suggested_path": local_path.replace("\\", "/"),
        "asset_type": atype,
        "source_pages": pages,
        "source_page_str": page_str,
        "download_status": "PENDING",
        "verified_open": False,
        "file_size_bytes": 0,
        "dimensions": None,
        "format": None,
        "error": None
    }
    
    # Check if already downloaded
    needs_download = True
    if os.path.exists(local_path):
        size = os.path.getsize(local_path)
        if size > 0:
            needs_download = False
            item["file_size_bytes"] = size
            item["download_status"] = "SUCCESS (CACHED)"
            
    if needs_download:
        try:
            r = session.get(orig_url, timeout=20)
            if r.status_code == 200:
                with open(local_path, "wb") as f:
                    f.write(r.content)
                item["file_size_bytes"] = len(r.content)
                item["download_status"] = "SUCCESS"
            else:
                item["download_status"] = f"FAILED (HTTP {r.status_code})"
                item["error"] = f"HTTP {r.status_code}"
                failed_count += 1
        except Exception as e:
            item["download_status"] = f"FAILED ({str(e)})"
            item["error"] = str(e)
            failed_count += 1
            
    # 5. VERIFICATION: Test that downloaded files can actually be opened and decoded
    if os.path.exists(local_path) and item["file_size_bytes"] > 0:
        try:
            if atype in ["image", "logo"] or basename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif')):
                # Try opening image with PIL
                with Image.open(local_path) as im:
                    im.verify()
                    # Get dimensions and format
                with Image.open(local_path) as im:
                    item["dimensions"] = f"{im.width}x{im.height}"
                    item["format"] = im.format
                    item["verified_open"] = True
                    downloaded_count += 1
            elif atype == "font" or basename.endswith(".woff2"):
                with open(local_path, "rb") as ff:
                    header = ff.read(4)
                    if header == b"wOF2":
                        item["format"] = "WOFF2"
                        item["verified_open"] = True
                        downloaded_count += 1
                    else:
                        item["error"] = "Invalid WOFF2 magic bytes"
            elif atype == "video" or basename.endswith(".mp4"):
                with open(local_path, "rb") as vf:
                    vhead = vf.read(32)
                    if b"ftyp" in vhead:
                        item["format"] = "MP4 (H.264/AAC)"
                        item["verified_open"] = True
                        downloaded_count += 1
                    else:
                        item["error"] = "Invalid MP4 ftyp container"
            elif atype == "icon" or basename.endswith(".svg"):
                with open(local_path, "r", encoding="utf-8", errors="ignore") as sf:
                    s_content = sf.read()
                    if "<svg" in s_content:
                        item["format"] = "SVG"
                        item["verified_open"] = True
                        downloaded_count += 1
                    else:
                        item["error"] = "No SVG tag found"
            else:
                item["verified_open"] = True
                downloaded_count += 1
        except Exception as e:
            item["verified_open"] = False
            item["error"] = f"File open/decode error: {e}"
            failed_count += 1
            
    inventory.append(item)

print(f"\n--- Verification Complete ---")
print(f"Total Assets Processed: {len(inventory)}")
print(f"Successfully Verified & Can Be Opened: {downloaded_count}")
print(f"Failed / Inaccessible: {failed_count}")

# Save json manifest
with open("research/verified_asset_inventory.json", "w", encoding="utf-8") as f:
    json.dump(inventory, f, indent=2)

print("Saved research/verified_asset_inventory.json")
