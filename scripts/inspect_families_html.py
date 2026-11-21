with open('research/sections/families.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
# check what style attributes are on img tags in families.html
imgs = re.findall(r'<img[^>]+style=["\']([^"\']+)["\']', html)
print(f"Total styled img in families.html: {len(imgs)}")
for im in imgs[:2]:
    print("  Img style:", repr(im[:120]))
