import requests
import json
from bs4 import BeautifulSoup

r = requests.get('https://puppy.instabizweb.com/faq')
soup = BeautifulSoup(r.text, 'html.parser')

faqs = []
# Find all buttons that contain questions
for b in soup.find_all('button'):
    q = b.get_text(strip=True)
    if '?' in q:
        # The answer is typically in a sibling or parent next sibling
        parent = b.parent
        ans = parent.get_text(separator=' ', strip=True).replace(q, '').strip()
        faqs.append({"question": q, "answer": ans})

print(f"Extracted {len(faqs)} FAQs:")
for idx, f in enumerate(faqs, 1):
    print(f"\n{idx}. {f['question']}")
    print(f"   {f['answer'][:120]}...")

with open('research/faqs_dataset.json', 'w', encoding='utf-8') as f:
    json.dump(faqs, f, indent=2)
