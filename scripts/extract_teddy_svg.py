from bs4 import BeautifulSoup

with open('research/sections/hero.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
svg = soup.find('div', class_='tp-hero__teddy').find('svg')
print("Teddy SVG found:")
print(f"  viewBox: {svg.get('viewbox') or svg.get('viewBox')}")
print(f"  Length: {len(str(svg))}")

with open('research/sections/teddy_raw.svg', 'w', encoding='utf-8') as f_out:
    f_out.write(str(svg))

print("Saved raw SVG to research/sections/teddy_raw.svg")
