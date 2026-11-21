import urllib.request
import re

req = urllib.request.Request('https://puppy.instabizweb.com/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

scripts = re.findall(r'src="([^"]+\.js)"', html)
print('Live scripts found:', len(scripts))

for s in scripts:
    url = s if s.startswith('http') else 'https://puppy.instabizweb.com' + s
    try:
        content = urllib.request.urlopen(url).read().decode('utf-8')
        if 'pup-actor' in content or 'pup-stop' in content or 'data-pup-stop' in content or 'pup-buddy' in content:
            print(f'MATCH IN SCRIPT: {url} (size={len(content)})')
            # Save this script locally for analysis
            fname = url.split('/')[-1]
            with open(f'scripts/{fname}', 'w', encoding='utf-8') as f_out:
                f_out.write(content)
            print(f'Saved to scripts/{fname}')
    except Exception as e:
        print(f'Error fetching {url}: {e}')
