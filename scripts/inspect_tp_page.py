from bs4 import BeautifulSoup

with open("research/original_homepage.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")
tp_page = soup.find(class_="tp-page")

if tp_page:
    print(f"Found tp-page with {len(list(tp_page.children))} children:")
    for idx, child in enumerate(tp_page.children):
        if child.name:
            c_class = " ".join(child.get("class", []))
            c_id = child.get("id", "")
            h_tags = [h.get_text(strip=True) for h in child.find_all(["h1", "h2", "h3"])]
            print(f"\n--- Section #{idx+1}: <{child.name} class='{c_class}' id='{c_id}'> ---")
            print("Headings:", h_tags)
            print("Text snippet:", child.get_text(separator=' ', strip=True)[:180])
