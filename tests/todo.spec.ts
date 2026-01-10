import { test, expect } from "@playwright/test";
import User from "../models/User";
import RegisterPage from "../pages/RegisterPage";
import NewTodoPage from "../pages/NewTodoPage";
import TodoPage from "../pages/TodoPage";

test("should be able to add a todo", async ({ page, request, context }) => {
  const user = new User();
  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingTheApi(user);
  const newTodoPage = new NewTodoPage(page);
  await newTodoPage.load();
  await newTodoPage.addNewTask("Learn Playwright");

  const todoPage = new TodoPage(page);

  const todoText = await todoPage.getTodoTextByIndex(0);

  expect(todoText).toEqual("Learn Playwright");
});

test("should be able to delete a todo", async ({ page, request, context }) => {
  const user = new User();
  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingTheApi(user);

  //await new TodoApi(request).addTask(user);
  const newtodoPage = new NewTodoPage(page, request);
  await newtodoPage.addNewTaskUsingApi(user);
  const todoPage = new TodoPage(page);
  await todoPage.load();
  await todoPage.deleteTodoByIndex(0);
  const notodosMessage = todoPage.getnoTodosMessage();
  await expect(notodosMessage).toBeVisible();
});
