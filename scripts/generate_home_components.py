import re
import os
from bs4 import BeautifulSoup
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

os.makedirs('components/home', exist_ok=True)

for slug, comp_name in sections:
    path = f'research/sections/{slug}.html'
    if not os.path.exists(path):
        print(f"File {path} does not exist!")
        continue
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Strip wrapping <div data-section="..."> and its trailing </div> if present
    match = re.match(r'<div data-section="[^"]+">(.*)</div>\Z', html, re.DOTALL)
    if match:
        inner_html = match.group(1).strip()
    else:
        inner_html = html.strip()
        
    jsx_body = html_to_jsx(inner_html)
    
    # Replace any Next.js Image data-nimg attributes or empty classNames
    jsx_body = re.sub(r'\bdata-nimg="[^"]*"', '', jsx_body)
    jsx_body = re.sub(r'\bclassName=""', '', jsx_body)
    
    # Ensure Link import if used
    has_links = '<a ' in jsx_body or '<Link ' in jsx_body
    import_link = "import Link from 'next/link';\n" if has_links else ""
    
    # Replace <a href="/..." with <Link href="/..." (only for local routes)
    # E.g. <a href="/puppies" ...> -> <Link href="/puppies" ...>
    # <a href="/puppies/... -> <Link href="/puppies/...
    # But leave href="https://..." or href="mailto:..." as <a
    def link_repl(m):
        full_tag = m.group(0)
        href = m.group(1)
        if href.startswith('/') and not href.startswith('//'):
            return full_tag.replace('<a ', '<Link ').replace('</a>', '</Link>')
        return full_tag
        
    # We can keep standard <a> or Next Link
    component_code = f"""'use client';

import React from 'react';
{import_link}
export default function {comp_name}() {{
  return (
    <div data-section="{slug}">
      {jsx_body}
    </div>
  );
}}
"""
    out_path = f'components/home/{comp_name}.tsx'
    with open(out_path, 'w', encoding='utf-8') as f_out:
        f_out.write(component_code)
    print(f"Generated {out_path} ({len(component_code)} bytes)")

print("All section components generated successfully!")
