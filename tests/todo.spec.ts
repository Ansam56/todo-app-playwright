import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import TodoApi from "../apis/TodoApi";

test("should be able to add a todo", async ({ page, request, context }) => {
  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    "Test123*"
  );
  const res = await new UserApi(request).register(user);
  // console.log(await res.json());
  const resBody = await res.json();
  const accessToken = resBody.access_token;
  const userID = resBody.userID;
  const firstName = resBody.firstName;
  //console.log(accessToken, userID, firstName);

  await context.addCookies([
    {
      name: "access_token",
      value: accessToken,
      url: "https://todo.qacart.com",
    },
    {
      name: "userID",
      value: userID,
      url: "https://todo.qacart.com",
    },
    {
      name: "firstName",
      value: firstName,
      url: "https://todo.qacart.com",
    },
  ]);
  await page.goto("/todo/new");
  //await page.click('[data-testid="add"]');
  await page.locator('[data-testid="new-todo"]').fill("Learn Playwright");
  await page.locator('[data-testid="submit-newTask"]').click();

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
  const res = await new UserApi(request).register(user);

  const resBody = await res.json();
  const accessToken = resBody.access_token;
  const userID = resBody.userID;
  const firstName = resBody.firstName;

  user.setAccessToken(accessToken);

  await context.addCookies([
    {
      name: "access_token",
      value: accessToken,
      url: "https://todo.qacart.com",
    },
    {
      name: "userID",
      value: userID,
      url: "https://todo.qacart.com",
    },
    {
      name: "firstName",
      value: firstName,
      url: "https://todo.qacart.com",
    },
  ]);

  await new TodoApi(request).addTask(user);
  await page.goto("/todo");

  await page.locator('[data-testid="delete"]').nth(0).click();
  const notodosMessage = page.locator('[data-testid="no-todos"]');
  await expect(notodosMessage).toBeVisible();
});
