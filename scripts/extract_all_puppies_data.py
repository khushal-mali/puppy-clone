import re
import json

with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Extract from HTML_PUPPIES
match_puppies = re.search(r'export const HTML_PUPPIES = "(.*?)(?="\nexport|\Z)', text, re.DOTALL)
puppies_html = match_puppies.group(1) if match_puppies else ""

# Each puppy card is an <li> inside the catalog grid
# Let's find all <li> elements with puppy info
cards = re.findall(r'<li[^>]*>(?:(?!<li).)*?<a[^>]+href="(/puppies/([^"]+))"[^>]*>.*?</li>', puppies_html, re.DOTALL)
print(f"Puppy cards found in HTML_PUPPIES: {len(cards)}")

available_puppies = []
for href, slug in re.findall(r'href=\\?"(/puppies/([^"\\]+))\\?"', puppies_html):
    # avoid duplicates
    if any(p['slug'] == slug for p in available_puppies):
        continue
    # find snippet around this slug
    idx = puppies_html.find(slug)
    snippet = puppies_html[max(0, idx - 500):min(len(puppies_html), idx + 1500)]
    
    # extract img
    img_m = re.search(r'src=\\?"(/images/[^"\\]+)\\?"', snippet)
    img = img_m.group(1) if img_m else "/images/logo.png"
    
    # extract name and breed
    name_m = re.search(r'class=\\?"font-plush[^"\\]*\\?"[^>]*>([^<]+)<', snippet)
    name = name_m.group(1).strip() if name_m else slug
    
    breed_m = re.search(r'class=\\?"font-scrawl[^"\\]*\\?"[^>]*>([^<]+)<', snippet)
    breed = breed_m.group(1).strip() if breed_m else ""
    
    available_puppies.append({
        "slug": slug,
        "name": name,
        "breed": breed,
        "image": img
    })

print(f"Extracted {len(available_puppies)} available puppies:")
for p in available_puppies:
    print(f"  {p['slug']}: name='{p['name']}', breed='{p['breed']}', img='{p['image']}'")
