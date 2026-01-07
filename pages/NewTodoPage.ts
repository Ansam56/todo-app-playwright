import { Page } from "@playwright/test";

export default class NewTodoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  private get newTodoInput() {
    return '[data-testid="new-todo"]';
  }
  private get newTodoSubmit() {
    return '[data-testid="submit-newTask"]';
  }

  async load() {
    return await this.page.goto("/todo/new");
  }
  async addNewTask(todo: string) {
    await this.page.fill(this.newTodoInput, todo);
    await this.page.click(this.newTodoSubmit);
  }
}
