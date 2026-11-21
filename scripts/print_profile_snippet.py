with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith('export const HTML_PUPPY_PROFILE'):
            print(line[35:1200])
