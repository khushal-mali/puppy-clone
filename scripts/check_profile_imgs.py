with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith('export const HTML_PUPPY_PROFILE'):
            import re
            imgs = re.findall(r'src=\\?"([^"\\]+)\\?"', line)
            print("Images in HTML_PUPPY_PROFILE:", imgs)
