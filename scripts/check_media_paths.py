import re

with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    text = f.read()

media_matches = set(re.findall(r'/media/[^"\'\s>]+', text))
print('Media paths found in data/pageHtml.ts:', len(media_matches))
for m in list(media_matches):
    print(' ', m)
