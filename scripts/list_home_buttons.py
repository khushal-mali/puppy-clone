from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('https://puppy.instabizweb.com/', wait_until='networkidle')
    buttons = page.eval_on_selector_all('button', 'btns => btns.map(b => ({ text: b.textContent.trim(), class: b.className }))')
    print('All Buttons on Homepage:', len(buttons))
    for b in buttons:
        print("  Button:", b)
    browser.close()
