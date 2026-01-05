import { test, expect } from "@playwright/test";

test("should be able to register to the doto website", async ({ page }) => {
  await page.goto("/signup");
  await page.locator('[data-testid="first-name"]').fill("Ansam");
  await page.locator('[data-testid="last-name"]').fill("Janajreh");
  // random email => later
  await page.locator('[data-testid="email"]').fill("ansam1@example.com");
  await page.locator('[data-testid="password"]').fill("Test123*");
  await page.locator('[data-testid="confirm-password"]').fill("Test123*");
  await page.locator('[data-testid="submit"]').click();

  const welcomeMessage = page.locator("[data-testid='welcome']");
  await expect(welcomeMessage).toBeVisible();
});
