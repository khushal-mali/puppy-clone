with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'HTML_PUPPIES' in line:
        print(f"HTML_PUPPIES found on line {i+1}, length={len(line)}")
        import re
        btns = re.findall(r'<button[^>]*>.*?</button>', line)
        print(f"Buttons found: {len(btns)}")
        for b in btns:
            print("  ", b)
        break
