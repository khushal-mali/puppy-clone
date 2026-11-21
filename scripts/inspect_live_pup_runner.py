from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    # Listen to console or inspect DOM
    page.goto('https://puppy.instabizweb.com/', wait_until='networkidle')
    
    # Inspect all elements with pup in class or attribute
    pup_info = page.evaluate('''() => {
        const actor = document.querySelector('.pup-actor');
        const layer = document.querySelector('.pup-layer');
        const stops = Array.from(document.querySelectorAll('.pup-stop, [data-pup-stop]')).map(s => ({
            tag: s.tagName,
            className: s.className,
            dataset: Object.assign({}, s.dataset),
            rect: s.getBoundingClientRect(),
            childBuddyVisible: window.getComputedStyle(s.querySelector('.pup-buddy') || s).visibility
        }));
        return {
            actorExists: !!actor,
            actorHTML: actor ? actor.outerHTML.slice(0, 500) : null,
            layerExists: !!layer,
            layerHTML: layer ? layer.outerHTML.slice(0, 500) : null,
            stops: stops
        };
    }''')
    print('Pup Info from Live Page:')
    print('  actorExists:', pup_info['actorExists'])
    print('  layerExists:', pup_info['layerExists'])
    print('  layerHTML:', pup_info['layerHTML'])
    print('  stops count:', len(pup_info['stops']))
    for s in pup_info['stops']:
        print('    stop:', s['className'], s['dataset'], 'rect:', s['rect']['top'])
        
    # Now let's scroll down and see how pup-actor moves!
    print('\n--- Scrolling down 1500px ---')
    page.evaluate('window.scrollTo(0, 1500)')
    page.wait_for_timeout(500)
    
    after_scroll = page.evaluate('''() => {
        const actor = document.querySelector('.pup-actor');
        const layer = document.querySelector('.pup-layer');
        return {
            actorTransform: actor ? actor.style.transform : null,
            actorRect: actor ? actor.getBoundingClientRect() : null,
            actorDataset: actor ? Object.assign({}, actor.dataset) : null,
            layerHTML: layer ? layer.innerHTML.slice(0, 500) : null
        };
    }''')
    print('After scroll 1500px:', after_scroll)
    
    browser.close()
