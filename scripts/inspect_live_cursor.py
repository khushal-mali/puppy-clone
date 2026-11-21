from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('https://puppy.instabizweb.com/', wait_until='networkidle')
    
    # Check cursor styles on body, links, buttons
    body_cursor = page.evaluate('window.getComputedStyle(document.body).cursor')
    link_cursor = page.evaluate('window.getComputedStyle(document.querySelector("a")).cursor')
    btn_cursor = page.evaluate('window.getComputedStyle(document.querySelector("button")).cursor')
    print('Body cursor:', body_cursor)
    print('Link cursor:', link_cursor)
    print('Button cursor:', btn_cursor)
    
    # Check if there are any custom cursor elements in DOM (e.g. trailing cursor, canvas, or divs)
    cursor_el = page.evaluate('''() => {
        const els = Array.from(document.querySelectorAll('*')).filter(el => {
            const c = (el.className || '').toString().toLowerCase();
            const id = (el.id || '').toLowerCase();
            return c.includes('cursor') || id.includes('cursor') || c.includes('paw-pat');
        });
        return els.map(e => ({ tag: e.tagName, className: e.className, id: e.id }));
    }''')
    print('Cursor elements in DOM:', cursor_el)
    
    # Check event listeners on window/document for mousemove or pointermove
    events = page.evaluate('''() => {
        const hasPointer = window.onpointermove !== undefined;
        return { hasPointer };
    }''')
    print('Pointer events:', events)
    
    browser.close()
