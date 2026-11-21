from bs4 import BeautifulSoup
import urllib.parse
import os
import re

def process_element(elem):
    # Process all img tags
    for img in elem.find_all("img"):
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
            
        local_src = f"/images/{basename}"
        img["src"] = local_src
        if img.get("srcset"):
            img["srcset"] = f"{local_src} 1x, {local_src} 2x"

    # Process all video tags
    for vid in elem.find_all("video"):
        vid["src"] = "/videos/hero-puppy.mp4"
        for s in vid.find_all("source"):
            s["src"] = "/videos/hero-puppy.mp4"

    return "".join(str(c) for c in elem.children)

# Process Header & Footer
with open("research/raw_pages/home.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

header = soup.find("header")
footer = soup.find("footer")

# Process Header
for img in header.find_all("img"):
    img["src"] = "/images/logo.png"
    if img.get("srcset"):
        img["srcset"] = "/images/logo.png 1x, /images/logo.png 2x"

# Process Footer
for img in footer.find_all("img"):
    img["src"] = "/images/logo.png"
    if img.get("srcset"):
        img["srcset"] = "/images/logo.png 1x, /images/logo.png 2x"

os.makedirs("data/raw_content", exist_ok=True)

with open("data/raw_content/header.html", "w", encoding="utf-8") as out:
    out.write(str(header))

with open("data/raw_content/footer.html", "w", encoding="utf-8") as out:
    out.write(str(footer))

print("Saved data/raw_content/header.html and footer.html")

# Process all 8 pages
page_files = {
    "home": "research/raw_pages/home.html",
    "puppies": "research/raw_pages/puppies.html",
    "happy_families": "research/raw_pages/happy_families.html",
    "how_it_works": "research/raw_pages/how_it_works.html",
    "faq": "research/raw_pages/faq.html",
    "contact": "research/raw_pages/contact.html",
    "gone_home": "research/raw_pages/gone_home.html",
    "puppy_profile": "research/raw_pages/puppy_profile.html"
}

for key, path in page_files.items():
    with open(path, "r", encoding="utf-8") as pf:
        psoup = BeautifulSoup(pf.read(), "html.parser")
    main = psoup.find("main")
    if main:
        content = process_element(main)
        out_path = f"data/raw_content/{key}.html"
        with open(out_path, "w", encoding="utf-8") as out:
            out.write(content)
        print(f"Processed {key} -> {out_path} ({len(content)} chars)")
