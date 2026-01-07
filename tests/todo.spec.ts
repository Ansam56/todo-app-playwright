import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import User from "../models/User";
import TodoApi from "../apis/TodoApi";
import RegisterPage from "../pages/RegisterPage";
import NewTodoPage from "../pages/NewTodoPage";

test("should be able to add a todo", async ({ page, request, context }) => {
  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    "Test123*"
  );
  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingTheApi(user);
  const newTodoPage = new NewTodoPage(page);
  await newTodoPage.load();
  await newTodoPage.addNewTask("Learn Playwright");

  const todoText = await page
    .locator('[data-testid="todo-item"]')
    .nth(0)
    .innerText();
  expect(todoText).toEqual("Learn Playwright");
});

test("should be able to delete a todo", async ({ page, request, context }) => {
  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    "Test123*"
  );
  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingTheApi(user);

  await new TodoApi(request).addTask(user);
  await page.goto("/todo");

  await page.click('[data-testid="delete"]');
  const notodosMessage = page.locator('[data-testid="no-todos"]');
  await expect(notodosMessage).toBeVisible();
});
