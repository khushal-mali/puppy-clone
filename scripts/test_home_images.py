from bs4 import BeautifulSoup
import urllib.parse
import os
import re

with open("research/raw_pages/home.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

imgs = soup.find_all("img")
print(f"Total img tags in home.html: {len(imgs)}")

missing = []
found = []

for img in imgs:
    src = img.get("src", "")
    orig = src
    if "_next/image" in src:
        parsed = urllib.parse.urlparse(src)
        qs = urllib.parse.parse_qs(parsed.query)
        if qs.get("url"):
            orig = qs["url"][0]
            
    # Check basename
    basename = os.path.basename(urllib.parse.urlparse(orig).path)
    if "logo" in basename:
        basename = "logo.png"
    else:
        basename = re.sub(r'[^a-zA-Z0-9_.-]', '_', basename)
        
    local_path = os.path.join("public/images", basename)
    if os.path.exists(local_path):
        found.append((orig, f"/images/{basename}"))
    else:
        missing.append((orig, basename))

print(f"Found on disk: {len(found)}")
print(f"Missing on disk: {len(missing)}")
if missing:
    print("Sample missing:", missing[:5])
