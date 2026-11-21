import json
import os

PAGES = [
    ("header", "data/hydrated_pages/header.html"),
    ("footer", "data/hydrated_pages/footer.html"),
    ("home", "data/hydrated_pages/home.html"),
    ("puppies", "data/hydrated_pages/puppies.html"),
    ("happy_families", "data/hydrated_pages/happy_families.html"),
    ("how_it_works", "data/hydrated_pages/how_it_works.html"),
    ("faq", "data/hydrated_pages/faq.html"),
    ("contact", "data/hydrated_pages/contact.html"),
    ("gone_home", "data/hydrated_pages/gone_home.html"),
    ("puppy_profile", "data/hydrated_pages/puppy_profile.html")
]

ts_lines = ["// Exact hydrated original HTML content for pixel-perfect reconstruction"]

for key, path in PAGES:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    json_str = json.dumps(content)
    ts_lines.append(f"export const HTML_{key.upper()} = {json_str};\n")

with open("data/pageHtml.ts", "w", encoding="utf-8") as out:
    out.write("\n".join(ts_lines))

print("Saved data/pageHtml.ts successfully.")
