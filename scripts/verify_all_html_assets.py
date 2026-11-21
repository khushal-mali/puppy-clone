import re
import os

with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# find all /images/... or /fonts/... or /videos/... or /icons/...
srcs = set(re.findall(r'/(?:images|fonts|videos|icons)/[a-zA-Z0-9_\-\.]+', text))
print(f"Total asset references found in pageHtml.ts: {len(srcs)}")

missing = []
found = 0
for src in srcs:
    local_path = os.path.join('public', src.lstrip('/'))
    if os.path.exists(local_path):
        found += 1
    else:
        missing.append((src, local_path))

print(f"Verified locally: {found}")
print(f"Missing locally: {len(missing)}")
for m in missing[:10]:
    print("  Missing:", m)
