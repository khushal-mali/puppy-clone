import re

with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# find HTML_PUPPIES
match = re.search(r'export const HTML_PUPPIES = "(.*?)(?="\nexport|\Z)', text, re.DOTALL)
if match:
    puppies_html = match.group(1)
    # find puppy links and images
    # e.g. <a href="/puppies/..." ... <img ... src="..."
    cards = re.findall(r'<a[^>]+href="(/puppies/[^"]+)"[^>]*>.*?</a>', puppies_html)
    print(f"Puppy links in HTML_PUPPIES: {len(cards)}")
    
    # extract href and img src
    items = re.findall(r'href="(/puppies/([^"]+))".*?<img[^>]+src="([^"]+)"', puppies_html)
    print(f"Extracted puppy items: {len(items)}")
    for href, slug, img in items[:10]:
        print(f"  {slug} -> {img}")
