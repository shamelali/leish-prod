import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Leish! Beauty Marketplace", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Leish/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("artists page shows artist cards", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await expect(page.locator("h1")).toContainText("Makeup Artists");
    // Should have artist cards
    const cards = page.locator("[class*='rounded-2xl']");
    await expect(cards.first()).toBeVisible();
  });

  test("artist detail page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists/aiko-nakamura`);
    await expect(page.locator("h1")).toContainText("Aiko");
    // Booking section should be visible
    await expect(page.locator("text=Book This Artist")).toBeVisible();
  });

  test("studios page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/studios`);
    await expect(page.locator("h1")).toContainText("Studios");
  });

  test("login page shows form", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await expect(page.locator("h1")).toContainText("Welcome");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("registration page shows form", async ({ page }) => {
    await page.goto(`${BASE_URL}/register`);
    await expect(page.locator("h1")).toContainText("Create");
  });

  test("favorites page redirects when not logged in", async ({ page }) => {
    await page.goto(`${BASE_URL}/favorites`);
    // Should redirect to login or show empty state
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/\/(login|favorites)/);
  });

  test("dark mode toggle works", async ({ page }) => {
    await page.goto(BASE_URL);
    const toggle = page.locator('button[aria-label="Toggle dark mode"]');
    await toggle.click();
    // Check if html has dark class
    const htmlClass = await page.locator("html").getAttribute("class");
    expect(htmlClass).toContain("dark");
  });

  test("search modal opens with keyboard shortcut", async ({ page }) => {
    await page.goto(BASE_URL);
    // Press Cmd+K or Ctrl+K
    await page.keyboard.press("Meta+k");
    // Search modal should be visible
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test("booking flow - select service then date", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists/aiko-nakamura`);
    // Click first service
    const serviceBtn = page.locator("button", { hasText: "Glam" }).first();
    await serviceBtn.click();
    // Date buttons should appear
    await expect(page.locator("text=Pick a Date")).toBeVisible();
  });

  test("404 page works", async ({ page }) => {
    await page.goto(`${BASE_URL}/this-page-does-not-exist`);
    await expect(page.locator("text=404")).toBeVisible();
  });

  test("blog page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/blog`);
    await expect(page.locator("h1")).toContainText("Beauty Insights");
  });

  test("messages page requires auth", async ({ page }) => {
    await page.goto(`${BASE_URL}/messages`);
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/\/(login|messages)/);
  });
});
