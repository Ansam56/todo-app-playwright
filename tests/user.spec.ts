import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import User from "../models/User";

test("should be able to register to the doto website", async ({ page }) => {
  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    "Test123*"
  );
  await page.goto("/signup");
  await page.locator('[data-testid="first-name"]').fill(user.getFirstName());
  await page.locator('[data-testid="last-name"]').fill(user.getLastName());
  await page.locator('[data-testid="email"]').fill(user.getEmail());
  await page.locator('[data-testid="password"]').fill(user.getPassword());
  await page
    .locator('[data-testid="confirm-password"]')
    .fill(user.getPassword());
  await page.locator('[data-testid="submit"]').click();

  const welcomeMessage = page.locator("[data-testid='welcome']");
  await expect(welcomeMessage).toBeVisible();
});
