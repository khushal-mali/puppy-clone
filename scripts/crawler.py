import os
import re
import json
import urllib.parse
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://puppy.instabizweb.com"

KNOWN_ROUTES = [
    "/",
    "/puppies",
    "/happy-families",
    "/how-it-works",
    "/faq",
    "/contact",
    "/gone-home",
    "/delivery-collection"
]

visited = set()
routes_to_visit = list(KNOWN_ROUTES)
all_routes = {}
all_assets = {
    "images": set(),
    "fonts": set(),
    "videos": set(),
    "icons": set(),
    "css": set(),
    "scripts": set(),
    "other": set()
}

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})

def normalize_url(url, current_path):
    if not url or url.startswith("#") or url.startswith("javascript:") or url.startswith("mailto:") or url.startswith("tel:"):
        return None
    full = urllib.parse.urljoin(BASE_URL + current_path, url)
    parsed = urllib.parse.urlparse(full)
    if parsed.netloc == urllib.parse.urlparse(BASE_URL).netloc:
        path = parsed.path
        if not path:
            path = "/"
        # strip trailing slash except root
        if len(path) > 1 and path.endswith("/"):
            path = path[:-1]
        return path
    return None

print("Starting route and asset discovery...")

while routes_to_visit:
    route = routes_to_visit.pop(0)
    if route in visited:
        continue
    visited.add(route)
    
    full_url = urllib.parse.urljoin(BASE_URL, route)
    print(f"Fetching: {route} ({full_url})")
    try:
        resp = session.get(full_url, timeout=15)
        status = resp.status_code
        html = resp.text
        
        soup = BeautifulSoup(html, "html.parser")
        title = soup.title.string.strip() if soup.title and soup.title.string else ""
        
        all_routes[route] = {
            "status": status,
            "title": title,
            "content_type": resp.headers.get("content-type", ""),
            "links": [],
            "images": []
        }
        
        # Discover internal links
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            norm = normalize_url(href, route)
            if norm:
                all_routes[route]["links"].append(norm)
                if norm not in visited and norm not in routes_to_visit:
                    routes_to_visit.append(norm)
        
        # Discover images
        for img in soup.find_all("img"):
            src = img.get("src")
            srcset = img.get("srcset")
            if src:
                full_img = urllib.parse.urljoin(full_url, src)
                all_assets["images"].add(full_img)
                all_routes[route]["images"].append(full_img)
            if srcset:
                for part in srcset.split(","):
                    p = part.strip().split(" ")[0]
                    if p:
                        all_assets["images"].add(urllib.parse.urljoin(full_url, p))
                        
        # Discover video
        for video in soup.find_all("video"):
            src = video.get("src")
            if src:
                all_assets["videos"].add(urllib.parse.urljoin(full_url, src))
            for source in video.find_all("source"):
                ssrc = source.get("src")
                if ssrc:
                    all_assets["videos"].add(urllib.parse.urljoin(full_url, ssrc))
                    
        # Discover styles and fonts in link tags
        for link in soup.find_all("link"):
            rel = link.get("rel", [])
            href = link.get("href")
            if href:
                full_href = urllib.parse.urljoin(full_url, href)
                if "stylesheet" in rel:
                    all_assets["css"].add(full_href)
                elif "preload" in rel and link.get("as") == "font":
                    all_assets["fonts"].add(full_href)
                elif "icon" in rel:
                    all_assets["icons"].add(full_href)
                    
        # Discover scripts
        for script in soup.find_all("script", src=True):
            all_assets["scripts"].add(urllib.parse.urljoin(full_url, script["src"]))
            
        # Discover CSS backgrounds or inline SVGs
        # Look for svg icons
        svgs = soup.find_all("svg")
        all_routes[route]["svg_count"] = len(svgs)
        
    except Exception as e:
        print(f"Error fetching {route}: {e}")
        all_routes[route] = {
            "status": "ERROR",
            "error": str(e)
        }

print("\n--- Route Discovery Completed ---")
print(f"Total routes discovered: {len(all_routes)}")
for r, info in sorted(all_routes.items()):
    print(f"  {r}: status={info.get('status')} title='{info.get('title')}'")

print(f"\nTotal unique images discovered: {len(all_assets['images'])}")
print(f"Total unique fonts discovered: {len(all_assets['fonts'])}")
print(f"Total unique videos discovered: {len(all_assets['videos'])}")
print(f"Total unique CSS files discovered: {len(all_assets['css'])}")
print(f"Total unique scripts discovered: {len(all_assets['scripts'])}")

# Save raw discovery data to json
os.makedirs("research", exist_ok=True)
with open("research/discovery_data.json", "w", encoding="utf-8") as f:
    json.dump({
        "routes": all_routes,
        "assets": {k: list(v) for k, v in all_assets.items()}
    }, f, indent=2)

print("Saved research/discovery_data.json successfully.")
