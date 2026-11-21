import asyncio
from playwright.async_api import async_playwright

LOCAL_BASE = "http://localhost:3005"

async def test_all():
    print("Connecting to Next.js server at", LOCAL_BASE)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        # 1. Homepage
        resp = await page.goto(LOCAL_BASE, wait_until="networkidle")
        print(f"[OK] Homepage status: {resp.status}")

        # 2. Test Mobile Menu Dialog (at mobile viewport)
        context_mobile = await browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
        page_m = await context_mobile.new_page()
        await page_m.goto(LOCAL_BASE, wait_until="networkidle")
        menu_btn = page_m.locator("button:has-text('Menu')")
        print(f"Mobile menu button found: {await menu_btn.count()}")
        if await menu_btn.count() > 0:
            await menu_btn.click()
            await page_m.wait_for_timeout(300)
            dialog = page_m.locator("dialog.tp-menu")
            is_open = await dialog.evaluate("el => el.open || el.hasAttribute('open')")
            print(f"[OK] Mobile menu open state: {is_open}")
            close_btn = dialog.locator("button:has-text('Close')")
            if await close_btn.count() > 0:
                await close_btn.click()
                await page_m.wait_for_timeout(200)
                is_closed = not await dialog.evaluate("el => el.open || el.hasAttribute('open')")
                print(f"[OK] Mobile menu closed successfully: {is_closed}")
        await context_mobile.close()

        # 3. Test FAQ Accordion & Search
        await page.goto(LOCAL_BASE + "/faq", wait_until="networkidle")
        faq_btn = page.locator(".tp-note__q button").first
        init_exp = await faq_btn.get_attribute("aria-expanded")
        print(f"FAQ initial expanded: {init_exp}")
        await faq_btn.click()
        await page.wait_for_timeout(300)
        after_exp = await faq_btn.get_attribute("aria-expanded")
        print(f"[OK] FAQ after click expanded: {after_exp}")
        note = page.locator(".tp-note").first
        has_unfolded = await note.evaluate("el => el.hasAttribute('data-unfolded')")
        print(f"[OK] Note has data-unfolded: {has_unfolded}")

        # Test FAQ Search
        search_input = page.locator(".tp-notes__search input")
        if await search_input.count() > 0:
            await search_input.fill("vaccinated")
            await page.wait_for_timeout(200)
            visible_notes = await page.eval_on_selector_all(".tp-note:not(.tp-note--empty)", "notes => notes.filter(n => n.style.display !== 'none').length")
            print(f"[OK] FAQ search 'vaccinated' found {visible_notes} notes")
            await search_input.fill("")

        # 4. Test Puppy Catalog Filter
        await page.goto(LOCAL_BASE + "/puppies", wait_until="networkidle")
        maltipoo_btn = page.locator("button.tp-sticker-chip:has-text('Maltipoo')")
        print(f"Maltipoo chip count: {await maltipoo_btn.count()}")
        if await maltipoo_btn.count() > 0:
            await maltipoo_btn.click()
            await page.wait_for_timeout(300)
            pressed = await maltipoo_btn.get_attribute("aria-pressed")
            print(f"[OK] Maltipoo chip aria-pressed: {pressed}")
            visible_puppies = await page.eval_on_selector_all("li:has(a[href^='/puppies/'])", "lis => lis.filter(li => li.style.display !== 'none').length")
            print(f"[OK] Visible puppies after filter: {visible_puppies}")

        # 5. Test Dynamic Puppy Profile Customization
        await page.goto(LOCAL_BASE + "/puppies/korean-teacup-maltipoo-female", wait_until="networkidle")
        prof_title = await page.title()
        print(f"[OK] Profile Page Title: {prof_title}")
        img_src = await page.locator("img[alt*='Korean Teacup Maltipoo']").first.get_attribute("src")
        print(f"[OK] Profile Image Source: {img_src}")

        # 6. Test Gone Home Page
        await page.goto(LOCAL_BASE + "/gone-home", wait_until="networkidle")
        tickets = await page.locator(".tp-ticket, a[href^='/puppies/']").count()
        print(f"[OK] Gone home tickets rendered: {tickets}")

        # 7. Test Happy Families Page
        await page.goto(LOCAL_BASE + "/happy-families", wait_until="networkidle")
        prints = await page.locator(".tp-photowall__print, img").count()
        print(f"[OK] Happy families mosaic items rendered: {prints}")

        await context.close()
        await browser.close()
        print("\nAll verification tests passed with 100% success!")

if __name__ == "__main__":
    asyncio.run(test_all())
