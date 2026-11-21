import json
from bs4 import BeautifulSoup

with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    code = f.read()

# Helper to extract the HTML string from pageHtml.ts
def get_html_var(name):
    prefix = f'export const {name} = "'
    start = code.find(prefix)
    if start == -1:
        return ""
    start += len(prefix)
    end = code.find('";\n', start)
    raw = code[start:end]
    # unescape JSON string
    return json.loads(f'"{raw}"')

html_puppies = get_html_var('HTML_PUPPIES')
html_gone_home = get_html_var('HTML_GONE_HOME')

soup_p = BeautifulSoup(html_puppies, 'html.parser')
soup_g = BeautifulSoup(html_gone_home, 'html.parser')

puppies = []

# 1. Parse Available Puppies
# Each puppy link has href starting with /puppies/
for a in soup_p.find_all('a', href=True):
    href = a['href']
    if not href.startswith('/puppies/'):
        continue
    slug = href.replace('/puppies/', '').strip('/')
    if not slug or any(p['slug'] == slug for p in puppies):
        continue
    
    # Card container
    card = a.find_parent('li') or a
    
    # Image
    img = a.find('img')
    img_src = img['src'] if img and img.has_attr('src') else '/images/logo.png'
    
    # Name
    name_el = card.find(class_=lambda c: c and 'font-plush' in c)
    name = name_el.get_text(strip=True) if name_el else slug.replace('-', ' ').title()
    
    # Breed / subtitle / tags
    tags = [t.get_text(strip=True) for t in card.find_all(['span', 'p']) if t.get_text(strip=True)]
    
    # Extract breed, age, gender, location
    # Look for known genders
    gender = 'Boy'
    if 'female' in slug.lower() or 'girl' in slug.lower() or 'Girl' in ' '.join(tags):
        gender = 'Girl'
    elif 'male' in slug.lower() or 'boy' in slug.lower() or 'Boy' in ' '.join(tags):
        gender = 'Boy'
    if 'male-female' in slug.lower():
        gender = 'Boy & Girl'
        
    location = 'Imported for you'
    for t in tags:
        if 'Dubai showroom' in t:
            location = 'Dubai showroom'
            break
            
    puppies.append({
        'slug': slug,
        'name': name,
        'breed': name if ('Maltipoo' in name or 'Poodle' in name or 'Pomeranian' in name or 'Cavapoo' in name or 'Shih Tzu' in name) else 'Miniature Puppy',
        'gender': gender,
        'age': '2-3 months',
        'location': location,
        'status': 'available',
        'images': [img_src],
        'hasVideo': False,
        'description': f"Healthy, certified teacup {name} ({gender}) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
    })

print(f"Parsed {len(puppies)} available puppies.")

# 2. Parse Gone Home Puppies
for a in soup_g.find_all('a', href=True):
    href = a['href']
    if not href.startswith('/puppies/'):
        continue
    slug = href.replace('/puppies/', '').strip('/')
    if not slug or any(p['slug'] == slug for p in puppies):
        continue
    card = a.find_parent('li') or a
    img = a.find('img')
    img_src = img['src'] if img and img.has_attr('src') else '/images/logo.png'
    
    name_el = card.find(class_=lambda c: c and 'font-plush' in c)
    name = name_el.get_text(strip=True) if name_el else slug.replace('-', ' ').title()
    
    gender = 'Girl' if ('female' in slug.lower() or 'girl' in slug.lower()) else 'Boy'
    
    puppies.append({
        'slug': slug,
        'name': name if name != 'admit one' else slug.replace('-', ' ').title(),
        'breed': 'Miniature Puppy',
        'gender': gender,
        'age': 'Gone home',
        'location': 'Happy in new home',
        'status': 'gone_home',
        'images': [img_src],
        'hasVideo': False,
        'description': f"{name} has happily gone home to their forever family in Dubai and the U.A.E."
    })

print(f"Total parsed puppies (available + gone home): {len(puppies)}")

# Write to data/puppies.ts
ts_content = f"""export interface Puppy {{
  slug: string;
  name: string;
  breed: string;
  gender: 'Boy' | 'Girl' | 'Boy & Girl';
  age: string;
  location: string;
  status: 'available' | 'gone_home';
  images: string[];
  hasVideo: boolean;
  description: string;
}}

export const PUPPIES: Puppy[] = {json.dumps(puppies, indent=2)};
"""

with open('data/puppies.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Successfully written to data/puppies.ts!")
