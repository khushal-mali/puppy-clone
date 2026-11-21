from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('https://puppy.instabizweb.com/puppies', wait_until='networkidle')
    chips = page.locator('button.tp-sticker-chip')
    print('Filter chips count:', chips.count())
    
    # Click Maltipoo chip
    maltipoo_btn = page.get_by_role('button', name='Maltipoo', exact=True)
    maltipoo_btn.click()
    page.wait_for_timeout(400)
    
    pressed = maltipoo_btn.get_attribute('aria-pressed')
    print('Maltipoo pressed:', pressed)
    
    # check puppies grid
    # look at li elements or cards
    cards = page.eval_on_selector_all('li:has(a[href^="/puppies/"])', '''
        lis => lis.map(li => ({
            name: li.querySelector(".font-plush") ? li.querySelector(".font-plush").textContent : "",
            breed: li.querySelector(".font-scrawl") ? li.querySelector(".font-scrawl").textContent : "",
            display: window.getComputedStyle(li).display,
            visibility: window.getComputedStyle(li).visibility
        }))
    ''')
    print('Total cards after filter:', len(cards))
    visible = [c for c in cards if c['display'] != 'none']
    print('Visible cards count:', len(visible))
    for c in visible[:5]:
        print("  Visible:", c)
    hidden = [c for c in cards if c['display'] == 'none']
    print('Hidden cards count:', len(hidden))
    browser.close()
