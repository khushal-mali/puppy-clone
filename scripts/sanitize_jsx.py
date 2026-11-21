import os
import re

files = [f for f in os.listdir('components/home') if f.endswith('.tsx')]

for fname in files:
    path = f'components/home/{fname}'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # 1. Remove or convert HTML comments <!-- ... -->
    # replace <!-- --> with empty or {/* */}
    content = re.sub(r'<!--\s*-->', '', content)
    content = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', content, flags=re.DOTALL)
    
    # 2. Handle <script type="application/ld+json">...</script>
    def script_repl(m):
        script_content = m.group(1).replace('\\"', '"')
        # return JSX with dangerouslySetInnerHTML
        return f'<script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: `{script_content}` }}}} />'
        
    content = re.sub(r'<script type="application/ld\+json">(.*?)</script>', script_repl, content, flags=re.DOTALL)
    
    # 3. Clean any unescaped &amp; or entity
    content = content.replace('&amp;', '&')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Sanitized {path}")
