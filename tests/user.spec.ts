import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("should be able to register to the doto website", async ({ page }) => {
  await page.goto("/signup");
  await page
    .locator('[data-testid="first-name"]')
    .fill(faker.person.firstName());
  await page.locator('[data-testid="last-name"]').fill(faker.person.lastName());
  await page.locator('[data-testid="email"]').fill(faker.internet.email());
  await page.locator('[data-testid="password"]').fill("Test123*");
  await page.locator('[data-testid="confirm-password"]').fill("Test123*");
  await page.locator('[data-testid="submit"]').click();

  const welcomeMessage = page.locator("[data-testid='welcome']");
  await expect(welcomeMessage).toBeVisible();
});
