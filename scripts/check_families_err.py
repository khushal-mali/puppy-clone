with open('components/home/FamiliesSection.tsx', 'r', encoding='utf-8') as f:
    s = f.read()
print("FamiliesSection around 2100-2200:")
print(repr(s[2100:2250]))

with open('components/home/CtaSection.tsx', 'r', encoding='utf-8') as f:
    s2 = f.read()
print("\nCtaSection around 1350-1450:")
print(repr(s2[1350:1450]))
