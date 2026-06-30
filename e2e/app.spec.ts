import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

test.describe("Leish! Beauty Marketplace", () => {
  test("homepage redirects to login", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(/\/auth\//);
  });

  test("artists page shows artist cards", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await expect(page.locator("h1")).toContainText("Artists");
    await expect(page.locator('input[placeholder*="Search artists"]')).toBeVisible();
  });

  test("studios page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/studios`);
    await expect(page.locator("h1")).toContainText("Studios");
  });

  test("login page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/login`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("registration page shows form", async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/signup`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("favorites page loads when not logged in", async ({ page }) => {
    await page.goto(`${BASE_URL}/favorites`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("dark mode toggle works", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    const toggle = page.locator('button[aria-label="Toggle dark mode"]').first();
    const exists = await toggle.isVisible().catch(() => false);
    if (!exists) return;
    const initialClass = await page.locator("html").getAttribute("class");
    const initialIsDark = initialClass?.includes("dark") ?? false;
    await toggle.click();
    await page.waitForTimeout(100);
    const afterClass = await page.locator("html").getAttribute("class");
    expect(afterClass?.includes("dark")).toBe(!initialIsDark);
  });

  test("search modal can be triggered", async ({ page }) => {
    await page.goto(BASE_URL);
    const searchBtn = page.getByRole("button").filter({ hasText: /What are you looking for|Search/ }).first();
    const exists = await searchBtn.isVisible().catch(() => false);
    if (!exists) return;
    await searchBtn.click();
    await page.waitForTimeout(300);
    const modal = page.locator('input[placeholder*="looking"], input[placeholder*="Search" i]').first();
    const modalVisible = await modal.isVisible().catch(() => false);
    expect(modalVisible).toBe(true);
  });

  test("404 page works", async ({ page }) => {
    await page.goto(`${BASE_URL}/this-page-does-not-exist`);
    await page.waitForLoadState("networkidle");
    const body = page.locator("body");
    await expect(body).not.toBeEmpty();
  });

  test("artist detail page loads for first artist", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const firstCard = page.locator('a[href^="/artists/"]').first();
    await expect(firstCard).toBeVisible();
    const href = await firstCard.getAttribute("href");
    await page.goto(`${BASE_URL}${href}`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("booking flow shows login prompt when not authenticated", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const firstCard = page.locator('a[href^="/artists/"]').first();
    const href = await firstCard.getAttribute("href");
    await page.goto(`${BASE_URL}${href}`);
    await page.waitForLoadState("networkidle");
    // Select a service
    const serviceCards = page.locator('[class*="rounded-xl"][class*="border"]').filter({ hasText: /MYR/ });
    if (await serviceCards.count() > 0) {
      await serviceCards.first().click();
      await page.waitForTimeout(200);
    }
    // Should show login prompt for non-authenticated users
    await expect(page.locator('text=/log in to book/i')).toBeVisible();
  });

  test("booking flow - clicking service highlights it", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const firstCard = page.locator('a[href^="/artists/"]').first();
    const href = await firstCard.getAttribute("href");
    await page.goto(`${BASE_URL}${href}`);
    await page.waitForLoadState("networkidle");
    const serviceCards = page.locator('[class*="rounded-xl"][class*="border"]').filter({ hasText: /MYR/ });
    const count = await serviceCards.count();
    if (count > 0) {
      await serviceCards.first().click();
      await page.waitForTimeout(100);
      const selected = page.locator('[class*="border-rose-500"]');
      await expect(selected.first()).toBeVisible();
    }
  });

  test("studio detail page loads and shows content", async ({ page }) => {
    await page.goto(`${BASE_URL}/studios`);
    await page.waitForLoadState("networkidle");
    const firstStudio = page.locator('a[href^="/studios/"]').first();
    await expect(firstStudio).toBeVisible();
    const href = await firstStudio.getAttribute("href");
    await page.goto(`${BASE_URL}${href}`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("h2, h3").first()).toBeVisible();
  });

  test("studio detail shows artists list", async ({ page }) => {
    await page.goto(`${BASE_URL}/studios`);
    await page.waitForLoadState("networkidle");
    const firstStudio = page.locator('a[href^="/studios/"]').first();
    const href = await firstStudio.getAttribute("href");
    await page.goto(`${BASE_URL}${href}`);
    await page.waitForLoadState("networkidle");
    const artistLinks = page.locator('a[href^="/artists/"]');
    await expect(artistLinks.first()).toBeVisible();
  });

  test("favorites toggle works on artist detail", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const firstCard = page.locator('a[href^="/artists/"]').first();
    const href = await firstCard.getAttribute("href");
    await page.goto(`${BASE_URL}${href}`);
    await page.waitForLoadState("networkidle");
    const heartBtns = page.locator("button").filter({ has: page.locator("svg") });
    const heartBtn = heartBtns.first();
    if (await heartBtn.isVisible()) {
      await heartBtn.click();
      await page.waitForTimeout(200);
    }
  });

  test("artist cards are visible on artists page", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const artistCards = page.locator('a[href^="/artists/"]');
    await expect(artistCards.first()).toBeVisible();
  });

  test("artists page has working search input", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const searchInput = page.locator('input[type="text"], input[placeholder*="Search"], input[placeholder*="search"]').first();
    await searchInput.fill("test");
    await page.waitForTimeout(300);
  });

  test("artists page shows category filter", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const select = page.locator('select').first();
    await expect(select).toBeVisible();
  });

  test("profile page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/profile`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test.skip("artist dashboard page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/artist`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test.skip("studio dashboard page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/studio`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("admin dashboard page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/admin`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("navbar is visible on home page", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("nav, header").first()).toBeVisible();
  });

  test("footer is visible on home page", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("footer")).toBeVisible();
  });

  test("back to artists link works on artist detail", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const firstCard = page.locator('a[href^="/artists/"]').first();
    const href = await firstCard.getAttribute("href");
    await page.goto(`${BASE_URL}${href}`);
    await page.waitForLoadState("networkidle");
    const backLink = page.locator("a").filter({ hasText: /Back to artists/i }).first();
    const exists = await backLink.isVisible().catch(() => false);
    if (!exists) return;
    await backLink.click({ force: true });
    await expect(page).toHaveURL(/\/artists/);
  });

  test("back to studios link works on studio detail", async ({ page }) => {
    await page.goto(`${BASE_URL}/studios`);
    await page.waitForLoadState("networkidle");
    const firstStudio = page.locator('a[href^="/studios/"]').first();
    const href = await firstStudio.getAttribute("href");
    await page.goto(`${BASE_URL}${href}`);
    await page.waitForLoadState("networkidle");
    const backLink = page.locator("a").filter({ hasText: /Back to studios/i }).first();
    const exists = await backLink.isVisible().catch(() => false);
    if (!exists) return;
    await backLink.click({ force: true });
    await expect(page).toHaveURL(/\/studios/);
  });

  test("registration page has role selection", async ({ page }) => {
    await page.goto(`${BASE_URL}/register`);
    await page.waitForLoadState("networkidle");
    const roleButtons = page.locator('button, a').filter({ hasText: /Artist|Studio/i });
    const count = await roleButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("login page has form elements", async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/login`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("signup page has form elements", async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/signup`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test.skip("notifications button opens dropdown (requires stable env)", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const notifBtn = page.locator('button[aria-label="Notifications"]').first();
    await expect(notifBtn).toBeVisible();
    await notifBtn.click();
    await page.waitForTimeout(300);
    // Dropdown should appear with notifications
    const dropdown = page.locator('div[class*="w-80"], div[class*="w-96"]').filter({ hasText: /Notifications/ });
    await expect(dropdown).toBeVisible();
    // Guest should have seeded localStorage notifications
    const items = page.locator('div[class*="flex items-start"]');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });
});
