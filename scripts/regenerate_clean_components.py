import re
import os
from html_to_jsx import html_to_jsx

sections = [
    ('hero', 'HeroSection'),
    ('meet', 'MeetSection'),
    ('paths', 'PathsSection'),
    ('journey', 'JourneySection'),
    ('trust', 'TrustSection'),
    ('families', 'FamiliesSection'),
    ('questions', 'QuestionsSection'),
    ('cta', 'CtaSection'),
]

for slug, comp_name in sections:
    path = f'research/sections/{slug}.html'
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 1. Clean wrapping <div data-section="...">
    m = re.match(r'<div data-section="[^"]+">(.*)</div>\Z', html, re.DOTALL)
    inner = m.group(1).strip() if m else html.strip()
    
    # 2. html to jsx
    jsx = html_to_jsx(inner)
    
    # 3. Handle script tags
    def script_repl(sm):
        sc = sm.group(1).replace('\\"', '"')
        return f'<script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: `{sc}` }}}} />'
    jsx = re.sub(r'<script type="application/ld\+json">(.*?)</script>', script_repl, jsx, flags=re.DOTALL)
    
    code = f"""'use client';

import React from 'react';
import Link from 'next/link';

export default function {comp_name}() {{
  return (
    <div data-section="{slug}">
      {jsx}
    </div>
  );
}}
"""
    out_file = f'components/home/{comp_name}.tsx'
    with open(out_file, 'w', encoding='utf-8') as f_out:
        f_out.write(code)
    print(f"Updated {out_file}")

print("All components regenerated successfully!")
