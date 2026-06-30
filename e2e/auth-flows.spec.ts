import { test, expect } from '@playwright/test';
import { login } from './auth';

test.describe('Authenticated Flows', () => {
  test('user can favorite an artist and it persists after reload', async ({ page }) => {
    await login(page);

    // Navigate to artists page and open first artist
    await page.goto('/artists');
    await page.waitForLoadState('networkidle');

    const firstCard = page.locator('a[href^="/artists/"]').first();
    await expect(firstCard).toBeVisible();
    const href = await firstCard.getAttribute('href');
    await page.goto(href!);
    await page.waitForLoadState('networkidle');

    // Find the favorite button (with heart icon) – the one in the sticky sidebar
    // There are multiple heart buttons; we want the one associated with artist detail
    // We'll use a button that contains an SVG with heart icon and is near the artist info
    const favBtn = page.locator('button').filter({ has: page.locator('svg.lucide-heart') }).first();

    // Click to favorite
    await favBtn.click();
    await page.waitForTimeout(500);

    // Check that button has active styling (bg-rose-500 or text-white)
    await expect(favBtn).toHaveClass(/bg-rose-500|text-white/, { timeout: 2000 });

    // Reload page and verify still favorited
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(favBtn).toHaveClass(/bg-rose-500|text-white/);
  });

  test('user can submit a review', async ({ page }) => {
    await login(page);

    // Go to an artist page
    await page.goto('/artists');
    await page.waitForLoadState('networkidle');
    const firstCard = page.locator('a[href^="/artists/"]').first();
    const href = await firstCard.getAttribute('href');
    await page.goto(href!);
    await page.waitForLoadState('networkidle');

    // Find rating stars (5 stars) – the ReviewForm uses input[type="radio"] with value 1-5
    // We'll select 4 stars
    const star4 = page.locator('input[type="radio"][value="4"]');
    await expect(star4).toBeVisible();
    await star4.click();

    // Fill the review text
    await page.fill('textarea', 'Excellent service! Highly recommended.');
    // Submit
    await page.click('button:has-text("Submit Review")');

    // Expect success: either the review appears or a success toast
    await expect(page.locator('text=Excellent service!')).toBeVisible({ timeout: 5000 });
  });
});
