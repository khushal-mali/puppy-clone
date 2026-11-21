with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith('export const HTML_PUPPY_PROFILE'):
            print("Found HTML_PUPPY_PROFILE, length:", len(line))
            import re
            classes = set(re.findall(r'class=\\?"([^"\\\s]+)', line))
            print("Classes (first 30):", sorted(list(classes))[:30])
