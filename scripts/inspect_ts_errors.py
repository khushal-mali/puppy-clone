with open('components/home/MeetSection.tsx', 'r', encoding='utf-8') as f:
    s = f.read()
print("MeetSection snippet around 350-400:")
print(s[250:500])

with open('components/home/JourneySection.tsx', 'r', encoding='utf-8') as f:
    s = f.read()
print("\nJourneySection snippet around 1600-1700:")
print(s[1550:1750])

with open('components/home/CtaSection.tsx', 'r', encoding='utf-8') as f:
    s = f.read()
print("\nCtaSection snippet around 11550-11650:")
print(s[11500:11700])
