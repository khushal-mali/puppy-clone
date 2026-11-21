with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith('export const HTML_PUPPIES'):
            print("Found line, length:", len(line))
            import re
            links = re.findall(r'href=\\?"(/puppies/[^"\\]+)\\?"', line)
            print("Links found:", len(links), links[:5])
            imgs = re.findall(r'src=\\?"(/images/[^"\\]+)\\?"', line)
            print("Imgs found:", len(imgs), imgs[:5])
