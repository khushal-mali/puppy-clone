with open('components/home/MeetSection.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in MeetSection: {len(lines)}")
for i in range(min(15, len(lines))):
    print(f"Line {i+1}: {repr(lines[i][:120])}")

# Let's find unclosed tags in MeetSection
from bs4 import BeautifulSoup
soup = BeautifulSoup(open('research/sections/meet.html', encoding='utf-8').read(), 'html.parser')
tags = [tag.name for tag in soup.find_all()]
print("Tags count:", len(tags))
