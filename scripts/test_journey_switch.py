from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('https://puppy.instabizweb.com/', wait_until='networkidle')
    switch_tabs = page.eval_on_selector_all('.tp-switch button, .tp-switch__tab', 'tabs => tabs.map(t => ({ text: t.textContent.trim(), selected: t.getAttribute("aria-selected") }))')
    print('Journey Switch Tabs on Live Site:', switch_tabs)
    browser.close()
