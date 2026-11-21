from bs4 import BeautifulSoup

with open("research/raw_pages/home.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

tp_page = soup.find(class_="tp-page")
divs = tp_page.find_all("div", recursive=False)

for i, div in enumerate(divs):
    filename = f"research/raw_pages/section_{i+1}.html"
    with open(filename, "w", encoding="utf-8") as sf:
        sf.write(str(div))
    print(f"Wrote {filename} (length {len(str(div))} chars)")
