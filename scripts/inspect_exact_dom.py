import requests
from bs4 import BeautifulSoup

r = requests.get('https://puppy.instabizweb.com/')
soup = BeautifulSoup(r.text, 'html.parser')

body = soup.find('body')
print('Body classes:', body.get('class'))
for child in body.children:
    if child.name:
        print(f"<{child.name} class='{child.get('class')}' id='{child.get('id')}'>")
        # Print sub-elements
        for sub in child.children:
            if sub.name:
                print(f"   <{sub.name} class='{sub.get('class')}' id='{sub.get('id')}'>")

# Save the full raw original HTML of the homepage
with open("research/original_homepage.html", "w", encoding="utf-8") as f:
    f.write(r.text)

print("\nSaved full raw original HTML to research/original_homepage.html")
