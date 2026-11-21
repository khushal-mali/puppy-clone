import re
import json

# Load asset mapping
with open("research/verified_asset_inventory.json", "r", encoding="utf-8") as f:
    inventory = json.load(f)

# Create URL replacer mapping
# Map any /_next/image?url=... or /media/... or /brand/... to local /images/...
url_map = {}
for item in inventory:
    orig = item["original_url"]
    local = "/" + item["suggested_path"].replace("public/", "")
    url_map[orig] = local
    
    # Also map relative versions
    parsed = urllib.parse = __import__("urllib.parse").parse
    p = parsed.urlparse(orig)
    url_map[p.path] = local
    
    # Also map encoded query versions
    encoded = "/_next/image?url=" + parsed.quote(p.path, safe="")
    url_map[encoded] = local

print(f"Created {len(url_map)} URL mappings.")
