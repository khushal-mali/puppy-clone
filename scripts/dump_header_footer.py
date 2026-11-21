from bs4 import BeautifulSoup

with open("research/raw_pages/home.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

header = soup.find("header")
footer = soup.find("footer")

with open("research/raw_pages/exact_header.html", "w", encoding="utf-8") as f:
    f.write(str(header))

with open("research/raw_pages/exact_footer.html", "w", encoding="utf-8") as f:
    f.write(str(footer))

print("Header and Footer written.")
print("Header snippet:\n", str(header)[:1000])
print("\nFooter snippet:\n", str(footer)[:1000])
