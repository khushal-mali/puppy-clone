import re
import os

with open("research/css/style_0.css", "r", encoding="utf-8") as f:
    s0 = f.read()

with open("research/css/style_1.css", "r", encoding="utf-8") as f:
    s1 = f.read()

# In style_0.css, font URLs look like:
# url(../media/54fc36028e2bb174-s.p.20jfceqj9zyw9.woff2)
# Replace ../media/ with /fonts/
s0_fixed = re.sub(r'url\(\.\./media/([^\)]+)\)', r'url(/fonts/\1)', s0)

# In style_1.css, check for any cursor or image URLs
# url(/cursor/paw.svg) -> already /cursor/ or /icons/
# In public/icons/ we have cursor-paw.svg and cursor-paw-press.svg
s1_fixed = s1.replace('/cursor/paw.svg', '/icons/cursor-paw.svg')
s1_fixed = s1_fixed.replace('/cursor/paw-press.svg', '/icons/cursor-paw-press.svg')

combined = f"/* TeddyPups Original Design System & Compiled Components */\n{s0_fixed}\n\n{s1_fixed}"

with open("app/original.css", "w", encoding="utf-8") as f:
    f.write(combined)

print(f"Generated app/original.css ({len(combined)} chars).")
