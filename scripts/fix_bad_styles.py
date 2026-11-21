import os
import re

for fname in os.listdir('components/home'):
    if not fname.endswith('.tsx'):
        continue
    path = f'components/home/{fname}'
    with open(path, 'r', encoding='utf-8') as f:
        s = f.read()
    
    # Check for style=> or style= without {}
    bad_styles = re.findall(r'style=\s*[^\s{]+', s)
    if bad_styles:
        print(f"Bad style in {fname}:", bad_styles)
        # Fix style=> to style={{}} or remove it
        s = re.sub(r'style=\s*(?=[> ])', '', s)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(s)
        print(f"Fixed bad styles in {fname}")
