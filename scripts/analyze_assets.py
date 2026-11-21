import json
import urllib.parse
import os
import re

with open("research/discovery_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

raw_images = data["assets"]["images"]
raw_videos = data["assets"]["videos"]
raw_fonts = data["assets"]["fonts"]

print(f"Total raw image URLs: {len(raw_images)}")

# Unpack Next.js /_next/image?url=...
unique_original_images = {}
for img_url in raw_images:
    parsed = urllib.parse.urlparse(img_url)
    if "_next/image" in parsed.path:
        qs = urllib.parse.parse_qs(parsed.query)
        orig_url = qs.get("url", [None])[0]
        width = qs.get("w", [None])[0]
        if orig_url:
            # Normalize orig_url
            if orig_url.startswith("/"):
                orig_url = urllib.parse.urljoin("https://puppy.instabizweb.com", orig_url)
            if orig_url not in unique_original_images:
                unique_original_images[orig_url] = []
            unique_original_images[orig_url].append((width, img_url))
    else:
        if img_url not in unique_original_images:
            unique_original_images[img_url] = [("orig", img_url)]

print(f"Total distinct original media/image files: {len(unique_original_images)}")

# Categorize image URLs
categories = {
    "logo_and_icons": [],
    "puppy_photos": [],
    "testimonials_families": [],
    "hero_and_banners": [],
    "badges_and_decorations": [],
    "other": []
}

for orig_url in unique_original_images.keys():
    lower = orig_url.lower()
    if any(x in lower for x in ["logo", "icon", "favicon", "apple-touch"]):
        categories["logo_and_icons"].append(orig_url)
    elif any(x in lower for x in ["family", "families", "review", "customer"]):
        categories["testimonials_families"].append(orig_url)
    elif any(x in lower for x in ["hero", "banner", "bg", "background"]):
        categories["hero_and_banners"].append(orig_url)
    elif any(x in lower for x in ["badge", "stamp", "decor", "paw", "vector", "svg"]):
        categories["badges_and_decorations"].append(orig_url)
    elif any(x in lower for x in ["puppy", "maltipoo", "poodle", "pomeranian", "pomsky", "bichon", "shitzu", "cavapoo"]):
        categories["puppy_photos"].append(orig_url)
    else:
        categories["other"].append(orig_url)

print("\n--- Media Breakdown ---")
for cat, items in categories.items():
    print(f"  {cat}: {len(items)} files")

# Sample some URLs
print("\nSample Logos / Icons:")
for u in categories["logo_and_icons"][:5]:
    print(" ", u)

print("\nSample Puppy Photos:")
for u in categories["puppy_photos"][:5]:
    print(" ", u)

print("\nSample Testimonials / Families:")
for u in categories["testimonials_families"][:5]:
    print(" ", u)

print("\nSample Hero / Banners / Other:")
for u in (categories["hero_and_banners"] + categories["other"])[:5]:
    print(" ", u)

# Check fonts in CSS
with open("research/css/style_1.css", "r", encoding="utf-8") as f:
    css_content = f.read()

font_matches = set(re.findall(r'url\(([^)]+\.woff2?)\)', css_content))
print(f"\nDiscovered {len(font_matches)} font files referenced in CSS:")
for fm in font_matches:
    full_font = urllib.parse.urljoin("https://puppy.instabizweb.com/_next/static/chunks/", fm)
    print(" ", full_font)
