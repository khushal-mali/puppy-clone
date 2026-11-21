import re

with open('research/sections/families.html', 'r', encoding='utf-8') as f:
    html = f.read()

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
    return f"style={{{{{', '.join(entries)}}}}}"

def repl_double(m):
    return clean_style_string(m.group(1))

def repl_single(m):
    return clean_style_string(m.group(1))

res = re.sub(r'style="([^"]*)"', repl_double, html)
res = re.sub(r"style='([^']*)'", repl_single, res)
print("Any data:image left?", "data:image" in res)
print("Any raw style left?", "style='" in res or 'style="' in res)
