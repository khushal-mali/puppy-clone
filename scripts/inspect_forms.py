import requests
from bs4 import BeautifulSoup

for page in ['/contact', '/puppies/maltipoo-max-male', '/', '/faq', '/happy-families']:
    r = requests.get(f'https://puppy.instabizweb.com{page}')
    soup = BeautifulSoup(r.text, 'html.parser')
    forms = soup.find_all('form')
    print(f"\nPage: {page} -> Found {len(forms)} form(s)")
    for idx, f in enumerate(forms):
        print(f"  Form #{idx+1}: action='{f.get('action')}' method='{f.get('method')}'")
        for inp in f.find_all(['input', 'textarea', 'select', 'button']):
            t = inp.get_text(strip=True)
            print(f"    <{inp.name} type='{inp.get('type')}' name='{inp.get('name')}' placeholder='{inp.get('placeholder')}' required={inp.has_attr('required')}> {t[:30]}")

    # Check for accordions or detail tags
    details = soup.find_all('details')
    if details:
        print(f"  Details / Accordions count: {len(details)}")
        for d in details[:3]:
            summ = d.find('summary')
            print(f"    Summary: {summ.get_text(strip=True) if summ else ''}")
