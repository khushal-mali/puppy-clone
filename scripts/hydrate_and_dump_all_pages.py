import asyncio
import os
import re
import urllib.parse
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup

BASE_URL = "https://puppy.instabizweb.com"
PAGES = [
    ("/", "home"),
    ("/puppies", "puppies"),
    ("/happy-families", "happy_families"),
    ("/how-it-works", "how_it_works"),
    ("/faq", "faq"),
    ("/contact", "contact"),
    ("/gone-home", "gone_home"),
    ("/puppies/maltipoo-max-male", "puppy_profile")
]

os.makedirs("data/hydrated_pages", exist_ok=True)

def rewrite_images(html_str):
    soup = BeautifulSoup(html_str, "html.parser")
    for img in soup.find_all("img"):
        src = img.get("src", "")
        orig = src
        if "_next/image" in src:
            parsed = urllib.parse.urlparse(src)
            qs = urllib.parse.parse_qs(parsed.query)
            if qs.get("url"):
                orig = qs["url"][0]
        basename = os.path.basename(urllib.parse.urlparse(orig).path)
        if "logo" in basename:
            basename = "logo.png"
        else:
            basename = re.sub(r'[^a-zA-Z0-9_.-]', '_', basename)
            
        local_src = f"/images/{basename}"
        img["src"] = local_src
        if img.get("srcset"):
            img["srcset"] = f"{local_src} 1x, {local_src} 2x"

    for vid in soup.find_all("video"):
        vid["src"] = "/videos/hero-puppy.mp4"
        for s in vid.find_all("source"):
            s["src"] = "/videos/hero-puppy.mp4"

    return str(soup)

async def dump_hydrated():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})

        for route, name in PAGES:
            url = BASE_URL + route
            print(f"Loading {route} ...")
            await page.goto(url, wait_until="networkidle", timeout=30000)
            await page.wait_for_timeout(1000)

            # Extract Header, Main, Footer
            header_html = await page.evaluate("() => document.querySelector('header')?.outerHTML || ''")
            main_html = await page.evaluate("() => document.querySelector('main')?.innerHTML || ''")
            footer_html = await page.evaluate("() => document.querySelector('footer')?.outerHTML || ''")

            # Save processed
            proc_main = rewrite_images(main_html)
            with open(f"data/hydrated_pages/{name}.html", "w", encoding="utf-8") as f:
                f.write(proc_main)
            print(f"  Saved data/hydrated_pages/{name}.html ({len(proc_main)} chars)")

            if name == "home":
                proc_header = rewrite_images(header_html)
                proc_footer = rewrite_images(footer_html)
                with open("data/hydrated_pages/header.html", "w", encoding="utf-8") as f:
                    f.write(proc_header)
                with open("data/hydrated_pages/footer.html", "w", encoding="utf-8") as f:
                    f.write(proc_footer)

        await browser.close()
    print("All hydrated pages captured successfully.")

if __name__ == "__main__":
    asyncio.run(dump_hydrated())
