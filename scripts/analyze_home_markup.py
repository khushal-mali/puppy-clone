from bs4 import BeautifulSoup
import re

with open("research/raw_pages/home.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# Header
header = soup.find("header")
if header:
    print(f"Header classes: {header.get('class')}")
    # Inspect links and logo in header
    for a in header.find_all("a"):
        print("  Header Link:", a.get("href"), "-> Text:", a.get_text(strip=True), "Classes:", a.get("class"))
    for b in header.find_all("button"):
        print("  Header Button:", b.get("aria-label"), "Classes:", b.get("class"), "Text:", b.get_text(strip=True))

# Main structure
main = soup.find("main")
if main:
    print(f"\nMain classes: {main.get('class')}")
    tp_page = main.find(class_=re.compile("tp-page"))
    if tp_page:
        print(f"tp-page classes: {tp_page.get('class')}")
        for i, sec in enumerate(tp_page.find_all("section", recursive=False)):
            print(f"  Section #{i+1}: class='{sec.get('class')}' id='{sec.get('id')}'")
        # If not section, print direct divs
        for i, div in enumerate(tp_page.find_all("div", recursive=False)):
            print(f"  Div #{i+1}: class='{div.get('class')}' id='{div.get('id')}'")

# Footer
footer = soup.find("footer")
if footer:
    print(f"\nFooter classes: {footer.get('class')}")
