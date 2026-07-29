from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:8080")
    page.set_viewport_size({"width": 1400, "height": 950})
    page.wait_for_timeout(1500)

    # Journey 1: Click Security Gate role tab
    page.locator('button:has-text("Security Gate")').first.click()
    page.wait_for_timeout(1000)

    # Journey 2: Enter valid visitor pass (BS-882190)
    page.get_by_placeholder("e.g. BS-882190").fill("BS-882190")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Scan Access Pass").click()
    page.wait_for_timeout(1000)

    # Journey 3: Check-out visitor (it's currently checked in)
    page.get_by_role("button", name="Check Out Guest").click()
    page.wait_for_timeout(1000)

    # Journey 4: Try invalid verification
    page.get_by_role("button", name="Clear Scanner").click()
    page.wait_for_timeout(500)

    page.get_by_placeholder("e.g. BS-882190").fill("BS-999999")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Scan Access Pass").click()
    page.wait_for_timeout(1000)

    # Take screenshot at final state (Error state)
    page.screenshot(path="/home/jules/verification/screenshots/security_portal.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        except Exception as e:
            print("Error occurred:", e)
        finally:
            context.close()
            browser.close()
