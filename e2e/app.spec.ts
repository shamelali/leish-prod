import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

test.describe("Leish! Beauty Marketplace", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Leish/);
    await expect(page.locator("h1")).toContainText("Your Beauty, Perfected.");
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

  test("login page shows form", async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/login`);
    await expect(page.locator("h1")).toContainText("Welcome Back");
    await expect(page.locator("text=Sign in to your account")).toBeVisible();
  });

  test("registration page shows form", async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/signup`);
    await expect(page.locator("h1")).toContainText("Create Account");
    await expect(page.locator("text=Join the Leish! community")).toBeVisible();
  });

  test("favorites page shows empty state when not logged in", async ({ page }) => {
    await page.goto(`${BASE_URL}/favorites`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toContainText("My Favorites");
    await expect(page.locator("text=No favorites yet")).toBeVisible();
  });

  test("dark mode toggle works", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    const toggle = page.locator('button[aria-label="Toggle dark mode"]').first();
    await expect(toggle).toBeVisible();
    const initialClass = await page.locator("html").getAttribute("class");
    const initialIsDark = initialClass?.includes("dark") ?? false;
    await toggle.click();
    await page.waitForTimeout(100);
    const afterClass = await page.locator("html").getAttribute("class");
    expect(afterClass?.includes("dark")).toBe(!initialIsDark);
  });

  test("search modal opens", async ({ page }) => {
    await page.goto(BASE_URL);
    const searchBtn = page.getByRole("button", { name: /What are you looking for/ });
    await searchBtn.click();
    await expect(page.locator('input[placeholder="What are you looking for?"]')).toBeVisible();
  });

  test("404 page works", async ({ page }) => {
    await page.goto(`${BASE_URL}/this-page-does-not-exist`);
    await expect(page.locator("h1")).toContainText("404");
  });

  test("artist detail page loads for first artist", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const firstCard = page.locator('a[href^="/artists/"]').first();
    await expect(firstCard).toBeVisible();
    const href = await firstCard.getAttribute("href");
    await page.goto(`${BASE_URL}${href}`);
    await expect(page.locator("text=Book Appointment")).toBeVisible();
  });

  test("booking flow - select service then see proceed button", async ({ page }) => {
    await page.goto(`${BASE_URL}/artists`);
    await page.waitForLoadState("networkidle");
    const firstCard = page.locator('a[href^="/artists/"]').first();
    const href = await firstCard.getAttribute("href");
    await page.goto(`${BASE_URL}${href}`);
    await page.waitForLoadState("networkidle");
    const serviceBtn = page.locator("h3", { hasText: "Premium Makeup" }).first();
    await serviceBtn.click();
    await page.waitForTimeout(100);
    const proceedBtn = page.locator("button", { hasText: "Proceed to Book" });
    await expect(proceedBtn).toBeVisible();
  });
});
