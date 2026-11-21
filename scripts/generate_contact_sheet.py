import os
import json
import urllib.parse

with open("research/verified_asset_inventory.json", "r", encoding="utf-8") as f:
    items = json.load(f)

# Categorize items into logical sections
def categorize_item(item):
    pages = item.get("source_pages", [])
    pages_str = " ".join(pages).lower()
    fname = item["local_filename"].lower()
    atype = item["asset_type"]
    
    if atype == "font":
        return "Fonts"
    if atype == "video":
        return "Video"
    if atype in ["icon", "logo"] or "logo" in fname or "cursor" in fname:
        return "Brand & Icons"
    if "/happy-families" in pages_str:
        return "Happy Families Gallery"
    if "/gone-home" in pages_str:
        return "Gone Home Tickets"
    if "/puppies/" in pages_str:
        return "Puppy Profiles"
    if "/puppies" in pages_str:
        return "Puppy Catalog"
    if "/" in pages or "home" in pages_str:
        return "Homepage"
    return "General / Showcase"

for item in items:
    item["section"] = categorize_item(item)

# Count per section
sections_count = {}
for item in items:
    s = item["section"]
    sections_count[s] = sections_count.get(s, 0) + 1

print("Assets per section:")
for s, c in sorted(sections_count.items()):
    print(f"  {s}: {c}")

# 1. Generate research/ASSET_INVENTORY.md
md = []
md.append("# TeddyPups Comprehensive Asset Inventory & Verification Log\n")
md.append("## Executive Summary\n")
md.append(f"- **Total Discovered & Cataloged Assets:** {len(items)}")
verified_count = sum(1 for i in items if i["verified_open"])
failed_count = sum(1 for i in items if not i["verified_open"])
md.append(f"- **Total Successfully Downloaded & Verified Openable:** {verified_count}")
md.append(f"- **Failed / Inaccessible (Origin 404):** {failed_count} (`/favicon.ico`)")
md.append("- **Verification Method:** Every image verified via PIL decode (dimensions & format extracted). Fonts verified via `wOF2` magic header. Video verified via MP4 `ftyp` box. Icons verified via `<svg>` XML root.\n")

md.append("### Section Breakdown\n")
md.append("| Section | Asset Count | Types | Storage Location |")
md.append("| :--- | :--- | :--- | :--- |")
for s, c in sorted(sections_count.items()):
    loc = "public/fonts" if s == "Fonts" else ("public/videos" if s == "Video" else ("public/icons" if "Icon" in s else "public/images"))
    md.append(f"| **{s}** | {c} assets | Images/Media | `{loc}/` |")

# Detailed tables by section
section_order = [
    "Brand & Icons",
    "Fonts",
    "Video",
    "Homepage",
    "Puppy Catalog",
    "Puppy Profiles",
    "Happy Families Gallery",
    "Gone Home Tickets",
    "General / Showcase"
]

for sec in section_order:
    sec_items = [i for i in items if i["section"] == sec]
    if not sec_items:
        continue
    md.append(f"\n---\n\n## {sec} ({len(sec_items)} Assets)\n")
    md.append("| # | Local Filename | File Type | Dimensions | File Size | Source Page(s) | Original URL | Verified |")
    md.append("| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |")
    for idx, i in enumerate(sec_items, 1):
        dim = i.get("dimensions") or ("720p" if i["asset_type"] == "video" else "Vector/Font")
        size_str = f"{i['file_size_bytes'] / 1024:.1f} KB" if i['file_size_bytes'] < 1024*1024 else f"{i['file_size_bytes'] / (1024*1024):.2f} MB"
        v_status = "✅ Opened & Verified" if i["verified_open"] else f"❌ {i.get('error', 'Failed')}"
        orig_short = i["original_url"]
        if len(orig_short) > 45:
            orig_short = orig_short[:22] + "..." + orig_short[-20:]
        fmt_str = (i.get("format") or i.get("asset_type") or "UNKNOWN").upper()
        md.append(f"| {idx} | `{i['local_filename']}` | {fmt_str} | {dim} | {size_str} | {i['source_page_str']} | `{orig_short}` | {v_status} |")

# Record failed downloads
failed_items = [i for i in items if not i["verified_open"]]
if failed_items:
    md.append("\n---\n\n## Failed Downloads Log\n")
    md.append("| # | Original URL | Local Filename | Asset Type | Source Page | Error Reason |")
    md.append("| :- | :--- | :--- | :--- | :--- | :--- |")
    for idx, fi in enumerate(failed_items, 1):
        md.append(f"| {idx} | `{fi['original_url']}` | `{fi['local_filename']}` | {fi['asset_type']} | {fi['source_page_str']} | {fi.get('error', 'HTTP 404')} |")

with open("research/ASSET_INVENTORY.md", "w", encoding="utf-8") as f:
    f.write("\n".join(md))

print("Updated research/ASSET_INVENTORY.md successfully.")

# 2. Generate research/contact_sheet.html
contact_sheet_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TeddyPups Developer Asset Contact Sheet</title>
  <style>
    :root {{
      --color-milk: #fffdf8;
      --color-cocoa: #2a170e;
      --color-honey: #f2be6b;
      --color-toffee: #c2622b;
      --color-card-bg: #ffffff;
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: var(--color-milk);
      color: var(--color-cocoa);
      font-family: var(--font-sans);
      padding: 2rem 1.5rem;
      line-height: 1.5;
    }}
    .header {{
      max-width: 1400px;
      margin: 0 auto 2rem auto;
      border-bottom: 2px solid rgba(42, 23, 14, 0.1);
      padding-bottom: 1.5rem;
    }}
    h1 {{
      font-size: 2.25rem;
      margin-bottom: 0.5rem;
      color: var(--color-cocoa);
    }}
    .stats {{
      display: flex;
      gap: 1.5rem;
      font-size: 0.95rem;
      color: #5a3a28;
      margin-top: 0.5rem;
      flex-wrap: wrap;
    }}
    .stats span {{
      background: #fbe3b4;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-weight: 600;
    }}
    .controls {{
      max-width: 1400px;
      margin: 0 auto 1.5rem auto;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      align-items: center;
    }}
    .search-input {{
      flex: 1;
      min-width: 250px;
      padding: 0.65rem 1rem;
      border: 1.5px solid rgba(42, 23, 14, 0.2);
      border-radius: 8px;
      font-size: 1rem;
      background: #fff;
    }}
    .filter-btn {{
      padding: 0.5rem 1rem;
      border: 1px solid rgba(42, 23, 14, 0.2);
      border-radius: 9999px;
      background: #fff;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.85rem;
      transition: all 0.2s;
    }}
    .filter-btn:hover, .filter-btn.active {{
      background: var(--color-cocoa);
      color: #fff;
      border-color: var(--color-cocoa);
    }}
    .grid {{
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
    }}
    .card {{
      background: var(--color-card-bg);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(42, 23, 14, 0.06);
      border: 1px solid rgba(42, 23, 14, 0.08);
      display: flex;
      flex-direction: column;
      transition: transform 0.2s, box-shadow 0.2s;
    }}
    .card:hover {{
      transform: translateY(-4px);
      box-shadow: 0 10px 24px rgba(42, 23, 14, 0.12);
    }}
    .thumb-wrap {{
      width: 100%;
      height: 200px;
      background: #f2ece4;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }}
    .thumb-wrap img {{
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }}
    .thumb-wrap.contain img {{
      object-fit: contain;
      padding: 10px;
    }}
    .thumb-wrap.video-wrap {{
      background: #2a170e;
      color: #fff;
    }}
    .badge-sec {{
      position: absolute;
      top: 8px;
      left: 8px;
      background: rgba(42, 23, 14, 0.85);
      color: #fff;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 4px;
      backdrop-filter: blur(4px);
    }}
    .card-body {{
      padding: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      flex: 1;
    }}
    .filename {{
      font-family: monospace;
      font-size: 0.8rem;
      font-weight: 700;
      word-break: break-all;
      color: var(--color-toffee);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    .meta-row {{
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #666;
    }}
    .source-page {{
      font-size: 0.75rem;
      color: #5a3a28;
      background: #fdf5ea;
      padding: 2px 6px;
      border-radius: 4px;
      margin-top: 4px;
      word-break: break-all;
    }}
    .copy-pill {{
      cursor: pointer;
      font-size: 0.7rem;
      background: #eee;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }}
    .copy-pill:hover {{
      background: var(--color-honey);
    }}
  </style>
</head>
<body>

  <div class="header">
    <h1>TeddyPups Developer Asset Contact Sheet</h1>
    <p>Visual directory of all 213 verified assets downloaded for the reconstruction project.</p>
    <div class="stats">
      <span>Total Assets: {len(items)}</span>
      <span>Verified Openable: {verified_count}</span>
      <span>Images: {sections_count.get('Happy Families Gallery', 0) + sections_count.get('Puppy Catalog', 0) + sections_count.get('Puppy Profiles', 0) + sections_count.get('Homepage', 0) + sections_count.get('Gone Home Tickets', 0)}</span>
      <span>Fonts: {sections_count.get('Fonts', 0)}</span>
      <span>Videos: {sections_count.get('Video', 0)}</span>
      <span>Brand & Icons: {sections_count.get('Brand & Icons', 0)}</span>
    </div>
  </div>

  <div class="controls">
    <input type="text" id="searchInput" class="search-input" placeholder="Search filename, section, or page..." onkeyup="filterCards()">
    <button class="filter-btn active" onclick="setFilter('all', this)">All ({len(items)})</button>
    <button class="filter-btn" onclick="setFilter('Brand & Icons', this)">Brand & Icons</button>
    <button class="filter-btn" onclick="setFilter('Homepage', this)">Homepage</button>
    <button class="filter-btn" onclick="setFilter('Puppy Catalog', this)">Puppy Catalog</button>
    <button class="filter-btn" onclick="setFilter('Puppy Profiles', this)">Puppy Profiles</button>
    <button class="filter-btn" onclick="setFilter('Happy Families Gallery', this)">Happy Families</button>
    <button class="filter-btn" onclick="setFilter('Gone Home Tickets', this)">Gone Home</button>
    <button class="filter-btn" onclick="setFilter('Fonts', this)">Fonts</button>
  </div>

  <div class="grid" id="assetGrid">
"""

for i in items:
    rel_path = "../" + i["suggested_path"]
    sec = i["section"]
    fname = i["local_filename"]
    size_str = f"{i['file_size_bytes'] / 1024:.1f} KB" if i['file_size_bytes'] < 1024*1024 else f"{i['file_size_bytes'] / (1024*1024):.2f} MB"
    dim = i.get("dimensions") or ("720p" if i["asset_type"] == "video" else "Vector/Font")
    fmt = (i.get("format") or i.get("asset_type") or "UNKNOWN").upper()
    pages_attr = i["source_page_str"]
    
    # Thumb representation
    if i["asset_type"] == "font":
        thumb_html = f"""<div class="thumb-wrap"><div style="font-size:3rem;font-weight:bold;color:var(--color-cocoa)">Aa</div><span class="badge-sec">{sec}</span></div>"""
    elif i["asset_type"] == "video":
        thumb_html = f"""<div class="thumb-wrap video-wrap"><div style="text-align:center"><div style="font-size:2.5rem">▶</div><div style="font-size:0.8rem">hero-puppy.mp4</div></div><span class="badge-sec">{sec}</span></div>"""
    elif "cursor" in fname or "logo" in fname:
        thumb_html = f"""<div class="thumb-wrap contain"><img src="{rel_path}" alt="{fname}" loading="lazy"><span class="badge-sec">{sec}</span></div>"""
    else:
        thumb_html = f"""<div class="thumb-wrap"><img src="{rel_path}" alt="{fname}" loading="lazy"><span class="badge-sec">{sec}</span></div>"""

    card_html = f"""
    <div class="card" data-section="{sec}" data-filename="{fname}" data-pages="{pages_attr}">
      {thumb_html}
      <div class="card-body">
        <div class="filename">
          <span title="{fname}">{fname[:22] + '...' if len(fname) > 22 else fname}</span>
          <button class="copy-pill" onclick="copyText('{fname}')" title="Copy filename">Copy</button>
        </div>
        <div class="meta-row">
          <span>{fmt}</span>
          <span>{dim}</span>
          <span>{size_str}</span>
        </div>
        <div class="source-page" title="{pages_attr}">
          📍 {pages_attr[:35] + '...' if len(pages_attr) > 35 else pages_attr}
        </div>
      </div>
    </div>
    """
    contact_sheet_html += card_html

contact_sheet_html += """
  </div>

  <script>
    let activeFilter = 'all';

    function setFilter(filter, btn) {
      activeFilter = filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCards();
    }

    function filterCards() {
      const q = document.getElementById('searchInput').value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        const sec = card.getAttribute('data-section');
        const fname = card.getAttribute('data-filename').toLowerCase();
        const pages = card.getAttribute('data-pages').toLowerCase();
        
        const matchesFilter = (activeFilter === 'all' || sec === activeFilter);
        const matchesQuery = (!q || fname.includes(q) || sec.toLowerCase().includes(q) || pages.includes(q));
        
        if (matchesFilter && matchesQuery) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    function copyText(txt) {
      navigator.clipboard.writeText(txt);
      alert('Copied: ' + txt);
    }
  </script>
</body>
</html>
"""

with open("research/contact_sheet.html", "w", encoding="utf-8") as f:
    f.write(contact_sheet_html)

print("Generated research/contact_sheet.html successfully.")
