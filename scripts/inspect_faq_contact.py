with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'HTML_FAQ' in line:
        import re
        btns = re.findall(r'<button[^>]*>.*?</button>', line)
        print(f"HTML_FAQ Buttons: {len(btns)}")
        for b in btns[:5]:
            print("  ", b)
    if 'HTML_CONTACT' in line:
        import re
        forms = re.findall(r'<form[^>]*>.*?</form>', line)
        print(f"HTML_CONTACT Forms: {len(forms)}")
        inputs = re.findall(r'<input[^>]*>', line)
        print(f"HTML_CONTACT Inputs: {len(inputs)}")
        for inp in inputs[:5]:
            print("  ", inp)
