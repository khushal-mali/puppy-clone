import requests
import re
import os

css_urls = [
    'https://puppy.instabizweb.com/_next/static/chunks/2gh-2btcjgkih.css',
    'https://puppy.instabizweb.com/_next/static/chunks/10jf32vdx50lp.css'
]

os.makedirs('research/css', exist_ok=True)
all_css = ""

for i, url in enumerate(css_urls):
    resp = requests.get(url)
    filename = f"research/css/style_{i}.css"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(resp.text)
    all_css += "\n" + resp.text
    print(f"Downloaded {url} -> {filename} ({len(resp.text)} chars)")

# Analyze fonts
font_faces = re.findall(r'@font-face\s*\{([^}]+)\}', all_css)
print(f"\nFound {len(font_faces)} @font-face declarations:")
for ff in font_faces:
    family = re.search(r'font-family:\s*([^;]+)', ff)
    weight = re.search(r'font-weight:\s*([^;]+)', ff)
    src = re.search(r'src:\s*([^;]+)', ff)
    fam_str = family.group(1).strip() if family else "unknown"
    w_str = weight.group(1).strip() if weight else "unknown"
    s_str = src.group(1).strip() if src else "unknown"
    print(f"  Family: {fam_str}, Weight: {w_str}, Src: {s_str[:80]}...")

# Analyze CSS variables (colors, spacing, etc.)
root_vars = re.findall(r'--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);', all_css)
print(f"\nFound {len(root_vars)} CSS variables:")
vars_dict = {}
for k, v in root_vars:
    vars_dict[k] = v.strip()
for k in sorted(vars_dict.keys()):
    print(f"  --{k}: {vars_dict[k]}")

# Analyze keyframe animations
keyframes = re.findall(r'@keyframes\s+([a-zA-Z0-9_-]+)', all_css)
print(f"\nFound {len(keyframes)} @keyframes animations:")
for kf in sorted(set(keyframes)):
    print(f"  {kf}")

# Analyze color codes (#hex, rgb, hsl)
hex_colors = set(re.findall(r'#[0-9a-fA-F]{3,8}\b', all_css))
print(f"\nFound {len(hex_colors)} unique hex colors. Sample:")
for c in sorted(hex_colors)[:20]:
    print(f"  {c}")
