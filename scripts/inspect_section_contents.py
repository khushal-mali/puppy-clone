import os
from bs4 import BeautifulSoup

sections = ['hero', 'meet', 'paths', 'journey', 'trust', 'families', 'questions', 'cta']

for s in sections:
    path = f'research/sections/{s}.html'
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    h = soup.find(['h1', 'h2', 'h3'])
    h_text = h.get_text(strip=True) if h else "No H tag"
    btns = len(soup.find_all('button'))
    links = len(soup.find_all('a'))
    imgs = len(soup.find_all('img'))
    pup_stops = len(soup.find_all(class_=lambda c: c and 'pup-stop' in c))
    print(f"[{s.upper()}]: Heading='{h_text}', Buttons={btns}, Links={links}, Imgs={imgs}, PupStops={pup_stops}")
