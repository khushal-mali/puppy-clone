from bs4 import BeautifulSoup
import urllib.parse
import os
import re

PAGES = [
    "home.html",
    "puppies.html",
    "happy_families.html",
    "how_it_works.html",
    "faq.html",
    "contact.html",
    "gone_home.html",
    "puppy_profile.html"
]

for p in PAGES:
    path = os.path.join("research/raw_pages", p)
    with open(path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
    imgs = soup.find_all("img")
    missing = 0
    found = 0
    for img in imgs:
        src = img.get("src", "")
        orig = src
        if "_next/image" in src:
            parsed = urllib.parse.urlparse(src)
            qs = urllib.parse.parse_qs(parsed.query)
            if qs.get("url"):
                orig = qs["url"][0]
        basename = os.path.basename(urllib.parse.urlparse(orig).path)
        if "logo" in basename:
            basename = "logo.png"
        else:
            basename = re.sub(r'[^a-zA-Z0-9_.-]', '_', basename)
        local_p = os.path.join("public/images", basename)
        if os.path.exists(local_p):
            found += 1
        else:
            missing += 1
    print(f"{p}: Total {len(imgs)} imgs -> Found: {found}, Missing: {missing}")
