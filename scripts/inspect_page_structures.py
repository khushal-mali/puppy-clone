import os
import json
import re
from bs4 import BeautifulSoup

PAGES = [
    ("home", "/"),
    ("puppies", "/puppies"),
    ("happy-families", "/happy-families"),
    ("how-it-works", "/how-it-works"),
    ("faq", "/faq"),
    ("contact", "/contact"),
    ("gone-home", "/gone-home"),
    ("puppy-profile", "/puppies/maltipoo-max-male")
]

import requests

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0"})

structures = {}

for name, route in PAGES:
    url = f"https://puppy.instabizweb.com{route}"
    r = session.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    
    # Header & Nav
    header = soup.find("header")
    nav_links = []
    if header:
        for a in header.find_all("a"):
            nav_links.append({"text": a.get_text(strip=True), "href": a.get("href")})
            
    # Footer
    footer = soup.find("footer")
    footer_links = []
    if footer:
        for a in footer.find_all("a"):
            footer_links.append({"text": a.get_text(strip=True), "href": a.get("href")})
            
    # Main sections
    sections = []
    for s in soup.find_all(["section", "main", "article"]):
        s_id = s.get("id", "")
        s_class = " ".join(s.get("class", []))
        h_tags = [h.get_text(strip=True) for h in s.find_all(["h1", "h2", "h3", "h4"])]
        sections.append({
            "tag": s.name,
            "id": s_id,
            "class": s_class,
            "headings": h_tags[:5]
        })
        
    # External links
    external_links = []
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if href.startswith("http") and "puppy.instabizweb.com" not in href:
            external_links.append({"text": a.get_text(strip=True), "href": href})
        elif href.startswith("tel:") or href.startswith("mailto:") or href.startswith("https://wa.me") or "api.whatsapp.com" in href:
            external_links.append({"text": a.get_text(strip=True), "href": href})
            
    # Forms & inputs
    forms = []
    for f in soup.find_all("form"):
        inputs = []
        for inp in f.find_all(["input", "textarea", "select"]):
            inputs.append({
                "tag": inp.name,
                "type": inp.get("type", "text"),
                "name": inp.get("name", ""),
                "placeholder": inp.get("placeholder", ""),
                "required": inp.has_attr("required")
            })
        forms.append({
            "action": f.get("action", ""),
            "method": f.get("method", "post"),
            "inputs": inputs
        })

    structures[name] = {
        "route": route,
        "title": soup.title.get_text(strip=True) if soup.title else "",
        "nav_links": nav_links,
        "footer_links": footer_links,
        "sections": sections,
        "external_links": external_links,
        "forms": forms
    }

with open("research/page_structures.json", "w", encoding="utf-8") as f:
    json.dump(structures, f, indent=2)

print("Page structures extracted to research/page_structures.json")
