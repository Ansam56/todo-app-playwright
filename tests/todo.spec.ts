import { test, expect } from "@playwright/test";

test("should be able to add a todo", async ({ page }) => {
  await page.goto("/signup");
  await page.locator('[data-testid="first-name"]').fill("Ansam");
  await page.locator('[data-testid="last-name"]').fill("Janajreh");
  // random email => later
  await page.locator('[data-testid="email"]').fill("ansam1234@example.com");
  await page.locator('[data-testid="password"]').fill("Test123*");
  await page.locator('[data-testid="confirm-password"]').fill("Test123*");
  await page.locator('[data-testid="submit"]').click();

  //await page.locator('[data-testid="add"]').click();
  //await page.waitForTimeout(5000);
  await page.click('[data-testid="add"]');
  await page.locator('[data-testid="new-todo"]').fill("Learn Playwright");
  await page.locator('[data-testid="submit-newTask"]').click();

  const todoText = await page
    .locator('[data-testid="todo-item"]')
    .nth(0)
    .innerText();
  expect(todoText).toEqual("Learn Playwright");
});

test("should be able to delete a todo", async ({ page }) => {
  await page.goto("/signup");
  await page.locator('[data-testid="first-name"]').fill("Ansam");
  await page.locator('[data-testid="last-name"]').fill("Janajreh");
  // random email => later
  await page.locator('[data-testid="email"]').fill("ansam1234@example.com");
  await page.locator('[data-testid="password"]').fill("Test123*");
  await page.locator('[data-testid="confirm-password"]').fill("Test123*");
  await page.locator('[data-testid="submit"]').click();

  //await page.locator('[data-testid="add"]').click();
  //await page.waitForTimeout(5000);
  await page.click('[data-testid="add"]');
  await page.locator('[data-testid="new-todo"]').fill("Learn Playwright");
  await page.locator('[data-testid="submit-newTask"]').click();
  await page.locator('[data-testid="delete"]').nth(0).click();
  const notodosMessage = page.locator('[data-testid="no-todos"]');
  await expect(notodosMessage).toBeVisible();
});
