import json
import re
import os

with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    code = f.read()

prefix = 'export const HTML_HOME = "'
start = code.find(prefix) + len(prefix)
end = code.find('";\n', start)
raw = code[start:end]
html = json.loads(f'"{raw}"')

os.makedirs('research/sections', exist_ok=True)

# Find all data-section occurrences
section_names = re.findall(r'data-section="([^"]+)"', html)
print("Section names found:", section_names)

for i, name in enumerate(section_names):
    pattern = f'<div data-section="{name}">'
    pos1 = html.find(pattern)
    if i + 1 < len(section_names):
        next_pattern = f'<div data-section="{section_names[i+1]}">'
        pos2 = html.find(next_pattern)
        content = html[pos1:pos2]
    else:
        # last section, up to the end of .tp-page
        pos2 = html.rfind('</div>')
        content = html[pos1:pos2+6]
    
    with open(f'research/sections/{name}.html', 'w', encoding='utf-8') as f_out:
        f_out.write(content)
    print(f"Saved research/sections/{name}.html (length={len(content)})")
