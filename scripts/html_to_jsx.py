import re

def clean_style_string(val):
    val = re.sub(r'background-image:\s*url\([^)]*\);?', '', val)
    val = re.sub(r'background-image:[^;]+;?', '', val)
    val = val.strip(';')
    if not val:
        return ""
    parts = val.split(';')
    entries = []
    for p in parts:
        if not p or ':' not in p:
            continue
        k, v = p.split(':', 1)
        k = k.strip()
        v = v.strip().replace("'", "\\'")
        if k.startswith('--'):
            entries.append(f"'{k}': '{v}'")
        else:
            camel = re.sub(r'-([a-z])', lambda x: x.group(1).upper(), k)
            entries.append(f"{camel}: '{v}'")
    if not entries:
        return ""
    return f"style={{{{{', '.join(entries)}}}}}"

def html_to_jsx(html):
    # 1. Styles
    html = re.sub(r'style="([^"]*)"', lambda m: clean_style_string(m.group(1)), html)
    html = re.sub(r"style='([^']*)'", lambda m: clean_style_string(m.group(1)), html)
    
    # 2. class to className
    jsx = re.sub(r'\bclass=', 'className=', html)
    
    # 3. SVG attribute casings
    svg_attr_map = {
        'viewbox=': 'viewBox=',
        'preserveaspectratio=': 'preserveAspectRatio=',
        'patternunits=': 'patternUnits=',
        'stroke-width=': 'strokeWidth=',
        'stroke-linecap=': 'strokeLinecap=',
        'stroke-linejoin=': 'strokeLinejoin=',
        'stroke-dasharray=': 'strokeDasharray=',
        'fill-rule=': 'fillRule=',
        'clip-rule=': 'clipRule=',
        'clip-path=': 'clipPath=',
        'stop-color=': 'stopColor=',
        'stop-opacity=': 'stopOpacity=',
        'font-family=': 'fontFamily=',
        'font-size=': 'fontSize=',
        'text-anchor=': 'textAnchor=',
        'dominant-baseline=': 'dominantBaseline=',
    }
    for old, new in svg_attr_map.items():
        jsx = re.sub(old, new, jsx, flags=re.IGNORECASE)
        
    # 4. self-closing void elements
    void_tags = ['img', 'input', 'hr', 'br', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'path']
    for tag in void_tags:
        def self_close(m):
            tag_name = m.group(1)
            attrs = m.group(2)
            if attrs.strip().endswith('/'):
                return m.group(0)
            return f"<{tag_name}{attrs} />"
        jsx = re.sub(rf'<({tag})(\s+[^>]*)>(?!</{tag}>)', self_close, jsx)
        
    # 5. Clean empty classNames or stray style=
    jsx = re.sub(r'\bclassName=""', '', jsx)
    jsx = re.sub(r'\bdata-nimg="[^"]*"', '', jsx)
    jsx = re.sub(r'style=\s*(?=[> ])', '', jsx)
    
    # 6. HTML comments
    jsx = re.sub(r'<!--\s*-->', '', jsx)
    jsx = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', jsx, flags=re.DOTALL)
    
    # 7. Unescaped ampersands
    jsx = jsx.replace('&amp;', '&')
    
    return jsx
