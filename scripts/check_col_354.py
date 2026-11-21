with open('components/home/MeetSection.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

line9 = lines[8]
print("Line 9 length:", len(line9))
print("Chars 300 to 450:")
print(repr(line9[300:450]))
print("\nEnd of line 9 (last 300 chars):")
print(repr(line9[-300:]))
