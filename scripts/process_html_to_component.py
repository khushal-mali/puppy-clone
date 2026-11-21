from bs4 import BeautifulSoup
import urllib.parse
import os
import re

def process_html_file(raw_html_path):
    with open(raw_html_path, "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    main = soup.find("main")
    if not main:
        return ""
        
    # Process all img tags
    for img in main.find_all("img"):
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
        
        # Rewrite srcset if present
        if img.get("srcset"):
            # Simple 1x / 2x or responsive using local_src
            img["srcset"] = f"{local_src} 1x, {local_src} 2x"

    # Process all video tags
    for vid in main.find_all("video"):
        vid["src"] = "/videos/hero-puppy.mp4"
        for s in vid.find_all("source"):
            s["src"] = "/videos/hero-puppy.mp4"
            
    # Process all picture source tags
    for pic in main.find_all("picture"):
        for src_tag in pic.find_all("source"):
            ssrc = src_tag.get("srcset", "")
            if ssrc:
                orig = ssrc.split(" ")[0]
                if "_next/image" in orig:
                    parsed = urllib.parse.urlparse(orig)
                    qs = urllib.parse.parse_qs(parsed.query)
                    if qs.get("url"):
                        orig = qs["url"][0]
                basename = os.path.basename(urllib.parse.urlparse(orig).path)
                basename = re.sub(r'[^a-zA-Z0-9_.-]', '_', basename)
                src_tag["srcset"] = f"/images/{basename}"
                
    # Extract inner HTML of main
    inner_html = "".join(str(c) for c in main.children)
    return inner_html

# Test on home.html
home_html = process_html_file("research/raw_pages/home.html")
print(f"Processed home.html inner content length: {len(home_html)} chars")
with open("research/processed_home.html", "w", encoding="utf-8") as out:
    out.write(home_html)
print("Saved research/processed_home.html")
