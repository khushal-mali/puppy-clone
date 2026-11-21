import asyncio
import os
from playwright.async_api import async_playwright

LOCAL_BASE = "http://localhost:3005"
OUT_DIR = "research/screenshots/reconstructed"
os.makedirs(OUT_DIR, exist_ok=True)

PAGES_TO_VERIFY = [
    ("/", "home"),
    ("/puppies", "puppies"),
    ("/puppies/maltipoo-max-male", "puppy_profile"),
    ("/happy-families", "happy_families"),
    ("/how-it-works", "how_it_works"),
    ("/faq", "faq"),
    ("/contact", "contact"),
    ("/gone-home", "gone_home"),
]

async def verify_site():
    print("Connecting to local Next.js build at", LOCAL_BASE)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()

        # 1. Homepage & Meta Tag Verification
        resp = await page.goto(LOCAL_BASE, wait_until="networkidle")
        print(f"Homepage HTTP Status: {resp.status}")

        # Check OpenGraph metadata
        og_title = await page.locator("meta[property='og:title']").get_attribute("content")
        og_desc = await page.locator("meta[property='og:description']").get_attribute("content")
        og_image = await page.locator("meta[property='og:image']").get_attribute("content")
        tw_card = await page.locator("meta[name='twitter:card']").get_attribute("content")
        print("\n--- Open Graph & SEO Metadata Verification ---")
        print(f"  og:title       -> {og_title}")
        print(f"  og:description -> {og_desc[:60]}...")
        print(f"  og:image       -> {og_image}")
        print(f"  twitter:card   -> {tw_card}")

        # Check Lenis class on html
        html_class = await page.locator("html").get_attribute("class")
        print(f"  HTML Classes: {html_class}")

        # 2. Capture Screenshots across all core pages
        print("\n--- Capturing Reconstructed Screenshots ---")
        for route, name in PAGES_TO_VERIFY:
            url = LOCAL_BASE + route
            await page.goto(url, wait_until="networkidle")
            await page.wait_for_timeout(500)
            shot_path = f"{OUT_DIR}/{name}.png"
            await page.screenshot(path=shot_path, full_page=True)
            print(f"  Captured {name}: {shot_path}")

        # 3. Test Interactive WhatsApp Business Chat Floating Button
        print("\n--- Testing WhatsApp Business Floating Chat ---")
        await page.goto(LOCAL_BASE, wait_until="networkidle")
        wa_btn = page.locator("button[aria-label='Chat on WhatsApp']")
        if await wa_btn.count() > 0:
            await wa_btn.click()
            await page.wait_for_timeout(600)
            wa_shot = f"{OUT_DIR}/whatsapp_chat_open.png"
            await page.screenshot(path=wa_shot)
            print(f"  Captured WhatsApp Interactive Chat Drawer: {wa_shot}")

        # 4. Test Mobile Viewport
        context_mobile = await browser.new_context(
            viewport={"width": 390, "height": 844},
            is_mobile=True,
            has_touch=True
        )
        page_m = await context_mobile.new_page()
        await page_m.goto(LOCAL_BASE, wait_until="networkidle")
        await page_m.screenshot(path=f"{OUT_DIR}/home_mobile.png", full_page=True)
        print(f"  Captured Mobile (390x844): {OUT_DIR}/home_mobile.png")
        await context_mobile.close()

        # 5. Test Redirect for /delivery-collection
        resp_del = await page.goto(LOCAL_BASE + "/delivery-collection", wait_until="networkidle")
        print(f"\nDelivery-collection redirect test URL: {page.url}")

        await context.close()
        await browser.close()

    print("\nVerification process completed successfully!")

if __name__ == "__main__":
    asyncio.run(verify_site())
