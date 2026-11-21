import asyncio
import os
import json
from playwright.async_api import async_playwright

BASE_URL = "https://puppy.instabizweb.com"

# Target routes to screenshot
# All main pages + sample of puppy profile pages
MAIN_ROUTES = [
    ("/", "home"),
    ("/puppies", "puppies"),
    ("/happy-families", "happy-families"),
    ("/how-it-works", "how-it-works"),
    ("/faq", "faq"),
    ("/contact", "contact"),
    ("/gone-home", "gone-home"),
    ("/delivery-collection", "delivery-collection")  # 404 test
]

PUPPY_SAMPLE = [
    ("/puppies/maltipoo-max-male", "puppy-maltipoo-max"),
    ("/puppies/korean-teacup-maltipoo-female", "puppy-korean-maltipoo-female"),
    ("/puppies/copper-male", "puppy-copper-male"),
    ("/puppies/poodle-leo-male", "puppy-poodle-leo"),
    ("/puppies/blue-marle-pomeranian", "puppy-blue-marle-pomeranian"),
    ("/puppies/bichon-bailey-boy", "puppy-bichon-bailey")
]

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844},
    "tablet": {"width": 820, "height": 1180}
}

async def capture_all():
    os.makedirs("research/screenshots/desktop", exist_ok=True)
    os.makedirs("research/screenshots/mobile", exist_ok=True)
    os.makedirs("research/screenshots/tablet", exist_ok=True)
    os.makedirs("research/screenshots/interactions", exist_ok=True)

    results = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # 1. Desktop & Mobile captures
        for route, name in MAIN_ROUTES + PUPPY_SAMPLE:
            url = BASE_URL + route
            print(f"\nProcessing {name}: {url}")
            
            # Desktop
            try:
                context_desktop = await browser.new_context(
                    viewport=VIEWPORTS["desktop"],
                    user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                )
                page = await context_desktop.new_page()
                resp = await page.goto(url, wait_until="networkidle", timeout=25000)
                status = resp.status if resp else 0
                
                # Scroll to bottom and back up to trigger lazy images & animations
                await page.evaluate("""async () => {
                    await new Promise((resolve) => {
                        let totalHeight = 0;
                        const distance = 400;
                        const timer = setInterval(() => {
                            const scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
                            if(totalHeight >= scrollHeight){
                                clearInterval(timer);
                                window.scrollTo(0, 0);
                                resolve();
                            }
                        }, 80);
                    });
                }""")
                await page.wait_for_timeout(1000)

                desktop_path = f"research/screenshots/desktop/{name}.png"
                await page.screenshot(path=desktop_path, full_page=True)
                print(f"  Captured desktop: {desktop_path} (HTTP {status})")

                # Mobile
                context_mobile = await browser.new_context(
                    viewport=VIEWPORTS["mobile"],
                    user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
                    is_mobile=True,
                    has_touch=True
                )
                page_m = await context_mobile.new_page()
                resp_m = await page_m.goto(url, wait_until="networkidle", timeout=25000)
                status_m = resp_m.status if resp_m else 0

                await page_m.evaluate("""async () => {
                    await new Promise((resolve) => {
                        let totalHeight = 0;
                        const distance = 300;
                        const timer = setInterval(() => {
                            const scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
                            if(totalHeight >= scrollHeight){
                                clearInterval(timer);
                                window.scrollTo(0, 0);
                                resolve();
                            }
                        }, 60);
                    });
                }""")
                await page_m.wait_for_timeout(1000)

                mobile_path = f"research/screenshots/mobile/{name}.png"
                await page_m.screenshot(path=mobile_path, full_page=True)
                print(f"  Captured mobile: {mobile_path} (HTTP {status_m})")

                # If home page, let's also capture tablet
                if name == "home":
                    context_tab = await browser.new_context(viewport=VIEWPORTS["tablet"])
                    page_t = await context_tab.new_page()
                    await page_t.goto(url, wait_until="networkidle", timeout=25000)
                    tablet_path = f"research/screenshots/tablet/{name}.png"
                    await page_t.screenshot(path=tablet_path, full_page=True)
                    print(f"  Captured tablet: {tablet_path}")
                    await context_tab.close()

                # Record page details
                results.append({
                    "route": route,
                    "name": name,
                    "status_desktop": status,
                    "status_mobile": status_m,
                    "desktop_screenshot": desktop_path,
                    "mobile_screenshot": mobile_path
                })

                await context_desktop.close()
                await context_mobile.close()

            except Exception as e:
                print(f"  Error on {route}: {e}")
                results.append({
                    "route": route,
                    "name": name,
                    "error": str(e)
                })

        # 2. Interactive states inspection: Mobile Menu, Dropdowns, Sticky Header, Forms
        print("\n--- Inspecting Interactive States ---")
        try:
            # Test Mobile Navigation Menu
            context_m_nav = await browser.new_context(
                viewport=VIEWPORTS["mobile"],
                is_mobile=True,
                has_touch=True
            )
            page_nav = await context_m_nav.new_page()
            await page_nav.goto(BASE_URL, wait_until="networkidle")
            
            # Find and click menu button
            menu_btn = page_nav.locator("button[aria-label*='menu' i], button[aria-expanded], header button").first
            if await menu_btn.count() > 0:
                await menu_btn.click()
                await page_nav.wait_for_timeout(600)
                menu_path = "research/screenshots/interactions/mobile-menu-open.png"
                await page_nav.screenshot(path=menu_path)
                print(f"  Captured mobile menu open: {menu_path}")
            await context_m_nav.close()

            # Test Contact Form Validation
            context_contact = await browser.new_context(viewport=VIEWPORTS["desktop"])
            page_contact = await context_contact.new_page()
            await page_contact.goto(BASE_URL + "/contact", wait_until="networkidle")
            # Try submitting empty form
            submit_btn = page_contact.locator("button[type='submit'], form button").first
            if await submit_btn.count() > 0:
                await submit_btn.click()
                await page_contact.wait_for_timeout(600)
                contact_val_path = "research/screenshots/interactions/contact-form-validation.png"
                await page_contact.screenshot(path=contact_val_path)
                print(f"  Captured contact validation: {contact_val_path}")
            await context_contact.close()

            # Test FAQ Accordion Expansion
            context_faq = await browser.new_context(viewport=VIEWPORTS["desktop"])
            page_faq = await context_faq.new_page()
            await page_faq.goto(BASE_URL + "/faq", wait_until="networkidle")
            accordions = page_faq.locator("details, button[aria-expanded], [data-accordion]")
            if await accordions.count() > 0:
                await accordions.first.click()
                await page_faq.wait_for_timeout(500)
                faq_open_path = "research/screenshots/interactions/faq-expanded.png"
                await page_faq.screenshot(path=faq_open_path)
                print(f"  Captured FAQ accordion expanded: {faq_open_path}")
            await context_faq.close()

        except Exception as e:
            print(f"Error during interaction testing: {e}")

        await browser.close()

    with open("research/screenshot_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    asyncio.run(capture_all())
