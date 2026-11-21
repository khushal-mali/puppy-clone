from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('https://puppy.instabizweb.com/', wait_until='networkidle')
    
    # Let's inspect the pup-actor SVG structure and attributes
    actor_details = page.evaluate('''() => {
        const actor = document.querySelector('.pup-actor');
        if (!actor) return null;
        
        return {
            className: actor.className,
            dataset: Object.assign({}, actor.dataset),
            bodyHTML: actor.querySelector('.pup-actor__body').innerHTML,
            svgViewBox: actor.querySelector('svg')?.getAttribute('viewBox'),
            stops: Array.from(document.querySelectorAll('.pup-stop')).map(s => ({
                className: s.className,
                act: s.dataset.act,
                pose: s.dataset.pose,
                facing: s.dataset.facing,
                behind: s.dataset.behind,
                lane: s.dataset.lane,
                style: s.getAttribute('style')
            }))
        };
    }''')
    
    print('Actor Details:')
    print('  svgViewBox:', actor_details['svgViewBox'])
    print('  stops:', len(actor_details['stops']))
    for s in actor_details['stops']:
        print('    stop:', s)
        
    # Let's check how many poses Teddy has:
    # Look for data-p attributes in the SVG
    poses = page.evaluate('''() => {
        const svg = document.querySelector('.pup-actor svg');
        if (!svg) return [];
        return Array.from(svg.querySelectorAll('[data-p]')).map(el => ({
            p: el.getAttribute('data-p'),
            tag: el.tagName,
            opacity: el.getAttribute('opacity'),
            transform: el.getAttribute('transform')
        }));
    }''')
    print('\nSVG data-p parts:', len(poses))
    for p_part in poses:
        print('  part:', p_part)
        
    browser.close()
