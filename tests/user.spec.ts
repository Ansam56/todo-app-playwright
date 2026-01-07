import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import User from "../models/User";
import RegisterPage from "../pages/RegisterPage";
import TodoPage from "../pages/TodoPage";

test("should be able to register to the doto website", async ({ page }) => {
  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    "Test123*"
  );

  const registerPage = new RegisterPage(page);
  await registerPage.load();
  await registerPage.register(user);
  // const welcomeMessage = page.locator("[data-testid='welcome']");
  const todoPage = new TodoPage(page);
  const welcomeMessage = todoPage.getWelcomeMessage();
  await expect(welcomeMessage).toBeVisible();
});
