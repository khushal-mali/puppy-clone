with open('components/home/FamiliesSection.tsx', 'r', encoding='utf-8') as f:
    s = f.read()

import re
matches = re.findall(r'backgroundImage:[^}]+', s)
for m in matches[:3]:
    print("Match:", repr(m[:100]))
