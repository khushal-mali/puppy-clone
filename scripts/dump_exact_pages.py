import requests
import os

PAGES = [
    ("/", "home.html"),
    ("/puppies", "puppies.html"),
    ("/happy-families", "happy_families.html"),
    ("/how-it-works", "how_it_works.html"),
    ("/faq", "faq.html"),
    ("/contact", "contact.html"),
    ("/gone-home", "gone_home.html"),
    ("/puppies/maltipoo-max-male", "puppy_profile.html")
]

os.makedirs("research/raw_pages", exist_ok=True)

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36"
})

for route, fname in PAGES:
    url = "https://puppy.instabizweb.com" + route
    print(f"Fetching {route} -> research/raw_pages/{fname}")
    r = session.get(url)
    with open(f"research/raw_pages/{fname}", "w", encoding="utf-8") as f:
        f.write(r.text)

print("Downloaded all 8 raw original HTML pages successfully.")
